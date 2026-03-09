import {
    SEARCH_KEYWORDS,
    TARGET_SUBREDDITS,
    detectRole,
} from "./constants";

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

interface RedditApiChild {
    data: {
        author: string;
        title: string;
        permalink: string;
        subreddit: string;
        score: number;
        created_utc: number;
        selftext: string;
    };
}

interface RedditApiResponse {
    data: {
        children: RedditApiChild[];
    };
}

// Search a single subreddit for a single keyword
async function searchSubreddit(
    subreddit: string,
    keyword: string
): Promise<RedditPost[]> {
    const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(
        keyword
    )}&restrict_sr=1&sort=new&t=day&limit=25`;

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "CandidateFinder/1.0",
            },
        });

        if (!response.ok) {
            console.error(`Reddit API error for r/${subreddit}: ${response.status}`);
            return [];
        }

        const data: RedditApiResponse = await response.json();
        const posts: RedditPost[] = [];

        for (const child of data.data.children) {
            const post = child.data;
            const combinedText = `${post.title} ${post.selftext}`;
            const role = detectRole(combinedText);

            posts.push({
                reddit_username: post.author,
                post_title: post.title,
                post_url: `https://www.reddit.com${post.permalink}`,
                subreddit: post.subreddit,
                detected_role: role,
                keyword_matched: keyword,
                score: post.score,
                created_at: new Date(post.created_utc * 1000).toISOString(),
            });
        }

        return posts;
    } catch (error) {
        console.error(`Error searching r/${subreddit} for "${keyword}":`, error);
        return [];
    }
}

// Run full scrape across all subreddits and keywords
export async function scrapeReddit(): Promise<RedditPost[]> {
    const allPosts: RedditPost[] = [];
    const seenUrls = new Set<string>();

    for (const subreddit of TARGET_SUBREDDITS) {
        for (const keyword of SEARCH_KEYWORDS) {
            const posts = await searchSubreddit(subreddit, keyword);

            for (const post of posts) {
                if (!seenUrls.has(post.post_url)) {
                    seenUrls.add(post.post_url);
                    allPosts.push(post);
                }
            }

            // Rate limit: wait 1 second between requests to avoid Reddit throttling
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }

    console.log(`Scraped ${allPosts.length} unique posts from Reddit`);
    return allPosts;
}

// Save posts to Supabase (upsert to avoid duplicates)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveLeadsToSupabase(
    posts: RedditPost[],
    supabaseClient: any
) {
    if (posts.length === 0) {
        console.log("No posts to save");
        return { inserted: 0, error: null };
    }

    const { data, error } = await supabaseClient
        .from("leads")
        .upsert(posts, {
            onConflict: "post_url",
            ignoreDuplicates: true,
        });

    if (error) {
        console.error("Error saving leads:", error.message);
        return { inserted: 0, error: error.message };
    }

    console.log(`Saved leads to Supabase`, data);
    return { inserted: posts.length, error: null };
}
