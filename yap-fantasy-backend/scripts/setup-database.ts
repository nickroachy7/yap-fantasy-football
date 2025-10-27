import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const schema = `
-- ============================================
-- USERS
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  coins INT DEFAULT 1000,
  tokens INT DEFAULT 5,
  total_points DECIMAL(10,2) DEFAULT 0,
  global_rank INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NOW(),
  fcm_token TEXT
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_global_rank ON users(global_rank);

-- ============================================
-- NFL PLAYERS (Cached from BallDontLie API)
-- ============================================
CREATE TABLE IF NOT EXISTS players (
  player_id SERIAL PRIMARY KEY,
  balldontlie_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  position TEXT NOT NULL CHECK (position IN ('QB','RB','WR','TE','K','DEF')),
  team_abbreviation TEXT,
  jersey_number INT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','injured','suspended','inactive')),
  last_synced_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_players_position ON players(position);
CREATE INDEX IF NOT EXISTS idx_players_team ON players(team_abbreviation);
CREATE INDEX IF NOT EXISTS idx_players_balldontlie ON players(balldontlie_id);

-- ============================================
-- PLAYER CARDS (User's Collection)
-- ============================================
CREATE TABLE IF NOT EXISTS player_cards (
  card_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  player_id INT REFERENCES players(player_id),
  rarity TEXT NOT NULL DEFAULT 'base' CHECK (rarity IN ('base', 'bronze', 'silver', 'gold', 'diamond')),
  total_fantasy_points DECIMAL(10,2) DEFAULT 0,
  total_boost_points DECIMAL(10,2) DEFAULT 0,
  combined_points DECIMAL(10,2) GENERATED ALWAYS AS (total_fantasy_points + total_boost_points) STORED,
  quick_sell_value INT NOT NULL DEFAULT 25,
  acquired_from TEXT,
  acquired_at TIMESTAMPTZ DEFAULT NOW(),
  last_upgrade_at TIMESTAMPTZ,
  is_quick_sold BOOLEAN DEFAULT FALSE,
  quick_sold_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_player_cards_user ON player_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_player_cards_player ON player_cards(player_id);
CREATE INDEX IF NOT EXISTS idx_player_cards_combined_points ON player_cards(combined_points, rarity);
CREATE INDEX IF NOT EXISTS idx_player_cards_active ON player_cards(user_id, is_quick_sold) WHERE is_quick_sold = FALSE;

-- ============================================
-- CARD UPGRADE HISTORY (Audit Log)
-- ============================================
CREATE TABLE IF NOT EXISTS card_upgrades (
  upgrade_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES player_cards(card_id) ON DELETE CASCADE,
  from_rarity TEXT NOT NULL,
  to_rarity TEXT NOT NULL,
  points_at_upgrade DECIMAL(10,2) NOT NULL,
  upgraded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_card_upgrades_card ON card_upgrades(card_id);

-- ============================================
-- PACK TYPES
-- ============================================
CREATE TABLE IF NOT EXISTS pack_types (
  pack_type_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  cost_coins INT NOT NULL,
  card_count INT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Insert pack types (will be skipped if they already exist)
INSERT INTO pack_types (pack_type_id, name, description, cost_coins, card_count) VALUES
('starter', 'Starter Pack', 'Free pack for new users - all base cards', 0, 5),
('bronze', 'Bronze Pack', 'Basic pack with 3 base cards', 500, 3),
('silver', 'Silver Pack', '5 base cards - earn points to upgrade them!', 1200, 5),
('gold', 'Gold Pack', '7 base cards with higher overall ratings', 2500, 7),
('diamond', 'Diamond Pack', '10 base cards - best players available', 5000, 10)
ON CONFLICT (pack_type_id) DO NOTHING;

-- ============================================
-- PACK OPENING HISTORY
-- ============================================
CREATE TABLE IF NOT EXISTS pack_openings (
  opening_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  pack_type_id TEXT REFERENCES pack_types(pack_type_id),
  cards_received JSONB NOT NULL,
  opened_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pack_openings_user ON pack_openings(user_id);

-- ============================================
-- LINEUPS (Current Week Only for MVP)
-- ============================================
CREATE TABLE IF NOT EXISTS lineups (
  lineup_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  week_number INT NOT NULL,
  season TEXT NOT NULL,
  qb UUID REFERENCES player_cards(card_id),
  rb1 UUID REFERENCES player_cards(card_id),
  rb2 UUID REFERENCES player_cards(card_id),
  wr1 UUID REFERENCES player_cards(card_id),
  wr2 UUID REFERENCES player_cards(card_id),
  wr3 UUID REFERENCES player_cards(card_id),
  te UUID REFERENCES player_cards(card_id),
  flex UUID REFERENCES player_cards(card_id),
  k UUID REFERENCES player_cards(card_id),
  def UUID REFERENCES player_cards(card_id),
  is_locked BOOLEAN DEFAULT FALSE,
  locked_at TIMESTAMPTZ,
  total_points DECIMAL(10,2) DEFAULT 0,
  UNIQUE(user_id, week_number, season)
);

CREATE INDEX IF NOT EXISTS idx_lineups_user ON lineups(user_id);
CREATE INDEX IF NOT EXISTS idx_lineups_week ON lineups(week_number, season);

-- ============================================
-- BOOST TOKENS (The Gambling Mechanic!)
-- ============================================
CREATE TABLE IF NOT EXISTS boost_types (
  boost_type_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  stat_to_check TEXT NOT NULL,
  default_threshold INT NOT NULL,
  multiplier DECIMAL(3,2) NOT NULL,
  token_cost INT DEFAULT 1,
  applicable_positions TEXT[]
);

INSERT INTO boost_types (boost_type_id, name, description, stat_to_check, default_threshold, multiplier, applicable_positions) VALUES
('300_yards', '300 Club', 'Boost if QB throws 300+ yards', 'passing_yards', 300, 1.5, ARRAY['QB']),
('100_rush', 'Century Rush', 'Boost if RB runs 100+ yards', 'rushing_yards', 100, 1.5, ARRAY['RB']),
('3_tds', 'Hat Trick', 'Boost if player scores 3+ TDs', 'total_touchdowns', 3, 2.0, ARRAY['QB','RB','WR','TE']),
('10_receptions', 'Double Digits', 'Boost if WR catches 10+ passes', 'receptions', 10, 1.5, ARRAY['WR','TE'])
ON CONFLICT (boost_type_id) DO NOTHING;

CREATE TABLE IF NOT EXISTS boost_tokens_applied (
  boost_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  card_id UUID REFERENCES player_cards(card_id) ON DELETE CASCADE,
  game_date DATE NOT NULL,
  boost_type TEXT NOT NULL,
  threshold INT NOT NULL,
  multiplier DECIMAL(3,2) NOT NULL,
  was_successful BOOLEAN,
  points_gained DECIMAL(10,2),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_boost_tokens_user ON boost_tokens_applied(user_id);
CREATE INDEX IF NOT EXISTS idx_boost_tokens_game ON boost_tokens_applied(game_date);
CREATE INDEX IF NOT EXISTS idx_boost_tokens_card ON boost_tokens_applied(card_id);

-- ============================================
-- DAILY/WEEKLY CHALLENGES
-- ============================================
CREATE TABLE IF NOT EXISTS challenges (
  challenge_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('daily', 'weekly')),
  title TEXT NOT NULL,
  description TEXT,
  coin_reward INT NOT NULL,
  token_reward INT DEFAULT 0,
  requirement JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_challenges (
  user_challenge_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(challenge_id) ON DELETE CASCADE,
  progress INT DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  reward_claimed BOOLEAN DEFAULT FALSE,
  claimed_at TIMESTAMPTZ,
  UNIQUE(user_id, challenge_id)
);

CREATE INDEX IF NOT EXISTS idx_user_challenges_user ON user_challenges(user_id);

-- ============================================
-- TRANSACTIONS LOG (For Auditing)
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
  transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('pack_purchase', 'quick_sell', 'challenge_reward', 'token_used')),
  coins_change INT,
  tokens_change INT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at DESC);
`;

