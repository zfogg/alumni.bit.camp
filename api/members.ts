// api/members.ts  —  GET /api/members
// Returns all approved members from Google Sheets

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { google } from "googleapis";

interface Member {
  id: string;
  name: string;
  email: string;
  year: string;
  role: string;
  school?: string;
  what_i_did?: string;
  headshot_url?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  created_at: string;
  featured: boolean;
  approved: boolean;
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

    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Members!A2:N",
      auth,
    });

    const rows = (data.values ?? []) as string[][];

    // Map raw rows to Member objects and filter approved only
    const members: Member[] = rows
      .map((row) => ({
        id: row[0] || "",
        name: row[1] || "",
        email: row[2] || "",
        year: row[3] || "",
        role: row[4] || "",
        school: row[5] || undefined,
        what_i_did: row[6] || undefined,
        headshot_url: row[7] || undefined,
        linkedin: row[8] || undefined,
        github: row[9] || undefined,
        website: row[10] || undefined,
        created_at: row[11] || "",
        featured: (row[12] || "").toUpperCase() === "TRUE",
        approved: (row[13] || "").toUpperCase() === "TRUE",
      }))
      .filter((m) => m.approved);

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(members);
  } catch (err) {
    console.error("[/api/members] Error:", err);
    return res.status(500).json({ error: "Failed to fetch members" });
  }
}
