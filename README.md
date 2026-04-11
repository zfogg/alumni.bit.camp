# Bitcamp Alumni

A web platform connecting Bitcamp alumni—hackers, organizers, sponsors, and staff—to celebrate eleven years of builders and foster community.

**Live:** https://alumni.bit.camp

## Overview

Bitcamp Alumni is a community hub that:

- **Showcases members** across all Bitcamp years with role-based filtering
- **Celebrates prize winners** across multiple hackathon years
- **Captures alumni profiles** with contact info, GitHub, LinkedIn, and project history
- **Enables sponsorships** for future Bitcamp prizes
- **Manages donations** and community support

All data is stored in a shared Google Sheet, making it easy to update without code changes.

## Tech Stack

- **Frontend:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS 4.2
- **Backend:** Vercel Functions (Node.js)
- **Database:** Google Sheets (via Google Sheets API v4)
- **Deployment:** Vercel
- **Forms:** React Hook Form

## Features

### Pages

| Page       | Purpose                                          |
| ---------- | ------------------------------------------------ |
| `/`        | Hero landing with call-to-action to join         |
| `/about`   | History and mission of Bitcamp                   |
| `/team`    | Directory of approved alumni, filterable by role |
| `/join`    | Form to submit alumni profile for approval       |
| `/prizes`  | Gallery of sponsored prizes and past winners     |
| `/give`    | Sponsorship and donation form                    |
| `/contact` | Contact form for inquiries                       |

### API Endpoints

| Endpoint       | Method | Purpose                              |
| -------------- | ------ | ------------------------------------ |
| `/api/join`    | POST   | Submit alumni profile                |
| `/api/contact` | POST   | Submit contact inquiry               |
| `/api/support` | POST   | Submit sponsorship/donation interest |
| `/api/members` | GET    | List approved alumni                 |
| `/api/prizes`  | GET    | List active prizes                   |
| `/api/winners` | GET    | List all prize winners               |

### Data

All data lives in a shared Google Sheet with tabs for:

- **Members** — Alumni profiles (name, email, role, year, GitHub, LinkedIn, etc.)
- **Contacts** — Inquiry submissions
- **Supporters** — Sponsorship and donation records
- **Prizes** — Sponsored prizes with descriptions
- **Winners** — Prize winners by year and team

Tabs are auto-created if missing; headers are seeded on first write.

## Getting Started

### Prerequisites

- Node.js 20+ (or 24 LTS)
- pnpm 10+
- Google Cloud service account with Sheets API enabled

### Installation

```bash
# Clone and install
git clone https://github.com/zfogg/alumni.bit.camp.git
cd alumni.bit.camp
pnpm install

# Copy env example
cp .env.example .env
```

### Environment Variables

```env
# Google Sheets API
GOOGLE_SHEETS_ID=<spreadsheet-id>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<service-account-email>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<private-key-with-\n>

# Frontend
VITE_GOOGLE_SHEETS_ID=<same-as-above>
VITE_API_BASE_URL=<http://localhost:5173-for-dev>
VITE_DISCORD_INVITE_URL=<discord-invite-link>
```

### Development

```bash
# Start dev server (http://localhost:5173)
pnpm dev

# Type check
npm run build

# Deploy preview to Vercel
vercel

# Deploy to production
vercel --prod
```

## Google Sheets Setup

### Create the Sheet

