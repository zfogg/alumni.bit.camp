// api/prizes.ts  —  GET /api/prizes
// Returns all active prizes from Google Sheets

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { google } from "googleapis";

interface Prize {
  prize_id: string;
  prize_name: string;
  sponsor_name: string;
  description: string;
  color: string;
  icon: string;
  active: string;
}

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  const origin = req.headers.origin ?? "";
  const allowedOrigins = [
    "https://alumni.bit.camp",
    "http://localhost:3000",
    "http://localhost:5173",
  ];
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
    if (!SHEET_ID) throw new Error("Missing GOOGLE_SHEETS_ID");

    const sheets = google.sheets({ version: "v4" });
    const auth = getAuth();

    console.log("[/api/prizes] Fetching from sheet", SHEET_ID);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Prizes!A2:G",
      auth,
    });

    const rows = (response.data.values ?? []) as string[][];

    // Map raw rows to Prize objects
    const prizes: Prize[] = rows.map((row) => ({
      prize_id: row[0] || "",
      prize_name: row[1] || "",
      sponsor_name: row[2] || "",
      description: row[3] || "",
      active: row[4] || "FALSE",
      color: row[5] || "#999999",
      icon: row[6] || "🏆",
    }));

    // Filter to only active prizes
    const activePrizes = prizes.filter((p) => p.active?.toUpperCase() === "TRUE");

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(activePrizes);
  } catch (err) {
    console.error("[/api/prizes] Error:", err);
    return res.status(500).json({ error: "Failed to fetch prizes" });
  }
}
