# Bitcamp Alumni Website — Build Plan

> Vite · React 18 · TypeScript · pnpm · Tailwind CSS

---

## Overview

A **6-page React SPA** with a dark cosmic theme, animated starfields, polaroid-style member cards, and data-driven prize/member galleries pulled from Google Sheets. 4-phase approach across ~2 weeks.

**Key decisions upfront:**

- **Hosted on Vercel** with custom domain `alumni.bit.camp`; push to `main` → auto-deploy via Vercel's GitHub integration
- **Node.js serverless functions** in `api/` handle form submissions and write to Google Sheets
- Custom `Starfield` canvas component for the ambient background
- Type-safe data layer with TypeScript interfaces mirroring Google Sheet structure
- All theme tokens defined once in `tailwind.config.ts` — never hardcode colors
- React Hook Form + Zod for all forms
- Public reads from Google Sheets published CSV (frontend); writes via Node.js API functions (server-side)

---

## File & Folder Structure

```
alumni.bit.camp/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx           # Header nav with logo, links
│   │   │   ├── Footer.tsx               # Footer with logo, links, social (Discord icon prominent)
│   │   │   └── PageWrapper.tsx          # Common page container
│   │   ├── ui/
│   │   │   ├── Button.tsx               # Primary, secondary, ghost variants
│   │   │   ├── Card.tsx                 # Base card component
│   │   │   ├── Badge.tsx                # Role/year badges
│   │   │   ├── Input.tsx                # Form input field
│   │   │   ├── TextArea.tsx             # Form textarea
│   │   │   ├── Sparkle.tsx              # 4-point star glyph
│   │   │   ├── OrbitalArc.tsx           # Decorative SVG ellipse
│   │   │   ├── MemberCard.tsx           # Polaroid-style member card
│   │   │   ├── PrizeSection.tsx         # Prize sponsor section + winners
│   │   │   ├── Pill.tsx                 # Rounded pill button variant
│   │   │   └── Modal.tsx                # Success/error modal
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx          # Home hero with starfield
│   │   │   ├── StatsRow.tsx             # Animated stats (years, hackers...)
│   │   │   ├── JoinBanner.tsx           # Inline join form on homepage + Discord "prefer Discord?" link below
│   │   │   ├── FeaturedGrid.tsx         # 4-up featured alumni grid
│   │   │   ├── TimelineStrip.tsx        # About page year timeline
│   │   │   ├── ByTheNumbers.tsx         # About page stats column
│   │   │   ├── MemberGrid.tsx           # Team page with filter tabs
│   │   │   ├── PrizesList.tsx           # Prizes page sponsor sections
│   │   │   ├── GivePathCards.tsx        # Donate vs Sponsor a Prize choice cards
│   │   │   └── SupportForm.tsx          # Adaptive form — fields shift by chosen path
│   │   ├── Starfield.tsx                # Animated canvas starfield
│   │   └── ErrorBoundary.tsx            # React error boundary
│   ├── pages/
│   │   ├── Home.tsx                     # /
│   │   ├── About.tsx                    # /about
│   │   ├── Join.tsx                     # /join
│   │   ├── Team.tsx                     # /team
│   │   ├── Prizes.tsx                   # /prizes
│   │   ├── Give.tsx                     # /give — donate or sponsor a prize
│   │   ├── Contact.tsx                  # /contact
│   │   └── NotFound.tsx                 # 404
│   ├── lib/
│   │   ├── sheets.ts                    # Frontend CSV read helpers (papaparse)
│   │   ├── api.ts                       # fetch() wrappers for /api/* endpoints
│   │   └── constants.ts                 # Site-wide constants
│   ├── hooks/
│   │   ├── useMembers.ts                # Fetch + cache members
│   │   ├── usePrizes.ts                 # Fetch + cache prizes and winners from Sheets CSV
│   │   └── useIsMobile.ts               # Mobile detection
│   │   └── useIsMobile.ts               # Mobile detection
│   ├── types/
│   │   └── index.ts                     # All TypeScript interfaces
│   ├── styles/
│   │   └── globals.css                  # Tailwind directives, CSS vars
│   ├── App.tsx                          # Router, layout shell
│   └── main.tsx                         # Entry point
├── .github/
├── api/                                 # Vercel serverless functions (Node.js)
│   ├── join.ts                          # POST /api/join → appends to Google Sheets
│   ├── contact.ts                       # POST /api/contact → appends to Google Sheets
│   └── support.ts                       # POST /api/support → appends to Supporters tab
├── lib/
│   └── sheets.ts                        # Server-side Google Sheets client (googleapis)
├── vercel.json                          # SPA routing + function config
├── public/
│   ├── logo-placeholder.svg
│   ├── favicon.ico
│   └── og-image.png                     # 1200×630 social share image
├── .env.local.example
├── tailwind.config.ts                   ← START HERE
├── vite.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        space: "#010218", // Page background
        orange: "#FF6F3F", // Primary CTA, accent, active nav
        cream: "#FFF7EB", // Body text on dark
        teal: "#1A2E33", // Card surfaces
        star: "#FFD580", // Sparkle, decorative
        muted: "#A7A7A7", // Secondary text
      },
      fontFamily: {
        display: ["Aleo", "serif"], // Titles, heroes, warmth
        body: ["Avenir", "Inter", "sans-serif"], // Body, storytelling, long-form
        accent: ["Caveat", "cursive"], // Handwritten accent, sparingly
      },
      borderRadius: {
        card: "12px",
        pill: "9999px",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
} satisfies Config;
```

