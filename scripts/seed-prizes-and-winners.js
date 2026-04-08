#!/usr/bin/env node

/**
 * Seed script to add Prizes and Winners data to Google Sheets
 * Usage: node scripts/seed-prizes-and-winners.js
 */

import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!SHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
  console.error("❌ Missing required environment variables:");
  console.error("  - GOOGLE_SHEETS_ID");
  console.error("  - GOOGLE_SERVICE_ACCOUNT_EMAIL");
  console.error("  - GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");
  process.exit(1);
}

const auth = new google.auth.JWT({
  email: SERVICE_ACCOUNT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4" });

const PRIZES_DATA = [
  {
    prize_id: "zach-open-source",
    prize_name: "Zach's Prize",
    sponsor_name: "Zach",
    description: "Best use of open source tools",
    active: "TRUE",
  },
  {
    prize_id: "gurpreet-social-good",
    prize_name: "Gurpreet's Prize",
    sponsor_name: "Gurpreet",
    description: "Most impactful social good hack",
    active: "TRUE",
  },
  {
    prize_id: "best-ai-innovation",
    prize_name: "Best AI Innovation",
    sponsor_name: "Alumni",
    description: "Creative use of artificial intelligence",
    active: "TRUE",
  },
  {
    prize_id: "peoples-choice",
    prize_name: "People's Choice",
    sponsor_name: "Community",
    description: "The project everyone loved",
    active: "TRUE",
  },
  {
    prize_id: "rookie-of-year",
    prize_name: "Rookie of the Year",
    sponsor_name: "Alumni",
    description: "Best first-time hacker project",
    active: "TRUE",
  },
  {
    prize_id: "community-spirit",
    prize_name: "Community Spirit",
    sponsor_name: "Alumni",
    description: "Best contribution to Bitcamp",
    active: "TRUE",
  },
];

const WINNERS_DATA = [
  {
    prize_id: "zach-open-source",
    year: "2024",
    team_name: "Team Quantum",
    project_name: "NeuroSync — AI-powered meditation app",
    description: "",
    members: "",
  },
  {
    prize_id: "zach-open-source",
    year: "2023",
    team_name: "HackHub",
    project_name: "DevForge — real-time coding collaboration",
    description: "",
    members: "",
  },
  {
    prize_id: "zach-open-source",
    year: "2022",
    team_name: "Byte Builders",
    project_name: "EcoTrack — carbon footprint visualizer",
    description: "",
    members: "",
  },
  {
    prize_id: "gurpreet-social-good",
    year: "2024",
    team_name: "Team Terra",
    project_name: "SafeRoute — accessible transit mapping",
    description: "",
    members: "",
  },
  {
    prize_id: "gurpreet-social-good",
    year: "2023",
    team_name: "CodeForGood",
    project_name: "FoodBridge — surplus food redistribution",
    description: "",
    members: "",
  },
  {
    prize_id: "gurpreet-social-good",
    year: "2022",
    team_name: "Impact X",
    project_name: "MedAlert — medication reminder for elderly",
    description: "",
    members: "",
  },
  {
    prize_id: "best-ai-innovation",
    year: "2024",
    team_name: "Neural Nexus",
    project_name: "CodeAssist — AI code review tool",
    description: "",
    members: "",
  },
  {
    prize_id: "best-ai-innovation",
    year: "2023",
    team_name: "ML Masters",
    project_name: "PredictFlow — predictive analytics platform",
    description: "",
    members: "",
  },
  {
    prize_id: "best-ai-innovation",
    year: "2022",
    team_name: "AI Innovators",
    project_name: "VisionAI — computer vision classifier",
    description: "",
    members: "",
  },
  {
    prize_id: "peoples-choice",
    year: "2024",
    team_name: "Fun Hackers",
    project_name: "GameFlow — multiplayer game in 36h",
    description: "",
    members: "",
  },
  {
    prize_id: "peoples-choice",
    year: "2023",
    team_name: "Creative Minds",
    project_name: "ArtSync — collaborative digital canvas",
    description: "",
    members: "",
  },
  {
    prize_id: "peoples-choice",
    year: "2022",
    team_name: "Joy Makers",
    project_name: "SoundWave — interactive music creator",
    description: "",
    members: "",
  },
  {
    prize_id: "rookie-of-year",
    year: "2024",
    team_name: "First Timer",
    project_name: "HealthTrack — personal wellness app",
    description: "",
    members: "",
  },
  {
    prize_id: "rookie-of-year",
    year: "2023",
    team_name: "New Builders",
    project_name: "EduConnect — peer tutoring platform",
    description: "",
    members: "",
  },
  {
    prize_id: "rookie-of-year",
    year: "2022",
    team_name: "Fresh Start",
    project_name: "TaskMaster — productivity tool",
    description: "",
    members: "",
  },
  {
    prize_id: "community-spirit",
    year: "2024",
    team_name: "Team Unity",
    project_name: "Documentation — built better docs",
    description: "",
    members: "",
  },
  {
    prize_id: "community-spirit",
    year: "2023",
    team_name: "Helpers",
    project_name: "Mentorship — helped 20+ teams",
    description: "",
    members: "",
  },
  {
    prize_id: "community-spirit",
    year: "2022",
    team_name: "Organizers",
    project_name: "Workshop — taught web dev basics",
    description: "",
    members: "",
  },
];

async function seedData() {
  try {
    console.log("🌱 Seeding Prizes and Winners data...\n");

    // Add prizes
    console.log("📋 Adding Prizes...");
    for (const prize of PRIZES_DATA) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "Prizes!A1",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        auth,
        requestBody: {
          values: [[prize.prize_id, prize.prize_name, prize.sponsor_name, prize.description, prize.active]],
        },
      });
      console.log(`  ✓ Added: ${prize.prize_name}`);
    }

    console.log("\n🏆 Adding Winners...");
    for (const winner of WINNERS_DATA) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "Winners!A1",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        auth,
        requestBody: {
          values: [[winner.prize_id, winner.year, winner.team_name, winner.project_name, winner.description, winner.members]],
        },
      });
      console.log(`  ✓ Added: ${winner.team_name} (${winner.year})`);
    }

    console.log("\n✅ Successfully seeded all data!");
    console.log(`   📦 ${PRIZES_DATA.length} prizes added`);
    console.log(`   🎉 ${WINNERS_DATA.length} winners added`);
  } catch (error) {
    console.error("\n❌ Error seeding data:");
    console.error(error.message);
    process.exit(1);
  }
}

seedData();
