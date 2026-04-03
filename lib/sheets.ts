import { google } from "googleapis";

// ── Auth ──────────────────────────────────────────────────────────────────────

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheets() {
  const auth = getAuth();
  return google.sheets({ version: "v4", auth });
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
    "created_at",
    "contacted",
  ],
  Prizes: ["prize_id", "prize_name", "sponsor_name", "description", "active"],
  Winners: ["prize_id", "year", "team_name", "project_name", "description", "members"],
};

// ── initializeSheet ───────────────────────────────────────────────────────────
// Call once on cold start. Checks which tabs exist; creates any that are
// missing and writes the header row. Safe to call repeatedly — skips tabs
// that already exist.

let initialized = false;

export async function initializeSheet(): Promise<void> {
  if (initialized) return;

  const sheets = getSheets();
  const id = SHEET_ID();

  // Fetch the spreadsheet to see which sheets (tabs) already exist
  const { data } = await sheets.spreadsheets.get({ spreadsheetId: id });
  const existingTitles = new Set(
    (data.sheets ?? []).map((s) => s.properties?.title).filter((title): title is string => !!title),
  );

  const tabsToCreate = Object.keys(TABS).filter((t) => !existingTitles.has(t));

  // Create all missing tabs in a single batchUpdate
  if (tabsToCreate.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: id,
      requestBody: {
        requests: tabsToCreate.map((title) => ({
          addSheet: { properties: { title } },
        })),
      },
    });

    // Write the header row to each newly created tab
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: id,
      requestBody: {
        valueInputOption: "RAW",
        data: tabsToCreate.map((title) => ({
          range: `${title}!A1`,
          values: [TABS[title]],
        })),
      },
    });

    console.log(`[sheets] Created tabs: ${tabsToCreate.join(", ")}`);
  }

  initialized = true;
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
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: `${tab}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
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
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `${tab}!A2:Z`,
  });
  return (res.data.values ?? []) as string[][];
}
