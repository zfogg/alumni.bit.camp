# Bitcamp Alumni Website — Requirements & Spec

> alumni.bit.camp · Vite + React + TypeScript + pnpm

---

## Project Overview

A website for the alumni community of [Bitcamp](https://bit.camp) — the University of Maryland's annual hackathon, founded in 2014. The site celebrates 11+ years of hackers, organizers, sponsors, and event staff, and gives them a permanent gathering place.

**Anyone who has ever been part of a Bitcamp can join** — hacker, organizer, sponsor, or event staff.

---

## Design System

See `design-philosophy.md` and `bitcamp-alumni-design.pdf` for the full visual design system.

### Colors

| Token            | Hex       | Use                             |
| ---------------- | --------- | ------------------------------- |
| `--color-space`  | `#010218` | Page background                 |
| `--color-orange` | `#FF6F3F` | Primary CTA, accent, active nav |
| `--color-cream`  | `#FFF7EB` | Body text on dark               |
| `--color-teal`   | `#1A2E33` | Card surfaces, elevated UI      |
| `--color-white`  | `#FFFFFF` | Headings, icons                 |
| `--color-muted`  | `#A7A7A7` | Secondary text                  |
| `--color-star`   | `#FFD580` | Sparkle, decorative accents     |

### Fonts

| Role    | Font                          | Use                                |
| ------- | ----------------------------- | ---------------------------------- |
| Display | Aleo (Google Fonts)           | Titles, heroes, human warmth       |
| Body    | Avenir / Inter (Google Fonts) | Body text, storytelling, long-form |
| Accent  | Caveat (Google Fonts)         | Handwritten accent, used sparingly |

### Key UI Patterns

- **Starfield background** — subtle CSS animation on `#010218`
- **Orbital arcs** — SVG ellipses as decorative section accents
- **Sparkle glyphs** — 4-point star decorations on headings
- **Rounded cards** — `border-radius: 12px`, `bg: #1A2E33`
- **Polaroid photos** — white border, slight rotation, box-shadow on team cards
- **Pill buttons** — `border-radius: 9999px`, orange primary, teal secondary

---

## Pages & Features

### Must Have

#### 1. Homepage (`/`)

- **Hero section** with animated starfield background
  - Large "Bitcamp Alumni" headline (Caveat display font)
  - Tagline: "Eleven years of builders. One community."
  - Two CTAs: "Join Now" (primary) + "Learn More" (ghost)
  - Orbital arc decoration and sparkle glyphs
- **Stats row**: Years running · Hackers per year · Alumni connected · Ideas spawned
- **Join CTA banner** — inline mini-form (name, email, year, role) with submit → saves to Google Sheet
  - Below the form: a secondary prompt — _"Prefer Discord? [Join our server →](discord-invite-url)"_ — links to the alumni Discord server
- **Featured Alumni grid** — 4-up card grid with avatar, name, role, Bitcamp year
- **Footer** — logo, nav links, social icons (including Discord), copyright
  - Discord invite link is a prominent icon/link in the footer alongside other social links

#### 2. About / Info Page (`/about`)

Content explaining:

- **What is Bitcamp?** — history, scale (1,400+ hackers, largest East Coast collegiate hackathon), the origin of the name
- **Why this group exists** — community, mentorship, memory, giving back
- **Who can join** — hackers, organizers, sponsors, event staff (anyone who's ever been part of a Bitcamp)
- **Timeline strip** — visual year-by-year history of Bitcamp (2014–present)
- **By the Numbers** — stats column with key figures

#### 3. Join Page (`/join`)

Full alumni signup form. Fields:

- Name (required)
- Email (required)
- Year(s) attended (required)
- Role: Hacker / Organizer / Sponsor / Event Staff / Other
- School / Organization
- What you built or did at Bitcamp (short text)
- Headshot upload (optional)
- LinkedIn / GitHub / personal site (optional)

On submit → saves row to **Google Sheet** (via Google Sheets API or a simple serverless function).

Privacy note: "Your info is saved to a private spreadsheet. We'll never share it without permission."

### Should Have

#### 4. Team / Who We Are Page (`/team`)

- **Filter tabs** by role: All / Organizers / Hackers / Sponsors / Staff
- **Member cards** in a responsive grid
  - Polaroid-style: slightly rotated white border around photo
  - Name, role, Bitcamp year, school/org
  - Short bio or what they built
- **"Add yourself" CTA** at bottom of the page
- Admin can add new members by adding a row to the Google Sheet — no code required

#### 5. Prize Hall of Fame (`/prizes`)

- Prizes are grouped **by sponsor/prize-giver** (e.g., "Zach's Prize", "Gurpreet's Prize")
- Each prize section shows:
  - Prize name and what it's for
  - Winner rows: year · team name · project name · short description
- **Admin workflow**: Prize givers add winners via a connected Google Sheet tab — page reads and renders from it
- Optional: expandable/collapsible years within each prize section

#### 6. Contact Page (`/contact`)

- Contact form: Name, Email, Subject, Message
- On submit → sends email notification to admin (via **Resend** or **Nodemailer** serverless function)
- Contact info cards: email, Discord server link, social links, how to sponsor a prize
- Notification confirmation message on send

#### 7. Logo placeholder

- Navigation and footer include a designated slot for the Bitcamp Alumni logo
- Until a logo exists, use the 🔥 flame emoji + "Bitcamp Alumni" wordmark
- Logo drop-in via a single component swap when ready

#### 7. Give Back Page (`/give`)

A persuasive page inviting alumni to contribute to the community in one of two ways: a **monetary donation** to Bitcamp, or **sponsoring a prize** at the next Bitcamp. The page makes clear that 100% of donations go directly to Bitcamp.

**Hero / pitch section**

- Emotionally resonant headline (Aleo display): e.g. _"You got something from Bitcamp. Give something back."_
- 2–3 sentences on why this matters: keeping Bitcamp free, funding prizes, supporting the next generation of hackers
- Prominent callout: **"100% of donations go directly to Bitcamp."**

**Two-path layout** — side by side cards, each with a distinct CTA:

| Donate                             | Sponsor a Prize                              |
| ---------------------------------- | -------------------------------------------- |
| Give any amount to support Bitcamp | Put your name on a prize at the next Bitcamp |
| One-time or recurring              | Your prize, your criteria                    |
| 100% goes to Bitcamp               | Winners remember you forever                 |

**Interest form** — a single form that adapts based on which path the user selects:

_Both paths collect:_

- Name (required)
- Email (required)
- Which option: **Donate** or **Sponsor a Prize** (required — toggle/radio, controls which fields appear below)

_Donate path (additional fields):_

- Rough donation range: `< $50` / `$50–$200` / `$200–$500` / `$500+` / `Not sure yet` (select)
- Message / note to the organizers (optional textarea)

_Sponsor a Prize path (additional fields):_

- Prize name — what should it be called? e.g. _"The Zach Fogg Award for Most Creative Use of Open Source"_ (required)
- What will you give the winners? — describe the prize: cash, merch, experience, mentorship, etc. (required textarea)
- Prize criteria — what kind of hack / achievement should win it? (required textarea)
- Preferred Bitcamp year — `2026` / `2027` / `Not sure` (select)

On submit → saves row to **`Supporters`** tab in Google Sheets via `POST /api/support`

Confirmation message:

- Donate: _"Thanks! We'll be in touch soon with details on how to contribute."_
- Sponsor: _"Amazing — your prize is going to mean a lot to someone. We'll reach out to lock in the details."_

**Social proof strip** (between pitch and form)

- A few short pull-quotes from alumni who've donated or sponsored prizes before
- Static content, no data dependency

**Fine print**

- Donations are not currently tax-deductible (unless that changes)
- This form expresses interest only — no payment is collected here

### Could Have

#### 8. Prize Info Page (`/prizes/info`)

- Detailed page explaining what each alumni prize is
- How to win each prize
- How to become a prize sponsor
- Link to `/give` page to take action

---

## Tech Stack

| Layer           | Choice                | Notes                                  |
| --------------- | --------------------- | -------------------------------------- |
| Build tool      | **Vite**              | Fast dev server, ESM-native            |
| Framework       | **React 18**          | Hooks-based, TypeScript                |
| Language        | **TypeScript**        | Strict mode                            |
| Package manager | **pnpm**              | Fast, disk-efficient                   |
| Styling         | **Tailwind CSS**      | Custom config matching design tokens   |
| Routing         | **React Router v6**   | Client-side SPA routing                |
| Forms           | **React Hook Form**   | + Zod for validation                   |
| Data            | **Google Sheets API** | Members + prize winners (no DB needed) |
| Email           | **Resend**            | Contact form notifications             |
| Animations      | **Framer Motion**     | Page transitions, starfield, sparkles  |
| Hosting         | **Vercel**            | Zero-config deploy from GitHub         |
| Fonts           | **Google Fonts**      | Caveat, Aleo; Avenir fallback = Inter  |

### Recommended project structure

```
alumni.bit.camp/
├── src/
│   ├── components/
│   │   ├── layout/        # Nav, Footer, PageWrapper
│   │   ├── ui/            # Button, Card, Badge, Pill, Input
│   │   ├── sections/      # HeroSection, StatsRow, JoinBanner...
│   │   └── Starfield.tsx  # Animated starfield canvas
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Join.tsx
│   │   ├── Team.tsx
│   │   ├── Prizes.tsx
│   │   └── Contact.tsx
│   ├── lib/
│   │   ├── sheets.ts      # Google Sheets read/write helpers
│   │   └── email.ts       # Resend email helper
│   ├── hooks/
│   │   └── useMembers.ts  # Fetch + cache member data
│   ├── types/
│   │   └── index.ts       # Member, Prize, Winner types
│   └── styles/
│       └── globals.css    # Tailwind base + CSS custom properties
├── api/                   # Vercel serverless functions
│   ├── join.ts            # POST /api/join → writes to Sheets
│   └── contact.ts         # POST /api/contact → sends email via Resend
├── public/
│   └── logo-placeholder.svg
├── tailwind.config.ts     # Extends with brand tokens
├── vite.config.ts
└── package.json
```

---

## Data Model

### Member (Google Sheet: "Members" tab)

| Column       | Type     | Notes                                        |
| ------------ | -------- | -------------------------------------------- |
| id           | string   | Auto UUID                                    |
| name         | string   | Full name                                    |
| email        | string   | Private — not displayed publicly             |
| year         | number   | Bitcamp year(s) attended                     |
| role         | enum     | Hacker / Organizer / Sponsor / Staff / Other |
| school       | string   |                                              |
| what_i_did   | string   | Short bio / project description              |
| headshot_url | string   | Optional Google Drive or Cloudinary URL      |
| linkedin     | string   | Optional                                     |
| github       | string   | Optional                                     |
| website      | string   | Optional                                     |
| created_at   | datetime | Auto                                         |
| featured     | boolean  | Show on homepage featured grid               |
| approved     | boolean  | Admin approval before appearing              |

### Prize (Google Sheet: "Prizes" tab)

| Column       | Type    | Notes                  |
| ------------ | ------- | ---------------------- |
| prize_id     | string  | e.g., `zach-prize`     |
| prize_name   | string  | e.g., "Zach's Prize"   |
| sponsor_name | string  | Alumni who sponsors it |
| description  | string  | What the prize is for  |
| active       | boolean | Show on site           |

### Winner (Google Sheet: "Winners" tab)

| Column       | Type   | Notes                     |
| ------------ | ------ | ------------------------- |
| prize_id     | string | FK to Prizes              |
| year         | number | Bitcamp year              |
| team_name    | string |                           |
| project_name | string |                           |
| description  | string | Short project description |
| members      | string | Comma-separated names     |

### Supporter (Google Sheet: "Supporters" tab)

| Column            | Type     | Notes                                                               |
| ----------------- | -------- | ------------------------------------------------------------------- |
| id                | string   | Auto UUID                                                           |
| name              | string   |                                                                     |
| email             | string   | Private                                                             |
| type              | enum     | `donate` or `sponsor`                                               |
| donation_range    | string   | `<50` / `50-200` / `200-500` / `500+` / `unsure` — donate path only |
| message           | string   | Optional note — donate path only                                    |
| prize_name        | string   | Sponsor path only                                                   |
| prize_description | string   | What winners receive — sponsor path only                            |
| prize_criteria    | string   | What kind of hack should win — sponsor path only                    |
| preferred_year    | string   | `2026` / `2027` / `unsure` — sponsor path only                      |
| created_at        | datetime | Auto                                                                |
| contacted         | boolean  | Admin marks TRUE after following up                                 |

---

## Admin Workflows (No-Code)

- **Add a member**: Add a row to the "Members" Google Sheet → set `approved = true`
- **Add a prize winner**: Add a row to the "Winners" Sheet with the prize_id and year
- **Feature a member on homepage**: Set `featured = true` in the Members sheet
- **Add a new prize**: Add a row to the "Prizes" sheet
- **Follow up with a supporter**: Open "Supporters" tab → find their row → set `contacted = TRUE` when done

The site re-fetches data on build (SSG) or on request (ISR/SSR via Vercel). For real-time updates, set a short revalidation interval (e.g., 60s).

---

## Non-Goals (v1)

- User authentication / login
- Member self-editing after submission
- Real-time chat or forums
- Events calendar
- Paid membership / subscriptions