---

## TypeScript Types

```typescript
// src/types/index.ts

export type Role = "Hacker" | "Organizer" | "Sponsor" | "Staff" | "Other";

export interface Member {
  id: string;
  name: string;
  email: string; // Private — never display publicly
  year: number | number[];
  role: Role;
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

export interface Prize {
  prize_id: string; // e.g. "zach-prize"
  prize_name: string; // e.g. "Zach's Prize"
  sponsor_name: string;
  description: string; // What the prize is for
  active: boolean;
}

export interface Winner {
  prize_id: string;
  year: number;
  team_name: string;
  project_name: string;
  description: string;
  members: string; // Comma-separated names
}

export interface JoinFormData {
  name: string;
  email: string;
  year: string;
  role: Role;
  school?: string;
  what_i_did?: string;
  headshot_url?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

---

## Key Components & Props

### `Button.tsx`

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"; // default: primary
  size?: "sm" | "md" | "lg"; // default: md
  isLoading?: boolean;
}
// primary:   bg-orange text-white rounded-pill
// secondary: bg-teal text-white rounded-pill
// ghost:     border-orange text-orange transparent bg
```

### `MemberCard.tsx`

```typescript
interface MemberCardProps {
  member: Member;
  rotation?: number; // -3 to 3 degrees, for polaroid effect
}
// White border, slight rotation (inline style), name/role/year below
```

### `Starfield.tsx`

```typescript
interface StarfieldProps {
  count?: number; // default 150
  speed?: number; // default 0.5, reduce on mobile
  className?: string;
}
// Canvas-based; useEffect with requestAnimationFrame + cleanup on unmount
```

### `OrbitalArc.tsx`

```typescript
interface OrbitalArcProps {
  rx: number; // horizontal radius
  ry: number; // vertical radius
  opacity?: number;
  className?: string;
}
// SVG ellipse used decoratively behind section headings
```

### `PrizeSection.tsx`

```typescript
interface PrizeSectionProps {
  prize: Prize;
  winners: Winner[];
}
// Groups all winners by year under a prize sponsor banner
```

---

## Phase 1: Foundation & Scaffold (Days 1–3)

**Build in this exact order:**

