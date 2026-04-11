import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file - simpler approach
const envPath = path.join(__dirname, "..", ".env");
const envContent = fs.readFileSync(envPath, "utf-8");

const env = {};
const lines = envContent.split("\n");

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim() || line.trim().startsWith("#")) continue;

  const [key, ...valueParts] = line.split("=");
  if (!key) continue;

  let value = valueParts.join("=").trim();

  // Remove surrounding quotes
  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1);
    // Handle escaped newlines in the string
    value = value.replace(/\\n/g, "\n");
  }

  env[key.trim()] = value;
}

const SHEET_ID = env.GOOGLE_SHEETS_ID;
const SERVICE_ACCOUNT_EMAIL = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

console.log("✓ Loaded env vars:");
console.log(`  SHEET_ID: ${SHEET_ID ? SHEET_ID.substring(0, 20) + "..." : "NOT FOUND"}`);
console.log(`  EMAIL: ${SERVICE_ACCOUNT_EMAIL || "NOT FOUND"}`);
console.log(`  KEY length: ${PRIVATE_KEY ? PRIVATE_KEY.length : "0"}`);
console.log(`  KEY starts: ${PRIVATE_KEY ? PRIVATE_KEY.substring(0, 50) : "N/A"}`);

if (!SHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
  console.error("\n❌ Missing required env vars");
  process.exit(1);
}

const auth = new google.auth.JWT({
  email: SERVICE_ACCOUNT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4" });

const PRIZES = [
  ["zach-open-source", "Zach's Prize", "Zach", "Best use of open source tools", "TRUE"],
  [
    "gurpreet-social-good",
    "Gurpreet's Prize",
    "Gurpreet",
    "Most impactful social good hack",
    "TRUE",
  ],
  [
    "best-ai-innovation",
    "Best AI Innovation",
    "Alumni",
    "Creative use of artificial intelligence",
    "TRUE",
  ],
  ["peoples-choice", "People's Choice", "Community", "The project everyone loved", "TRUE"],
  ["rookie-of-year", "Rookie of the Year", "Alumni", "Best first-time hacker project", "TRUE"],
  ["community-spirit", "Community Spirit", "Alumni", "Best contribution to Bitcamp", "TRUE"],
];

const WINNERS = [
  ["zach-open-source", "2024", "Team Quantum", "NeuroSync — AI-powered meditation app", "", ""],
  ["zach-open-source", "2023", "HackHub", "DevForge — real-time coding collaboration", "", ""],
  ["zach-open-source", "2022", "Byte Builders", "EcoTrack — carbon footprint visualizer", "", ""],
  ["gurpreet-social-good", "2024", "Team Terra", "SafeRoute — accessible transit mapping", "", ""],
  [
    "gurpreet-social-good",
    "2023",
    "CodeForGood",
    "FoodBridge — surplus food redistribution",
    "",
    "",
  ],
  [
    "gurpreet-social-good",
    "2022",
    "Impact X",
    "MedAlert — medication reminder for elderly",
    "",
    "",
  ],
  ["best-ai-innovation", "2024", "Neural Nexus", "CodeAssist — AI code review tool", "", ""],
  [
    "best-ai-innovation",
    "2023",
    "ML Masters",
    "PredictFlow — predictive analytics platform",
    "",
    "",
  ],
  ["best-ai-innovation", "2022", "AI Innovators", "VisionAI — computer vision classifier", "", ""],
  ["peoples-choice", "2024", "Fun Hackers", "GameFlow — multiplayer game in 36h", "", ""],
  ["peoples-choice", "2023", "Creative Minds", "ArtSync — collaborative digital canvas", "", ""],
  ["peoples-choice", "2022", "Joy Makers", "SoundWave — interactive music creator", "", ""],
  ["rookie-of-year", "2024", "First Timer", "HealthTrack — personal wellness app", "", ""],
  ["rookie-of-year", "2023", "New Builders", "EduConnect — peer tutoring platform", "", ""],
  ["rookie-of-year", "2022", "Fresh Start", "TaskMaster — productivity tool", "", ""],
  ["community-spirit", "2024", "Team Unity", "Documentation — built better docs", "", ""],
  ["community-spirit", "2023", "Helpers", "Mentorship — helped 20+ teams", "", ""],
  ["community-spirit", "2022", "Organizers", "Workshop — taught web dev basics", "", ""],
];

async function main() {
  try {
    console.log("\n🌱 Seeding data...\n");

    console.log("📋 Adding Prizes...");
    for (const prize of PRIZES) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "Prizes!A1",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        auth,
        requestBody: { values: [prize] },
      });
      console.log(`  ✓ ${prize[1]}`);
    }

    console.log("\n🏆 Adding Winners...");
    for (const winner of WINNERS) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "Winners!A1",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        auth,
        requestBody: { values: [winner] },
      });
      console.log(`  ✓ ${winner[2]} (${winner[1]})`);
    }

    console.log("\n✅ Successfully seeded all data!");
    console.log(`   📦 ${PRIZES.length} prizes added`);
    console.log(`   🎉 ${WINNERS.length} winners added`);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    if (error.errors) {
      console.error("Details:", error.errors[0]);
    }
    process.exit(1);
  }
}

void main();
