"use client";

/**
 * StatsCard – a minimal stat card used in the dashboard header.
 * Renders an icon, label, and numeric value inside a rounded card.
 */

interface StatsCardProps {
  icon: string;
  label: string;
  value: number | string;
}

export default function StatsCard({ icon, label, value }: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
