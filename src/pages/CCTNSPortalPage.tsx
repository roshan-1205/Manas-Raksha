import { useState } from "react";
import { Shield, Lock, LayoutGrid, Eye, EyeOff } from "lucide-react";

interface CCTNSPortalPageProps {
  onAccessManasRaksha: (token: string) => void;
}

const MOCK_OFFICERS = [
  { emp_id: "MH-CW-00142", name: "Priya Deshmukh", rank: "CASEWORKER", district: "Nagpur", password: "demo123" },
  { emp_id: "MH-DS-00045", name: "Rajesh Kulkarni", rank: "DISTRICT", district: "Nagpur", password: "demo123" },
  { emp_id: "MH-SA-00001", name: "Dr. Anjali Sharma", rank: "NATIONAL", district: "All Districts", password: "demo123" },
];

export default function CCTNSPortalPage({ onAccessManasRaksha }: CCTNSPortalPageProps) {
  const [credentials, setCredentials] = useState({ emp_id: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentOfficer, setCurrentOfficer] = useState<typeof MOCK_OFFICERS[0] | null>(null);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError("");
    
    // Check if fields are empty
    if (!credentials.emp_id.trim() || !credentials.password.trim()) {
      setError("Please enter both Employee ID and Password");
      return;
    }
    
    const officer = MOCK_OFFICERS.find(
      (o) => o.emp_id === credentials.emp_id && o.password === credentials.password
    );

    if (officer) {
      setCurrentOfficer(officer);
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid Employee ID or Password. Please check credentials and try again.");
    }
  };

  const handleAccessManasRaksha = () => {
    if (!currentOfficer) return;

    // Generate mock HMAC token
    const timestamp = Date.now();
    const tokenData = {
      emp_id: currentOfficer.emp_id,
      rank: currentOfficer.rank,
      timestamp: timestamp,
      district: currentOfficer.district,
      name: currentOfficer.name,
    };
    const token = btoa(JSON.stringify(tokenData)); // Base64 encode for demo
    onAccessManasRaksha(token);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-xl mb-4 shadow-lg border border-slate-600">
              <Shield size={32} className="text-blue-400" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-white mb-2">CCTNS Portal</h1>
            <p className="text-sm text-slate-300">Crime and Criminal Tracking Network & Systems</p>
            <p className="text-xs text-slate-400 mt-1">National Crime Records Bureau</p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-6">
            <h2 className="font-heading font-semibold text-lg text-gray-800 mb-5">Officer Login</h2>

            {error && (
              <div className="mb-4 bg-red-50 border-2 border-red-300 rounded-lg px-4 py-3 flex items-start gap-3 animate-shake">
                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  !
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-800">Authentication Failed</p>
                  <p className="text-xs text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. MH-CW-00142"
                  value={credentials.emp_id}
                  onChange={(e) => {
                    setCredentials({ ...credentials, emp_id: e.target.value });
                    setError(""); // Clear error on input change
                  }}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) => {
                      setCredentials({ ...credentials, password: e.target.value });
                      setError(""); // Clear error on input change
                    }}
                    className={`w-full border rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      error ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
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

              <button
                type="submit"
                className="w-full bg-slate-800 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Lock size={15} />
                Sign In to CCTNS
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600 font-medium mb-3">Demo Credentials (Click to use):</p>
              <div className="space-y-2">
                {MOCK_OFFICERS.map((officer) => (
                  <button
                    key={officer.emp_id}
                    type="button"
                    onClick={() => {
                      setCredentials({ emp_id: officer.emp_id, password: officer.password });
                      setError("");
                    }}
                    className="w-full bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg px-3 py-2.5 text-left transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-700 mb-1">{officer.name}</div>
                        <div className="text-[10px] text-gray-500 mb-1.5">
                          {officer.rank} • {officer.district}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-gray-400 uppercase font-semibold">ID:</span>
                            <span className="text-xs font-mono font-bold text-blue-700">{officer.emp_id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-gray-400 uppercase font-semibold">Pass:</span>
                            <span className="text-xs font-mono font-bold text-blue-700">{officer.password}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] text-blue-600 font-medium whitespace-nowrap mt-4">
                        Click to fill →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            Mock CCTNS Portal • For demonstration purposes only
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-xl mb-4 shadow-lg border border-slate-600">
            <Shield size={32} className="text-blue-400" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">CCTNS Portal</h1>
          <p className="text-sm text-slate-300">Welcome, {currentOfficer?.name}</p>
          <p className="text-xs text-slate-400">{currentOfficer?.rank} • {currentOfficer?.district}</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="font-heading font-semibold text-xl text-gray-800 mb-6">Available Applications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Other CCTNS modules (grayed out) */}
            <div className="border-2 border-gray-200 rounded-lg p-6 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <LayoutGrid size={20} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">FIR Management</h3>
                  <p className="text-xs text-gray-400">File and track FIRs</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <LayoutGrid size={20} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Investigation</h3>
                  <p className="text-xs text-gray-400">Case investigation tools</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <LayoutGrid size={20} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Chargesheet</h3>
                  <p className="text-xs text-gray-400">Chargesheet management</p>
                </div>
              </div>
            </div>

            {/* Manas Raksha - Active */}
            <button
              onClick={handleAccessManasRaksha}
              className="border-2 border-[#1e3a5f] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[#1e3a5f]">Manas Raksha</h3>
                  <p className="text-xs text-gray-600">Mental Health Monitoring</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded px-3 py-1.5 text-xs text-green-700 font-medium inline-block">
                ✓ Integration Active
              </div>
            </button>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-800">
              <strong>Click "Manas Raksha"</strong> to generate a secure HMAC token and access the mental health monitoring system.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Mock CCTNS Portal • For demonstration purposes only
        </p>
      </div>
    </div>
  );
}