1. `pnpm create vite . --template react-ts` (in-place)
2. Install deps:
   ```bash
   pnpm add react-router-dom react-hook-form zod framer-motion
   pnpm add -D tailwindcss postcss autoprefixer @types/node
   pnpm exec tailwindcss init -p
   ```
3. Wire `tailwind.config.ts` with brand tokens (above)
4. Set up `globals.css` with `@tailwind` directives + Google Fonts import (Aleo for display, Caveat for accent; Inter as Avenir fallback)
5. Build `src/types/index.ts`
6. Build `ui/Button.tsx`
7. Build `ui/Card.tsx`
8. Build `ui/Input.tsx` and `ui/TextArea.tsx`
9. Build `ui/Badge.tsx`
10. Build `ui/Sparkle.tsx` (SVG 4-point star)
11. Build `ui/OrbitalArc.tsx` (SVG ellipse)
12. Build `layout/Navigation.tsx`
13. Build `layout/Footer.tsx`
14. Build `layout/PageWrapper.tsx`
15. Build `components/Starfield.tsx` (canvas + requestAnimationFrame)
16. Wire `App.tsx` with React Router and all 6 routes
17. Stub out all 6 page files

---

## Phase 2: Pages & Layouts (Days 4–7)

**Build sections and pages:**

1. `sections/HeroSection.tsx` — Starfield bg, Aleo headline (`font-display`), CTA buttons, orbital arc
2. `sections/StatsRow.tsx` — 4 animated counters
3. `sections/JoinBanner.tsx` — inline mini-form (name/email/year → submit)
4. `sections/FeaturedGrid.tsx` — 4-up grid with MemberCard
5. `pages/Home.tsx` — assemble all home sections
6. `pages/About.tsx` — two-column: content + ByTheNumbers; TimelineStrip at bottom
7. `sections/TimelineStrip.tsx` — horizontal year dots (2014 → present)
8. `pages/Join.tsx` — full form with React Hook Form, all fields, Zod schema
9. `ui/MemberCard.tsx` — polaroid style (white border, slight rotation, shadow)
10. `sections/MemberGrid.tsx` — filter tabs (All/Organizers/Hackers/Sponsors/Staff) + grid
11. `pages/Team.tsx` — assemble with mock data
12. `ui/PrizeSection.tsx` — prize header + winner rows
13. `pages/Prizes.tsx` — list of PrizeSections
14. `pages/Contact.tsx` — form + 4 info cards
15. `sections/GivePathCards.tsx` — two-up cards (Donate / Sponsor), toggle selects active path
16. `sections/SupportForm.tsx` — shared name/email fields + conditional fields per path
17. `pages/Give.tsx` — hero pitch, 100% callout, path cards, adaptive form, social proof strip
18. `pages/NotFound.tsx` — 404 with campfire mascot

---

## Phase 3: Data Integration (Days 8–11)

### Google Sheets setup

1. Create a Google Sheet with 3 tabs: **Members**, **Prizes**, **Winners**
2. Create a Google Cloud Service Account, enable Sheets API, download JSON key
3. Store key in `GOOGLE_SHEETS_PRIVATE_KEY` etc. env vars

### Implementation

1. `lib/sheets.ts`:
   - `getMembers()` — reads Members tab, filters `approved=true`
   - `getPrizes()` — reads Prizes tab, filters `active=true`
   - `getWinners()` — reads Winners tab
2. `api/members.ts` — GET `/api/members` (reads + returns JSON)
3. `api/join.ts` — POST `/api/join` (appends row to Members tab)
4. `api/contact.ts` — POST `/api/contact` (sends email via Resend)
5. `hooks/useMembers.ts` — fetch `/api/members`, cache in state
6. `hooks/usePrizes.ts` — fetch prizes and winners from published Sheets CSV, cache in state
7. Wire `Team.tsx` to `useMembers`
8. Wire `Prizes.tsx` to `usePrizes`
9. Wire `Join.tsx` submit to `POST /api/join`
10. Wire `Contact.tsx` submit to `POST /api/contact`
11. Create `api/support.ts` — validate, branch on `type`, append to Supporters tab
12. Wire `Give.tsx` form submit to `POST /api/support`
13. Add all env vars as GitHub Actions Secrets; push to main and verify deploy

