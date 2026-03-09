/**
 * Daily Digest Email Worker
 *
 * Run via: npx tsx scripts/send-digest.ts
 *
 * This script:
 * 1. Fetches users who have email_alerts_enabled = true
 * 2. Fetches leads from the last 24 hours matching their preferred roles
 * 3. Sends a digest email (mock/placeholder - would use Resend in production)
 */

import { createClient } from "@supabase/supabase-js";

async function main() {
    console.log("📧 Starting daily digest email worker...");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("❌ Missing environment variables");
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get users with email alerts enabled
    const { data: users, error: usersError } = await supabase
        .from("user_preferences")
        .select("user_id, alert_roles")
        .eq("email_alerts_enabled", true);

    if (usersError) {
        console.error("❌ Error fetching users:", usersError.message);
        return;
    }

    if (!users || users.length === 0) {
        console.log("No users with email alerts enabled");
        return;
    }

    console.log(`Found ${users.length} users with alerts enabled`);

    // Get leads from last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: leads, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .gte("created_at", yesterday.toISOString())
        .order("created_at", { ascending: false });

    if (leadsError) {
        console.error("❌ Error fetching leads:", leadsError.message);
        return;
    }

    if (!leads || leads.length === 0) {
        console.log("No new leads in the last 24 hours");
        return;
    }

    console.log(`Found ${leads.length} new leads in the last 24 hours`);

    // Send digests to each user
    for (const user of users) {
        // Filter leads by user's preferred roles
        const userRoles: string[] = user.alert_roles || [];
        const relevantLeads =
            userRoles.length > 0
                ? leads.filter((l: { detected_role: string }) => userRoles.includes(l.detected_role))
                : leads;

        if (relevantLeads.length === 0) {
            console.log(`  No relevant leads for user ${user.user_id}`);
            continue;
        }

        // Get user email from auth.users
        const { data: authUser } = await supabase.auth.admin.getUserById(user.user_id);

        if (!authUser?.user?.email) {
            console.log(`  No email found for user ${user.user_id}`);
            continue;
        }

        const email = authUser.user.email;

        // ===== EMAIL SENDING (PLACEHOLDER) =====
        // In production, replace with Resend:
        //
        // import { Resend } from 'resend';
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send({
        //   from: 'alerts@candidatefinder.com',
        //   to: email,
        //   subject: `${relevantLeads.length} New Candidate Leads Today`,
        //   html: buildEmailHtml(relevantLeads),
        // });

        console.log(`  📬 Would send digest to ${email}:`);
        console.log(`     ${relevantLeads.length} leads matching roles: ${userRoles.length > 0 ? userRoles.join(", ") : "all"}`);
        relevantLeads.slice(0, 5).forEach((lead: { detected_role: string; post_title: string; subreddit: string }) => {
            console.log(`     - [${lead.detected_role}] ${lead.post_title} (r/${lead.subreddit})`);
        });
        if (relevantLeads.length > 5) {
            console.log(`     ... and ${relevantLeads.length - 5} more`);
        }
    }

    console.log("\n🏁 Digest worker complete!");
}

main().catch(console.error);
