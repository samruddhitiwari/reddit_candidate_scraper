import { NextResponse } from "next/server";
import { scrapeReddit, saveLeadsToSupabase } from "@/lib/scraper";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        console.log("Starting Reddit scrape...");
        const posts = await scrapeReddit();

        const supabase = createServiceClient();
        const result = await saveLeadsToSupabase(posts, supabase);

        return NextResponse.json({
            success: true,
            scraped: posts.length,
            ...result,
        });
    } catch (error) {
        console.error("Scrape error:", error);
        return NextResponse.json(
            { error: "Scrape failed", details: String(error) },
            { status: 500 }
        );
    }
}
