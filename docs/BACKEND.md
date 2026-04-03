# Backend Plan

> Three Node.js serverless functions on Vercel · Google Sheets as data store

---

## Overview

The backend is intentionally tiny — just three API endpoints. No database, no ORM, no auth server. Google Sheets is the data store; Vercel runs the functions. All endpoints live in `api/` at the repo root and Vercel automatically deploys them as serverless functions.

```
api/
├── join.ts       POST /api/join     — alumni signup form → Members tab
├── contact.ts    POST /api/contact  — contact form → Contacts tab
└── support.ts    POST /api/support  — give back form → Supporters tab
```

---

## Google Sheets Setup

### Spreadsheet structure

One spreadsheet, three tabs:

**Tab 1: `Members`**

| id   | name   | email  | year   | role | school | what_i_did | headshot_url | linkedin | github | website | created_at | featured | approved |
| ---- | ------ | ------ | ------ | ---- | ------ | ---------- | ------------ | -------- | ------ | ------- | ---------- | -------- | -------- |
| uuid | string | string | number | enum | string | string     | url          | url      | url    | url     | ISO date   | FALSE    | FALSE    |

**Tab 2: `Contacts`**

| id   | name   | email  | subject | message | created_at |
| ---- | ------ | ------ | ------- | ------- | ---------- |
| uuid | string | string | string  | string  | ISO date   |

**Tab 3: `Supporters`**

| id   | name   | email  | type            | donation_range | message | prize_name | prize_description | prize_criteria | preferred_year | created_at | contacted |
| ---- | ------ | ------ | --------------- | -------------- | ------- | ---------- | ----------------- | -------------- | -------------- | ---------- | --------- |
| uuid | string | string | donate\|sponsor | string         | string  | string     | string            | string         | string         | ISO date   | FALSE     |

**Tab 4: `Prizes`** _(managed manually, read-only from the app)_

| prize_id | prize_name | sponsor_name | description | active |
| -------- | ---------- | ------------ | ----------- | ------ |

**Tab 4: `Winners`** _(managed manually, read-only from the app)_

| prize_id | year | team_name | project_name | description | members |
| -------- | ---- | --------- | ------------ | ----------- | ------- |

### Google Cloud Service Account

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or use an existing one)
3. Enable the **Google Sheets API**
4. Go to **IAM & Admin → Service Accounts → Create Service Account**
5. Name it `alumni-bitcamp-sheets`; no roles needed
6. Click the service account → **Keys → Add Key → JSON** → download
7. Open the JSON file and copy:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
8. In your Google Sheet → **Share** → paste the service account email → **Editor** role

The service account can now read and write to the sheet programmatically.

---

## Dependencies

```bash
pnpm add googleapis uuid
pnpm add -D @types/uuid @vercel/node
```

| Package        | Why                                                      |
| -------------- | -------------------------------------------------------- |
| `googleapis`   | Official Google client library for Sheets API            |
| `uuid`         | Generate unique IDs for each row                         |
| `@vercel/node` | TypeScript types for Vercel serverless function handlers |

---

## Shared: `lib/sheets.ts`

A small module that both API functions import. Handles auth and provides typed append/read helpers.

```typescript
// lib/sheets.ts
import { google } from "googleapis";

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheets() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;

/** Append a row of values to a named tab. */
export async function appendRow(
  tab: string,
  values: (string | boolean | number | null)[],
): Promise<void> {
  const sheets = getSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values.map((v) => (v === null || v === undefined ? "" : String(v)))],
    },
  });
}

/** Read all rows from a named tab (returns raw string[][] skipping header row). */
export async function readRows(tab: string): Promise<string[][]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A2:Z`, // A2 skips the header row
  });
  return (res.data.values ?? []) as string[][];
}
```

---

## `api/join.ts` — Alumni Signup

Accepts a signup form submission and appends a row to the `Members` tab.

```typescript
// api/join.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { v4 as uuid } from "uuid";
import { appendRow } from "../lib/sheets";

