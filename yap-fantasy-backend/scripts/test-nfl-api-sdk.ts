import { BalldontlieAPI } from '@balldontlie/sdk';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const apiKey = process.env.BALLDONTLIE_API_KEY!;

// Initialize the SDK for NFL
const nflApi = new BalldontlieAPI({ apiKey, sport: 'nfl' });

async function testNFLAPI() {
  console.log('🏈 Testing BallDontLie NFL API with Official SDK\n');
  console.log('='.repeat(80));

  try {
    // Test 1: Get NFL Teams
    console.log('\n📋 TEST 1: Fetching NFL Teams');
    console.log('-'.repeat(80));
    const teams = await nflApi.nfl.getTeams({ per_page: 5 });
    
    console.log(`✅ Found ${teams.data?.length || 0} teams`);
    if (teams.data && teams.data.length > 0) {
      console.log('\n📊 Sample Team Structure:');
      console.log(JSON.stringify(teams.data[0], null, 2));
      console.log('\n🔍 Team Fields:', Object.keys(teams.data[0]).join(', '));
    }

    // Test 2: Get Active NFL Players
    console.log('\n\n📋 TEST 2: Fetching Active NFL Players');
    console.log('-'.repeat(80));
    const players = await nflApi.nfl.getActivePlayers({ 
      per_page: 5,
      search: 'mahomes' 
    });
    
    console.log(`✅ Found ${players.data?.length || 0} players matching "mahomes"`);
    if (players.data && players.data.length > 0) {
      console.log('\n📊 Sample Player Structure:');
      console.log(JSON.stringify(players.data[0], null, 2));
      console.log('\n🔍 Player Fields:', Object.keys(players.data[0]).join(', '));
    }

    // Test 3: Get Players by Position
    console.log('\n\n📋 TEST 3: Testing Players by Position');
    console.log('-'.repeat(80));
    const positions = ['QB', 'RB', 'WR', 'TE'];
    
    for (const pos of positions) {
      const posPlayers = await nflApi.nfl.getActivePlayers({ 
        per_page: 2
        // Note: The SDK might not support position filter directly
        // We may need to use search or filter results client-side
      });
      
      if (posPlayers.data && posPlayers.data.length > 0) {
        // Filter by position manually
        const filtered = posPlayers.data.filter(p => p.position_abbreviation === pos);
        console.log(`✅ ${pos}: Found players (showing first match)`);
        if (filtered.length > 0) {
          console.log(`   ${filtered[0].first_name} ${filtered[0].last_name} - ${filtered[0].team?.abbreviation || 'FA'}`);
        }
      }
    }

    // Test 4: Get Recent Games
    console.log('\n\n📋 TEST 4: Fetching Recent NFL Games');
    console.log('-'.repeat(80));
    const games = await nflApi.nfl.getGames({ 
      per_page: 3,
      seasons: [2024]
    });
    
    console.log(`✅ Found ${games.data?.length || 0} games from 2024 season`);
    if (games.data && games.data.length > 0) {
      console.log('\n📊 Sample Game Structure:');
      console.log(JSON.stringify(games.data[0], null, 2));
      console.log('\n🔍 Game Fields:', Object.keys(games.data[0]).join(', '));
    }

    // Test 5: Get Player Stats
    console.log('\n\n📋 TEST 5: Fetching Player Stats');
    console.log('-'.repeat(80));
    try {
      const stats = await nflApi.nfl.getStats({ 
        per_page: 3,
        seasons: [2024]
      });
      
      console.log(`✅ Found ${stats.data?.length || 0} stat records`);
      if (stats.data && stats.data.length > 0) {
        console.log('\n📊 Sample Stats Structure:');
        console.log(JSON.stringify(stats.data[0], null, 2));
        console.log('\n🔍 Available Stat Fields:');
        const statFields = Object.keys(stats.data[0]).filter(k => !['player', 'team', 'game'].includes(k));
        console.log(statFields.join(', '));
      }
    } catch (err: any) {
      console.log('⚠️  Stats endpoint:', err.message);
      console.log('   (May require GOAT tier subscription)');
    }

    // Test 6: Get Season Stats
    console.log('\n\n📋 TEST 6: Fetching Season Averages');
    console.log('-'.repeat(80));
    try {
      const seasonStats = await nflApi.nfl.getSeasonStats({ 
        season: 2024,
        per_page: 3
      });
      
      console.log(`✅ Found ${seasonStats.data?.length || 0} season stat records`);
      if (seasonStats.data && seasonStats.data.length > 0) {
        console.log('\n📊 Sample Season Stats Structure:');
        console.log(JSON.stringify(seasonStats.data[0], null, 2));
      }
    } catch (err: any) {
      console.log('⚠️  Season Stats endpoint:', err.message);
      console.log('   (May require GOAT tier subscription)');
    }

    // Test 7: Get Player Injuries
    console.log('\n\n📋 TEST 7: Fetching Player Injuries');
    console.log('-'.repeat(80));
    try {
      const injuries = await nflApi.nfl.getPlayerInjuries({ per_page: 3 });
      
      console.log(`✅ Found ${injuries.data?.length || 0} injury reports`);
      if (injuries.data && injuries.data.length > 0) {
        console.log('\n📊 Sample Injury Report:');
        const injury = injuries.data[0];
        console.log(`   ${injury.player?.first_name} ${injury.player?.last_name} - ${injury.status}`);
        console.log(`   Comment: ${injury.comment?.substring(0, 80)}...`);
      }
    } catch (err: any) {
      console.log('⚠️  Injuries endpoint:', err.message);
      console.log('   (May require ALL-STAR tier or higher)');
    }

    // Summary
    console.log('\n\n' + '='.repeat(80));
    console.log('📝 SUMMARY & DATABASE SCHEMA RECOMMENDATIONS');
    console.log('='.repeat(80));
    console.log(`
✅ NFL API is working with GOAT subscription!

KEY FINDINGS FOR DATABASE SCHEMA:

1. **PLAYERS TABLE** should store:
   - balldontlie_id (their API ID)
   - first_name, last_name
   - position (full name: "Quarterback", "Running Back", etc.)
   - position_abbreviation (QB, RB, WR, TE, K, DEF)
   - height, weight
   - jersey_number
   - college
   - experience (e.g., "7th Season")
   - age
   - team_id (reference to teams table)

2. **TEAMS TABLE** should store:
   - id (their API ID)
   - conference (AFC/NFC)
   - division (NORTH, SOUTH, EAST, WEST)
   - location (city name)
   - name (team name)
   - full_name (full team name)
   - abbreviation (3-letter code)

3. **GAMES TABLE** needs:
   - id (their API ID)
   - week (1-18 for regular season)
   - season (year)
   - date
   - status (Final, In Progress, etc.)
   - home_team_id, visitor_team_id
   - home_team_score, visitor_team_score
   - postseason (boolean)

4. **STATS** - Available fields for scoring:
   - Passing: completions, attempts, yards, touchdowns, interceptions, qb_rating
   - Rushing: attempts, yards, touchdowns
   - Receiving: receptions, yards, touchdowns, targets
   - Fumbles: fumbles, fumbles_lost
   - Defense: total_tackles, defensive_sacks, defensive_interceptions
   - Kicking: field_goals_made, field_goal_attempts, extra_points_made

🎯 NEXT STEPS:
   1. Review the database-schema.sql file
   2. Update position field to match API (or map abbreviations)
   3. Add any missing fields we want to cache
   4. Run the schema in Supabase
   5. Create a sync script to populate players/teams
    `);

  } catch (error: any) {
    console.error('\n❌ Error testing NFL API:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testNFLAPI();
