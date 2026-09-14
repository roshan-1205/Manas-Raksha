import { PlayCircle, Info, Shield, Lock, Key, UserCheck, LayoutGrid, FileText, Database, Users, ArrowRight } from "lucide-react";

interface CCTNSPageProps {
  onStartDemo: () => void;
}

const flowSteps = [
  { 
    num: 1,
    label: "Officer logs into CCTNS Portal", 
    icon: UserCheck,
  },
  { 
    num: 2,
    label: "Clicks 'Manas Raksha' Tile", 
    icon: LayoutGrid,
  },
  { 
    num: 3,
    label: "CCTNS Backend Generates Signed HMAC Token", 
    sub: "emp_id • rank • timestamp",
    icon: Key,
  },
  { 
    num: 4,
    label: "Browser Redirects to Manas Raksha Platform", 
    icon: ArrowRight,
  },
  { 
    num: 5,
    label: "Manas Raksha Verifies Cryptographic Signature", 
    icon: Shield,
  },
  { 
    num: 6,
    label: "Role-Based Access Control Routing", 
    icon: FileText,
  },
];

const roleBasedViews = [
  {
    role: "CASEWORKER",
    icon: FileText,
    access: "Caseworker Dashboard",
    description: "Assigned cases only",
    color: "bg-green-50 border-green-200 text-green-800"
  },
  {
    role: "DISTRICT",
    icon: Database,
    access: "District View",
    description: "Heatmap and aggregated statistics",
    color: "bg-blue-50 border-blue-200 text-blue-800"
  },
  {
    role: "NATIONAL / SUPER ADMIN",
    icon: Users,
    access: "National Overview",
    description: "Cross-district analytics",
    color: "bg-purple-50 border-purple-200 text-purple-800"
  }
];

const securityFeatures = [
  "Signed HMAC token",
  "Cryptographic verification",
  "Role-based access",
  "Least-privilege data visibility",
  "Timestamp validation",
  "District-level access control",
];

export default function CCTNSPage({ onStartDemo }: CCTNSPageProps) {
  return (
    <div className="p-5 max-w-6xl mx-auto space-y-5">
      {/* Interactive Demo Notice */}
      <div className="bg-gradient-to-r from-blue-600 to-[#1e3a5f] text-white rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
            <Shield size={24} />
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-bold text-xl mb-2">CCTNS → Manas Raksha Integration</h2>
            <p className="text-sm text-blue-100 mb-4">
              Experience the secure access flow demonstrating how CCTNS officers authenticate and access role-specific dashboards through cryptographic token verification.
            </p>
            <button
              onClick={onStartDemo}
              className="bg-white text-[#1e3a5f] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg"
            >
              <PlayCircle size={18} />
              Launch Interactive Demo
            </button>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-900">Demonstration Mode</p>
          <p className="text-xs text-amber-800 mt-1">
            This is a working prototype demonstrating the proposed secure access flow. No real CCTNS connection exists. All authentication is simulated for demonstration purposes.
          </p>
        </div>
      </div>

      {/* Flow Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-heading font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <Lock size={18} />
          Secure Access Flow
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flowSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800 mb-2">{step.label}</div>
                    {step.sub && (
                      <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">{step.sub}</div>
                    )}
                  </div>
                  <Icon size={18} className="text-[#1e3a5f] shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role-Based Views */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-heading font-semibold text-gray-800 mb-4">Role-Based Access Control</h3>
        <p className="text-xs text-gray-600 mb-4">After successful token verification, users are automatically routed to their appropriate dashboard:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roleBasedViews.map((view) => {
            const Icon = view.icon;
            return (
              <div key={view.role} className={`border-2 rounded-lg p-5 ${view.color}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={20} className="shrink-0" />
                  <h4 className="font-heading font-bold text-sm">{view.role}</h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-semibold mb-1">Dashboard Access:</div>
                    <div className="text-xs font-medium">{view.access}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1">Data Scope:</div>
                    <div className="text-xs">{view.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-[#1e3a5f]" />
          <h3 className="font-heading font-semibold text-gray-800">Security Features</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {securityFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-xs text-gray-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5">
              <Lock size={12} className="text-slate-600 shrink-0" />
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-blue-800 mb-3">How the Demo Works:</h3>
        <ol className="space-y-2 text-xs text-blue-800">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            <span>Click "Launch Interactive Demo" to open the mock CCTNS Portal</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            <span>Log in using one of the provided demo credentials (different roles available)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            <span>Click the "Manas Raksha" tile to generate an HMAC token</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">4.</span>
            <span>Watch the real-time cryptographic verification process</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">5.</span>
            <span>You'll be automatically routed to the appropriate dashboard based on your role</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
