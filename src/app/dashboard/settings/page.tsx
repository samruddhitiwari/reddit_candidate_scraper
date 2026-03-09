"use client";

import { useState, useEffect } from "react";
import { ROLE_PATTERNS } from "@/lib/constants";
import Button from "@/components/Button";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [alertRoles, setAlertRoles] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/preferences")
      .then((res) => res.json())
      .then((data) => {
        setEmailAlerts(data.email_alerts_enabled || false);
        setAlertRoles(data.alert_roles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleRole = (role: string) => {
    setAlertRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_alerts_enabled: emailAlerts,
          alert_roles: alertRoles,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
      <p className="text-gray-500 text-sm mb-8">
        Manage your email alert preferences and notification settings.
      </p>

      {/* Email Alerts Toggle */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Email Alerts</h2>
            <p className="text-gray-500 text-sm mt-1">
              Receive a daily digest of new candidate leads via email.
            </p>
          </div>
          <button
            onClick={() => {
              setEmailAlerts(!emailAlerts);
              setSaved(false);
            }}
            className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
              emailAlerts ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
                emailAlerts ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Role Selection */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Alert Roles</h2>
        <p className="text-gray-500 text-sm mb-4">
          Select which roles you want to receive alerts for. Leave empty to get alerts for all roles.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {ROLE_PATTERNS.map(({ role }) => (
            <button
              key={role}
              onClick={() => toggleRole(role)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                alertRoles.includes(role)
                  ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                  : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
        {saved && (
          <span className="text-emerald-600 text-sm font-medium inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Saved successfully
          </span>
        )}
      </div>
    </div>
  );
}
