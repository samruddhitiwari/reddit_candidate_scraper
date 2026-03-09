import { NextResponse } from "next/server";
import { scrapeReddit, saveLeadsToSupabase } from "@/lib/scraper";
import { createServiceClient } from "@/lib/supabase/server";

// Shared scrape handler
async function runScrape() {
  console.log("Starting Reddit scrape...");
  const posts = await scrapeReddit();

  const supabase = createServiceClient();
  const result = await saveLeadsToSupabase(posts, supabase);

  return NextResponse.json({
    success: true,
    scraped: posts.length,
    ...result,
  });
}

// Verify the CRON_SECRET from the Authorization header
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // If no secret is configured, allow (dev mode)
  if (!cronSecret) return true;

  return authHeader === `Bearer ${cronSecret}`;
}

// GET – called by Vercel Cron Jobs
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return await runScrape();
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json(
      { error: "Scrape failed", details: String(error) },
      { status: 500 }
    );
  }
}

// POST – for manual triggers (e.g. curl)
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return await runScrape();
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json(
      { error: "Scrape failed", details: String(error) },
      { status: 500 }
    );
  }
}
