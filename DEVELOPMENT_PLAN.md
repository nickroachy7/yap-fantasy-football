# YAP Fantasy Football - Development Plan
## YAP Experience MVP (35 Weeks)

**Status:** Ready to Execute
**Last Updated:** 2025
**Target:** Simplified card collection game with global leaderboard
**Team:** Solo developer + AI agents
**Time Commitment:** 15 hrs/week average (adjustable 10-20)
**Tech Stack:** Vite + React Router, Supabase, BallDontLie API (NFL GOAT Subscription ✅)
**Hosting:** Railway (all-in-one: frontend + backend + cron + database)
**Launch Target:** Week 35 soft launch with 10 beta testers

---

## Executive Summary

**App Name:** YAP Fantasy Football
**Core Innovation:** Performance-based card rarity system - all cards start BASE tier and upgrade through actual game performance (skill > spending)
**Target Audience:** Fantasy football fans who want simpler, more engaging gameplay
**Differentiation:** No draft stress, no waiver wire complexity - just collect cards and compete

**Data Advantage:** BallDontLie NFL GOAT subscription = unlimited API calls, real-time stats, no rate limits! 🚀

### What We're Building (Season 1 - MVP)

**YAP Experience ONLY:**
- ✅ Card packs (Bronze/Silver/Gold/Diamond packs, all cards start BASE)
- ✅ Card collection with filters and quick-sell
- ✅ Lineup builder (10 positions)
- ✅ Weekly scoring (batch update Tuesdays)
- ✅ Card auto-upgrades (Base→Bronze→Silver→Gold→Diamond based on performance)
- ✅ Boost tokens (earn from challenges, apply pre-game for bonus points)
- ✅ Daily/weekly challenges for coins
- ✅ **Public global leaderboard** (all users compete together)
- ✅ Push notifications (lineup reminders, score updates)

**Deferred to Season 2 (NOT in MVP):**
- ❌ Private leagues
- ❌ Draft system
- ❌ Waiver wire
- ❌ Trading
- ❌ Playoffs
- ❌ Real-time scoring (batch updates are fine)
- ❌ Traditional fantasy experience mode

### Why This Approach?

1. ✅ **Realistic for solo dev** at 10-20 hrs/week
2. ✅ **Focuses on your unique innovation** (card upgrades)
3. ✅ **Simpler to build and test** (no league coordination)
4. ✅ **Faster to market** (compete on differentiation, not parity)
5. ✅ **Users can start anytime** (no draft coordination needed)
6. ✅ **Proves concept** before investing in Traditional mode
7. ✅ **No legal risks** (tokens are earned, not purchased)
8. ✅ **Works with AI agents** (smaller, focused tasks)

---

## Tech Stack

### Core Technologies
```
Frontend:
├── Vite (ultra-fast dev server, instant HMR)
├── React 18 (with TypeScript)
├── React Router v6 (client-side routing)
├── Tailwind CSS (utility-first styling)
└── shadcn/ui (pre-built React components)

Backend:
├── Express.js (REST API on Railway)
├── Supabase (PostgreSQL + Auth + Realtime + Storage)
└── Railway Cron Jobs (built-in scheduling)

External APIs:
├── BallDontLie API - NFL GOAT Subscription ✅
│   └── Unlimited API calls, no rate limits, real-time stats
├── Resend (transactional emails - 3k/month free)
└── Firebase Cloud Messaging (push notifications)

AI Development Tools:
├── Cursor (AI pair programming IDE) ← PRIMARY TOOL
├── v0.dev (AI UI builder for React components)
├── Claude Code (architecture & debugging)
└── GitHub Copilot (optional code completion)
```

### Why This Stack?

**Vite + React Router:**
- ⚡ **Faster development:** Instant hot reload (vs. Next.js slower refresh)
- 🎯 **Simpler:** Standard React patterns, no server/client confusion
- 🤖 **AI-friendly:** Clean separation of concerns, easier for AI to generate code
- 📚 **Huge ecosystem:** All React libraries work out-of-the-box
- 🎓 **Beginner-friendly:** Less "magic," more explicit

**Railway (All-in-One Platform):**
- 🚂 **Single platform:** Frontend + Backend + Cron + Database in one place
- 💰 **$5 free credit/month:** Essentially free for small apps
- ⏰ **Built-in cron jobs:** No separate service needed (vs. complex Vercel Cron setup)
- 🗄️ **PostgreSQL included:** Can use Railway Postgres OR Supabase (your choice)
- 📦 **Auto-deploy from GitHub:** Push to main → auto-deploy
- 🔧 **Environment variables:** Easy config management

**Supabase:**
- 🔐 **Auth built-in:** Email, OAuth (Google, etc.) ready to go
- 🗄️ **PostgreSQL:** Powerful queries, JSONB support, full-text search
- ⚡ **Realtime:** Websockets for live leaderboard updates
- 🔒 **Row Level Security:** Database-level permissions
- 💾 **Storage:** For user avatars, card images

**BallDontLie NFL GOAT Subscription:**
- 🏈 **Unlimited calls:** No rate limit anxiety!
- 📊 **Real-time stats:** Live scoring during games
- 🎯 **Complete data:** All players, teams, games, stats
- 💎 **Premium tier:** Priority support, faster updates

### Hosting & Deployment Architecture

