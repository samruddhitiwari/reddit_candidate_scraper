"use client";

import { useState, useEffect, useCallback } from "react";
import Filters from "@/components/Filters";
import LeadsTable from "@/components/LeadsTable";
import StatsCard from "@/components/StatsCard";

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

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [plan, setPlan] = useState("free");
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Filters
  const [role, setRole] = useState("all");
  const [subreddit, setSubreddit] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (role !== "all") params.set("role", role);
      if (subreddit !== "all") params.set("subreddit", subreddit);
      if (dateFrom) params.set("from", dateFrom);
      if (dateTo) params.set("to", dateTo);

      const res = await fetch(`/api/leads?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setLeads(data.leads || []);
        setTotal(data.total || 0);
        setPlan(data.plan || "free");
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  }, [role, subreddit, dateFrom, dateTo]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const todayCount = leads.filter(
    (l) => new Date(l.created_at).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Developer Leads</h1>
        <p className="text-gray-500 text-sm mt-1.5">
          {total} total leads found •{" "}
          {plan === "free" ? "Free plan (10/day limit)" : "Pro plan (unlimited)"}
        </p>
      </div>

      {/* Onboarding */}
      {showOnboarding && (
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6 relative">
          <button
            onClick={() => setShowOnboarding(false)}
            className="absolute top-4 right-4 text-violet-400 hover:text-violet-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="text-base font-semibold text-violet-900 mb-3">👋 Getting started</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-200 text-violet-700 text-sm font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-violet-800">Select the roles you care about in <span className="font-medium">Settings</span></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-200 text-violet-700 text-sm font-bold flex items-center justify-center">2</span>
              <p className="text-sm text-violet-800">Enable <span className="font-medium">email alerts</span> for daily digests</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-200 text-violet-700 text-sm font-bold flex items-center justify-center">3</span>
              <p className="text-sm text-violet-800">Start contacting developers from <span className="font-medium">live leads</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon="👥" label="Total Leads" value={total} />
        <StatsCard icon="📅" label="Today" value={todayCount} />
        <StatsCard
          icon="🔗"
          label="Subreddits"
          value={new Set(leads.map((l) => l.subreddit)).size}
        />
        <StatsCard
          icon="🎯"
          label="Roles Found"
          value={new Set(leads.map((l) => l.detected_role)).size}
        />
      </div>

      {/* Filters (with Refresh button) */}
      <Filters
        role={role}
        subreddit={subreddit}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onRoleChange={setRole}
        onSubredditChange={setSubreddit}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onRefresh={fetchLeads}
      />

      {/* Table */}
      <LeadsTable leads={leads} loading={loading} />
    </div>
  );
}
