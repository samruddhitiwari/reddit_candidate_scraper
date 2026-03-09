import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg grid-fade" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left – Copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-600" />
              </span>
              Live scanning Reddit
            </div>

            <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
              Discover developers actively looking for internships.
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
              CandidateFinder scans Reddit and surfaces developer posts as
              recruiter leads so you can reach candidates before anyone else.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 transition-colors"
              >
                Start Free
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                View Demo
              </Link>
            </div>
          </div>

          {/* Right – Dashboard mockup */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50">
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                </div>
                <div className="mx-auto h-5 w-48 rounded-md bg-gray-100" />
              </div>

              {/* Dashboard content */}
              <div className="p-5">
                {/* Stats row */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Leads", value: "312" },
                    { label: "Today", value: "18" },
                    { label: "Roles", value: "7" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-gray-100 p-3">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{s.label}</div>
                      <div className="mt-0.5 text-lg font-semibold text-slate-900">{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Mini table */}
                <div className="overflow-hidden rounded-lg border border-gray-100">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/60">
                        <th className="px-3 py-2 text-left font-medium text-slate-400">Role</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-400">Title</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-400">Time</th>
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
                            <span className="rounded-full bg-indigo-50 px-1.5 py-0.5 text-[10px] font-medium text-indigo-700">
                              {row.role}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-slate-700">{row.title}</td>
                          <td className="px-3 py-2 text-slate-400">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Decorative glow behind card */}
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br from-indigo-50 via-transparent to-purple-50 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
