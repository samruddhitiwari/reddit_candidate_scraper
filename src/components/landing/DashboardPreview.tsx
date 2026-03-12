export default function DashboardPreview() {
  const rows = [
    { role: "ML Intern", badge: "bg-amber-50 text-amber-700", title: "Looking for ML internship", sub: "r/developersIndia", time: "2h ago" },
    { role: "Frontend", badge: "bg-blue-50 text-blue-700", title: "Looking for React internship", sub: "r/cscareerquestions", time: "4h ago" },
    { role: "Backend", badge: "bg-emerald-50 text-emerald-700", title: "Junior Node dev seeking work", sub: "r/forhire", time: "5h ago" },
    { role: "Fullstack", badge: "bg-violet-50 text-violet-700", title: "Need fullstack internship", sub: "r/learnprogramming", time: "6h ago" },
  ];

  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-violet-600">Product</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
            See developer leads in real time
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            Every lead is a real Reddit post from a developer actively looking for opportunities.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-sm font-semibold text-gray-900">Developer Leads</h3>
              <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">Live</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Role</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Post Title</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Subreddit</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Posted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="whitespace-nowrap px-6 py-3.5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${row.badge}`}>{row.role}</span>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-700">{row.title}</td>
                      <td className="whitespace-nowrap px-6 py-3.5 text-sm text-gray-500">{row.sub}</td>
                      <td className="whitespace-nowrap px-6 py-3.5 text-sm text-gray-400">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
