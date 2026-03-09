export default function StatsStrip() {
  const stats = [
    { value: "10+", label: "Subreddits scanned" },
    { value: "24/7", label: "Automated discovery" },
    { value: "50+", label: "Leads found daily" },
  ];

  return (
    <section className="border-y border-gray-200 bg-gray-50/50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-16 gap-y-4 px-6 py-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-slate-900">{stat.value}</span>
            <span className="text-sm text-slate-500">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
