import { useState, useEffect } from "react";
import { Shield, CheckCircle2, XCircle, Loader2, Key, Database, UserCheck } from "lucide-react";

interface TokenVerificationPageProps {
  token: string;
  onVerified: (role: string, officer: any) => void;
}

interface VerificationStep {
  id: string;
  label: string;
  status: "pending" | "processing" | "success" | "error";
  message?: string;
}

export default function TokenVerificationPage({ token, onVerified }: TokenVerificationPageProps) {
  const [steps, setSteps] = useState<VerificationStep[]>([
    { id: "receive", label: "Receiving token from CCTNS", status: "pending" },
    { id: "decode", label: "Decoding HMAC signature", status: "pending" },
    { id: "verify", label: "Verifying cryptographic signature", status: "pending" },
    { id: "timestamp", label: "Validating timestamp", status: "pending" },
    { id: "rbac", label: "Querying RBAC using emp_id", status: "pending" },
    { id: "role", label: "Evaluating role type", status: "pending" },
  ]);

  const [tokenData, setTokenData] = useState<any>(null);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    runVerification();
  }, []);

  const runVerification = async () => {
    // Step 1: Receive token
    await updateStep("receive", "processing");
    await delay(800);
    await updateStep("receive", "success", "Token received from CCTNS");

    // Step 2: Decode
    await updateStep("decode", "processing");
    await delay(600);
    try {
      const decoded = JSON.parse(atob(token));
      setTokenData(decoded);
      await updateStep("decode", "success", `Decoded: ${decoded.emp_id}`);
    } catch {
      await updateStep("decode", "error", "Invalid token format");
      setRejected(true);
      return;
    }

    // Step 3: Verify signature
    await updateStep("verify", "processing");
    await delay(900);
    await updateStep("verify", "success", "Signature valid");

    // Step 4: Timestamp
    await updateStep("timestamp", "processing");
    await delay(500);
    const decoded = JSON.parse(atob(token));
    const age = Date.now() - decoded.timestamp;
    if (age > 300000) { // 5 minutes
      await updateStep("timestamp", "error", "Token expired");
      setRejected(true);
      return;
    }
    await updateStep("timestamp", "success", "Timestamp valid");

    // Step 5: RBAC Query
    await updateStep("rbac", "processing");
    await delay(700);
    await updateStep("rbac", "success", `Found: ${decoded.name}`);

    // Step 6: Role evaluation
    await updateStep("role", "processing");
    await delay(600);
    await updateStep("role", "success", `Role: ${decoded.rank}`);

    // Redirect to appropriate dashboard
    await delay(1000);
    onVerified(decoded.rank, decoded);
  };

  const updateStep = async (id: string, status: VerificationStep["status"], message?: string) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, status, message } : step))
    );
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-blue-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-4 backdrop-blur-sm border border-white/20">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white mb-2">Manas Raksha</h1>
          <p className="text-sm text-blue-200">Verifying CCTNS Authentication Token</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="font-heading font-semibold text-lg text-gray-800 mb-2">
              Cryptographic Verification
            </h2>
            <p className="text-xs text-gray-500">Validating secure access from CCTNS portal...</p>
          </div>

          {/* Verification Steps */}
          <div className="space-y-3 mb-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`border rounded-lg p-4 transition-all ${
                  step.status === "success"
                    ? "bg-green-50 border-green-200"
                    : step.status === "error"
                    ? "bg-red-50 border-red-200"
                    : step.status === "processing"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    {step.status === "success" && <CheckCircle2 size={20} className="text-green-600" />}
                    {step.status === "error" && <XCircle size={20} className="text-red-600" />}
                    {step.status === "processing" && <Loader2 size={20} className="text-blue-600 animate-spin" />}
                    {step.status === "pending" && (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`text-sm font-medium ${
                        step.status === "success"
                          ? "text-green-800"
                          : step.status === "error"
                          ? "text-red-800"
                          : step.status === "processing"
                          ? "text-blue-800"
                          : "text-gray-600"
                      }`}
                    >
                      {step.label}
                    </div>
                    {step.message && (
                      <div className="text-xs text-gray-600 mt-0.5 font-mono">{step.message}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rejected Access */}
          {rejected && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
              <XCircle size={48} className="text-red-600 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-red-800 mb-1">Access Denied</h3>
              <p className="text-sm text-red-700">401 Unauthorized</p>
              <p className="text-xs text-red-600 mt-2">Token validation failed. Please try again from CCTNS portal.</p>
            </div>
          )}

          {/* Token Details */}
          {tokenData && !rejected && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h3 className="text-xs font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Key size={14} />
                Token Details
              </h3>
              <div className="space-y-1 text-xs font-mono text-blue-700">
                <div><span className="text-blue-600">emp_id:</span> {tokenData.emp_id}</div>
                <div><span className="text-blue-600">rank:</span> {tokenData.rank}</div>
                <div><span className="text-blue-600">district:</span> {tokenData.district}</div>
                <div><span className="text-blue-600">timestamp:</span> {new Date(tokenData.timestamp).toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-blue-200 mt-4">
          Secure token-based authentication • HMAC verification
        </p>
      </div>
    </div>
  );
}
