"use client";

import { useState, useEffect, useCallback } from "react";
import Filters from "@/components/Filters";
import LeadsTable from "@/components/LeadsTable";
import StatsCard from "@/components/StatsCard";
import Button from "@/components/Button";

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidate Leads</h1>
          <p className="text-gray-500 text-sm mt-1">
            {total} total leads found •{" "}
            {plan === "free" ? "Free plan (10/day limit)" : "Pro plan (unlimited)"}
          </p>
        </div>
        <Button onClick={fetchLeads}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
          </svg>
          Refresh
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon="👥" label="Total Leads" value={total} />
        <StatsCard
          icon="📅"
          label="Today"
          value={leads.filter(
            (l) => new Date(l.created_at).toDateString() === new Date().toDateString()
          ).length}
        />
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

      {/* Filters */}
      <Filters
        role={role}
        subreddit={subreddit}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onRoleChange={setRole}
        onSubredditChange={setSubreddit}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
      />

      {/* Table */}
      <LeadsTable leads={leads} loading={loading} />
    </div>
  );
}
