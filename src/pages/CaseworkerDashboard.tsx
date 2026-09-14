import {
  FolderOpen,
  AlertTriangle,
  Clock,
  UserCheck,
  PhoneCall,
  MessageSquare,
  AlertCircle,
  Calendar,
  ArrowUpCircle,
  FileText,
  X,
} from "lucide-react";
import { useState } from "react";
import StatusCard from "../components/StatusCard";
import DistrictHeatmap from "../components/DistrictHeatmap";
import { mockCases } from "../data/mockData";
import RiskBadge from "../components/RiskBadge";
import { type UserSession } from "./LoginPage";

interface CaseworkerDashboardProps {
  currentUser: UserSession;
}

export default function CaseworkerDashboard({ currentUser }: CaseworkerDashboardProps) {
  // RBAC: Caseworker can ONLY see cases assigned to them
  const myAssignedCases = mockCases.filter(
    c => c.assignedCaseworker === currentUser.name && c.district === currentUser.district
  );
  
  const highRiskCases = myAssignedCases.filter((c) => c.riskLevel === "High");
  const pendingFollowUps = myAssignedCases.filter(
    (c) => c.followUpStatus === "Pending" || c.followUpStatus === "Overdue"
  );
  const requiresAction = myAssignedCases.filter((c) => c.actionRequired);

  // State for modals/dialogs
  const [selectedCase, setSelectedCase] = useState<typeof myAssignedCases[0] | null>(null);
  const [recordActionCase, setRecordActionCase] = useState<typeof myAssignedCases[0] | null>(null);
  const [escalateCase, setEscalateCase] = useState<typeof myAssignedCases[0] | null>(null);
  const [showAllActions, setShowAllActions] = useState(false);

  const recentActions = [
    {
      id: 1,
      caseId: "MH-2024-0421",
      victimName: "Priya S.",
      activity: "Completed phone check-in",
      time: "2 hours ago",
      icon: PhoneCall,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      id: 2,
      caseId: "MH-2024-0389",
      victimName: "Anjali M.",
      activity: "SMS wellness check sent",
      time: "4 hours ago",
      icon: MessageSquare,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: 3,
      caseId: "MH-2024-0512",
      victimName: "Kavita R.",
      activity: "Medical referral recorded",
      time: "5 hours ago",
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
  ];

  return (
    <div className="p-5 space-y-6 max-w-7xl mx-auto">
      {/* Stats Cards - Only MY assigned cases */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard 
          label="My Assigned Cases" 
          value={myAssignedCases.length} 
          Icon={FolderOpen} 
          color="blue" 
          note="Cases I manage"
        />
        <StatusCard 
          label="High-Risk Priority" 
          value={highRiskCases.length} 
          Icon={AlertTriangle} 
          color="red" 
          note="Require immediate attention" 
        />
        <StatusCard 
          label="Pending Follow-ups" 
          value={pendingFollowUps.length} 
          Icon={Clock} 
          color="amber" 
          note="Action needed" 
        />
        <StatusCard 
          label="Action Required" 
          value={requiresAction.length} 
          Icon={AlertCircle} 
          color="red" 
          note="Urgent review" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* My Assigned Cases - ONLY what I can see */}
        <div className="lg:col-span-2 space-y-5">
          {/* District Heatmap - Shows my district case distribution */}
          <DistrictHeatmap />
          
          {/* My Cases List */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-heading font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FolderOpen size={18} className="text-blue-600" />
            My Assigned Cases
          </h3>
          
          {myAssignedCases.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <UserCheck size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No cases currently assigned to you</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {myAssignedCases.map((c) => (
                <div key={c.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-500">{c.id}</span>
                      <RiskBadge risk={c.riskLevel} />
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      c.followUpStatus === "Completed" ? "bg-green-100 text-green-700" :
                      c.followUpStatus === "Overdue" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {c.followUpStatus}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-800">
                      Victim: {c.victimName}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>Stage: <span className="font-medium">{c.stage}</span></div>
                      <div>Station: <span className="font-medium">{c.policeStation}</span></div>
                      <div>Last Check-in: <span className="font-medium">{c.lastCheckIn}</span></div>
                      <div>Protection: <span className="font-medium">{c.protectionStatus}</span></div>
                    </div>
                  </div>

                  {c.actionRequired && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-red-600 font-medium">
                        <AlertCircle size={14} />
                        <span>Human review required</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                    <button 
                      onClick={() => setSelectedCase(c)}
                      className="flex-1 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => setRecordActionCase(c)}
                      className="flex-1 px-3 py-2 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      Record Action
                    </button>
                    {c.actionRequired && (
                      <button 
                        onClick={() => setEscalateCase(c)}
                        className="px-3 py-2 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <ArrowUpCircle size={14} /> Escalate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>

        {/* Recent Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-heading font-semibold text-gray-800 mb-4">My Recent Actions</h3>
          <div className="space-y-3">
            {recentActions.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className={`w-9 h-9 rounded-lg ${activity.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={16} className={activity.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-800">{activity.activity}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {activity.victimName} • {activity.time}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">{activity.caseId}</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button 
            onClick={() => setShowAllActions(true)}
            className="mt-4 w-full px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            View All My Actions
          </button>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Case Details</h3>
                  <p className="text-sm text-gray-500 font-mono">{selectedCase.id}</p>
                </div>
                <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Victim Name</label>
                    <p className="text-sm text-gray-900">{selectedCase.victimName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Risk Level</label>
                    <div className="mt-1"><RiskBadge risk={selectedCase.riskLevel} /></div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">District</label>
                    <p className="text-sm text-gray-900">{selectedCase.district}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Police Station</label>
                    <p className="text-sm text-gray-900">{selectedCase.policeStation}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Stage</label>
                    <p className="text-sm text-gray-900">{selectedCase.stage}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Last Check-in</label>
                    <p className="text-sm text-gray-900">{selectedCase.lastCheckIn}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Follow-up Status</label>
                    <p className="text-sm text-gray-900">{selectedCase.followUpStatus}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Protection Status</label>
                    <p className="text-sm text-gray-900">{selectedCase.protectionStatus}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedCase(null);
                    setRecordActionCase(selectedCase);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Record Action
                </button>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Record Action Modal */}
      {recordActionCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Record Action</h3>
                  <p className="text-sm text-gray-500">Case: {recordActionCase.id} - {recordActionCase.victimName}</p>
                </div>
                <button onClick={() => setRecordActionCase(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Action Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Completed phone check-in</option>
                    <option>SMS wellness check sent</option>
                    <option>Medical referral recorded</option>
                    <option>Counselling referral</option>
                    <option>Legal aid referral</option>
                    <option>Protection support initiated</option>
                    <option>Victim contacted</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" 
                    rows={4}
                    placeholder="Enter factual follow-up notes..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Next Follow-up Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <button 
                  onClick={() => {
                    setRecordActionCase(null);
                    alert("Action recorded successfully!");
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Save Action
                </button>
                <button 
                  onClick={() => setRecordActionCase(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Escalate Modal */}
      {escalateCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-red-600" />
                    Escalate Case to Supervisor
                  </h3>
                  <p className="text-sm text-gray-500">Case: {escalateCase.id} - {escalateCase.victimName}</p>
                </div>
                <button onClick={() => setEscalateCase(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-red-800">
                    <strong>Current Risk Level:</strong> {escalateCase.riskLevel}
                  </p>
                  <p className="text-xs text-red-800 mt-1">
                    <strong>Last Check-in:</strong> {escalateCase.lastCheckIn}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Escalation</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>High-risk situation requiring immediate attention</option>
                    <option>Victim not responding to contact attempts</option>
                    <option>Safety concerns identified</option>
                    <option>Requires district-level intervention</option>
                    <option>Protection order needed</option>
                    <option>Other urgent matter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Details</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" 
                    rows={4}
                    placeholder="Provide details about why this case requires escalation..."
                  />
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <button 
                  onClick={() => {
                    setEscalateCase(null);
                    alert("Case escalated to District Supervisor successfully!");
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Escalate to Supervisor
                </button>
                <button 
                  onClick={() => setEscalateCase(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View All Actions Modal */}
      {showAllActions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">All My Actions</h3>
                  <p className="text-sm text-gray-500">{currentUser.name} - Action History</p>
                </div>
                <button onClick={() => setShowAllActions(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                {recentActions.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className={`w-10 h-10 rounded-lg ${activity.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={18} className={activity.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800">{activity.activity}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {activity.victimName} • {activity.time}
                        </div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">{activity.caseId}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => setShowAllActions(false)}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* High Priority Alert */}
      {highRiskCases.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900 text-sm">High-Risk Cases Require Immediate Attention</h4>
              <p className="text-xs text-red-700 mt-1">
                You have {highRiskCases.length} high-risk case(s) assigned to you that require immediate follow-up and intervention.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
