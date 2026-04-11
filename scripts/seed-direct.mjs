import { google } from "googleapis";

const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;

if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !GOOGLE_SHEETS_ID) {
  console.error("Missing env vars");
  console.error("  GOOGLE_SERVICE_ACCOUNT_EMAIL:", GOOGLE_SERVICE_ACCOUNT_EMAIL ? "✓" : "✗");
  console.error(
    "  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY:",
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ? "✓" : "✗",
  );
  console.error("  GOOGLE_SHEETS_ID:", GOOGLE_SHEETS_ID ? "✓" : "✗");
  process.exit(1);
}

function getAuth() {
  return new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheets() {
  return google.sheets({ version: "v4" });
}

async function addPrizes() {
  const sheets = getSheets();
  const auth = getAuth();

  const prizesData = [
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

  console.log("📋 Adding Prizes...");
  for (const prize of prizesData) {
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: "Prizes!A1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      auth,
      requestBody: { values: [prize] },
    });
    console.log(`  ✓ ${prize[1]}`);
  }
}

async function addWinners() {
  const sheets = getSheets();
  const auth = getAuth();

  const winnersData = [
    ["zach-open-source", "2024", "Team Quantum", "NeuroSync — AI-powered meditation app", "", ""],
    ["zach-open-source", "2023", "HackHub", "DevForge — real-time coding collaboration", "", ""],
    ["zach-open-source", "2022", "Byte Builders", "EcoTrack — carbon footprint visualizer", "", ""],
    [
      "gurpreet-social-good",
      "2024",
      "Team Terra",
      "SafeRoute — accessible transit mapping",
      "",
      "",
    ],
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
    [
      "best-ai-innovation",
      "2022",
      "AI Innovators",
      "VisionAI — computer vision classifier",
      "",
      "",
    ],
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

  console.log("\n🏆 Adding Winners...");
  for (const winner of winnersData) {
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: "Winners!A1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      auth,
      requestBody: { values: [winner] },
    });
    console.log(`  ✓ ${winner[2]} (${winner[1]})`);
  }
}

async function main() {
  try {
    console.log("🌱 Seeding Prizes and Winners...\n");
    await addPrizes();
    await addWinners();
    console.log("\n✅ Done!");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    if (error.errors) {
      console.error("Details:", error.errors);
    }
    process.exit(1);
  }
}

void main();