1. Create a new Google Sheet
2. Note the sheet ID from the URL: `docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
3. Share it with your service account email: `www-***@bitcamp-alumni.iam.gserviceaccount.com`

### Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the Google Sheets API
4. Create a Service Account and generate a private key (JSON)
5. Add the service account email to your Google Sheet with Editor access

### Seed Data

Run the seed script to populate initial data:

```bash
node scripts/seed-prizes-and-winners.js
```

This adds 6 prizes and 18 example winners. Edit `scripts/seed-prizes-and-winners.js` to customize.

## Form Validation & Honeypot Detection

All forms validate input and reject bot submissions:

- **Name:** Required, non-empty
- **Email:** Required, valid email format
- **Year:** At least one year selected
- **Honeypot fields:** `website_url`, `phone`, `company_name` — auto-reject if filled

Honeypot fields are invisible to real users but catch bots.

## Styling & Design

- **Color scheme:** Dark space theme with orange/cream accents
- **Typography:** Handlebars-style display font for headers
- **Layout:** Responsive grid-based design
- **Animations:** Smooth transitions, hover effects, Framer Motion for complex animations

## Deployment

### Vercel Setup

1. Link repo to Vercel: `vercel link`
2. Set environment variables in Vercel dashboard
3. Deploy: `git push` → auto-deploys to preview
4. Production: `vercel --prod` or merge to main

### Build & Functions

- **Frontend:** Built with Vite, deployed to Edge Network
- **API Functions:** Deployed as Vercel Functions with Node.js runtime
- **TypeScript:** Compiled to JS during build; source files (.ts) tracked in git

Vercel automatically compiles TypeScript functions—no manual build step needed.

## Project Structure

```
alumni.bit.camp/
├── src/                          # React frontend
│   ├── pages/                    # Route pages (Home, Team, Join, etc.)
│   ├── components/               # Reusable UI components
│   │   ├── layout/              # Navigation, Footer, Layout wrapper
│   │   └── ui/                  # Input, Button, Card, etc.
│   ├── lib/                     # Client-side helpers (API calls, Sheets fetch)
│   └── styles/                  # Global CSS (Tailwind)
├── api/                          # Vercel Functions (serverless endpoints)
│   ├── join.ts                  # POST /api/join
│   ├── contact.ts               # POST /api/contact
│   ├── support.ts               # POST /api/support
│   ├── members.ts               # GET /api/members
│   ├── prizes.ts                # GET /api/prizes
│   └── winners.ts               # GET /api/winners
├── lib/                          # Backend shared code
│   └── sheets.ts                # Google Sheets API client
├── scripts/                      # Utility scripts
│   └── seed-prizes-and-winners.js
├── vite.config.ts               # Vite config for frontend
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies & scripts
└── .env                         # Local env (gitignored)
```

## Adding Members

### Method 1: Web Form

1. Visit `/join`
2. Fill form with name, email, year(s), role, school, etc.
3. Form auto-validates and submits to spreadsheet
4. Admin approves in spreadsheet: set `approved` column to "TRUE"

### Method 2: Direct Spreadsheet

1. Open Members tab
2. Add row with columns: `id`, `name`, `email`, `year`, `role`, `school`, `what_i_did`, `headshot_url`, `linkedin`, `github`, `website`, `created_at`, `featured`, `approved`
3. Set `approved` to "TRUE"
4. Team page auto-refreshes

## Adding Prizes & Winners

### Prizes

1. Open Prizes tab
2. Add row: `prize_id`, `prize_name`, `sponsor_name`, `description`, `active`
3. Set `active` to "TRUE"
4. Prizes page auto-refreshes

### Winners

1. Open Winners tab
2. Add row: `prize_id`, `year`, `team_name`, `project_name`, `description`, `members`
3. Seed example winners: `node scripts/seed-prizes-and-winners.js`

## Contributing

### Code Style

- Use TypeScript for type safety
- Follow React hooks best practices
- Use Tailwind for styling (no custom CSS unless necessary)
- Format with Prettier (auto-run on commit)
- Lint with ESLint (auto-run on commit)

### Branching

- `main` = production (auto-deploys to Vercel)
- Feature branches for new work
- Squash and merge to main

### Commit Messages

```
Add X feature / Fix Y bug / Update Z docs

Detailed explanation of why and how (optional).

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

## Troubleshooting

### Forms not submitting?

- Check `.env` has correct `GOOGLE_SHEETS_ID` and service account credentials
- Check service account has Editor access to spreadsheet
- Check browser console for errors

### Team/Prizes page shows "Loading..."?

- Check API endpoints: `curl https://alumni.bit.camp/api/members`
- Check spreadsheet has data and correct column headers
- Check service account has read access

### Build fails?

- Run `pnpm install` to ensure dependencies
- Run `npm run build` to see full error
- Check `tsconfig.json` and `vite.config.ts` are correct

## License

Copyright © 2014-2026 Bitcamp. All rights reserved.

---

**Questions?** Open an issue or reach out at contact form on site.
