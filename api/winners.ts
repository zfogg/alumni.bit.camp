// api/winners.ts  —  GET /api/winners
// Returns all winners from Google Sheets

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readRows } from "../lib/sheets.js";

interface Winner {
  prize_id: string;
  year: number;
  team_name: string;
  project_name: string;
  description: string;
  members: string;
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
    const rows = await readRows("Winners");
    console.log("[/api/winners] Read", rows.length, "rows from Winners sheet");

    // Map raw rows to Winner objects
    const winners: Winner[] = rows.map((row) => ({
      prize_id: row[0] || "",
      year: parseInt(row[1] || "0", 10),
      team_name: row[2] || "",
      project_name: row[3] || "",
      description: row[4] || "",
      members: row[5] || "",
    }));

    console.log("[/api/winners] Mapped", winners.length, "winners:", winners.slice(0, 2));

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(winners);
  } catch (err) {
    console.error("[/api/winners] Error:", err);
    return res.status(500).json({ error: "Failed to fetch winners" });
  }
}
