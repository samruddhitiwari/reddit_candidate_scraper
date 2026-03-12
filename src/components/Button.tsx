"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

const variants: Record<string, string> = {
  primary:
    "bg-violet-600 text-white hover:bg-violet-500 shadow-sm shadow-violet-200",
  secondary:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm",
  ghost:
    "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