```
┌─────────────────────────────────────────────┐
│            Railway Platform                  │
│                                              │
│  ┌──────────────┐      ┌─────────────────┐ │
│  │  Frontend    │      │  Backend API    │ │
│  │  (Vite+React)│◄────►│  (Express.js)   │ │
│  │  Port: 3000  │      │  Port: 4000     │ │
│  └──────────────┘      └─────────────────┘ │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  Railway Cron Jobs                   │  │
│  │  - Weekly scoring (Tue 5am)          │  │
│  │  - Daily challenges (midnight)        │  │
│  │  - Lineup lock check (game times)     │  │
│  │  - Player sync (weekly)               │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
                    │
                    │ API calls
                    ▼
┌─────────────────────────────────────────────┐
│            Supabase                          │
│  - PostgreSQL Database (9 tables)           │
│  - Authentication (email + OAuth)           │
│  - Realtime (leaderboard updates)           │
│  - Storage (user avatars)                   │
└─────────────────────────────────────────────┘
```

**Deployment Flow:**
1. Push code to GitHub
2. Railway auto-detects changes
3. Builds frontend (Vite) + backend (Express)
4. Deploys to production URLs
5. Cron jobs run on schedule
6. Zero downtime deployments

---

## Budget

### One-Time Costs
| Item | Cost | Status |
|------|------|--------|
| UI/UX Design (DIY with AI) | $0 | Using v0.dev + shadcn/ui |
| Legal Review | $0 | Not needed (tokens are earned, not purchased) |
| Domain Name | $15/year | Optional for MVP |
| **Total** | **$15** | |

### Monthly Operating Costs (MVP with <100 users)
| Service | Cost | Tier |
|---------|------|------|
| Railway | $0 | $5 free credit/month (covers small apps) |
| Supabase | $0 | Free tier (500MB DB, 1GB bandwidth, 50k MAU) |
| BallDontLie API | **$0** | **NFL GOAT subscription (already owned!)** ✅ |
| Firebase Cloud Messaging | $0 | Free tier (unlimited notifications) |
| Resend (emails) | $0 | Free tier (3k emails/month) |
| Sentry (error tracking) | $0 | Free tier (5k events/month) |
| **Total** | **$0/month** | 100% free for MVP! |

### Scaling Costs (at 1,000 users)
| Service | Cost | Notes |
|---------|------|-------|
| Railway | $5-10/month | Beyond free credit, pay-as-you-go |
| Supabase Pro | $25/month | Better performance, connection pooling |
| **Total** | **$30-35/month** | Only upgrade when needed |

**Cost Advantage:** BallDontLie GOAT subscription saves ~$50-150/month vs. other sports data APIs! 🎯

---

## Database Schema (Simplified for MVP)

