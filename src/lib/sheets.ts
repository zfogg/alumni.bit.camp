// src/lib/sheets.ts  (frontend-only — uses API endpoints)
// Fetches data from our Vercel API endpoints
import type { Prize, Winner } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Returns all active Prizes (active === 'TRUE').
 */
export async function getPrizes(): Promise<Prize[]> {
  const res = await fetch(`${API_BASE}/api/prizes`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch prizes: ${res.status}`);
  const prizes = await res.json();
  return prizes.map((r: Record<string, unknown>) => ({
    prize_id: r.prize_id,
    prize_name: r.prize_name,
    sponsor_name: r.sponsor_name,
    description: r.description,
    active: true,
  }));
}

/**
 * Returns all Winners rows.
 */
export async function getWinners(): Promise<Winner[]> {
  const res = await fetch(`${API_BASE}/api/winners`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch winners: ${res.status}`);
  const winners = await res.json();
  return winners.map((r: Record<string, unknown>) => ({
    prize_id: r.prize_id,
    year: Number(r.year),
    team_name: r.team_name,
    project_name: r.project_name,
    description: r.description,
    members: r.members,
  }));
}
