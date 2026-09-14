import { Settings, User, Bell, Shield, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-5 max-w-2xl mx-auto space-y-5">
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <User size={16} className="text-blue-600" />
          <h3 className="font-heading font-semibold text-gray-800">Profile Settings</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: "Priya Deshmukh" },
            { label: "Employee ID", value: "MH-CW-00142" },
            { label: "Designation", value: "District Caseworker" },
            { label: "District", value: "Nagpur" },
            { label: "Official Email", value: "p.deshmukh@manas.gov.in" },
            { label: "Contact", value: "9876543210" },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
              <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50">{value}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">Profile editing is not available in this prototype.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={16} className="text-blue-600" />
          <h3 className="font-heading font-semibold text-gray-800">Notification Preferences</h3>
        </div>
        <div className="space-y-3">
          {[
            "High-risk case alerts",
            "Missed check-in notifications",
            "Escalation updates",
            "Follow-up reminders",
            "New case assignments",
          ].map((pref) => (
            <label key={pref} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-700">{pref}</span>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 rounded-full bg-[#1e3a5f] peer-checked:bg-[#1e3a5f] transition-colors" />
                <div className="absolute left-1 top-0.5 w-4 h-4 rounded-full bg-white peer-checked:translate-x-4 transition-transform shadow-sm" />
              </div>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">Notification settings are non-functional in this prototype.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={16} className="text-blue-600" />
          <h3 className="font-heading font-semibold text-gray-800">Language & Region</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Interface Language</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white">
              <option>English</option>
              <option>मराठी (Marathi)</option>
              <option>हिंदी (Hindi)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Time Zone</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white">
              <option>IST (UTC+5:30)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} className="text-blue-600" />
          <h3 className="font-heading font-semibold text-gray-800">Security</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-gray-700">Two-factor authentication</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Not configured in prototype</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-700">Session timeout</span>
            <span className="text-xs text-gray-600">30 minutes</span>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400">
        <Settings size={12} className="inline mr-1" />
        Manas Raksha — Smart India Hackathon Prototype · Settings are not persisted
      </div>
    </div>
  );
}
