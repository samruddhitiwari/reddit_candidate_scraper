import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsStrip from "@/components/landing/StatsStrip";
import DashboardPreview from "@/components/landing/DashboardPreview";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <DashboardPreview />
      <HowItWorks />
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
          © 2026 CandidateFinder. Built for recruiters who move fast.
        </div>
      </footer>
    </div>
  );
}