```sql
-- ============================================
-- USERS
-- ============================================
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  coins INT DEFAULT 1000, -- Starting currency
  tokens INT DEFAULT 5, -- Starting boost tokens
  total_points DECIMAL(10,2) DEFAULT 0, -- Sum of all card points
  global_rank INT, -- Calculated weekly
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NOW(),
  fcm_token TEXT -- For push notifications
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_global_rank ON users(global_rank);

-- ============================================
-- NFL PLAYERS (Cached from BallDontLie API)
-- ============================================
CREATE TABLE players (
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

CREATE INDEX idx_players_position ON players(position);
CREATE INDEX idx_players_team ON players(team_abbreviation);
CREATE INDEX idx_players_balldontlie ON players(balldontlie_id);

-- ============================================
-- PLAYER CARDS (User's Collection)
-- ============================================
CREATE TABLE player_cards (
  card_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  player_id INT REFERENCES players(player_id),

  -- Rarity System: ALL cards start as 'base' and upgrade through performance
  rarity TEXT NOT NULL DEFAULT 'base' CHECK (rarity IN ('base', 'bronze', 'silver', 'gold', 'diamond')),

  -- Performance Tracking
  total_fantasy_points DECIMAL(10,2) DEFAULT 0, -- Lifetime fantasy points earned
  total_boost_points DECIMAL(10,2) DEFAULT 0, -- Lifetime bonus points from tokens
  combined_points DECIMAL(10,2) GENERATED ALWAYS AS (total_fantasy_points + total_boost_points) STORED,

  -- Rarity Thresholds (points needed to upgrade)
  -- base: 0-49 points (quick_sell_value: 25)
  -- bronze: 50-149 points (quick_sell_value: 100)
  -- silver: 150-299 points (quick_sell_value: 300)
  -- gold: 300-499 points (quick_sell_value: 750)
  -- diamond: 500+ points (quick_sell_value: 2000)

  quick_sell_value INT NOT NULL DEFAULT 25,
  acquired_from TEXT, -- 'bronze_pack', 'silver_pack', etc.
  acquired_at TIMESTAMPTZ DEFAULT NOW(),
  last_upgrade_at TIMESTAMPTZ, -- When card last upgraded rarity
  is_quick_sold BOOLEAN DEFAULT FALSE,
  quick_sold_at TIMESTAMPTZ
);

CREATE INDEX idx_player_cards_user ON player_cards(user_id);
CREATE INDEX idx_player_cards_player ON player_cards(player_id);
CREATE INDEX idx_player_cards_combined_points ON player_cards(combined_points, rarity);
CREATE INDEX idx_player_cards_active ON player_cards(user_id, is_quick_sold) WHERE is_quick_sold = FALSE;

-- ============================================
-- CARD UPGRADE HISTORY (Audit Log)
-- ============================================
CREATE TABLE card_upgrades (
  upgrade_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES player_cards(card_id) ON DELETE CASCADE,
  from_rarity TEXT NOT NULL,
  to_rarity TEXT NOT NULL,
  points_at_upgrade DECIMAL(10,2) NOT NULL,
  upgraded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_card_upgrades_card ON card_upgrades(card_id);

-- ============================================
-- PACK TYPES
-- ============================================
CREATE TABLE pack_types (
  pack_type_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  cost_coins INT NOT NULL, -- All packs cost coins only
  card_count INT NOT NULL, -- How many cards in pack
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Initial pack types (ALL cards pulled are BASE rarity)
INSERT INTO pack_types (pack_type_id, name, description, cost_coins, card_count) VALUES
('starter', 'Starter Pack', 'Free pack for new users - all base cards', 0, 5),
('bronze', 'Bronze Pack', 'Basic pack with 3 base cards', 500, 3),
('silver', 'Silver Pack', '5 base cards - earn points to upgrade them!', 1200, 5),
('gold', 'Gold Pack', '7 base cards with higher overall ratings', 2500, 7),
('diamond', 'Diamond Pack', '10 base cards - best players available', 5000, 10);

-- ============================================
-- PACK OPENING HISTORY
-- ============================================
CREATE TABLE pack_openings (
  opening_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  pack_type_id TEXT REFERENCES pack_types(pack_type_id),
  cards_received JSONB NOT NULL, -- Array of card_ids
  opened_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pack_openings_user ON pack_openings(user_id);

-- ============================================
-- LINEUPS (Current Week Only for MVP)
-- ============================================
CREATE TABLE lineups (
  lineup_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  week_number INT NOT NULL,
  season TEXT NOT NULL, -- '2025'

  -- Positions (card_id references)
  qb UUID REFERENCES player_cards(card_id),
  rb1 UUID REFERENCES player_cards(card_id),
  rb2 UUID REFERENCES player_cards(card_id),
  wr1 UUID REFERENCES player_cards(card_id),
  wr2 UUID REFERENCES player_cards(card_id),
  wr3 UUID REFERENCES player_cards(card_id),
  te UUID REFERENCES player_cards(card_id),
  flex UUID REFERENCES player_cards(card_id), -- RB/WR/TE
  k UUID REFERENCES player_cards(card_id),
  def UUID REFERENCES player_cards(card_id),

  is_locked BOOLEAN DEFAULT FALSE, -- Lock when games start
  locked_at TIMESTAMPTZ,
  total_points DECIMAL(10,2) DEFAULT 0,

  UNIQUE(user_id, week_number, season)
);

CREATE INDEX idx_lineups_user ON lineups(user_id);
CREATE INDEX idx_lineups_week ON lineups(week_number, season);

-- ============================================
-- BOOST TOKENS (The Gambling Mechanic!)
-- ============================================
CREATE TABLE boost_types (
  boost_type_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  stat_to_check TEXT NOT NULL, -- 'passing_yards', 'rushing_yards', etc.
  default_threshold INT NOT NULL,
  multiplier DECIMAL(3,2) NOT NULL,
  token_cost INT DEFAULT 1,
  applicable_positions TEXT[] -- ['QB'] or ['RB', 'WR', 'TE']
);

INSERT INTO boost_types (boost_type_id, name, description, stat_to_check, default_threshold, multiplier, applicable_positions) VALUES
('300_yards', '300 Club', 'Boost if QB throws 300+ yards', 'passing_yards', 300, 1.5, ARRAY['QB']),
('100_rush', 'Century Rush', 'Boost if RB runs 100+ yards', 'rushing_yards', 100, 1.5, ARRAY['RB']),
('3_tds', 'Hat Trick', 'Boost if player scores 3+ TDs', 'total_touchdowns', 3, 2.0, ARRAY['QB','RB','WR','TE']),
('10_receptions', 'Double Digits', 'Boost if WR catches 10+ passes', 'receptions', 10, 1.5, ARRAY['WR','TE']);

CREATE TABLE boost_tokens_applied (
  boost_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  card_id UUID REFERENCES player_cards(card_id) ON DELETE CASCADE,
  game_date DATE NOT NULL,
  boost_type TEXT NOT NULL,
  threshold INT NOT NULL,
  multiplier DECIMAL(3,2) NOT NULL,
  was_successful BOOLEAN, -- NULL until game completes
  points_gained DECIMAL(10,2),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_boost_tokens_user ON boost_tokens_applied(user_id);
CREATE INDEX idx_boost_tokens_game ON boost_tokens_applied(game_date);
CREATE INDEX idx_boost_tokens_card ON boost_tokens_applied(card_id);

-- ============================================
-- DAILY/WEEKLY CHALLENGES
-- ============================================
CREATE TABLE challenges (
  challenge_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('daily', 'weekly')),
  title TEXT NOT NULL,
  description TEXT,
  coin_reward INT NOT NULL,
  token_reward INT DEFAULT 0,
  requirement JSONB NOT NULL, -- {"type": "open_packs", "count": 2}
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_challenges (
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

CREATE INDEX idx_user_challenges_user ON user_challenges(user_id);

-- ============================================
-- GLOBAL LEADERBOARD (Materialized View)
-- ============================================
CREATE MATERIALIZED VIEW global_leaderboard AS
SELECT
  u.user_id,
  u.username,
  u.display_name,
  u.avatar_url,
  u.total_points,
  COUNT(pc.card_id) as total_cards,
  MAX(pc.rarity) as highest_rarity,
  ROW_NUMBER() OVER (ORDER BY u.total_points DESC) as rank
FROM users u
LEFT JOIN player_cards pc ON u.user_id = pc.user_id AND pc.is_quick_sold = FALSE
WHERE u.total_points > 0
GROUP BY u.user_id
ORDER BY u.total_points DESC;

CREATE UNIQUE INDEX idx_global_leaderboard_user ON global_leaderboard(user_id);
CREATE INDEX idx_global_leaderboard_rank ON global_leaderboard(rank);

-- Refresh leaderboard function
CREATE OR REPLACE FUNCTION refresh_global_leaderboard()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY global_leaderboard;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRANSACTIONS LOG (For Auditing)
-- ============================================
CREATE TABLE transactions (
  transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('pack_purchase', 'quick_sell', 'challenge_reward', 'token_used')),
  coins_change INT,
  tokens_change INT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);
CREATE INDEX idx_transactions_created ON transactions(created_at DESC);
```

