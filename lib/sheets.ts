import "dotenv/config";
import { google, sheets_v4 } from "googleapis";
import { writeFileSync, appendFileSync } from "fs";
import { join } from "path";

const LOG_FILE = "/tmp/sheets-debug.log";

function log(msg: string): void {
  const timestamp = new Date().toISOString();
  const fullMsg = `${timestamp} ${msg}\n`;
  appendFileSync(LOG_FILE, fullMsg);
  console.log(msg);
}

// ── Auth ──────────────────────────────────────────────────────────────────────

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheets(): sheets_v4.Sheets {
  return google.sheets({ version: "v4" });
}

const SHEET_ID = () => {
  const id = process.env.GOOGLE_SHEETS_ID;
  if (!id) throw new Error("GOOGLE_SHEETS_ID env var is not set");
  return id;
};

// ── Tab definitions ───────────────────────────────────────────────────────────
// Each entry defines a tab name and its exact header row in column order.
// The API functions append rows in this same column order.

const TABS: Record<string, string[]> = {
  Members: [
    "id",
    "name",
    "email",
    "year",
    "role",
    "school",
    "what_i_did",
    "headshot_url",
    "linkedin",
    "github",
    "website",
    "wants_to_sponsor",
    "involvement_note",
    "created_at",
    "featured",
    "approved",
  ],
  Contacts: ["id", "name", "email", "subject", "message", "created_at"],
  Supporters: [
    "id",
    "name",
    "email",
    "type",
    "donation_range",
    "message",
    "prize_name",
    "prize_description",
    "prize_criteria",
    "preferred_year",
    "budget_range",
    "created_at",
    "contacted",
  ],
  Prizes: ["prize_id", "prize_name", "sponsor_name", "description", "active"],
  Winners: ["prize_id", "year", "team_name", "project_name", "description", "members"],
};

// ── initializeSheet ───────────────────────────────────────────────────────────
// Checks which tabs exist; creates any that are missing and writes the header row.
// Safe to call repeatedly — always checks current state before creating.

export async function initializeSheet(): Promise<void> {
  try {
    log(`[sheets] ===== initializeSheet() START =====`);

    const sheets = getSheets();
    log(`[sheets] Got sheets service`);

    const id = SHEET_ID();
    log(`[sheets] Sheet ID: ${id}`);

    const auth = getAuth();
    log(`[sheets] Got auth`);

    // Fetch the spreadsheet to see which sheets (tabs) already exist
    log(`[sheets] Fetching spreadsheet...`);
    const { data } = await sheets.spreadsheets.get({ spreadsheetId: id, auth });
    log(`[sheets] Spreadsheet fetch complete. Found ${data.sheets?.length ?? 0} sheets`);

    const existingSheets = new Map(
      (data.sheets ?? []).map((s: sheets_v4.Schema$Sheet) => [s.properties?.title, s]),
    );
    log(`[sheets] Existing sheet titles: ${Array.from(existingSheets.keys()).join(", ")}`);

    const tabsToCreate = Object.keys(TABS).filter((t) => !existingSheets.has(t));
    const existingTabs = Object.keys(TABS).filter((t) => existingSheets.has(t));
    log(`[sheets] Tabs to create: [${tabsToCreate.join(", ")}]`);
    log(`[sheets] Existing tabs to check: [${existingTabs.join(", ")}]`);

    // Create all missing tabs
    if (tabsToCreate.length > 0) {
      log(`[sheets] Creating ${tabsToCreate.length} new tabs...`);
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: id,
        auth,
        requestBody: {
          requests: tabsToCreate.map((title) => ({
            addSheet: { properties: { title } },
          })),
        },
      });
      log(`[sheets] Sheets created`);

      // Write the header row to each newly created tab
      log(`[sheets] Writing headers to new tabs...`);
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: id,
        auth,
        requestBody: {
          valueInputOption: "RAW",
          data: tabsToCreate.map((title) => ({
            range: `${title}!A1`,
            values: [TABS[title]],
          })),
        },
      });
      log(`[sheets] Headers written`);
    }

    // For existing tabs, check and add missing columns
    if (existingTabs.length > 0) {
      log(`[sheets] ===== CHECKING ${existingTabs.length} EXISTING TABS =====`);

      log(`[sheets] Fetching headers from existing tabs...`);
      const headerResults = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: id,
        ranges: existingTabs.map((t) => `${t}!1:1`),
        auth,
      });
      log(`[sheets] Header fetch complete`);

      const columnsToAdd = [];

      for (let i = 0; i < existingTabs.length; i++) {
        const tabName = existingTabs[i];
        const expectedHeaders = TABS[tabName];
        const currentHeaders = (headerResults.data.valueRanges?.[i]?.values?.[0] ?? []) as string[];

        log(`[sheets] --- Tab "${tabName}" ---`);
        log(`[sheets]   Current (${currentHeaders.length}): [${currentHeaders.join(", ")}]`);
        log(`[sheets]   Expected (${expectedHeaders.length}): [${expectedHeaders.join(", ")}]`);

        const missingCols = expectedHeaders.filter((col) => !currentHeaders.includes(col));
        log(`[sheets]   Missing (${missingCols.length}): [${missingCols.join(", ")}]`);

        if (missingCols.length > 0) {
          log(`[sheets] *** WILL ADD MISSING COLUMNS TO ${tabName} ***`);
          // Append missing columns to the right
          const newHeaders = [...currentHeaders, ...missingCols];
          log(`[sheets]   New headers will be: [${newHeaders.join(", ")}]`);
          columnsToAdd.push({
            range: `${tabName}!A1`,
            values: [newHeaders],
          });
        }
      }

      log(`[sheets] ===== SUMMARY: ${columnsToAdd.length} tabs need updates =====`);

      if (columnsToAdd.length > 0) {
        log(`[sheets] EXECUTING COLUMN UPDATES...`);
        await sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: id,
          auth,
          requestBody: {
            valueInputOption: "RAW",
            data: columnsToAdd,
          },
        });
        log(`[sheets] *** COLUMN UPDATES COMPLETED SUCCESSFULLY ***`);
      } else {
        log(`[sheets] No column updates needed`);
      }
    } else {
      log(`[sheets] No existing tabs to check`);
    }

    log(`[sheets] ===== initializeSheet() END =====`);
  } catch (err) {
    log(`[sheets] ERROR: ERROR IN initializeSheet():`, err);
    throw err;
  }
}

// ── appendRow ─────────────────────────────────────────────────────────────────
// Appends a single row of values to a named tab.
// Always calls initializeSheet() first so the tab is guaranteed to exist.

export async function appendRow(
  tab: string,
  values: (string | boolean | number | null | undefined)[],
): Promise<void> {
  await initializeSheet();

  const sheets = getSheets();
  const auth = getAuth();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: `${tab}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    auth,
    requestBody: {
      values: [values.map((v) => (v === null || v === undefined ? "" : String(v)))],
    },
  });
}

// ── readRows ──────────────────────────────────────────────────────────────────
// Reads all data rows from a tab, skipping the header row.
// Returns raw string[][] — callers map to typed objects.

export async function readRows(tab: string): Promise<string[][]> {
  await initializeSheet();

  const sheets = getSheets();
  const auth = getAuth();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `${tab}!A2:Z`,
    auth,
  });

  return (res.data.values ?? []) as string[][];
}
