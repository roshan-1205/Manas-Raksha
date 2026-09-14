import { useState } from "react";
import { Shield, Eye, EyeOff, Lock, Info } from "lucide-react";
import { DISTRICTS } from "../data/mockData";

interface LoginPageProps {
  onLogin: () => void;
  onGoToRegister: () => void;
}

export default function LoginPage({ onLogin, onGoToRegister }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    employeeId: "",
    password: "",
    district: "",
    remember: false,
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.employeeId || !form.password || !form.district) {
      setError("Please fill in all required fields.");
      return;
    }
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1e3a5f] rounded-xl mb-4 shadow-md">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Manas Raksha</h1>
          <p className="text-sm text-gray-500 mt-1">AI-Assisted Mental Health Monitoring System</p>
          <p className="text-xs text-gray-400 mt-0.5">District Caseworker / Official Portal</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="font-heading font-semibold text-lg text-gray-800 mb-5">Sign In</h2>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-center gap-2">
              <Info size={15} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Employee / Officer ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. MH-CW-00142"
                value={form.employeeId}
                onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors bg-white"
              >
                <option value="">Select District</option>
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="rounded border-gray-300"
                />
                Remember me
              </label>
              <button type="button" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e3a5f] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#162d4d] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Lock size={15} />
              Sign In Securely
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-xs text-gray-500">New caseworker? </span>
            <button onClick={onGoToRegister} className="text-xs text-blue-600 font-medium hover:underline">
              Register account
            </button>
          </div>
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <div className="flex items-start gap-2">
            <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-amber-800 font-medium">Prototype Notice</p>
              <p className="text-xs text-amber-700 mt-0.5">
                Authentication is simulated using local mock data. No real credentials are stored or validated. For demonstration purposes only.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Authorised access only · Manas Raksha — Smart India Hackathon Prototype
        </p>
      </div>
    </div>
  );
}