async function setupDatabase() {
  console.log('🚀 Setting up YAP Fantasy Football database...\n');

  try {
    // Execute the schema
    console.log('📝 Creating tables and indexes...');
    const { data, error } = await supabase.rpc('exec_sql', { sql: schema });

    if (error) {
      // If the RPC doesn't exist, we'll need to execute it via the REST API
      console.log('⚠️  Note: Using direct execution (RPC not available)');
      console.log('   Please run this schema in Supabase SQL Editor:');
      console.log('   Dashboard → SQL Editor → New Query → Paste schema\n');
      console.log('✅ Schema is ready to be executed manually');
      return;
    }

    console.log('✅ Database schema created successfully!\n');
    console.log('📊 Created tables:');
    console.log('   1. users');
    console.log('   2. players');
    console.log('   3. player_cards');
    console.log('   4. card_upgrades');
    console.log('   5. pack_types (with 5 pack types)');
    console.log('   6. pack_openings');
    console.log('   7. lineups');
    console.log('   8. boost_types (with 4 boost types)');
    console.log('   9. boost_tokens_applied');
    console.log('   10. challenges');
    console.log('   11. user_challenges');
    console.log('   12. transactions');
    console.log('\n✨ Database is ready for use!');

  } catch (err) {
    console.error('❌ Error setting up database:', err);
    console.log('\n📋 Manual setup required:');
    console.log('   1. Go to https://supabase.com/dashboard');
    console.log('   2. Select your project');
    console.log('   3. Go to SQL Editor');
    console.log('   4. Create a new query');
    console.log('   5. Copy and paste the schema from this file');
    console.log('   6. Run the query');
  }
}

setupDatabase();
