import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const subreddit = searchParams.get("subreddit");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const supabase = await createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check user plan and enforce limits
    const { data: prefs } = await supabase
        .from("user_preferences")
        .select("plan")
        .eq("user_id", user.id)
        .single();

    const plan = prefs?.plan || "free";
    const maxLeads = plan === "pro" ? 10000 : 10;

    // Build query
    let query = supabase
        .from("leads")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

    if (role && role !== "all") {
        query = query.eq("detected_role", role);
    }
    if (subreddit && subreddit !== "all") {
        query = query.eq("subreddit", subreddit);
    }
    if (from) {
        query = query.gte("created_at", from);
    }
    if (to) {
        query = query.lte("created_at", to);
    }

    const { data, error, count } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Enforce plan limit
    const limitedData = plan === "free" ? data?.slice(0, maxLeads) : data;

    return NextResponse.json({
        leads: limitedData,
        total: count,
        page,
        limit,
        plan,
        maxLeads,
    });
}
