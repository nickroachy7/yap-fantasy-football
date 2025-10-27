import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const ballDontLieApiKey = process.env.BALLDONTLIE_API_KEY!;

async function checkAPIDetails() {
  console.log('🔍 Investigating BallDontLie API...\n');
  
  // Wait a bit to avoid rate limit
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    // Check what sport this API actually provides
    console.log('Making a simple request to check available data...\n');
    
    const response = await axios.get('https://api.balldontlie.io/v1/players', {
      headers: {
        'Authorization': ballDontLieApiKey
      },
      params: {
        per_page: 1
      }
    });

    console.log('Response Status:', response.status);
    console.log('\nFirst Player in Database:');
    console.log(JSON.stringify(response.data.data[0], null, 2));
    
    console.log('\n⚠️  IMPORTANT FINDING:');
    console.log('This API appears to be for NBA (Basketball), not NFL (Football)!');
    console.log('\n📋 For NFL data, you may need:');
    console.log('   1. Check if BallDontLie has an NFL endpoint (different base URL?)');
    console.log('   2. Or use a different API service like:');
    console.log('      - ESPN API (free but limited)');
    console.log('      - SportsDataIO (paid, comprehensive)');
    console.log('      - The Odds API (free tier available)');
    console.log('      - RapidAPI NFL endpoints');
    
  } catch (err: any) {
    console.error('Error:', err.response?.data || err.message);
    
    if (err.response?.status === 429) {
      console.log('\n💡 Rate limit hit. Waiting helps, but this confirms rate limiting exists.');
      console.log('   GOAT subscription should remove rate limits for the correct sport.');
    }
  }
}

checkAPIDetails();
