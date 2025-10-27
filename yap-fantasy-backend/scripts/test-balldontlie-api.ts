import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const ballDontLieApiKey = process.env.BALLDONTLIE_API_KEY!;
const baseURL = 'https://api.balldontlie.io/v1';

async function testBallDontLieAPI() {
  console.log('🏈 Testing BallDontLie NFL GOAT API...\n');
  console.log('='.repeat(80));

  const headers = {
    'Authorization': ballDontLieApiKey
  };

  // Test 1: Get Players
  console.log('\n📋 TEST 1: Fetching NFL Players');
  console.log('-'.repeat(80));
  try {
    const response = await axios.get(`${baseURL}/players`, {
      headers,
      params: {
        per_page: 5,
        search: 'mahomes' // Search for Patrick Mahomes as test
      }
    });

    console.log('✅ Players Endpoint Working');
    console.log(`Total Results: ${response.data.meta?.total_count || 'N/A'}`);
    console.log(`Current Page: ${response.data.meta?.current_page || 'N/A'}`);
    console.log(`Per Page: ${response.data.meta?.per_page || 'N/A'}`);
    console.log('\n📊 Sample Player Data Structure:');
    
    if (response.data.data && response.data.data.length > 0) {
      const player = response.data.data[0];
      console.log(JSON.stringify(player, null, 2));
      
      console.log('\n🔍 Available Player Fields:');
      console.log(Object.keys(player).join(', '));
    }
  } catch (err: any) {
    console.error('❌ Error:', err.response?.data || err.message);
  }

  // Test 2: Get All Positions
  console.log('\n\n📋 TEST 2: Fetching Players by Position');
  console.log('-'.repeat(80));
  const positions = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];
  
  for (const position of positions) {
    try {
      const response = await axios.get(`${baseURL}/players`, {
        headers,
        params: {
          per_page: 2,
          position: position
        }
      });

      const count = response.data.meta?.total_count || 0;
      console.log(`✅ ${position}: ${count} players available`);
      
      if (response.data.data && response.data.data.length > 0) {
        const player = response.data.data[0];
        console.log(`   Example: ${player.first_name} ${player.last_name} - ${player.team?.abbreviation || 'FA'}`);
      }
    } catch (err: any) {
      console.log(`❌ ${position}: Error -`, err.response?.data?.message || err.message);
    }
  }

  // Test 3: Get Teams
  console.log('\n\n📋 TEST 3: Fetching NFL Teams');
  console.log('-'.repeat(80));
  try {
    const response = await axios.get(`${baseURL}/teams`, {
      headers,
      params: {
        per_page: 5
      }
    });

    console.log('✅ Teams Endpoint Working');
    console.log(`Total Teams: ${response.data.meta?.total_count || 'N/A'}`);
    
    if (response.data.data && response.data.data.length > 0) {
      console.log('\n📊 Sample Team Data Structure:');
      const team = response.data.data[0];
      console.log(JSON.stringify(team, null, 2));
      
      console.log('\n🔍 Available Team Fields:');
      console.log(Object.keys(team).join(', '));
    }
  } catch (err: any) {
    console.error('❌ Error:', err.response?.data || err.message);
  }

  // Test 4: Get Stats (if available)
  console.log('\n\n📋 TEST 4: Checking Stats Endpoints');
  console.log('-'.repeat(80));
  try {
    // Try to get current season stats
    const response = await axios.get(`${baseURL}/stats`, {
      headers,
      params: {
        per_page: 3,
        seasons: ['2025']
      }
    });

    console.log('✅ Stats Endpoint Working');
    console.log(`Total Stats Records: ${response.data.meta?.total_count || 'N/A'}`);
    
    if (response.data.data && response.data.data.length > 0) {
      console.log('\n📊 Sample Stat Data Structure:');
      const stat = response.data.data[0];
      console.log(JSON.stringify(stat, null, 2));
      
      console.log('\n🔍 Available Stat Fields:');
      console.log(Object.keys(stat).join(', '));
    }
  } catch (err: any) {
    console.log('⚠️  Stats endpoint info:', err.response?.data?.message || err.message);
    console.log('   (This might require specific parameters or be part of GOAT subscription)');
  }

  // Test 5: Get Games
  console.log('\n\n📋 TEST 5: Fetching NFL Games');
  console.log('-'.repeat(80));
  try {
    const response = await axios.get(`${baseURL}/games`, {
      headers,
      params: {
        per_page: 3,
        seasons: ['2025']
      }
    });

    console.log('✅ Games Endpoint Working');
    console.log(`Total Games: ${response.data.meta?.total_count || 'N/A'}`);
    
    if (response.data.data && response.data.data.length > 0) {
      console.log('\n📊 Sample Game Data Structure:');
      const game = response.data.data[0];
      console.log(JSON.stringify(game, null, 2));
      
      console.log('\n🔍 Available Game Fields:');
      console.log(Object.keys(game).join(', '));
    }
  } catch (err: any) {
    console.error('❌ Error:', err.response?.data || err.message);
  }

  // Test 6: Check Rate Limits (GOAT subscription should have unlimited)
  console.log('\n\n📋 TEST 6: Testing Rate Limits (GOAT Subscription)');
  console.log('-'.repeat(80));
  try {
    console.log('Making 5 rapid requests to test rate limiting...');
    
    for (let i = 1; i <= 5; i++) {
      const start = Date.now();
      const response = await axios.get(`${baseURL}/players`, {
        headers,
        params: { per_page: 1 }
      });
      const duration = Date.now() - start;
      
      console.log(`✅ Request ${i}: ${response.status} - ${duration}ms`);
    }
    
    console.log('✅ GOAT Subscription confirmed - No rate limiting detected!');
  } catch (err: any) {
    console.error('❌ Rate limit hit:', err.response?.data || err.message);
  }

  // Summary
  console.log('\n\n' + '='.repeat(80));
  console.log('📝 SUMMARY & RECOMMENDATIONS FOR DATABASE SCHEMA');
  console.log('='.repeat(80));
  console.log(`
Based on the API responses above, please review:

1. PLAYERS TABLE - Check if our schema captures all needed fields
2. TEAM DATA - Verify we're storing the right team identifiers
3. STATS STRUCTURE - Understand what fields we'll get for scoring
4. GAMES DATA - See if we need additional fields for game tracking

Review the JSON structures above and compare with database-schema.sql
We may need to adjust our schema before running it in Supabase.
  `);
}

testBallDontLieAPI();
