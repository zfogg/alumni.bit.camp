import "dotenv/config";
import { google, sheets_v4 } from "googleapis";

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
  Prizes: ["prize_id", "prize_name", "sponsor_name", "sponsor_website", "sponsor_email", "description", "active", "color", "icon"],
  Winners: ["prize_id", "year", "team_name", "project_name", "description", "members"],
};

// ── initializeSheet ───────────────────────────────────────────────────────────
// Checks which tabs exist; creates any that are missing and writes the header row.
// Safe to call repeatedly — always checks current state before creating.

export async function initializeSheet(): Promise<void> {
  try {
    const sheets = getSheets();
    const id = SHEET_ID();
    const auth = getAuth();

    // Fetch the spreadsheet to see which sheets (tabs) already exist
    const { data } = await sheets.spreadsheets.get({ spreadsheetId: id, auth });

    const existingSheets = new Map<string, sheets_v4.Schema$Sheet>(
      (data.sheets ?? [])
        .filter((s): s is sheets_v4.Schema$Sheet & { properties: { title: string } } =>
          !!s.properties?.title
        )
        .map((s: sheets_v4.Schema$Sheet & { properties: { title: string } }) => [s.properties.title, s]),
    );

    const tabsToCreate = Object.keys(TABS).filter((t) => !existingSheets.has(t));
    const existingTabs = Object.keys(TABS).filter((t) => existingSheets.has(t));

    // Create all missing tabs
    if (tabsToCreate.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: id,
        auth,
        requestBody: {
          requests: tabsToCreate.map((title) => ({
            addSheet: { properties: { title } },
          })),
        },
      });

      // Write the header row to each newly created tab
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
    }

    // For existing tabs, check and add missing columns
    if (existingTabs.length > 0) {
      const headerResults = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: id,
        ranges: existingTabs.map((t) => `${t}!1:1`),
        auth,
      });

      const columnsToAdd = [];

      for (let i = 0; i < existingTabs.length; i++) {
        const tabName = existingTabs[i];
        const expectedHeaders = TABS[tabName];
        const currentHeaders = (headerResults.data.valueRanges?.[i]?.values?.[0] ?? []) as string[];

        const missingCols = expectedHeaders.filter((col) => !currentHeaders.includes(col));

        if (missingCols.length > 0) {
          // Append missing columns to the right
          const newHeaders = [...currentHeaders, ...missingCols];
          columnsToAdd.push({
            range: `${tabName}!A1`,
            values: [newHeaders],
          });
        }
      }

      if (columnsToAdd.length > 0) {
        await sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: id,
          auth,
          requestBody: {
            valueInputOption: "RAW",
            data: columnsToAdd,
          },
        });
      }
    }

    // Freeze the first row on all tabs
    const allTabs = Object.keys(TABS);
    const freezeRequests = allTabs
      .map((tabName) => {
        const sheet = existingSheets.get(tabName);
        if (!sheet?.properties?.sheetId && sheet?.properties?.sheetId !== 0) {
          return null; // Skip if we can't find the sheet ID
        }
        return {
          updateSheetProperties: {
            properties: {
              sheetId: sheet.properties.sheetId,
              gridProperties: {
                frozenRowCount: 1,
              },
            },
            fields: "gridProperties.frozenRowCount",
          },
        };
      })
      .filter((req): req is Exclude<typeof req, null> => req !== null);

    if (freezeRequests.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: id,
        auth,
        requestBody: {
          requests: freezeRequests,
        },
      });
    }
  } catch (err) {
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
