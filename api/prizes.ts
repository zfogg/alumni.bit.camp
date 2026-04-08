// api/prizes.ts  —  GET /api/prizes
// Returns all active prizes from Google Sheets

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readRows } from "../lib/sheets.js";

interface Prize {
  prize_id: string;
  prize_name: string;
  sponsor_name: string;
  description: string;
  active: string;
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
    const rows = await readRows("Prizes");

    // Map raw rows to Prize objects
    const prizes: Prize[] = rows.map((row) => ({
      prize_id: row[0] || "",
      prize_name: row[1] || "",
      sponsor_name: row[2] || "",
      description: row[3] || "",
      active: row[4] || "FALSE",
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
