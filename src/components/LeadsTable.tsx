"use client";

import Badge from "./Badge";

interface Lead {
  id: string;
  reddit_username: string;
  post_title: string;
  post_url: string;
  subreddit: string;
  detected_role: string;
  keyword_matched: string;
  score: number;
  created_at: string;
}

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
}

function formatTimeAgo(dateString: string): { text: string; emoji: string } {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return { text: `${diffMins}m ago`, emoji: "🔥" };
  if (diffHours < 24) return { text: `${diffHours}h ago`, emoji: "⏱" };
  if (diffDays < 7) return { text: `${diffDays}d ago`, emoji: "📅" };
  return { text: date.toLocaleDateString(), emoji: "📅" };
}

function getSignalText(keywordMatched: string, postTitle: string): string {
  const lower = (keywordMatched || postTitle).toLowerCase();
  if (lower.includes("internship")) return "Looking for internship";
  if (lower.includes("hire") || lower.includes("available")) return "Available for hire";
  if (lower.includes("junior") || lower.includes("entry level")) return "Junior dev seeking opportunities";
  if (lower.includes("freelance")) return "Open to freelance work";
  if (lower.includes("remote")) return "Seeking remote position";
  return keywordMatched || "Actively looking";
}

export default function LeadsTable({ leads, loading }: LeadsTableProps) {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-3">
          <svg className="animate-spin h-8 w-8 text-violet-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500 text-sm">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          </div>
          <p className="text-gray-700 font-medium">No leads found</p>
          <p className="text-gray-500 text-sm">Try adjusting your filters or run the scraper to discover candidates.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/60">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Post Title</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Signal</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subreddit</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Posted</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => {
              const time = formatTimeAgo(lead.created_at);
              const signal = getSignalText(lead.keyword_matched, lead.post_title);
              return (
                <tr key={lead.id} className="hover:bg-violet-50/40 transition-colors">
                  <td className="px-6 py-5">
                    <Badge label={lead.detected_role} />
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-base text-gray-900 font-semibold truncate max-w-[340px]" title={lead.post_title}>
                      {lead.post_title}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-500 italic truncate max-w-[200px] block">
                      &ldquo;{signal}&rdquo;
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-600">u/{lead.reddit_username}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-600">r/{lead.subreddit}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-500 bg-gray-100 rounded-full px-2.5 py-1 whitespace-nowrap">
                      <span>{time.emoji}</span>
                      {time.text}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <a
                      href={lead.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-violet-600 hover:text-violet-500 text-sm font-medium transition-colors"
                    >
                      Open
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
