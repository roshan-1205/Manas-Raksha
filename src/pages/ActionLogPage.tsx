import { useState } from "react";
import { Plus, ClipboardList, X } from "lucide-react";
import { mockActionLogs, mockCases, type ActionLog } from "../data/mockData";
import { type UserSession } from "./LoginPage";

const ACTION_TYPES = [
  "Counselling Referred",
  "Follow-up Completed",
  "Protection Support Initiated",
  "Medical Referral",
  "Legal Aid Referral",
  "Rehabilitation Support",
  "Victim Contacted",
  "Escalated to Designated Official",
];

const statusStyles: Record<string, string> = {
  Completed: "bg-green-50 text-green-700 border-green-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
};

interface ActionLogPageProps {
  currentUser?: UserSession | null;
}

export default function ActionLogPage({ currentUser }: ActionLogPageProps) {
  // RBAC: Get accessible case IDs based on role
  const accessibleCaseIds = mockCases.filter((c) => {
    if (!currentUser) return false;
    
    // CASEWORKER: Only see assigned cases
    if (currentUser.role === "CASEWORKER") {
      return c.assignedCaseworker === currentUser.name && c.district === currentUser.district;
    }
    
    // DISTRICT: Only see cases in their district
    if (currentUser.role === "DISTRICT") {
      return c.district === currentUser.district;
    }
    
    // NATIONAL: See all cases
    if (currentUser.role === "NATIONAL") {
      return true;
    }
    
    return false;
  }).map(c => c.id);

  // Filter action logs to only show logs for accessible cases
  const [logs, setLogs] = useState<ActionLog[]>(
    mockActionLogs.filter(log => accessibleCaseIds.includes(log.caseId))
  );
  
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    caseId: "",
    actionType: "",
    notes: "",
    followUpDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: ActionLog = {
      id: "AL-" + (logs.length + 1).toString().padStart(3, "0"),
      dateTime: new Date().toISOString().slice(0, 16).replace("T", " "),
      caseId: form.caseId,
      caseworker: currentUser?.name || "Unknown",
      actionType: form.actionType,
      description: form.notes,
      status: "Completed",
      followUpDate: form.followUpDate,
    };
    setLogs([newLog, ...logs]);
    setShowForm(false);
    setForm({ caseId: "", actionType: "", notes: "", followUpDate: "" });
  };

  return (
    <div className="p-5 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList size={18} className="text-blue-600" />
          <h2 className="font-heading font-semibold text-gray-800">Caseworker Action Log</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-mono">{logs.length} entries</span>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#162d4d] transition-colors shadow-sm"
        >
          <Plus size={15} /> Add Action
        </button>
      </div>

      {/* Action Log Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Date & Time", "Case ID", "Caseworker", "Action Type", "Description", "Status", "Follow-up Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">{log.dateTime}</td>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-800">{log.caseId}</td>
                  <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{log.caseworker}</td>
                  <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{log.actionType}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">
                    <span className="line-clamp-2">{log.description}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs border font-medium ${statusStyles[log.status]}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{log.followUpDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Action Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="font-heading font-semibold text-gray-900">Add Action</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Case ID <span className="text-red-500">*</span></label>
                <select
                  required
                  value={form.caseId}
                  onChange={(e) => setForm({ ...form, caseId: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  <option value="">Select Case</option>
                  {mockCases.map((c) => <option key={c.id} value={c.id}>{c.id} — {c.victimName} ({c.victimId})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Action Type <span className="text-red-500">*</span></label>
                <select
                  required
                  value={form.actionType}
                  onChange={(e) => setForm({ ...form, actionType: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  <option value="">Select action type</option>
                  {ACTION_TYPES.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Notes / Description <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Describe the action taken…"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Follow-up Date</label>
                <input
                  type="date"
                  value={form.followUpDate}
                  onChange={(e) => setForm({ ...form, followUpDate: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm bg-[#1e3a5f] text-white rounded-lg hover:bg-[#162d4d] font-semibold transition-colors">
                  Submit Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
