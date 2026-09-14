import { useState } from "react";
import { Shield, ArrowLeft, Info, CheckCircle, User, Mail, Phone, Lock, Building2 } from "lucide-react";
import { DISTRICTS, POLICE_STATIONS } from "../data/mockData";

interface RegisterPageProps {
  onBack: () => void;
}

export default function RegisterPage({ onBack }: RegisterPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    officerId: "",
    rank: "",
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
    if (!form.officerId.trim()) e.officerId = "Officer ID is required";
    if (!form.rank.trim()) e.rank = "Rank/Designation is required";
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
    icon: Icon,
  }: {
    label: string;
    name: keyof typeof form;
    type?: string;
    placeholder?: string;
    required?: boolean;
    icon?: any;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            Icon ? "pl-10" : ""
          } ${errors[name] ? "border-red-300 bg-red-50" : "border-gray-300"}`}
        />
      </div>
      {errors[name] && <p className="text-xs text-red-600 mt-1.5">{errors[name]}</p>}
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-gray-900 mb-3">Registration Submitted</h2>
          <p className="text-sm text-gray-600 mb-2 leading-relaxed">
            Your registration request has been recorded and is pending verification by the District CCTNS Authority.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mt-4 mb-6">
            <p className="text-xs text-blue-800">
              <strong>Officer ID:</strong> {form.officerId}
            </p>
            <p className="text-xs text-blue-800 mt-1">
              <strong>District:</strong> {form.district}
            </p>
          </div>
          <p className="text-xs text-gray-500 mb-6">
            You will receive a confirmation email once your account has been approved. This typically takes 24-48 hours.
          </p>
          <button
            onClick={onBack}
            className="bg-[#1e3a5f] text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-[#2d5a8f] transition-all shadow-md hover:shadow-lg"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-800 flex items-center gap-2 text-sm font-medium transition-colors">
            <ArrowLeft size={18} /> Back to Login
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] rounded-xl flex items-center justify-center shadow-md">
            <Shield size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-2xl text-gray-900">CCTNS Officer Registration</h1>
            <p className="text-sm text-gray-600">Crime and Criminal Tracking Network & Systems</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full Name" name="fullName" placeholder="As per official records" icon={User} />
              <Field label="Officer ID" name="officerId" placeholder="e.g. MH-CW-00142" icon={User} />
              <Field label="Rank / Designation" name="rank" placeholder="e.g. Inspector, Sub-Inspector" icon={Building2} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.2em] bg-[right_0.5rem_center] bg-no-repeat transition-all ${
                    errors.district ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select District</option>
                  {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.district && <p className="text-xs text-red-600 mt-1.5">{errors.district}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Police Station / Unit</label>
                <select
                  value={form.policeStation}
                  onChange={(e) => setForm({ ...form, policeStation: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.2em] bg-[right_0.5rem_center] bg-no-repeat transition-all"
                >
                  <option value="">Select (optional)</option>
                  {POLICE_STATIONS.map((ps) => <option key={ps} value={ps}>{ps}</option>)}
                </select>
              </div>
              <Field label="Official Email" name="email" type="email" placeholder="officer@police.gov.in" icon={Mail} />
              <Field label="Contact Number" name="contact" placeholder="10-digit mobile number" icon={Phone} />
              <Field label="Password" name="password" type="password" placeholder="Min. 8 characters" icon={Lock} />
              <Field label="Confirm Password" name="confirmPassword" type="password" placeholder="Re-enter password" icon={Lock} />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 flex items-start gap-3 mt-6">
              <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-amber-900 font-semibold mb-1">Important Notice</p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  All officer registrations are subject to verification by the District CCTNS Authority. Only authorized personnel with valid credentials will be granted access to the system.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e3a5f] text-white rounded-xl py-3.5 text-sm font-semibold hover:bg-[#2d5a8f] transition-all shadow-md hover:shadow-lg mt-6"
            >
              Submit Registration
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 mt-5 font-medium">
          🔒 Secure Government Portal · Ministry of Home Affairs · Government of India
        </p>
      </div>
    </div>
  );
}