**Total Tables:** 9 core tables (vs. 20+ in original plan with leagues/trades)

---

## Week-by-Week Execution Plan

### PHASE 0: SETUP & LEARNING (Weeks 1-2)

#### Week 1: Environment Setup
**Goal:** Get all tools installed and working
**Hours:** 15 hours

**Tasks:**
- [ ] Install Node.js 18+ (https://nodejs.org)
- [ ] Install Git (https://git-scm.com)
- [ ] Download Cursor IDE (https://cursor.sh)
- [ ] Create GitHub account + create repo `yap-fantasy-football`
- [ ] Create Supabase account
- [ ] Create Railway account (https://railway.com - connect to GitHub)
- [ ] Create Vite + React project:

```bash
# Create frontend (Vite + React + TypeScript)
npm create vite@latest yap-fantasy-frontend -- --template react-ts
cd yap-fantasy-frontend
npm install

# Install dependencies
npm install react-router-dom @supabase/supabase-js
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui
npx shadcn-ui@latest init
```

- [ ] Create backend (Express + TypeScript):

```bash
# In root directory, create backend folder
mkdir yap-fantasy-backend
cd yap-fantasy-backend
npm init -y

# Install backend dependencies
npm install express cors dotenv @supabase/supabase-js
npm install -D typescript @types/express @types/cors @types/node ts-node nodemon

# Initialize TypeScript
npx tsc --init
```

- [ ] Push both frontend + backend to GitHub (monorepo structure)
- [ ] Connect Railway to GitHub repo
- [ ] Deploy to Railway (get yourapp.railway.app URL)

**Exit Criteria:**
- ✅ Can visit yourapp.railway.app and see Vite React welcome page
- ✅ Code is in GitHub
- ✅ Cursor IDE opens project without errors
- ✅ Frontend and backend run locally (npm run dev)

---

#### Week 2: Learn Stack + Test BallDontLie API
**Goal:** Understand the tools and test NFL API
**Hours:** 15 hours

**Tasks:**
- [ ] Complete React Router tutorial: https://reactrouter.com/en/main/start/tutorial
- [ ] Complete Vite tutorial: https://vitejs.dev/guide/
- [ ] Complete Supabase tutorial: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
- [ ] Test BallDontLie API integration

**AI Prompt to Cursor:**
```
Create an Express API route in backend/src/routes/test-nfl.ts that:
1. Fetches 10 random NFL players from BallDontLie API
2. API docs: https://docs.balldontlie.io
3. My GOAT subscription API key is in .env as BALLDONTLIE_API_KEY
4. Return JSON with player names, positions, teams
5. Handle errors gracefully
6. Add CORS to allow frontend to call this

Then create a test page in frontend that calls this API and displays results.
```

Test by visiting: `localhost:3000/test` (frontend calls backend at `localhost:4000/api/test-nfl`)

**Exit Criteria:**
- ✅ BallDontLie API returns NFL player data successfully (unlimited calls with GOAT subscription!)
- ✅ Understand React Router navigation
- ✅ Understand Vite dev server and HMR
- ✅ Frontend can call backend API
- ✅ Understand Supabase setup (database, auth)

---

### PHASE 1: FOUNDATION (Weeks 3-8)

#### Week 3: Supabase Database Schema
**Goal:** Create all database tables
**Hours:** 15 hours

**Tasks:**
- [ ] Go to Supabase dashboard → SQL Editor
- [ ] Run the complete schema SQL (from above)
- [ ] Verify 9 tables created
- [ ] Add Row Level Security (RLS) policies:

```sql
-- Users can only see their own data
ALTER TABLE player_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own cards" ON player_cards
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cards" ON player_cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE lineups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own lineups" ON lineups
  FOR ALL USING (auth.uid() = user_id);

-- Everyone can read reference tables
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read players" ON players
  FOR SELECT USING (true);

ALTER TABLE pack_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read pack types" ON pack_types
  FOR SELECT USING (true);
```

**Exit Criteria:**
- ✅ 9 tables created in Supabase
- ✅ RLS enabled and policies set
- ✅ Can query tables from SQL editor

---

#### Week 4: Authentication
**Goal:** Users can signup/login
**Hours:** 15 hours

**AI Prompt to Cursor:**
```
Build Supabase authentication in React + Vite:

1. Create auth context in frontend/src/contexts/AuthContext.tsx:
   - Initialize Supabase client
   - Provide auth state (user, loading)
   - Provide auth functions (signIn, signUp, signOut)

2. Create Login page at /login with React Router:
   - Email + password form
   - Google OAuth button
   - Link to /signup route
   - Use shadcn/ui components

3. Create Signup page at /signup:
   - Email, username, password fields
   - Google OAuth button
   - Call backend POST /api/users to create user record with 1000 coins, 5 tokens

4. Create Protected Route component:
   - Checks if user is authenticated
   - Redirects to /login if not
   - Wraps dashboard and other protected pages

5. Dashboard at /dashboard (protected):
   - Show: Welcome {username}! Coins: {coins} | Tokens: {tokens}
   - Logout button calls supabase.auth.signOut()

Use React Router v6 for routing
Use shadcn/ui for form components
Use Supabase client-side auth
```

**Backend API needed:**
```
POST /api/users - Create user record after Supabase auth signup
GET /api/users/me - Get current user data (coins, tokens)
```

**Exit Criteria:**
- ✅ Can create account with email
- ✅ Can login with email
- ✅ Google OAuth works
- ✅ Dashboard shows user data from database
- ✅ Protected routes redirect to login
- ✅ Can logout and session clears

---

#### Week 5-6: UI Shell & Navigation
**Goal:** Build app layout with sidebar
**Hours:** 30 hours (2 weeks)

**AI Prompt to v0.dev:**
```
Create a fantasy football app layout with:

1. Sidebar navigation (mobile: bottom nav bar):
   - Dashboard (home icon)
   - Packs (package icon)
   - Collection (cards icon)
   - Lineup (clipboard icon)
   - Leaderboard (trophy icon)

2. Header:
   - App logo "YAP Fantasy"
   - Coins display with coin icon
   - Tokens display with star icon
   - User avatar with dropdown (settings, logout)

3. Main content area with padding
4. Dark mode toggle
5. Responsive: sidebar on desktop, bottom nav on mobile
6. Use Tailwind CSS and shadcn/ui
```

Create placeholder pages:
- `/dashboard` - Dashboard with stats cards
- `/packs` - Pack shop (placeholder)
- `/collection` - Card collection (placeholder)
- `/lineup` - Lineup builder (placeholder)
- `/leaderboard` - Global leaderboard (placeholder)

**Exit Criteria:**
- ✅ Can navigate between all 5 pages
- ✅ Layout looks good on mobile and desktop
- ✅ Header shows real user data (coins, tokens, username)

---

#### Week 7-8: Sync NFL Players
**Goal:** Populate players table with NFL data
**Hours:** 30 hours (2 weeks)

Create `scripts/sync-nfl-players.ts`:

**AI Prompt to Cursor:**
```
Create a Node.js script that:

1. Fetches ALL NFL players from BallDontLie API (paginate through all pages)
2. Filters for active players only
3. For each player, upsert into Supabase players table:
   - balldontlie_id (their API ID)
   - first_name, last_name
   - position (QB, RB, WR, TE, K, DEF)
   - team_abbreviation
   - status (active)
   - last_synced_at (now)

4. Use ON CONFLICT (balldontlie_id) DO UPDATE to avoid duplicates
5. Log progress every 50 players
6. BallDontLie API docs: https://docs.balldontlie.io

Environment:
- BALLDONTLIE_API_KEY in .env.local
- SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local

Run with: npx tsx scripts/sync-nfl-players.ts
```

Install: `npm install tsx dotenv`

Then create API endpoint `app/api/cron/sync-players/route.ts` that runs the same logic (for weekly updates).

**Exit Criteria:**
- ✅ players table has 2,000+ NFL players
- ✅ Can call /api/cron/sync-players to update data
- ✅ Players have correct positions and teams

---

### PHASE 2: CARD PACKS (Weeks 9-14)

#### Week 9-10: Pack Opening API
**Goal:** Backend logic to open packs
**Hours:** 30 hours (2 weeks)

Create `backend/src/routes/packs.ts`:

**AI Prompt to Cursor:**
```
Create an Express API route POST /api/packs/open that:

Input: { packType: 'bronze' | 'silver' | 'gold' | 'diamond' }
Headers: Authorization: Bearer <supabase_jwt>

Logic:
1. Verify JWT token from Supabase auth (extract user_id)
2. Query pack_types table for pack cost and card_count
3. Verify user has enough coins (query users table)
4. Deduct coins from users table
5. Fetch N random players from players table (weighted by position):
   - QB: 10% chance
   - RB: 25%
   - WR: 30%
   - TE: 15%
   - K: 10%
   - DEF: 10%

6. For each player, create player_card:
   - rarity: 'base' (all cards start BASE)
   - total_fantasy_points: 0
   - total_boost_points: 0
   - quick_sell_value: 25
   - acquired_from: packType

7. Log pack opening in pack_openings table
8. Return array of pulled cards with player details

Use Supabase transaction (BEGIN/COMMIT) for atomicity
Handle errors: not enough coins (400), invalid pack type (400), auth errors (401)

Use Supabase client from @supabase/supabase-js
Add authentication middleware to verify JWT
```

**Frontend integration:**
```typescript
// frontend/src/services/api.ts
export const openPack = async (packType: string) => {
  const token = await supabase.auth.getSession();
  const res = await fetch(`${API_URL}/api/packs/open`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.session.access_token}`
    },
    body: JSON.stringify({ packType })
  });
  return res.json();
};
```

**Exit Criteria:**
- ✅ Can open all 4 pack types
- ✅ Cards appear in database with correct data
- ✅ Coins deduct atomically (no race conditions)
- ✅ Errors handled gracefully

---

#### Week 11-12: Pack Opening UI
**Goal:** Beautiful pack opening animation
**Hours:** 30 hours (2 weeks)

**AI Prompt to v0.dev:**
```
Create a card pack opening animation:

