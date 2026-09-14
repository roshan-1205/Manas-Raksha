import { useState } from "react";
import { Search, Eye, Filter, AlertTriangle, X } from "lucide-react";
import { mockCases, mockAIInsights, type Case, type RiskLevel, type CaseStage, CASE_STAGES } from "../data/mockData";
import RiskBadge from "../components/RiskBadge";
import CaseLifecycle from "../components/CaseLifecycle";
import AIInsightsPanel from "../components/AIInsightsPanel";
import EscalationDialog from "../components/EscalationDialog";

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "All">("All");
  const [stageFilter, setStageFilter] = useState<CaseStage | "All">("All");
  const [followUpFilter, setFollowUpFilter] = useState<"All" | "Pending" | "Completed" | "Overdue">("All");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [escalateCase, setEscalateCase] = useState<Case | null>(null);
  const [escalatedIds, setEscalatedIds] = useState<Set<string>>(new Set());

  const filtered = mockCases.filter((c) => {
    const matchSearch =
      !search ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.victimId.toLowerCase().includes(search.toLowerCase()) ||
      c.victimName.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase()) ||
      c.assignedCaseworker.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === "All" || c.riskLevel === riskFilter;
    const matchStage = stageFilter === "All" || c.stage === stageFilter;
    const matchFollowUp = followUpFilter === "All" || c.followUpStatus === followUpFilter;
    return matchSearch && matchRisk && matchStage && matchFollowUp;
  });

  const followUpStyles: Record<string, string> = {
    Completed: "text-green-700 bg-green-50 border-green-200",
    Pending: "text-amber-700 bg-amber-50 border-amber-200",
    Overdue: "text-red-700 bg-red-50 border-red-200",
  };

  const protectionStyles: Record<string, string> = {
    Active: "text-blue-700 bg-blue-50 border-blue-200",
    Pending: "text-amber-700 bg-amber-50 border-amber-200",
    "Not Required": "text-gray-600 bg-gray-50 border-gray-200",
  };

  return (
    <div className="p-5 space-y-5 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Case ID, Victim ID, District, Caseworker…"
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-gray-400" />
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value as RiskLevel | "All")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none">
              <option value="All">All Risks</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
            <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value as CaseStage | "All")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none">
              <option value="All">All Stages</option>
              {CASE_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={followUpFilter} onChange={(e) => setFollowUpFilter(e.target.value as typeof followUpFilter)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none">
              <option value="All">All Follow-ups</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">{filtered.length} case{filtered.length !== 1 ? "s" : ""} shown</p>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Case ID", "Victim ID", "District", "Stage", "Risk", "Last Check-in", "Caseworker", "Follow-up", "Protection", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-mono text-xs font-semibold text-gray-800">{c.id}</div>
                    {escalatedIds.has(c.id) && (
                      <span className="text-[10px] text-red-600 font-medium">Escalation submitted</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-semibold text-gray-800 mb-0.5">{c.victimName}</div>
                    <div className="font-mono text-xs text-gray-500">{c.victimId}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700">{c.district}</td>
                  <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{c.stage}</td>
                  <td className="px-4 py-3"><RiskBadge level={c.riskLevel} /></td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{c.lastCheckIn}</td>
                  <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{c.assignedCaseworker}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs border font-medium ${followUpStyles[c.followUpStatus]}`}>
                      {c.followUpStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs border font-medium ${protectionStyles[c.protectionStatus]}`}>
                      {c.protectionStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedCase(c)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs text-blue-700 border border-blue-200 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors font-medium"
                    >
                      <Eye size={12} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">No cases match the current filters.</div>
          )}
        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-[#f0f4f8] rounded-xl shadow-2xl w-full max-w-3xl my-6">
            <div className="bg-white rounded-t-xl border-b border-gray-200 px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-heading font-semibold text-gray-900 text-lg">Case Detail — {selectedCase.id}</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-semibold text-gray-700">{selectedCase.victimName}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="font-mono text-xs text-gray-500">{selectedCase.victimId}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">Ref: {selectedCase.caseRefNo}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Case Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-heading font-semibold text-gray-800 mb-3 text-sm">Case Information</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    ["District", selectedCase.district],
                    ["Police Station", selectedCase.policeStation],
                    ["Stage", selectedCase.stage],
                    ["Risk Level", null],
                    ["Last Check-in", selectedCase.lastCheckIn],
                    ["Assigned Caseworker", selectedCase.assignedCaseworker],
                    ["Follow-up Status", selectedCase.followUpStatus],
                    ["Protection Status", selectedCase.protectionStatus],
                    ["Registered", selectedCase.registeredDate],
                    ["Age Group", selectedCase.age + " yrs"],
                    ["Gender", selectedCase.gender],
                    ["Language", selectedCase.language],
                  ].map(([label, value]) => (
                    <div key={label as string}>
                      <div className="text-gray-500 mb-0.5">{label}</div>
                      {label === "Risk Level" ? (
                        <RiskBadge level={selectedCase.riskLevel} />
                      ) : (
                        <div className="font-medium text-gray-800">{value}</div>
                      )}
                    </div>
                  ))}
                </div>

                {selectedCase.actionRequired && (
                  <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    <AlertTriangle size={14} className="text-red-600" />
                    <span className="text-xs text-red-700 font-medium">Action Required — Caseworker review needed</span>
                  </div>
                )}
              </div>

              {/* Lifecycle */}
              <CaseLifecycle currentStage={selectedCase.stage} />

              {/* AI Insights if available */}
              {mockAIInsights[selectedCase.id] && (
                <AIInsightsPanel insight={mockAIInsights[selectedCase.id]} />
              )}

              {/* Escalation */}
              {selectedCase.riskLevel === "High" && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-heading font-semibold text-gray-800 text-sm mb-2">Escalation</h3>
                  {escalatedIds.has(selectedCase.id) ? (
                    <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                      <AlertTriangle size={14} className="text-green-600" />
                      Escalation submitted — awaiting District Officer review
                    </div>
                  ) : (
                    <button
                      onClick={() => setEscalateCase(selectedCase)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <AlertTriangle size={15} /> Escalate Case
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {escalateCase && (
        <EscalationDialog
          caseData={escalateCase}
          onConfirm={() => {
            setEscalatedIds((prev) => new Set([...prev, escalateCase.id]));
            setEscalateCase(null);
          }}
          onCancel={() => setEscalateCase(null)}
        />
      )}
    </div>
  );
}
