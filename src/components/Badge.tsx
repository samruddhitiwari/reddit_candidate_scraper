"use client";

/**
 * Badge – role-colored badge for displaying detected roles.
 * Uses a curated palette so each role is visually distinct.
 */

const roleColors: Record<string, string> = {
  Frontend: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Backend: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Fullstack: "bg-violet-50 text-violet-700 ring-violet-600/20",
  "ML/AI": "bg-amber-50 text-amber-700 ring-amber-600/20",
  "Data Science": "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  DevOps: "bg-cyan-50 text-cyan-700 ring-cyan-600/20",
  Mobile: "bg-pink-50 text-pink-700 ring-pink-600/20",
  "General SWE": "bg-gray-50 text-gray-700 ring-gray-600/20",
};

interface BadgeProps {
  label: string;
  className?: string;
}

export default function Badge({ label, className = "" }: BadgeProps) {
  const colorClass = roleColors[label] || roleColors["General SWE"];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${colorClass} ${className}`}
    >
      {label}
    </span>
  );
}
