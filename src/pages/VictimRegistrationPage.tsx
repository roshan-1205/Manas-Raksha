import { useState } from "react";
import { Info, CheckCircle, UserPlus } from "lucide-react";
import { DISTRICTS, POLICE_STATIONS, CASEWORKERS, CASE_STAGES } from "../data/mockData";

export default function VictimRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [generatedId] = useState("VIC-" + Math.random().toString(36).substring(2, 6).toUpperCase());
  const [form, setForm] = useState({
    caseRefNo: "",
    ageGroup: "",
    gender: "",
    district: "",
    policeStation: "",
    stage: "",
    contactPreference: "",
    language: "",
    monitoringConsent: false,
    protectionRequired: false,
    assignedCaseworker: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sel = (label: string, name: keyof typeof form, options: string[], placeholder?: string) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={form[name] as string}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400"
      >
        <option value="">{placeholder || "Select…"}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  if (submitted) {
    return (
      <div className="p-5 max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-green-600" />
          </div>
          <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">Victim Enrolled</h2>
          <p className="text-sm text-gray-600 mb-4">
            The victim has been successfully registered in the monitoring system.
          </p>
          <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 mb-4">
            <div className="text-xs text-gray-500 mb-1">Assigned Protected Victim ID</div>
            <div className="font-mono text-2xl font-bold text-blue-700">{generatedId}</div>
            <div className="text-xs text-gray-400 mt-1">Keep this ID confidential</div>
          </div>
          <p className="text-xs text-gray-400 mb-6">
            Prototype notice: No real data has been stored. This is a simulated registration flow.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[#1e3a5f] text-white rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-[#162d4d] transition-colors"
          >
            Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-2xl mx-auto space-y-5">
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-1">
          <UserPlus size={18} className="text-blue-600" />
          <h2 className="font-heading font-semibold text-gray-800">Victim Registration</h2>
        </div>
        <p className="text-xs text-gray-500">
          Register an atrocity victim for mental health monitoring. All fields marked as optional protect privacy. Only authorised caseworkers may register victims.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="font-heading font-semibold text-gray-800 mb-4">Case Reference</h3>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Case Reference Number (CCTNS)</label>
          <input
            type="text"
            placeholder="e.g. CCTNS/NG/2024/0451"
            value={form.caseRefNo}
            onChange={(e) => setForm({ ...form, caseRefNo: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 font-mono"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="font-heading font-semibold text-gray-800 mb-4">Victim Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sel("Age Group", "ageGroup", ["Under 18", "18–25", "26–35", "36–50", "51–65", "Above 65"])}
          {sel("Gender", "gender", ["Female", "Male", "Non-binary", "Prefer not to say"])}
          {sel("District", "district", DISTRICTS)}
          {sel("Police Station", "policeStation", POLICE_STATIONS)}
          {sel("Current Case Stage", "stage", CASE_STAGES as unknown as string[])}
          {sel("Preferred Language", "language", ["Marathi", "Hindi", "English", "Urdu", "Kannada", "Telugu", "Tamil", "Bengali", "Odia"])}
          {sel("Contact Preference", "contactPreference", ["Phone", "SMS", "WhatsApp", "In-person only", "No contact"])}
          {sel("Assigned Caseworker", "assignedCaseworker", CASEWORKERS)}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="font-heading font-semibold text-gray-800 mb-3">Consent & Protection</h3>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.monitoringConsent}
              onChange={(e) => setForm({ ...form, monitoringConsent: e.target.checked })}
              className="mt-0.5 rounded border-gray-300"
            />
            <div>
              <div className="text-sm font-medium text-gray-800">Monitoring Consent</div>
              <div className="text-xs text-gray-500 mt-0.5">Victim has given voluntary consent to participate in the mental health monitoring programme.</div>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.protectionRequired}
              onChange={(e) => setForm({ ...form, protectionRequired: e.target.checked })}
              className="mt-0.5 rounded border-gray-300"
            />
            <div>
              <div className="text-sm font-medium text-gray-800">Protection Required</div>
              <div className="text-xs text-gray-500 mt-0.5">Victim requires active protection measures. Triggers immediate caseworker review.</div>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-blue-900 font-semibold mb-1">Informed Consent Notice</p>
            <p className="text-xs text-blue-800">
              Participation in mental health monitoring is voluntary and does not affect legal rights, compensation, or access to any services. The victim may withdraw consent at any time. All information is handled confidentially under applicable data protection norms.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          disabled={!form.monitoringConsent}
          className="w-full bg-[#1e3a5f] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#162d4d] transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Register Victim
        </button>
        {!form.monitoringConsent && (
          <p className="text-xs text-gray-400 text-center mt-2">Monitoring consent is required to register.</p>
        )}
      </form>
    </div>
  );
}
