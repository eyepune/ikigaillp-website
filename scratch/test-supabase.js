import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase credentials missing in .env.local');
  process.exit(1);
}

console.log('🔗 Testing connection to:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  try {
    const { data, error } = await supabase.from('programs').select('count');
    if (error) {
      console.error('❌ Connection Failed:', error.message);
      if (error.message.includes('Unauthorized')) {
        console.log('\n💡 Tip: Your VITE_SUPABASE_ANON_KEY might be invalid.');
      }
    } else {
      console.log('✅ Connection Successful!');
      console.log('📊 Programs count:', data);
    }
  } catch (err) {
    console.error('💥 Unexpected error:', err.message);
  }
}

test();
