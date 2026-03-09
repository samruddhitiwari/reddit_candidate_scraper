# Reddit Candidate Finder

A minimal SaaS MVP that discovers Reddit posts where developers are actively looking for internships or junior developer jobs and surfaces them as leads for recruiters.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (Postgres + Auth)
- **Scraper:** Node.js worker using Reddit public JSON API
- **Hosting:** Vercel

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

### 3. Set up the database

Run the SQL in `supabase/schema.sql` in your Supabase SQL editor.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
candidate_finder/
├ src/
│ ├ app/
│ │ ├ layout.tsx          # Root layout
│ │ ├ page.tsx            # Landing page
│ │ ├ login/page.tsx      # Login
│ │ ├ signup/page.tsx     # Signup
│ │ ├ dashboard/
│ │ │ ├ layout.tsx        # Dashboard layout with sidebar
│ │ │ ├ page.tsx          # Leads table
│ │ │ ├ pricing/page.tsx  # Pricing plans
│ │ │ └ settings/page.tsx # Alert preferences
│ │ └ api/
│ │   ├ leads/route.ts    # GET /api/leads
│ │   ├ scrape/route.ts   # POST /api/scrape
│ │   └ preferences/route.ts
│ ├ components/           # Reusable UI components
│ ├ lib/
│ │ ├ supabase/           # Supabase client helpers
│ │ ├ scraper.ts          # Reddit scraping logic
│ │ └ constants.ts        # Keywords, subreddits, role patterns
│ └ middleware.ts          # Auth middleware
├ scripts/
│ ├ cron-scraper.ts       # Standalone scraper worker
│ └ send-digest.ts        # Email digest worker
└ supabase/
  └ schema.sql            # Database schema
```

## Scraper

Run the scraper manually:

```bash
npx tsx scripts/cron-scraper.ts
```

Or trigger via the API:

```bash
curl -X POST http://localhost:3000/api/scrape -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Set the environment variables in the Vercel dashboard.