// Allowed origins for CORS (frontend domain)
const ALLOWED_ORIGINS = [
  "https://alumni.bit.camp",
  "http://localhost:3000",
  "http://localhost:5173",
];

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

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      email,
      year,
      role,
      school,
      what_i_did,
      headshot_url,
      linkedin,
      github,
      website,
      // honeypot — bots fill this, humans don't
      website_url,
    } = req.body ?? {};

    // Honeypot check
    if (website_url) {
      // Silently succeed so bots don't know they were filtered
      return res.status(200).json({ success: true });
    }

    // Basic validation
    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!year) {
      return res.status(400).json({ error: "Year is required" });
    }

    const VALID_ROLES = ["Hacker", "Organizer", "Sponsor", "Staff", "Other"];
    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    await appendRow("Members", [
      uuid(), // id
      name.trim(), // name
      email.trim().toLowerCase(), // email
      String(year), // year
      role, // role
      school?.trim() ?? "", // school
      what_i_did?.trim() ?? "", // what_i_did
      headshot_url?.trim() ?? "", // headshot_url
      linkedin?.trim() ?? "", // linkedin
      github?.trim() ?? "", // github
      website?.trim() ?? "", // website
      new Date().toISOString(), // created_at
      "FALSE", // featured (you set manually)
      "FALSE", // approved (you set manually)
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[/api/join] Error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
```

---

## `api/contact.ts` — Contact Form

Saves the message to the `Contacts` tab and optionally sends an email notification.

```typescript
// api/contact.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { v4 as uuid } from "uuid";
import { appendRow } from "../lib/sheets";

const ALLOWED_ORIGINS = [
  "https://alumni.bit.camp",
  "http://localhost:3000",
  "http://localhost:5173",
];

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
    const { name, email, subject, message, phone } = req.body ?? {};

    // Honeypot (phone field hidden from real users via CSS)
    if (phone) return res.status(200).json({ success: true });

    // Validation
    if (!name?.trim()) return res.status(400).json({ error: "Name is required" });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!message?.trim()) return res.status(400).json({ error: "Message is required" });

    // Save to Google Sheets
    await appendRow("Contacts", [
      uuid(),
      name.trim(),
      email.trim().toLowerCase(),
      subject?.trim() ?? "(no subject)",
      message.trim(),
      new Date().toISOString(),
    ]);

    // Optional: send email notification via Resend
    // Remove this block if you don't want email notifications —
    // the Sheets row alone is enough to see submissions.
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      await sendEmailNotification({ name, email, subject, message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[/api/contact] Error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

async function sendEmailNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "alumni@bit.camp",
      to: process.env.ADMIN_EMAIL,
      subject: `[Bitcamp Alumni Contact] ${subject ?? "(no subject)"}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });
  if (!res.ok) {
    console.error("Resend error:", await res.text());
  }
}
```

---

## `api/support.ts` — Give Back Form

Accepts interest from alumni who want to donate or sponsor a prize. Validates differently depending on `type`, then appends to the `Supporters` tab.

```typescript
// api/support.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { v4 as uuid } from "uuid";
import { appendRow } from "../lib/sheets";

const ALLOWED_ORIGINS = [
  "https://alumni.bit.camp",
  "http://localhost:3000",
  "http://localhost:5173",
];

const DONATION_RANGES = ["<50", "50-200", "200-500", "500+", "unsure"];
const PREFERRED_YEARS = ["2026", "2027", "unsure"];

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
      // honeypot
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

    // Path-specific validation
    if (type === "donate") {
      if (donation_range && !DONATION_RANGES.includes(donation_range)) {
        return res.status(400).json({ error: "Invalid donation range" });
      }
    }

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
      new Date().toISOString(),
      "FALSE", // contacted — you mark TRUE after following up
    ]);

    return res.status(200).json({ success: true, type });
  } catch (err) {
    console.error("[/api/support] Error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
```

---

## Reading Data (Frontend)

Members and prize data is read by the **frontend** directly from Google Sheets published CSVs — not via the API functions. This keeps the API functions simple (write-only) and avoids unnecessary serverless invocations for reads.

### Publish each tab as CSV

In your Google Sheet: **File → Share → Publish to web → each tab → CSV → Publish**

This gives you public URLs like:

```
https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:csv&sheet=Members
```

### `src/lib/sheets.ts` (frontend read helpers)

```typescript
// src/lib/sheets.ts  (frontend only — no service account needed)
import Papa from "papaparse";

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;
const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=`;

async function fetchCSV<T>(tab: string): Promise<T[]> {
  const res = await fetch(`${base}${tab}`);
  const csv = await res.text();
  const { data } = Papa.parse<T>(csv, { header: true, skipEmptyLines: true });
  return data;
}

export const getMembers = () => fetchCSV<Member>("Members");
export const getPrizes = () => fetchCSV<Prize>("Prizes");
export const getWinners = () => fetchCSV<Winner>("Winners");
```

> **Note:** Only rows where `approved` = `TRUE` should be displayed. Filter in the hook:
>
> ```typescript
> const members = (await getMembers()).filter((m) => m.approved === "TRUE");
> ```

---

## Frontend → API calls

```typescript
// src/lib/api.ts

const API_BASE = "/api"; // same domain — no CORS needed on Vercel

export async function submitJoinForm(data: JoinFormData): Promise<void> {
  const res = await fetch(`${API_BASE}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error ?? "Submission failed");
  }
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error ?? "Submission failed");
  }
}

export async function submitSupportForm(data: SupportFormData): Promise<void> {
  const res = await fetch(`${API_BASE}/support`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error ?? "Submission failed");
  }
}
```

---

## Honeypot Spam Protection

Both forms include a hidden honeypot field. Real users never see it (hidden via CSS); bots fill it in automatically. If it's present in the request body, the server silently returns success without saving anything.

```tsx
{
  /* In your form JSX — hidden from real users */
}
<input
  type="text"
  name="website_url" // join form honeypot
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  className="hidden" // Tailwind: display: none
  {...register("website_url")}
/>;
```

---

## Full File List (backend-related)

```
alumni.bit.camp/
├── api/
│   ├── join.ts           # POST /api/join
│   └── contact.ts        # POST /api/contact
├── lib/
│   └── sheets.ts         # Server-side Sheets API client (googleapis)
├── src/
│   └── lib/
│       ├── sheets.ts     # Frontend CSV read helpers (papaparse)
│       └── api.ts        # fetch() wrappers for /api/join and /api/contact
├── vercel.json           # Routing rules
└── .env.local            # Local env vars (never commit)
```

> Note: `lib/sheets.ts` (root) is server-only (uses `googleapis` + service account).
> `src/lib/sheets.ts` is frontend-only (reads published CSV with `papaparse`).
> Keep them separate — don't import server code into the Vite bundle.

---

## Testing Locally

```bash
# Run everything locally (Vite frontend + API functions)
vercel dev

# Test join endpoint
curl -X POST http://localhost:3000/api/join \
  -H "Content-Type: application/json" \
  -d '{"name":"Zach","email":"zach@test.com","year":"2014","role":"Organizer"}'

# Test contact endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Zach","email":"zach@test.com","subject":"Hello","message":"Test message"}'

# Test support endpoint — donate path
curl -X POST http://localhost:3000/api/support \
  -H "Content-Type: application/json" \
  -d '{"name":"Zach","email":"zach@test.com","type":"donate","donation_range":"200-500","message":"Happy to help!"}'

# Test support endpoint — sponsor path
curl -X POST http://localhost:3000/api/support \
  -H "Content-Type: application/json" \
  -d '{"name":"Zach","email":"zach@test.com","type":"sponsor","prize_name":"The Zach Fogg Award","prize_description":"$200 cash + mentorship session","prize_criteria":"Best use of open source tools","preferred_year":"2026"}'
```

Both should return `{"success":true}` and a new row should appear in your Google Sheet within a second or two.

---

## Environment Variables Summary

| Variable                             | Where used                   | Secret?                 |
| ------------------------------------ | ---------------------------- | ----------------------- |
| `GOOGLE_SHEETS_ID`                   | Both `lib/sheets.ts` files   | No (same as public URL) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`       | Server `lib/sheets.ts` only  | Yes                     |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Server `lib/sheets.ts` only  | Yes — never in frontend |
| `RESEND_API_KEY`                     | `api/contact.ts` only        | Yes                     |
| `ADMIN_EMAIL`                        | `api/contact.ts` only        | No                      |
| `VITE_GOOGLE_SHEETS_ID`              | Frontend `src/lib/sheets.ts` | No (public)             |
| `VITE_DISCORD_INVITE_URL`            | Frontend anywhere            | No                      |

> `GOOGLE_SHEETS_ID` and `VITE_GOOGLE_SHEETS_ID` are the same value — the `VITE_` version gets baked into the frontend bundle by Vite, the non-`VITE_` version is available server-side. Set both in Vercel.
