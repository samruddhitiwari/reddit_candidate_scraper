import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/scrape-history
 *
 * Returns recent scrape logs so you can see how many times the
 * scraper has run, when, and how many leads each run found.
 */
export async function GET() {
  const supabase = await createClient();

  // Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("scrape_logs")
    .select("*")
    .order("started_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    total_runs: data?.length || 0,
    logs: data,
  });
}
