
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kzlcobvvaodllfdzhuvc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6bGNvYnZ2YW9kbGxmZHpodXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3ODM1NjIsImV4cCI6MjA5MjM1OTU2Mn0._IbcwgPOlZN4HVjs2Ve_qC9ntWALCsnS2NvFfwEBBjA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSubmissions() {
  console.log('Testing Contact Submission...');
  const { data: contactData, error: contactError } = await supabase
    .from('contact_submissions')
    .insert([
      { 
        name: 'Test User', 
        email: 'test@example.com', 
        phone: '1234567890', 
        subject: 'Test Subject', 
        message: 'This is a test message from Antigravity audit.',
        type: 'general'
      }
    ]);
  
  if (contactError) {
    console.error('Contact Submission Failed:', contactError);
  } else {
    console.log('Contact Submission Successful!');
  }

  console.log('Testing Azure Enrollment...');
  const { data: azureData, error: azureError } = await supabase
    .from('azure900_enrollments')
    .insert([
      {
        name: 'Test Azure User',
        email: 'azure-test@example.com',
        phone: '9876543210',
        age: 25,
        college: 'Test College',
        department: 'Test Dept',
        language: 'English'
      }
    ]);

  if (azureError) {
    console.error('Azure Enrollment Failed:', azureError);
  } else {
    console.log('Azure Enrollment Successful!');
  }
}

testSubmissions();