1. Initial state: Show pack (bronze/silver/gold/diamond) with shine effect
2. Click to open: Pack shakes, then explodes with confetti
3. Cards fly in one-by-one with flip animation (0.5s delay between each)
4. Each card shows:
   - Player photo (placeholder for now)
   - Name and position
   - Team logo (placeholder)
   - Rarity border (gray for BASE)
   - 'NEW' badge if first time pulling this player

5. After all cards revealed, show summary and 'Add to Collection' button

Use Framer Motion for animations
Use Tailwind CSS for styling
```

Then create the full Packs page at `app/packs/page.tsx` that integrates with the API.

**Exit Criteria:**
- ✅ Can open packs from UI
- ✅ Animation plays smoothly
- ✅ Cards display correctly after opening
- ✅ Coins update in real-time in header

---

#### Week 13-14: Card Collection Page
**Goal:** View all owned cards with filters
**Hours:** 30 hours (2 weeks)

Create `app/api/collection/route.ts` (GET endpoint with filters)

**AI Prompt to v0.dev:**
```
Create a card collection page:

1. Top filters:
   - Search by player name
   - Filter by position (All, QB, RB, WR, TE, K, DEF)
   - Filter by rarity (All, Base, Bronze, Silver, Gold, Diamond)
   - Sort by: Newest, Total Points (high to low), Name (A-Z)

