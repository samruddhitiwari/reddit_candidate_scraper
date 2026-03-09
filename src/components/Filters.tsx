"use client";

import { ROLE_PATTERNS, TARGET_SUBREDDITS } from "@/lib/constants";

interface FiltersProps {
  role: string;
  subreddit: string;
  dateFrom: string;
  dateTo: string;
  onRoleChange: (role: string) => void;
  onSubredditChange: (subreddit: string) => void;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
}

export default function Filters({
  role,
  subreddit,
  dateFrom,
  dateTo,
  onRoleChange,
  onSubredditChange,
  onDateFromChange,
  onDateToChange,
}: FiltersProps) {
  const roles = ["all", ...ROLE_PATTERNS.map((r) => r.role)];
  const subreddits = ["all", ...TARGET_SUBREDDITS];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-wrap gap-4">
        {/* Role filter */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r === "all" ? "All Roles" : r}
              </option>
            ))}
          </select>
        </div>

        {/* Subreddit filter */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
            Subreddit
          </label>
          <select
            value={subreddit}
            onChange={(e) => onSubredditChange(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            {subreddits.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All Subreddits" : `r/${s}`}
              </option>
            ))}
          </select>
        </div>

        {/* Date from */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
            From
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Date to */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
            To
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  );
}
