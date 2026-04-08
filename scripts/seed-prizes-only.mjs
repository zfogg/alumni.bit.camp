import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
const lines = envContent.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim() || line.trim().startsWith('#')) continue;
  const [key, ...valueParts] = line.split('=');
  if (!key) continue;
  let value = valueParts.join('=').trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1);
    value = value.replace(/\\n/g, '\n');
  }
  env[key.trim()] = value;
}

const auth = new google.auth.JWT({
  email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4' });

const PRIZES = [
  ['zach-open-source', "Zach's Prize", 'Zach', 'Best use of open source tools', 'TRUE'],
  ['gurpreet-social-good', "Gurpreet's Prize", 'Gurpreet', 'Most impactful social good hack', 'TRUE'],
  ['best-ai-innovation', 'Best AI Innovation', 'Alumni', 'Creative use of artificial intelligence', 'TRUE'],
  ['peoples-choice', "People's Choice", 'Community', 'The project everyone loved', 'TRUE'],
  ['rookie-of-year', 'Rookie of the Year', 'Alumni', 'Best first-time hacker project', 'TRUE'],
  ['community-spirit', 'Community Spirit', 'Alumni', 'Best contribution to Bitcamp', 'TRUE'],
];

async function main() {
  try {
    console.log('📋 Adding Prizes...');
    for (const prize of PRIZES) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: env.GOOGLE_SHEETS_ID,
        range: 'Prizes!A1',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        auth,
        requestBody: { values: [prize] },
      });
      console.log(`  ✓ ${prize[1]}`);
    }
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
