# Deployment Guide

> Vercel · Custom domain `alumni.bit.camp` · Push-to-deploy via GitHub

---

## Architecture Overview

```
git push origin main
        │
        ▼
┌─────────────────────────────────────────┐
│              Vercel                     │
│                                         │
│  Static build (Vite → dist/)            │
│  + Node.js serverless functions (api/)  │
│                                         │
│  alumni.bit.camp/          → React SPA  │
│  alumni.bit.camp/api/join  → Node fn    │
│  alumni.bit.camp/api/contact → Node fn  │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
  Google Sheets       Email (optional)
  (Members tab)       (Resend / Gmail)
  (Contacts tab)
```

Vercel serves both the static React app **and** the Node.js API functions from the same project and domain — no CORS configuration needed, one deploy, one dashboard.

---

## Part 1: Vercel Project Setup

### Connect GitHub repo to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import `github.com/zfogg/alumni.bit.camp`
3. Framework preset: **Vite**
4. Build command: `pnpm build` (Vercel auto-detects pnpm)
5. Output directory: `dist`
6. Click **Deploy**

That's it — Vercel now auto-deploys on every push to `main`.

### Auto-deploy behavior

| Event                    | What happens                                |
| ------------------------ | ------------------------------------------- |
| Push to `main`           | Full production deploy to `alumni.bit.camp` |
| Push to any other branch | Preview deploy on a temporary URL           |
| Open a PR                | Preview deploy linked in the PR             |

---

## Part 2: Custom Domain

### In Vercel dashboard

1. Go to your project → **Settings → Domains**
2. Add `alumni.bit.camp`
3. Vercel will give you a DNS record to add

### DNS record (at your `bit.camp` registrar)

| Type    | Host     | Value                  |
| ------- | -------- | ---------------------- |
| `CNAME` | `alumni` | `cname.vercel-dns.com` |

Vercel provisions a Let's Encrypt TLS cert automatically — HTTPS works within minutes of DNS propagation.

---

## Part 3: Vite Config

With a custom domain, `base` is just `/`:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
});
```

No SPA routing hacks needed — Vercel handles it via `vercel.json`.

---

## Part 4: vercel.json

This file lives at the repo root. It tells Vercel to route all non-API requests to `index.html` (fixing client-side routing) and sets the Node.js runtime for API functions.

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Part 5: Node.js Backend — API Functions

Vercel treats any file in `api/` as a serverless function. Two endpoints are needed:

```
api/
├── join.ts       POST /api/join     — saves member signup to Google Sheets
└── contact.ts    POST /api/contact  — saves contact message to Google Sheets
```

See **`BACKEND.md`** for the full implementation plan and code.

---

## Part 6: Environment Variables

### Set in Vercel dashboard (Settings → Environment Variables)

| Variable                             | What it's for                                          |
| ------------------------------------ | ------------------------------------------------------ |
| `GOOGLE_SHEETS_ID`                   | The spreadsheet ID from the Sheets URL                 |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`       | Service account email from Google Cloud                |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Private key (with `\n` newlines)                       |
| `RESEND_API_KEY`                     | Optional — for contact form email notifications        |
| `ADMIN_EMAIL`                        | Where contact form submissions get emailed             |
| `VITE_DISCORD_INVITE_URL`            | Public Discord invite link (baked into frontend build) |

> `VITE_` prefix = baked into the frontend bundle at build time (safe for public values).
> No prefix = server-only, never exposed to the browser.

### Local dev — `.env.local`

```bash
# .env.local  (never commit this)
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
RESEND_API_KEY=
ADMIN_EMAIL=
VITE_DISCORD_INVITE_URL=https://discord.gg/your-invite
```

```bash
# .env.local.example  (commit this as a template)
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
RESEND_API_KEY=
ADMIN_EMAIL=
VITE_DISCORD_INVITE_URL=
```

---

## Part 7: Local Development

```bash
# Install Vercel CLI (once)
pnpm add -g vercel

# Clone and install
git clone https://github.com/zfogg/alumni.bit.camp.git
cd alumni.bit.camp
pnpm install

# Link to your Vercel project (once)
vercel link

# Pull env vars from Vercel into .env.local (once, then as needed)
vercel env pull .env.local

# Run locally — serves both the Vite frontend and API functions
vercel dev    # http://localhost:3000
```

`vercel dev` is important: it runs the API functions locally (not just the Vite dev server), so you can test form submissions end-to-end without deploying.

---

## Part 8: Deploy Checklist

**First deploy:**

- [ ] Create Vercel project, connect GitHub repo
- [ ] Add `vercel.json` to root of repo
- [ ] Set all environment variables in Vercel dashboard
- [ ] Add custom domain `alumni.bit.camp` in Vercel settings
- [ ] Add CNAME DNS record at registrar
- [ ] Push to `main` — Vercel builds and deploys
- [ ] Verify `https://alumni.bit.camp` loads
- [ ] Test `/team`, `/prizes` routes directly (should not 404)
- [ ] Test join form → verify row appears in Google Sheets Members tab
- [ ] Test contact form → verify row appears in Contacts tab (and email if configured)

**Every subsequent deploy:**

```bash
git add .
git commit -m "your message"
git push origin main
# Vercel deploys automatically — done in ~45 seconds
```

---

## Summary

| Layer                          | Service                     | Cost |
| ------------------------------ | --------------------------- | ---- |
| Static site + API hosting      | Vercel (Hobby)              | Free |
| CI/CD                          | Vercel (GitHub integration) | Free |
| Data store                     | Google Sheets               | Free |
| TLS certificate                | Let's Encrypt via Vercel    | Free |
| Email notifications (optional) | Resend (100/day free)       | Free |

**Total: $0/month.** 🔥
