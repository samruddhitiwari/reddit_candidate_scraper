import Link from "next/link";

export default function CTASection() {
  return (
    <section className="border-t border-gray-200 py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Start discovering developer candidates today.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-600">
          Free to start. No credit card required.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
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
    </section>
  );
}
