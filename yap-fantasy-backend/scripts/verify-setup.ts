import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const ballDontLieApiKey = process.env.BALLDONTLIE_API_KEY!;

async function verifySetup() {
  console.log('🔍 Verifying YAP Fantasy Football setup...\n');

  // Check environment variables
  console.log('1️⃣ Checking environment variables...');
  if (!supabaseUrl || !supabaseServiceKey || !ballDontLieApiKey) {
    console.error('❌ Missing environment variables');
    process.exit(1);
  }
  console.log('✅ All environment variables present\n');

  // Test Supabase connection
  console.log('2️⃣ Testing Supabase connection...');
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    const { data, error } = await supabase.from('pack_types').select('count');
    if (error) {
      console.log('⚠️  Tables not created yet. Please run the schema in Supabase SQL Editor:');
      console.log('   1. Go to https://supabase.com/dashboard');
      console.log('   2. Open SQL Editor');
      console.log('   3. Paste contents of database-schema.sql');
      console.log('   4. Run the query\n');
    } else {
      console.log('✅ Supabase connected and tables exist\n');
    }
  } catch (err) {
    console.log('⚠️  Could not verify tables:', err);
  }

  // Test BallDontLie API
  console.log('3️⃣ Testing BallDontLie NFL GOAT API...');
  try {
    const response = await axios.get('https://api.balldontlie.io/v1/players', {
      headers: {
        'Authorization': ballDontLieApiKey
      },
      params: {
        per_page: 5,
        search: 'mahomes'
      }
    });

    if (response.data && response.data.data) {
      console.log('✅ BallDontLie API working!');
      console.log(`   Found ${response.data.data.length} players`);
      if (response.data.data.length > 0) {
        const player = response.data.data[0];
        console.log(`   Example: ${player.first_name} ${player.last_name} - ${player.team?.full_name || 'Free Agent'}\n`);
      }
    }
  } catch (err: any) {
    console.error('❌ BallDontLie API error:', err.response?.data || err.message);
  }

  console.log('✨ Setup verification complete!\n');
  console.log('📋 Next steps:');
  console.log('   1. If tables aren\'t created, run database-schema.sql in Supabase');
  console.log('   2. Start the backend: npm run dev (in yap-fantasy-backend/)');
  console.log('   3. Start the frontend: npm run dev (in yap-fantasy-frontend/)');
  console.log('   4. Visit http://localhost:5173\n');
}

verifySetup();
