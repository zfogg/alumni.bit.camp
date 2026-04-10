// api/support.ts  —  POST /api/support
// Accepts "Give Back" form submissions: either a donation interest or prize sponsorship.
// Branches on `type: 'donate' | 'sponsor'` and appends a row to the Supporters tab.
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { v4 as uuid } from "uuid";
import { appendRow } from "../lib/sheets.js";

const ALLOWED_ORIGINS = [
  "https://alumni.bit.camp",
  "http://localhost:3000",
  "http://localhost:5173",
];

const DONATION_RANGES = ["<50", "50-200", "200-500", "500+", "unsure"];
const PREFERRED_YEARS = ["2026", "2027", "unsure"];
const BUDGET_RANGES = ["0-250", "250-500", "500-750", "750-1000", "1000+"];

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin ?? "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const {
      name,
      email,
      type,
      // donate path
      donation_range,
      message,
      // sponsor path
      prize_name,
      prize_description,
      prize_criteria,
      preferred_year,
      budget_range,
      // honeypot — hidden from real users via CSS
      company_name,
    } = req.body ?? {};

    // Honeypot
    if (company_name) return res.status(200).json({ success: true });

    // Shared validation
    if (!name?.trim()) return res.status(400).json({ error: "Name is required" });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!["donate", "sponsor"].includes(type)) {
      return res.status(400).json({ error: "Please select donate or sponsor a prize" });
    }

    // Donate-specific validation
    if (type === "donate") {
      if (donation_range && !DONATION_RANGES.includes(donation_range)) {
        return res.status(400).json({ error: "Invalid donation range" });
      }
    }

    // Sponsor-specific validation
    if (type === "sponsor") {
      if (!prize_name?.trim()) {
        return res.status(400).json({ error: "Prize name is required" });
      }
      if (!prize_description?.trim()) {
        return res.status(400).json({ error: "Please describe what winners will receive" });
      }
      if (!prize_criteria?.trim()) {
        return res.status(400).json({ error: "Please describe what kind of hack should win" });
      }
      if (preferred_year && !PREFERRED_YEARS.includes(preferred_year)) {
        return res.status(400).json({ error: "Invalid preferred year" });
      }
      if (budget_range && !BUDGET_RANGES.includes(budget_range)) {
        return res.status(400).json({ error: "Invalid budget range" });
      }
    }

    await appendRow("Supporters", [
      uuid(),
      name.trim(),
      email.trim().toLowerCase(),
      type,
      // donate fields (blank for sponsor rows)
      type === "donate" ? (donation_range ?? "unsure") : "",
      type === "donate" ? (message?.trim() ?? "") : "",
      // sponsor fields (blank for donate rows)
      type === "sponsor" ? prize_name.trim() : "",
      type === "sponsor" ? prize_description.trim() : "",
      type === "sponsor" ? prize_criteria.trim() : "",
      type === "sponsor" ? (preferred_year ?? "unsure") : "",
      type === "sponsor" ? (budget_range ?? "") : "",
      new Date().toISOString(),
      "FALSE", // contacted — mark TRUE in Sheets after following up
    ]);

    return res.status(200).json({ success: true, type });
  } catch (err) {
    console.error("[/api/support] Error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
