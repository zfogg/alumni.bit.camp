// src/lib/sheets.ts  (frontend-only — no service account, no secrets)
// Reads data from Google Sheets published-as-CSV endpoints using papaparse.
//
// SETUP: In your Google Sheet go to:
//   File → Share → Publish to web → (each tab) → CSV → Publish
// This makes each tab publicly readable as a CSV URL.
import Papa from "papaparse";
import type { Member, Prize, Winner } from "../types";

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID as string;
const BASE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=`;

async function fetchTab<T>(tab: string): Promise<T[]> {
  const res = await fetch(`${BASE_URL}${encodeURIComponent(tab)}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch tab "${tab}": ${res.status}`);
  const csv = await res.text();
  const { data, errors } = Papa.parse<T>(csv, { header: true, skipEmptyLines: true });
  if (errors.length) {
    console.warn(`[sheets] Parse warnings for tab "${tab}":`, errors);
  }
  return data;
}

/**
 * Returns all Members where approved === 'TRUE'.
 * Cast boolean-like strings from CSV to real booleans.
 */
export async function getMembers(): Promise<Member[]> {
  const rows = await fetchTab<Record<string, string>>("Members");
  return rows
    .filter((r) => r.approved?.toUpperCase() === "TRUE")
    .map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      year: r.year,
      role: r.role as Member["role"],
      school: r.school || undefined,
      what_i_did: r.what_i_did || undefined,
      headshot_url: r.headshot_url || undefined,
      linkedin: r.linkedin || undefined,
      github: r.github || undefined,
      website: r.website || undefined,
      created_at: r.created_at,
      featured: r.featured?.toUpperCase() === "TRUE",
      approved: true,
    }));
}

/**
 * Returns all active Prizes (active === 'TRUE').
 */
export async function getPrizes(): Promise<Prize[]> {
  const rows = await fetchTab<Record<string, string>>("Prizes");
  return rows
    .filter((r) => r.active?.toUpperCase() === "TRUE")
    .map((r) => ({
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
  const rows = await fetchTab<Record<string, string>>("Winners");
  return rows.map((r) => ({
    prize_id: r.prize_id,
    year: Number(r.year),
    team_name: r.team_name,
    project_name: r.project_name,
    description: r.description,
    members: r.members,
  }));
}
