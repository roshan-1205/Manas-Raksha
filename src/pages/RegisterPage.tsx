import { useState } from "react";
import { Shield, ArrowLeft, Info, CheckCircle } from "lucide-react";
import { DISTRICTS, POLICE_STATIONS } from "../data/mockData";

interface RegisterPageProps {
  onBack: () => void;
}

export default function RegisterPage({ onBack }: RegisterPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    officialId: "",
    designation: "",
    district: "",
    policeStation: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.officialId.trim()) e.officialId = "Official ID is required";
    if (!form.designation.trim()) e.designation = "Designation is required";
    if (!form.district) e.district = "District is required";
    if (!form.email.includes("@")) e.email = "Valid email is required";
    if (!form.contact.match(/^\d{10}$/)) e.contact = "10-digit contact number required";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const Field = ({
    label,
    name,
    type = "text",
    placeholder,
    required = true,
  }: {
    label: string;
    name: keyof typeof form;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors ${errors[name] ? "border-red-300 bg-red-50" : "border-gray-200"}`}
      />
      {errors[name] && <p className="text-xs text-red-600 mt-0.5">{errors[name]}</p>}
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 w-full max-w-md text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-green-600" />
          </div>
          <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">Registration Submitted</h2>
          <p className="text-sm text-gray-600 mb-2">
            Your registration request has been recorded. Pending verification by the District Authority.
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Prototype notice: No real account has been created. This is a simulated registration flow.
          </p>
          <button
            onClick={onBack}
            className="bg-[#1e3a5f] text-white rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-[#162d4d] transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-800 flex items-center gap-1.5 text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Login
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-xl text-gray-900">Caseworker Registration</h1>
            <p className="text-xs text-gray-500">Manas Raksha — Official Onboarding</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="fullName" placeholder="As per official records" />
              <Field label="Official ID" name="officialId" placeholder="e.g. MH-CW-00142" />
              <Field label="Designation" name="designation" placeholder="e.g. District Caseworker" />
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white ${errors.district ? "border-red-300" : "border-gray-200"}`}
                >
                  <option value="">Select District</option>
                  {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.district && <p className="text-xs text-red-600 mt-0.5">{errors.district}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Police Station / Department</label>
                <select
                  value={form.policeStation}
                  onChange={(e) => setForm({ ...form, policeStation: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white"
                >
                  <option value="">Select (optional)</option>
                  {POLICE_STATIONS.map((ps) => <option key={ps} value={ps}>{ps}</option>)}
                </select>
              </div>
              <Field label="Official Email" name="email" type="email" placeholder="name@gov.in" />
              <Field label="Contact Number" name="contact" placeholder="10-digit mobile number" />
              <Field label="Password" name="password" type="password" placeholder="Min. 8 characters" />
              <Field label="Confirm Password" name="confirmPassword" type="password" placeholder="Re-enter password" />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-2 mt-2">
              <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                Prototype notice — this is a demonstration registration interface. No real account, database entry, or email verification is created.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e3a5f] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#162d4d] transition-colors shadow-sm mt-2"
            >
              Submit Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
