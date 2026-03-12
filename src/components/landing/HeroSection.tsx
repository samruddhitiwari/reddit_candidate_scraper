import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* Left – Copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1 text-xs font-medium text-gray-600 shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-600" />
              </span>
              Live scanning Reddit
            </div>

            <h1 className="text-5xl font-semibold tracking-tight text-gray-900">
              Find developers actively looking for work.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-gray-600">
              FindDevs scans Reddit in real time and surfaces developers posting
              about internships, jobs, and freelance opportunities so recruiters
              can reach them before anyone else.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center rounded-lg bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-violet-500 transition-colors"
              >
                Start Free
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                See Live Leads
              </Link>
            </div>
          </div>

          {/* Right – Dashboard mockup */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                </div>
                <div className="mx-auto h-5 w-48 rounded bg-gray-100" />
              </div>

              {/* Dashboard content */}
              <div className="p-6">
                {/* Stats row */}
                <div className="mb-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Leads", value: "312" },
                    { label: "Today", value: "18" },
                    { label: "Roles", value: "7" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-gray-200 bg-white p-3">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{s.label}</div>
                      <div className="mt-0.5 text-lg font-semibold text-gray-900">{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Mini table */}
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="px-3 py-2 text-left font-medium text-gray-400">Role</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-400">Title</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-400">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { role: "Frontend", title: "Looking for React internship", time: "2h" },
                        { role: "ML/AI", title: "Seeking ML internship in India", time: "4h" },
                        { role: "Backend", title: "Junior Node.js dev looking for work", time: "5h" },
                      ].map((row, i) => (
                        <tr key={i}>
                          <td className="px-3 py-2">
                            <span className="rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-medium text-violet-700">{row.role}</span>
                          </td>
                          <td className="px-3 py-2 text-gray-700">{row.title}</td>
                          <td className="px-3 py-2 text-gray-400">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
