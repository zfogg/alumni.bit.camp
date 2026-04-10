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
  Prizes: ["prize_id", "prize_name", "sponsor_name", "description", "active"],
  Winners: ["prize_id", "year", "team_name", "project_name", "description", "members"],
};

// ── initializeSheet ───────────────────────────────────────────────────────────
// Checks which tabs exist; creates any that are missing and writes the header row.
// Safe to call repeatedly — always checks current state before creating.

export async function initializeSheet(): Promise<void> {
  const sheets = getSheets();
  const id = SHEET_ID();
  const auth = getAuth();

  // Fetch the spreadsheet to see which sheets (tabs) already exist
  let { data } = await sheets.spreadsheets.get({ spreadsheetId: id, auth });
  const existingSheets = new Map(
    (data.sheets ?? []).map((s: sheets_v4.Schema$Sheet) => [s.properties?.title, s]),
  );

  const tabsToCreate = Object.keys(TABS).filter((t) => !existingSheets.has(t));
  const tabsToCheckHeaders = Object.keys(TABS).filter((t) => existingSheets.has(t));

  // Create all missing tabs in a single batchUpdate
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

    console.log(`[sheets] Created tabs: ${tabsToCreate.join(", ")}`);
  }

  // Check existing tabs for missing columns
  if (tabsToCheckHeaders.length > 0) {
    const headerResults = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: id,
      ranges: tabsToCheckHeaders.map((t) => `${t}!1:1`),
      auth,
    });

    const headersToUpdate = [];

    for (let i = 0; i < tabsToCheckHeaders.length; i++) {
      const tabName = tabsToCheckHeaders[i];
      const expectedHeaders = TABS[tabName];
      const currentHeaders = (headerResults.data.valueRanges?.[i]?.values?.[0] ?? []) as string[];

      // Check if headers match; if not, update them
      if (JSON.stringify(currentHeaders) !== JSON.stringify(expectedHeaders)) {
        headersToUpdate.push({
          range: `${tabName}!A1`,
          values: [expectedHeaders],
        });
        console.log(
          `[sheets] Updating headers for ${tabName}:`,
          `expected [${expectedHeaders.join(", ")}]`,
          `got [${currentHeaders.join(", ")}]`,
        );
      }
    }

    if (headersToUpdate.length > 0) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: id,
        auth,
        requestBody: {
          valueInputOption: "RAW",
          data: headersToUpdate,
        },
      });
    }
  }

  // Fetch again to get sheet IDs and freeze rows
  const { data: finalData } = await sheets.spreadsheets.get({ spreadsheetId: id, auth });

  const freezeRequests = (finalData.sheets ?? [])
    .filter((s: sheets_v4.Schema$Sheet) => Object.keys(TABS).includes(s.properties?.title ?? ""))
    .map((s: sheets_v4.Schema$Sheet) => ({
      updateSheetProperties: {
        fields: "gridProperties.frozenRowCount",
        properties: {
          sheetId: s.properties?.sheetId,
          gridProperties: {
            frozenRowCount: 1,
          },
        },
      },
    }));

  if (freezeRequests.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: id,
      auth,
      requestBody: {
        requests: freezeRequests,
      },
    });
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