2. Card grid (3-4 columns desktop, 2 mobile):
   Each card shows:
   - Player name and position
   - Team
   - Rarity border color (Base: gray, Bronze: #CD7F32, Silver: #C0C0C0, Gold: #FFD700, Diamond: rainbow)
   - Progress bar to next rarity tier
   - Total points: XXX / YYY (YYY = next threshold)
   - Quick-sell button (shows coin value)

3. Empty state: 'No cards yet! Open a pack to start your collection.'

Use shadcn/ui components
```

Also create `app/api/cards/[cardId]/quick-sell/route.ts` (POST endpoint)

**Exit Criteria:**
- ✅ Collection page shows all owned cards
- ✅ Filters work (position, rarity, search)
- ✅ Quick-sell works and updates coins
- ✅ Progress bars show correct advancement toward next tier
- ✅ Empty state shows when no cards

---

### PHASE 3: LINEUP & SCORING (Weeks 15-22)

#### Week 15-17: Lineup Builder
**Goal:** Drag-and-drop lineup management
**Hours:** 45 hours (3 weeks)

Install @dnd-kit: `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`

**AI Prompt to Cursor:**
```
Create lineup builder with drag-and-drop using @dnd-kit:

1. Left side: Position slots (vertical on mobile)
   - QB (1), RB (2), WR (3), TE (1), FLEX (1), K (1), DEF (1)

2. Right side: Bench area (all cards not in lineup)

3. Validation:
   - QB only in QB slot
   - RB in RB1/RB2/FLEX
   - WR in WR1/WR2/WR3/FLEX
   - TE in TE/FLEX
   - K only in K
   - DEF only in DEF

4. Save lineup API: POST /api/lineup
   - Verify all positions filled
   - Check if games started (lineup locked)
   - Upsert into lineups table

Use @dnd-kit docs: https://docs.dndkit.com
```

**Exit Criteria:**
- ✅ Can drag cards into lineup slots
- ✅ Position validation works
- ✅ Can save lineup to database
- ✅ Can load previously saved lineup
- ✅ Cannot save after games start

---

#### Week 18-19: Scoring Engine
**Goal:** Calculate fantasy points from NFL stats
**Hours:** 30 hours (2 weeks)

Create `lib/scoring.ts`:

**AI Prompt to Cursor:**
```
Create fantasy points calculator for PPR scoring:

Function: calculateFantasyPoints(stats: NFLStats): number

PPR Rules:
- Passing: 0.04 pts/yard, 4 pts/TD, -2 pts/INT
- Rushing: 0.1 pts/yard, 6 pts/TD
- Receiving: 1 pt/reception (PPR), 0.1 pts/yard, 6 pts/TD
- Fumbles: -2 pts
- Kicker: 3-5 pts for FG (by distance), 1 pt for XP
- Defense: Points by points-allowed tiers, 1 pt/sack, 2 pts/INT, 6 pts/TD

Return total rounded to 2 decimals
Handle null values (treat as 0)
```

Create `app/api/scoring/fetch-stats/route.ts` that fetches stats from BallDontLie for a specific week.

**Exit Criteria:**
- ✅ Can fetch NFL stats for any completed week
- ✅ calculateFantasyPoints() accurately scores all positions
- ✅ Tested against ESPN scores (spot check 10 players, <2% difference)

---

#### Week 20-21: Card Upgrade System
**Goal:** Auto-upgrade cards when they cross point thresholds
**Hours:** 30 hours (2 weeks)

Create `lib/card-upgrades.ts`:

**AI Prompt to Cursor:**
```
Create card rarity upgrade system:

Thresholds (based on combined_points):
- 0-49: Base (quick_sell: 25)
- 50-149: Bronze (quick_sell: 100)
- 150-299: Silver (quick_sell: 300)
- 300-499: Gold (quick_sell: 750)
- 500+: Diamond (quick_sell: 2000)

Function: checkAndUpgradeCard(card: PlayerCard)
- Calculate combined_points
- Determine should_be_rarity
- If different from current:
  - Update player_cards (rarity, quick_sell_value)
  - Insert into card_upgrades log
  - Return { upgraded: true, oldRarity, newRarity }
```

Create `app/api/cron/calculate-scoring/route.ts`:

**AI Prompt to Cursor:**
```
Create weekly scoring cron job (runs Tuesday 5am ET):

1. Determine which week just completed
2. Fetch NFL stats for that week
3. For each user:
   a. Get lineup for that week
   b. For each player:
      - Calculate fantasy points
      - Add to card.total_fantasy_points
      - Check boost token:
        - If applied and threshold met: add bonus to total_boost_points
   c. Check for card upgrades (call batchUpgradeCards)
   d. Update user.total_points
4. Refresh global leaderboard materialized view

Protected by: Authorization: Bearer CRON_SECRET
```

Schedule via Supabase Edge Functions or Vercel Cron.

**Exit Criteria:**
- ✅ Cron job successfully scores a test week
- ✅ Cards upgrade correctly (Base→Bronze at 50pts)
- ✅ User total_points updated
- ✅ Can manually trigger for testing

---

#### Week 22: Scoring UI & Testing
**Goal:** Show scores and verify accuracy
**Hours:** 15 hours

Create `app/scores/page.tsx` showing weekly scores with breakdown.

**Testing:**
- [ ] Manually trigger cron for a completed NFL week
- [ ] Verify scores match ESPN (spot check 20 players)
- [ ] Verify cards upgrade correctly
- [ ] Test boost token success/failure

**Exit Criteria:**
- ✅ Scoring is accurate (±2% vs ESPN)
- ✅ Card upgrades work automatically
- ✅ Boost tokens calculate correctly

---

### PHASE 4: BOOST TOKENS & CHALLENGES (Weeks 23-28)

#### Week 23-24: Daily Challenges
**Goal:** Users earn coins from challenges
**Hours:** 30 hours (2 weeks)

Create challenge system:
- Daily challenges (reset midnight): "Open 2 packs" (250 coins), "Set lineup" (200 coins)
- Weekly challenges (reset Monday): "Open 10 packs" (800 coins + 1 token)

**AI Prompt to Cursor:**
```
Create daily challenge system:

1. GET /api/challenges - Returns active challenges with user's progress
2. POST /api/challenges/[id]/claim - Claims reward if completed

When user completes action (e.g., opens pack), increment progress
Cron job generates new challenges daily/weekly
```

Create challenges UI widget for dashboard with progress bars and claim buttons.

**Exit Criteria:**
- ✅ Daily challenges reset at midnight
- ✅ Progress tracks correctly
- ✅ Can claim rewards
- ✅ Coins/tokens added to balance

---

#### Week 25-26: Boost Tokens
**Goal:** Apply tokens for bonus points
**Hours:** 30 hours (2 weeks)

Create `app/api/boost/apply/route.ts`:

**AI Prompt to Cursor:**
```
POST /api/boost/apply
Input: { card_id, game_date, boost_type }

Boost Types:
- '300_yards': QB 300+ yards → 1.5x points
- '100_rush': RB 100+ yards → 1.5x points
- '3_tds': 3+ TDs → 2.0x points
- '10_receptions': 10+ receptions → 1.5x points

Logic:
1. Verify user owns card and has tokens
2. Verify game hasn't started
3. Check position matches boost type
4. Deduct 1 token
5. Insert into boost_tokens_applied

When scoring runs:
- Check if threshold met
- Calculate bonus_points = fantasy_points × (multiplier - 1)
- Add to card.total_boost_points
```

Create boost application modal UI.

**Exit Criteria:**
- ✅ Can apply boost token to player
- ✅ Token deducted
- ✅ After game: bonus points calculated correctly
- ✅ Boost success/failure displayed

---

#### Week 27-28: Economy Balancing
**Goal:** Test and adjust coin/token economy
**Hours:** 30 hours (2 weeks)

Create admin dashboard at `app/admin/economy/page.tsx` with metrics:
- Average coins per user
- Coin sources (quick-sells, challenges)
- Coin sinks (pack purchases)
- Token usage rate

Adjust values based on data to balance economy.

**Target:** Users earn 400-600 coins/day, open 1-2 packs/day

---

### PHASE 5: LEADERBOARD & POLISH (Weeks 29-35)

#### Week 29-30: Global Leaderboard
**Goal:** Real-time rankings
**Hours:** 30 hours (2 weeks)

Create `app/api/leaderboard/route.ts`:

**AI Prompt to Cursor:**
```
GET /api/leaderboard?page=1&limit=100

Use materialized view global_leaderboard
Return top 100 users + authenticated user's rank
Optimize with indexes
```

Create leaderboard UI:
- Top 3 podium display
- Leaderboard table (ranks 4-100)
- User's stats card
- Auto-refresh every 60 seconds

**Exit Criteria:**
- ✅ Leaderboard shows top 100 accurately
- ✅ User's rank displays correctly
- ✅ Updates after weekly scoring

---

#### Week 31-32: Push Notifications
**Goal:** Engage users with timely notifications
**Hours:** 30 hours (2 weeks)

Set up Firebase Cloud Messaging:
1. Create Firebase project
2. Install Firebase SDK: `npm install firebase`
3. Request notification permission
4. Store FCM token in users table

Create notification types:
- Lineup reminder (Wednesday 8pm)
- Scores ready (Tuesday 7am)
- Card upgrade (after scoring)

**Exit Criteria:**
- ✅ Users can enable push notifications
- ✅ Notifications work on desktop/mobile browsers
- ✅ Lineup reminder sends correctly
- ✅ Users can disable in settings

---

#### Week 33-34: Bug Fixes & Polish
**Goal:** Get ready for beta
**Hours:** 30 hours (2 weeks)

**Testing checklist:**
- [ ] Signup/login flows
- [ ] Pack opening (all types)
- [ ] Collection filters
- [ ] Lineup drag-and-drop
- [ ] Scoring accuracy
- [ ] Boost tokens
- [ ] Challenges
- [ ] Leaderboard
- [ ] Mobile experience

Fix all P0 (app crashes) and P1 (core features broken) bugs.

Add UI polish:
- Loading skeletons
- Error states
- Success toasts
- Animations
- Dark mode

**Exit Criteria:**
- ✅ Zero P0 bugs
- ✅ <5 P1 bugs
- ✅ UI feels polished
- ✅ Mobile smooth

---

#### Week 35: Beta Test & Soft Launch
**Goal:** Test with 10 real users
**Hours:** 15 hours

**Beta recruitment:**
Send message to 10 friends:
```
"Hey! I built a fantasy football app with card collection mechanics.
All cards start BASE and upgrade through performance.
Need beta testers for 2-3 weeks. You'll get free premium forever + beta badge.
Interested?"
```

**Beta test plan:**
- [ ] Give each tester 10,000 coins (bonus)
- [ ] Set up feedback form (Google Forms)
- [ ] Create Discord/Slack for real-time feedback
- [ ] Monitor Sentry for errors
- [ ] Fix critical bugs within 24 hours

**Success criteria:**
- ✅ 8/10 testers active for 2+ weeks
- ✅ Zero P0 bugs
- ✅ <5 P1 bugs
- ✅ NPS ≥40
- ✅ Positive feedback

**If successful → Launch to public (add 100 users)**

---

## AI Agent Workflow

### Daily Development (15 hrs/week = 2 hrs/day × 7 days)

**1. Plan (15 min):** Review current week's milestone, pick one task

**2. Build with Cursor (1.5 hrs):**
- Open Cursor IDE
- Prompt AI with detailed requirements
- Review generated code
- Test locally
- Iterate if bugs

**3. Commit (15 min):** Git commit, push to GitHub

### Effective AI Prompting

**❌ Bad Prompt:**
```
"Make a card pack thing"
```

**✅ Good Prompt:**
```
"Create a Next.js API route at app/api/packs/open/route.ts that:
1. Accepts POST with { packType: 'bronze' }
2. Deducts 500 coins from authenticated user
3. Fetches 3 random NFL players from players table
4. Creates 3 player_cards with rarity='base'
5. Returns array of pulled cards

My database schema: [paste relevant tables]
Use Supabase client from @supabase/auth-helpers-nextjs
Handle errors: not enough coins (400), invalid pack type (400)
"
```

**Key elements:**
- Specific file path
- Clear inputs/outputs
- Technology stack mentioned
- Error handling requirements
- Context provided (schema, existing code)

### When to Use Each AI Tool

**Cursor (Daily, 80% of time):**
- Writing API routes
- Implementing business logic
- Debugging errors
- Database queries
- TypeScript help

**v0.dev (Weekly, 15% of time):**
- Creating new UI components
- Layout designs
- Animation ideas
- Quick prototypes

**Claude Code / Me (Weekly, 5% of time):**
- Architecture decisions
- Schema review
- Debugging complex issues
- Strategic advice

---

## Common Pitfalls & Solutions

### 1. Scope Creep
**Risk:** "Let me add private leagues real quick..."
**Solution:** NO. Write ideas in backlog for Season 2.

### 2. Perfection Paralysis
**Risk:** Spending 3 weeks polishing one animation
**Solution:** Set time boxes. Ship "good enough" and iterate.

### 3. No Testing
**Risk:** Shipping broken scoring
**Solution:** Test every feature manually. Spot check vs ESPN.

### 4. Ignoring Mobile
**Risk:** Desktop-only when 80% of users are mobile
**Solution:** Test on phone after every feature.

### 5. Not Asking for Help
**Risk:** Stuck for 3 days on a bug
**Solution:** If stuck >2 hours, ask for help with full context.

---

## Support & Resources

### When You Get Stuck

**Ask Claude Code when:**
- Architecture decision needed
- Schema review
- Debugging complex issue (>2 hours stuck)
- Code review before deploying
- "Is this the right approach?"

**How to ask:**
```
I'm stuck on [feature].

Goal: [what I'm trying to build]
What I tried: [code snippets, approaches]
Error: [full error message]
Question: [specific question]
```

### Learning Resources (Free)
- Next.js docs: https://nextjs.org/docs
- Supabase docs: https://supabase.com/docs
- shadcn/ui: https://ui.shadcn.com
- BallDontLie API: https://docs.balldontlie.io
- YouTube: "Next.js 14 + Supabase tutorial"

---

## Pre-Launch Checklist

- [ ] Created all required accounts (GitHub, Supabase, Vercel)
- [ ] Tested BallDontLie API key (fetched 10 players)
- [ ] Installed Cursor IDE
- [ ] Have 10-20 hours per week available
- [ ] Understand this will take 35 weeks (~8 months)
- [ ] Committed to YAP Experience ONLY (no private leagues for MVP)
- [ ] Have 10 friends willing to beta test
- [ ] Ready to ask for help when stuck
- [ ] Bookmarked this plan for reference

---

## Week 1 Action Items (START HERE)

**Day 1:** Install tools (Node.js, Git, Cursor)
**Day 2:** Create Vite + React frontend, Express backend, push to GitHub
**Day 3:** Deploy to Railway (get yourapp.railway.app working)
**Day 4:** Complete React Router + Vite tutorials
**Day 5:** Create Supabase project, test connection
**Day 6:** Test BallDontLie API with GOAT subscription (unlimited calls!)
**Day 7:** Review Week 2 tasks, prepare

**Quick Start Commands:**
```bash
# Frontend
npm create vite@latest yap-fantasy-frontend -- --template react-ts
cd yap-fantasy-frontend
npm install react-router-dom @supabase/supabase-js
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Backend
mkdir yap-fantasy-backend && cd yap-fantasy-backend
npm init -y
npm install express cors dotenv @supabase/supabase-js axios
npm install -D typescript @types/express @types/cors @types/node ts-node nodemon
npx tsc --init
```

---

## Success Metrics (First Season)

### Growth (by end of Season 1)
- 1,000 signups (10 per day avg)
- 500 active users (DAU ≥40%)
- 10,000 packs opened

### Engagement
- Day 7 retention: ≥40%
- Day 30 retention: ≥25%
- Session length: ≥10 min avg
- Sessions per week: ≥3 per active user

### Product Health
- Scoring accuracy: ≥98% vs ESPN
- Uptime: ≥99.9%
- Zero payment failures
- Card upgrade rate: ≥20 upgrades/week

### User Satisfaction
- NPS: ≥40
- Feature requests for missing features: <5/week
- "This is fun and unique!": Most common feedback

---

## What's Next (Season 2 - 2026)

After proving YAP Experience works, add:

**Traditional Fantasy Experience:**
- Private leagues with invite codes
- Snake/auction draft
- Waiver wire (FAAB or rolling priority)
- Trading between league members
- Playoff brackets
- Commissioner tools
- League chat

**Timeline:** +25-30 weeks additional development

---

## Let's Build This! 🏈

**You're ready to start Week 1.**

Complete the Week 1 action items, then check back with progress:
- ✅ What worked
- ❌ What blocked you
- ❓ Questions

We'll tackle this together, week by week.

Good luck! 🚀
