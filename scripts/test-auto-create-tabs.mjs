import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
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
  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1);
    value = value.replace(/\\n/g, "\n");
  }
  env[key.trim()] = value;
}

const SHEET_ID = env.GOOGLE_SHEETS_ID;
const SERVICE_ACCOUNT_EMAIL = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

const auth = new google.auth.JWT({
  email: SERVICE_ACCOUNT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4" });

async function getSheetIds(tabNames) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId: SHEET_ID,
    auth,
  });

  const ids = {};
  for (const sheet of res.data.sheets || []) {
    if (tabNames.includes(sheet.properties.title)) {
      ids[sheet.properties.title] = sheet.properties.sheetId;
    }
  }
  return ids;
}

async function deleteTab(sheetId) {
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    auth,
    requestBody: {
      requests: [
        {
          deleteSheet: { sheetId },
        },
      ],
    },
  });
}

async function main() {
  try {
    console.log("🧪 Testing auto-create for Prizes and Winners tabs\n");

    // Step 1: Check if tabs exist
    console.log("1️⃣  Checking existing tabs...");
    const ids = await getSheetIds(["Prizes", "Winners"]);
    console.log(`   Prizes: ${ids.Prizes ? "✓ exists" : "✗ missing"}`);
    console.log(`   Winners: ${ids.Winners ? "✓ exists" : "✗ missing"}`);

    // Step 2: Delete tabs if they exist
    if (ids.Prizes || ids.Winners) {
      console.log("\n2️⃣  Deleting tabs to test auto-creation...");
      if (ids.Prizes) {
        await deleteTab(ids.Prizes);
        console.log("   ✓ Deleted Prizes tab");
      }
      if (ids.Winners) {
        await deleteTab(ids.Winners);
        console.log("   ✓ Deleted Winners tab");
      }
    }

    // Step 3: Make API calls to trigger initializeSheet
    console.log("\n3️⃣  Triggering tab auto-creation via API calls...");
    console.log("   (Making POST requests to form endpoints)");

    const API_BASE = "http://localhost:5174/api";

    // Call join endpoint to trigger initialization
    const joinRes = await fetch(`${API_BASE}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:5174",
      },
      body: JSON.stringify({
        name: "Tab Test User",
        email: "tab-test@example.com",
        year: "2024",
        role: "Hacker",
      }),
    });

    if (!joinRes.ok) {
      throw new Error(`Join endpoint failed: ${await joinRes.text()}`);
    }

    console.log("   ✓ Called /api/join");

    // Small delay to let sheets API process
    await new Promise((r) => setTimeout(r, 2000));

    // Step 4: Verify tabs were created
    console.log("\n4️⃣  Verifying tab creation...");
    const newIds = await getSheetIds(["Prizes", "Winners", "Members", "Contacts", "Supporters"]);
    console.log(`   Prizes: ${newIds.Prizes ? "✅ CREATED" : "❌ MISSING"}`);
    console.log(`   Winners: ${newIds.Winners ? "✅ CREATED" : "❌ MISSING"}`);
    console.log(`   Members: ${newIds.Members ? "✅ EXISTS" : "❌ MISSING"}`);
    console.log(`   Contacts: ${newIds.Contacts ? "✅ EXISTS" : "❌ MISSING"}`);
    console.log(`   Supporters: ${newIds.Supporters ? "✅ EXISTS" : "❌ MISSING"}`);

    // Step 5: Verify headers
    if (newIds.Prizes) {
      console.log("\n5️⃣  Verifying Prizes header...");
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: "Prizes!A1:E1",
        auth,
      });
      const headers = res.data.values?.[0] || [];
      console.log(`   Headers: ${headers.join(", ")}`);
      const expected = ["prize_id", "prize_name", "sponsor_name", "description", "active"];
      const match = JSON.stringify(headers) === JSON.stringify(expected);
      console.log(`   ${match ? "✅ CORRECT" : "❌ INCORRECT"}`);
    }

    if (newIds.Winners) {
      console.log("\n6️⃣  Verifying Winners header...");
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: "Winners!A1:F1",
        auth,
      });
      const headers = res.data.values?.[0] || [];
      console.log(`   Headers: ${headers.join(", ")}`);
      const expected = ["prize_id", "year", "team_name", "project_name", "description", "members"];
      const match = JSON.stringify(headers) === JSON.stringify(expected);
      console.log(`   ${match ? "✅ CORRECT" : "❌ INCORRECT"}`);
    }

    console.log("\n✅ Auto-create test complete!");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

void main();