### Required env vars

```
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
RESEND_API_KEY=
ADMIN_EMAIL=                         # Where contact notifications go
VITE_DISCORD_INVITE_URL=             # Public Discord invite link (e.g. discord.gg/xxxx)
```

---

## Phase 4: Polish & Deploy (Days 12–14)

1. Page transition animations with `AnimatePresence` (Framer Motion)
2. Hover states — cards scale up (`scale-105`), buttons glow
3. Loading skeletons for Team and Prizes pages
4. Success/error modal for form submissions
5. Optimize Starfield — reduce count on mobile, cancel RAF on unmount
6. Accessibility — alt text on all images, ARIA labels on inputs, keyboard nav
7. SEO — React Helmet (or `<head>` in index.html), og:image, description per page
8. Lighthouse audit — target 90+ on Performance, Accessibility, SEO
9. Final visual QA against `bitcamp-alumni-design.pdf`
10. Push to main → GitHub Actions deploys to alumni.bit.camp automatically

---

## Admin Workflows (No-Code Required)

| Task                | How                                                      |
| ------------------- | -------------------------------------------------------- |
| Add a member        | Add row to **Members** Google Sheet, set `approved=TRUE` |
| Feature on homepage | Set `featured=TRUE` in Members sheet                     |
| Add a prize winner  | Add row to **Winners** sheet with `prize_id` and `year`  |
| Add a new prize     | Add row to **Prizes** sheet                              |
| Disable a prize     | Set `active=FALSE` in Prizes sheet                       |

---

## Gotchas & Decisions

**Starfield on mobile** — Canvas animations are expensive. Use `useIsMobile()` hook to halve the star count or switch to a CSS keyframe fallback on small screens.

**Google Sheets read latency** — Published CSV fetches take ~300–600ms. Fetch once on component mount and cache in React state. The published CSV refreshes every ~5 minutes on Google's end, which is fine for this use case.

**Polaroid card rotation** — Generate rotation per card deterministically (e.g., based on member id hash) so it's consistent across renders but looks random. Range: -3 to +3 degrees.

**Headshots** — Sheets API can't host images. Accept Google Drive links, Cloudinary URLs, or GitHub avatars from users. Display a placeholder avatar (initials in a colored circle) when no headshot provided.

**Spam on forms** — Both API endpoints implement a hidden honeypot field. Real users never see it; bots fill it in. Server silently succeeds without saving anything if the honeypot is present.

**Font loading** — Load Aleo (display) and Caveat (accent) via Google Fonts `<link>` in `index.html`. Inter is the system fallback for Avenir. Add `font-display: swap` to avoid FOUT.

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.24.0",
    "react-hook-form": "^7.52.0",
    "zod": "^3.23.0",
    "framer-motion": "^11.0.0",
    "@hookform/resolvers": "^3.6.0",
    "papaparse": "^5.4.0",
    "googleapis": "^144.0.0",
    "uuid": "^10.0.0"
  },
  "devDependencies": {
    "vite": "^5.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.5.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/papaparse": "^5.3.0",
    "@types/uuid": "^10.0.0",
    "@vercel/node": "^3.2.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## Timeline

| Phase          | Days  | Output                                                 |
| -------------- | ----- | ------------------------------------------------------ |
| 1 · Foundation | 1–3   | Scaffold, Tailwind config, UI components, layout shell |
| 2 · Pages      | 4–7   | All 6 pages with layouts, routing, mock data           |
| 3 · Data       | 8–11  | Google Sheets integration, APIs, live forms            |
| 4 · Polish     | 12–14 | Animations, a11y, SEO, Vercel production deploy        |
