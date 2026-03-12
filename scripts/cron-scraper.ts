/**
 * Cron Scraper Worker
 *
 * This script can be run standalone via:
 *   npx tsx scripts/cron-scraper.ts
 *
 * Or triggered via the /api/scrape endpoint from an external cron service.
 *
 * It scrapes Reddit for candidate-related posts and saves them to Supabase.
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// Load .env.local so the script works standalone (Next.js only loads it for dev/build)
function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

// ---- Inline config (mirrors src/lib/constants.ts for standalone use) ----

const SEARCH_KEYWORDS = [
    "looking for internship",
    "looking for frontend job",
    "looking for backend job",
    "looking for ML internship",
    "looking for junior developer role",
    "looking for junior developer job",
    "looking for fullstack job",
    "seeking internship",
    "seeking junior developer",
    "looking for entry level developer",
];

const TARGET_SUBREDDITS = [
    "cscareerquestions",
    "forhire",
    "internships",
    "learnprogramming",
    "remotejs",
    "webdev",
];

const ROLE_PATTERNS: { role: string; patterns: string[] }[] = [
    { role: "Frontend", patterns: ["frontend", "front-end", "react", "vue", "angular", "css", "ui developer"] },
    { role: "Backend", patterns: ["backend", "back-end", "node", "django", "flask", "express", "api developer"] },
    { role: "Fullstack", patterns: ["fullstack", "full-stack", "full stack"] },
    { role: "ML/AI", patterns: ["machine learning", "ml ", "deep learning", "ai ", "nlp", "computer vision"] },
    { role: "Data Science", patterns: ["data science", "data analyst", "data engineering"] },
    { role: "DevOps", patterns: ["devops", "cloud", "aws", "kubernetes", "docker"] },
    { role: "Mobile", patterns: ["mobile", "ios", "android", "react native", "flutter"] },
    { role: "General SWE", patterns: ["software engineer", "developer", "programmer", "swe"] },
];

function detectRole(text: string): string {
    const lower = text.toLowerCase();
    for (const { role, patterns } of ROLE_PATTERNS) {
        for (const p of patterns) {
            if (lower.includes(p)) return role;
        }
    }
    return "General SWE";
}

// ---- Scraper ----

interface RedditPost {
    reddit_username: string;
    post_title: string;
    post_url: string;
    subreddit: string;
    detected_role: string;
    keyword_matched: string;
    score: number;
    created_at: string;
}

async function searchSubreddit(subreddit: string, keyword: string): Promise<RedditPost[]> {
    const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(keyword)}&restrict_sr=1&sort=new&t=day&limit=25`;

    try {
        const res = await fetch(url, { headers: { "User-Agent": "CandidateFinder/1.0" } });
        if (!res.ok) return [];

        const data = await res.json();
        return data.data.children.map((child: { data: { author: string; title: string; permalink: string; subreddit: string; score: number; created_utc: number; selftext: string } }) => {
            const p = child.data;
            return {
                reddit_username: p.author,
                post_title: p.title,
                post_url: `https://www.reddit.com${p.permalink}`,
                subreddit: p.subreddit,
                detected_role: detectRole(`${p.title} ${p.selftext}`),
                keyword_matched: keyword,
                score: p.score,
                created_at: new Date(p.created_utc * 1000).toISOString(),
            };
        });
    } catch {
        return [];
    }
}

async function main() {
    console.log("🚀 Starting Reddit scrape...");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const allPosts: RedditPost[] = [];
    const seenUrls = new Set<string>();

    for (const sub of TARGET_SUBREDDITS) {
        for (const kw of SEARCH_KEYWORDS) {
            console.log(`  Searching r/${sub} for "${kw}"...`);
            const posts = await searchSubreddit(sub, kw);

            for (const post of posts) {
                if (!seenUrls.has(post.post_url)) {
                    seenUrls.add(post.post_url);
                    allPosts.push(post);
                }
            }

            // Rate limit
            await new Promise((r) => setTimeout(r, 1000));
        }
    }

    console.log(`\n📊 Found ${allPosts.length} unique posts`);

    if (allPosts.length > 0) {
        const { error } = await supabase
            .from("leads")
            .upsert(allPosts, { onConflict: "post_url", ignoreDuplicates: true });

        if (error) {
            console.error("❌ Error saving to Supabase:", error.message);
        } else {
            console.log(`✅ Saved ${allPosts.length} leads to Supabase`);
        }
    }

    console.log("🏁 Scrape complete!");
}

main().catch(console.error);
