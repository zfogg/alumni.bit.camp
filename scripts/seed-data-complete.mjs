import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
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

const SHEET_ID = env.GOOGLE_SHEETS_ID;
const SERVICE_ACCOUNT_EMAIL = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

console.log('✓ Loaded env vars');

if (!SHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
  console.error('❌ Missing required env vars');
  process.exit(1);
}

const auth = new google.auth.JWT({
  email: SERVICE_ACCOUNT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4' });

const WINNERS_WITH_DESCRIPTIONS = [
  ['zach-open-source', '2024', 'Team Quantum', 'NeuroSync — AI-powered meditation app', 'AI-powered meditation app that uses machine learning to personalize guided sessions and breathing exercises for users', 'Alice Chen, Bob Kumar, Carla Martinez'],
  ['zach-open-source', '2023', 'HackHub', 'DevForge — real-time coding collaboration', 'Collaborative IDE enabling multiple developers to code together in real-time with syntax highlighting and live debugging', 'David Wong, Emma Rodriguez, Fran Johnson'],
  ['zach-open-source', '2022', 'Byte Builders', 'EcoTrack — carbon footprint visualizer', 'Interactive visualization tool that tracks and displays personal carbon footprint across transportation, food, and energy usage', 'Grace Lee, Henry Park, Iris Chen'],
  
  ['gurpreet-social-good', '2024', 'Team Terra', 'SafeRoute — accessible transit mapping', 'Transit app prioritizing accessibility with wheelchair routes, elevator locations, and real-time accessibility updates for public transportation', 'Jack Smith, Keisha Williams, Leo Patel'],
  ['gurpreet-social-good', '2023', 'CodeForGood', 'FoodBridge — surplus food redistribution', 'Platform connecting restaurants and grocery stores with excess food to local food banks and charitable organizations', 'Maya Gupta, Nathan Brooks, Olivia Anderson'],
  ['gurpreet-social-good', '2022', 'Impact X', 'MedAlert — medication reminder for elderly', 'Accessible medication reminder system for elderly users with voice notifications, family alerts, and health tracking features', 'Peter Zhang, Quinn Davis, Rachel Murphy'],
  
  ['best-ai-innovation', '2024', 'Neural Nexus', 'CodeAssist — AI code review tool', 'AI-powered code review tool using GPT-4 to identify bugs, suggest improvements, and enforce coding standards automatically', 'Samuel Thompson, Tanya Kovac, Uday Patel'],
  ['best-ai-innovation', '2023', 'ML Masters', 'PredictFlow — predictive analytics platform', 'Low-code platform for building predictive ML models with drag-and-drop interface and automated feature engineering', 'Vanessa Garcia, William Chen, Xander Ross'],
  ['best-ai-innovation', '2022', 'AI Innovators', 'VisionAI — computer vision classifier', 'Computer vision system for real-time image classification with custom model training and deployment capabilities', 'Yasmine Hassan, Zachary Moore, Amy Johnson'],
  
  ['peoples-choice', '2024', 'Fun Hackers', 'GameFlow — multiplayer game in 36h', 'Action-packed multiplayer game built from scratch in 36 hours with networking, physics, and competitive gameplay mechanics', 'Brian Lee, Chloe White', 'Brandon Martinez'],
  ['peoples-choice', '2023', 'Creative Minds', 'ArtSync — collaborative digital canvas', 'Real-time collaborative digital art platform with infinite canvas, layer support, and live participant cursors for group creativity', 'Derek Lopez, Elena Rossi, Fiona Kelly'],
  ['peoples-choice', '2022', 'Joy Makers', 'SoundWave — interactive music creator', 'Interactive music production platform allowing users to create, mix, and share original songs with AI accompaniment', 'George Wang, Hannah Brown, Isaac Newton'],
  
  ['rookie-of-year', '2024', 'First Timer', 'HealthTrack — personal wellness app', 'Comprehensive wellness app tracking exercise, nutrition, sleep, and mental health with personalized recommendations', 'Julia Rodriguez, Kevin Park, Lily Zhang'],
  ['rookie-of-year', '2023', 'New Builders', 'EduConnect — peer tutoring platform', 'Peer-to-peer tutoring platform connecting students for online sessions with built-in video conferencing and progress tracking', 'Marcus Williams, Natasha Ivanova, Oscar Diaz'],
  ['rookie-of-year', '2022', 'Fresh Start', 'TaskMaster — productivity tool', 'Productivity suite combining task management, calendar integration, and time tracking for personal goal achievement', 'Patricia Song, Quinn Jackson, Raj Kapoor'],
  
  ['community-spirit', '2024', 'Team Unity', 'Documentation — built better docs', 'Comprehensive documentation website for Bitcamp with tutorials, guides, API references, and searchable knowledge base', 'Sophie Turner, Thomas Anderson, Uma Verma'],
  ['community-spirit', '2023', 'Helpers', 'Mentorship — helped 20+ teams', 'Organized mentorship program matching experienced hackers with novice teams, providing guidance through entire hackathon', 'Victor Chen, Whitney Davis, Xavier Lopez'],
  ['community-spirit', '2022', 'Organizers', 'Workshop — taught web dev basics', 'Educational workshop series introducing beginners to web development fundamentals, HTML, CSS, and JavaScript', 'Yara Hassan, Zeke Thompson, Aria Green'],
];

async function clearExistingWinners() {
  try {
    console.log('🗑️  Clearing existing Winners data...');
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Winners!A:A',
      auth,
    });
    
    const rowCount = res.data.values?.length || 0;
    if (rowCount > 1) {
      // Delete all data rows (keep header)
      await sheets.spreadsheets.values.clear({
        spreadsheetId: SHEET_ID,
        range: `Winners!A2:F${rowCount}`,
        auth,
      });
      console.log(`  ✓ Cleared ${rowCount - 1} existing rows`);
    }
  } catch (err) {
    console.log('  (No existing data to clear)');
  }
}

async function main() {
  try {
    console.log('\n🌱 Seeding complete winner data...\n');

    await clearExistingWinners();

    console.log('🏆 Adding Winners with descriptions and members...');
    for (const winner of WINNERS_WITH_DESCRIPTIONS) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: 'Winners!A1',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        auth,
        requestBody: { values: [winner] },
      });
      console.log(`  ✓ ${winner[2]} (${winner[1]}) — ${winner[5]}`);
    }

    console.log('\n✅ Successfully seeded all winner data!');
    console.log(`   🎉 ${WINNERS_WITH_DESCRIPTIONS.length} winners added with full details`);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.errors) {
      console.error('Details:', error.errors[0]);
    }
    process.exit(1);
  }
}

main();
