import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (error && error.code !== "PGRST116") {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return defaults if no preferences exist
    if (!data) {
        return NextResponse.json({
            email_alerts_enabled: false,
            alert_roles: [],
            plan: "free",
        });
    }

    return NextResponse.json(data);
}

export async function PUT(request: Request) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email_alerts_enabled, alert_roles } = body;

    const { data, error } = await supabase
        .from("user_preferences")
        .upsert(
            {
                user_id: user.id,
                email_alerts_enabled,
                alert_roles,
            },
            { onConflict: "user_id" }
        )
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
