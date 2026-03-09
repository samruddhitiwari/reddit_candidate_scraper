"use client";

import { useState, useEffect } from "react";
import PricingCard from "@/components/PricingCard";

export default function PricingPage() {
  const [currentPlan, setCurrentPlan] = useState("free");

  useEffect(() => {
    fetch("/api/preferences")
      .then((res) => res.json())
      .then((data) => {
        setCurrentPlan(data.plan || "free");
      })
      .catch(console.error);
  }, []);

  const handleUpgrade = () => {
    // Placeholder for Stripe integration
    alert(
      "Stripe integration placeholder! In production, this would redirect to a Stripe Checkout session."
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Plan</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Unlock unlimited candidate leads and advanced features to supercharge your recruiting pipeline.
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <PricingCard
          name="Free"
          price="$0"
          period="month"
          description="Perfect for getting started"
          features={[
            "10 leads per day",
            "Basic role filtering",
            "Reddit post links",
            "Community support",
          ]}
          buttonText="Get Started"
          onSelect={() => {}}
          currentPlan={currentPlan === "free"}
        />

        <PricingCard
          name="Pro"
          price="$29"
          period="month"
          description="For serious recruiters"
          features={[
            "Unlimited leads",
            "Advanced role detection",
            "Email digest alerts",
            "Priority support",
            "API access",
            "Export to CSV",
          ]}
          highlighted
          buttonText="Upgrade to Pro"
          onSelect={handleUpgrade}
          currentPlan={currentPlan === "pro"}
        />
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid gap-4 max-w-2xl mx-auto">
          {[
            {
              q: "How does the Reddit scraping work?",
              a: "Our system automatically scans popular subreddits every hour for posts from people looking for tech internships and junior roles. We use smart keyword matching and role detection.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Absolutely! You can downgrade to the free plan at any time. No questions asked.",
            },
            {
              q: "How fresh are the leads?",
              a: "We scrape Reddit every hour, so you'll see new leads within minutes of them being posted. The timestamp on each lead shows exactly when it was discovered.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-gray-900 font-medium mb-2">{faq.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
