import { NextResponse } from "next/server";
import { scrapeReddit, saveLeadsToSupabase } from "@/lib/scraper";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Shared scrape handler.
 * Logs every run to the `scrape_logs` table for tracking.
 */
async function runScrape(source: "api" | "cron") {
  const supabase = createServiceClient();
  const startTime = Date.now();

  // Create log entry
  const { data: logEntry } = await supabase
    .from("scrape_logs")
    .insert({ source, status: "running" })
    .select("id")
    .single();

  const logId = logEntry?.id;

  try {
    console.log(`Starting Reddit scrape (source: ${source})...`);
    const posts = await scrapeReddit();
    const result = await saveLeadsToSupabase(posts, supabase);
    const durationMs = Date.now() - startTime;

    // Update log entry with results
    if (logId) {
      await supabase
        .from("scrape_logs")
        .update({
          finished_at: new Date().toISOString(),
          leads_found: posts.length,
          leads_inserted: result.inserted,
          status: "success",
          duration_ms: durationMs,
        })
        .eq("id", logId);
    }

    return NextResponse.json({
      success: true,
      scraped: posts.length,
      duration_ms: durationMs,
      ...result,
    });
  } catch (error) {
    const durationMs = Date.now() - startTime;

    // Log the error
    if (logId) {
      await supabase
        .from("scrape_logs")
        .update({
          finished_at: new Date().toISOString(),
          status: "error",
          error_message: String(error),
          duration_ms: durationMs,
        })
        .eq("id", logId);
    }

    console.error("Scrape error:", error);
    return NextResponse.json(
      { error: "Scrape failed", details: String(error) },
      { status: 500 }
    );
  }
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
  return runScrape("cron");
}

// POST – for manual triggers (e.g. curl, dashboard button)
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return runScrape("api");
}
