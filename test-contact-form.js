/**
 * Contact Form Backend - Simple Test Script
 * 
 * Usage:
 * node test-contact-form.js
 * 
 * This script tests the contact form API without needing the frontend
 */

const http = require('http');

const testData = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Subject from Script',
  message: 'This is a test message from the automated test script to verify the contact form is working correctly.'
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/contact/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('\n╔════════════════════════════════════════════╗');
console.log('║   CONTACT FORM API TEST SCRIPT             ║');
console.log('╚════════════════════════════════════════════╝\n');

console.log('📤 Sending test contact form data:');
console.log('   Name:', testData.name);
console.log('   Email:', testData.email);
console.log('   Subject:', testData.subject);
console.log('   Message:', testData.message.substring(0, 50) + '...\n');

const req = http.request(options, (res) => {
  let data = '';

  console.log(`📊 Response Status: ${res.statusCode}\n`);

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      console.log('✅ Response received:');
      console.log(JSON.stringify(parsedData, null, 2));

      if (res.statusCode === 200 && parsedData.success) {
        console.log('\n✅ TEST PASSED! Contact form API is working correctly.\n');
      } else {
        console.log('\n❌ TEST FAILED! Check the response above.\n');
      }
    } catch (error) {
      console.log('⚠️ Could not parse response as JSON:');
      console.log(data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Connection Error:', error.message);
  console.log('\n⚠️ Make sure your backend server is running:');
  console.log('   npm run dev\n');
});

req.write(postData);
req.end();
