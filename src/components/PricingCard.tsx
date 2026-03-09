interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  onSelect: () => void;
  currentPlan?: boolean;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  buttonText,
  onSelect,
  currentPlan = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 ${
        highlighted
          ? "bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-100 scale-105"
          : "bg-white border border-gray-200 shadow-sm"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-500 text-sm ml-1">/{period}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 flex-shrink-0 ${highlighted ? "text-indigo-600" : "text-emerald-600"}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={currentPlan}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
          currentPlan
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : highlighted
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
        }`}
      >
        {currentPlan ? "Current Plan" : buttonText}
      </button>
    </div>
  );
}
