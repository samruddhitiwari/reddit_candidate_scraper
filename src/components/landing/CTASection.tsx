import Link from "next/link";

export default function CTASection() {
  return (
    <section className="border-t border-gray-200 py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Start discovering developer candidates today.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600">
          Free to start. No credit card required.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Start Free
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            View Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
