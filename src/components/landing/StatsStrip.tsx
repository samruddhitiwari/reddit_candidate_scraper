export default function StatsStrip() {
  const stats = [
    { value: "312", label: "developer posts indexed" },
    { value: "18", label: "new today" },
    { value: "7", label: "roles tracked" },
  ];

  return (
    <section className="border-y border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-16 gap-y-4 px-6 py-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
            <span className="text-sm text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
