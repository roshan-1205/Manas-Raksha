import { useState } from "react";
import { Shield, Eye, EyeOff, Lock, Info, ChevronRight } from "lucide-react";
import { DISTRICTS } from "../data/mockData";

interface LoginPageProps {
  onLogin: () => void;
  onGoToRegister: () => void;
}

const DEMO_CREDENTIALS = [
  {
    name: "Priya Deshmukh",
    role: "CASEWORKER",
    location: "Nagpur",
    id: "MH-CW-00142",
    password: "demo123",
    district: "Nagpur",
  },
  {
    name: "Rajesh Kulkarni",
    role: "DISTRICT",
    location: "Nagpur",
    id: "MH-DS-00045",
    password: "demo123",
    district: "Nagpur",
  },
  {
    name: "Dr. Anjali Sharma",
    role: "NATIONAL",
    location: "All Districts",
    id: "MH-SA-00001",
    password: "demo123",
    district: "Mumbai",
  },
];

export default function LoginPage({ onLogin, onGoToRegister }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    officerId: "",
    password: "",
    district: "",
    remember: false,
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.officerId || !form.password || !form.district) {
      setError("Please fill in all required fields.");
      return;
    }
    onLogin();
  };

  const fillDemoCredentials = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setForm({
      ...form,
      officerId: cred.id,
      password: cred.password,
      district: cred.district,
    });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-[580px]">
        {/* CCTNS Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] rounded-2xl mb-4 shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">CCTNS Officer Portal</h1>
          <p className="text-sm text-gray-600 font-medium">Crime and Criminal Tracking Network & Systems</p>
          <p className="text-xs text-gray-500 mt-1">Manas Raksha — Mental Health Monitoring Integration</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
          <h2 className="font-heading font-bold text-xl text-gray-900 mb-6">Sign In</h2>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-center gap-2">
              <Info size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee / Officer ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. MH-CW-00142"
                value={form.officerId}
                onChange={(e) => setForm({ ...form, officerId: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.2em] bg-[right_0.5rem_center] bg-no-repeat"
              >
                <option value="">Select District</option>
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end pt-1">
              <button type="button" className="text-sm text-blue-600 font-medium hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e3a5f] text-white rounded-xl py-3.5 text-sm font-semibold hover:bg-[#2d5a8f] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 mt-6"
            >
              <Lock size={16} />
              Sign In Securely
            </button>
          </form>

          <div className="mt-5 text-center pt-5 border-t border-gray-100">
            <span className="text-sm text-gray-600">New officer? </span>
            <button onClick={onGoToRegister} className="text-sm text-blue-600 font-semibold hover:underline">
              Register account
            </button>
          </div>
        </div>

        {/* Demo Credentials - Moved to bottom */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-2xl shadow-sm p-5 mt-5">
          <p className="text-sm font-semibold text-gray-800 mb-3">Demo Credentials (Click to use):</p>
          <div className="space-y-2.5">
            {DEMO_CREDENTIALS.map((cred) => (
              <button
                key={cred.id}
                onClick={() => fillDemoCredentials(cred)}
                className="w-full bg-white hover:bg-blue-50 border border-slate-200 rounded-xl p-3.5 text-left transition-all hover:shadow-md hover:border-blue-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm mb-0.5">{cred.name}</p>
                    <p className="text-xs text-gray-600 mb-2">
                      {cred.role} • {cred.location}
                    </p>
                    <div className="flex items-center gap-4">
                      <p className="text-xs text-gray-700">
                        <span className="font-medium">ID:</span>{" "}
                        <span className="font-mono text-blue-600">{cred.id}</span>
                      </p>
                      <p className="text-xs text-gray-700">
                        <span className="font-medium">PASS:</span>{" "}
                        <span className="font-mono text-blue-600">{cred.password}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3.5">
          <div className="flex items-start gap-2.5">
            <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-blue-900 font-semibold mb-1">CCTNS Integration</p>
              <p className="text-xs text-blue-800 leading-relaxed">
                This portal integrates with the Crime and Criminal Tracking Network & Systems for seamless case management and mental health monitoring of victims and offenders.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-5 font-medium">
          🔒 Secure Government Portal · Authorised Access Only
        </p>
        <p className="text-center text-xs text-gray-400 mt-1">
          Ministry of Home Affairs · Government of India
        </p>
      </div>
    </div>
  );
}
