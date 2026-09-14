import {
  FolderOpen,
  AlertTriangle,
  Users,
  Clock,
  MapPin,
  UserCheck,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  FileText,
  X,
} from "lucide-react";
import { useState } from "react";
import StatusCard from "../components/StatusCard";
import DistrictHeatmap from "../components/DistrictHeatmap";
import { mockCases, POLICE_STATIONS } from "../data/mockData";
import RiskBadge from "../components/RiskBadge";
import { type UserSession } from "./LoginPage";

interface DistrictDashboardProps {
  currentUser: UserSession;
}

export default function DistrictDashboard({ currentUser }: DistrictDashboardProps) {
  // RBAC: Supervisor can ONLY see cases within their assigned district
  const districtCases = mockCases.filter(c => c.district === currentUser.district);
  const highRiskCases = districtCases.filter((c) => c.riskLevel === "High");
  const unacknowledgedAlerts = districtCases.filter((c) => c.actionRequired).length;
  const overdueFollowups = districtCases.filter((c) => c.followUpStatus === "Overdue").length;

  // State for modals
  const [selectedCase, setSelectedCase] = useState<typeof districtCases[0] | null>(null);
  const [escalateCase, setEscalateCase] = useState<typeof districtCases[0] | null>(null);
  const [viewCaseworkerWork, setViewCaseworkerWork] = useState<string | null>(null);

  // Cases by police station (within THIS district only)
  const casesByStation = POLICE_STATIONS.map(station => ({
    station,
    count: districtCases.filter(c => c.policeStation === station).length,
    highRisk: districtCases.filter(c => c.policeStation === station && c.riskLevel === "High").length,
  })).filter(s => s.count > 0); // Only show stations with cases

  // Caseworker performance (within THIS district only)
  const caseworkers = [
    { name: "Priya Deshmukh", id: "MH-CW-00142", cases: 8, completedFollowups: 15, responseTime: "2.5 hrs", workload: "Normal" },
    { name: "Rajesh Patil", id: "MH-CW-00156", cases: 6, completedFollowups: 12, responseTime: "3.1 hrs", workload: "Normal" },
    { name: "Sunita Sharma", id: "MH-CW-00178", cases: 10, completedFollowups: 18, responseTime: "1.8 hrs", workload: "High" },
    { name: "Amit Kumar", id: "MH-CW-00192", cases: 7, completedFollowups: 14, responseTime: "2.9 hrs", workload: "Normal" },
  ];

  return (
    <div className="p-5 space-y-6 max-w-7xl mx-auto">
      {/* Stats Cards - District-level ONLY */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard 
          label="District Cases" 
          value={districtCases.length} 
          Icon={FolderOpen} 
          color="blue" 
          note={`${currentUser.district} only`}
        />
        <StatusCard 
          label="High-Risk Cases" 
          value={highRiskCases.length} 
          Icon={AlertTriangle} 
          color="red" 
          note="Immediate review" 
        />
        <StatusCard 
          label="Unacknowledged Alerts" 
          value={unacknowledgedAlerts} 
          Icon={AlertCircle} 
          color="amber" 
          note="Require attention" 
        />
        <StatusCard 
          label="Overdue Follow-ups" 
          value={overdueFollowups} 
          Icon={Clock} 
          color="red" 
          note="Delayed actions" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* District Heatmap */}
        <div className="lg:col-span-3">
          <DistrictHeatmap />
        </div>

        {/* Cases by Police Station */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-heading font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-indigo-600" />
            Cases by Police Station
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {casesByStation.map((station) => (
              <div key={station.station} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-800">{station.station}</span>
                  <span className="text-lg font-bold text-gray-900">{station.count}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: `${(station.count / Math.max(...casesByStation.map(s => s.count))) * 100}%` }}
                    />
                  </div>
                  {station.highRisk > 0 && (
                    <span className="text-xs text-red-600 font-semibold">{station.highRisk} high-risk</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Caseworker Performance Monitoring */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="font-heading font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <UserCheck size={18} className="text-indigo-600" />
          Caseworker Activity & Workload Monitoring
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-2">Caseworker</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-2">Officer ID</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 px-2">Active Cases</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 px-2">Completed Follow-ups</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 px-2">Pending Actions</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 px-2">Avg. Response Time</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 px-2">Workload</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {caseworkers.map((cw) => {
                const cwCases = districtCases.filter(c => c.assignedCaseworker === cw.name);
                const cwPendingActions = cwCases.filter(c => c.actionRequired).length;
                
                return (
                  <tr key={cw.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm font-medium text-gray-800">{cw.name}</td>
                    <td className="py-3 px-2 text-xs font-mono text-gray-500">{cw.id}</td>
                    <td className="py-3 px-2 text-center text-sm text-gray-700">
                      <button className="text-blue-600 hover:underline font-semibold">
                        {cwCases.length}
                      </button>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-green-700">
                        <CheckCircle size={14} />
                        {cw.completedFollowups}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {cwPendingActions > 0 ? (
                        <span className="inline-flex items-center gap-1 text-sm text-red-700 font-semibold">
                          <AlertCircle size={14} />
                          {cwPendingActions}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">0</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                        <Clock size={14} />
                        {cw.responseTime}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        cw.workload === "High" ? "bg-amber-100 text-amber-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {cw.workload}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button 
                        onClick={() => setViewCaseworkerWork(cw.name)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                      >
                        View All Work
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-600">
            <strong>Note:</strong> As District Supervisor, you can view all cases, actions, and logs for every caseworker in {currentUser.district} district.
          </p>
        </div>
      </div>

      {/* Escalated Cases Requiring Review */}
      {highRiskCases.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-heading font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-600" />
            High-Risk Cases Requiring Supervisor Review
          </h3>
          <div className="space-y-3">
            {highRiskCases.slice(0, 5).map((c) => (
              <div key={c.id} className="border border-red-100 bg-red-50/30 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-gray-600">{c.id}</span>
                      <RiskBadge risk={c.riskLevel} />
                      <span className="text-xs text-gray-500">• Assigned to: {c.assignedCaseworker}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {c.victimName} • {c.policeStation}
                    </div>
                    <div className="text-xs text-gray-600">
                      Stage: {c.stage} • Last check-in: {c.lastCheckIn} • Status: {c.followUpStatus}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedCase(c)}
                      className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                      Review Details
                    </button>
                    <button 
                      onClick={() => setEscalateCase(c)}
                      className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      Escalate to State
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* District Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <div className="text-xs font-semibold text-green-800 mb-1">Follow-up Completion Rate</div>
          <div className="text-2xl font-bold text-green-900">
            {Math.round((districtCases.filter(c => c.followUpStatus === "Completed").length / districtCases.length) * 100)}%
          </div>
          <div className="text-xs text-green-700 mt-1">{currentUser.district} District Performance</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <div className="text-xs font-semibold text-blue-800 mb-1">Avg. Response Time</div>
          <div className="text-2xl font-bold text-blue-900">2.6 hrs</div>
          <div className="text-xs text-blue-700 mt-1">District-wide average</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <div className="text-xs font-semibold text-purple-800 mb-1">Active Caseworkers</div>
          <div className="text-2xl font-bold text-purple-900">{caseworkers.length}</div>
          <div className="text-xs text-purple-700 mt-1">In {currentUser.district} district</div>
        </div>
      </div>

      {/* View Caseworker Work Modal */}
      {viewCaseworkerWork && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-gray-900 text-lg">
                  {viewCaseworkerWork}'s Work Summary
                </h3>
                <p className="text-sm text-gray-500 mt-1">All assigned cases and recent actions</p>
              </div>
              <button
                onClick={() => setViewCaseworkerWork(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Caseworker Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-xs font-semibold text-blue-800 mb-1">Assigned Cases</div>
                  <div className="text-2xl font-bold text-blue-900">
                    {districtCases.filter(c => c.assignedCaseworker === viewCaseworkerWork).length}
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-xs font-semibold text-green-800 mb-1">Completed Follow-ups</div>
                  <div className="text-2xl font-bold text-green-900">
                    {districtCases.filter(c => c.assignedCaseworker === viewCaseworkerWork && c.followUpStatus === "Completed").length}
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-xs font-semibold text-red-800 mb-1">Pending Actions</div>
                  <div className="text-2xl font-bold text-red-900">
                    {districtCases.filter(c => c.assignedCaseworker === viewCaseworkerWork && c.actionRequired).length}
                  </div>
                </div>
              </div>

              {/* Cases List */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">All Assigned Cases</h4>
                <div className="space-y-3">
                  {districtCases
                    .filter(c => c.assignedCaseworker === viewCaseworkerWork)
                    .map((c) => (
                      <div key={c.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-sm font-semibold text-gray-800">{c.id}</span>
                              <RiskBadge risk={c.riskLevel} />
                            </div>
                            <div className="text-sm text-gray-800 font-medium">{c.victimName}</div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded font-medium ${
                            c.followUpStatus === "Completed" ? "bg-green-100 text-green-700" :
                            c.followUpStatus === "Overdue" ? "bg-red-100 text-red-700" :
                            "bg-amber-100 text-amber-700"
                          }`}>
                            {c.followUpStatus}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div><span className="font-semibold">Stage:</span> {c.stage}</div>
                          <div><span className="font-semibold">Station:</span> {c.policeStation}</div>
                          <div><span className="font-semibold">Last Check-in:</span> {c.lastCheckIn}</div>
                          <div><span className="font-semibold">Protection:</span> {c.protectionStatus}</div>
                        </div>
                        {c.actionRequired && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                            <AlertCircle size={14} />
                            Action Required
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
              <button
                onClick={() => setViewCaseworkerWork(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-gray-900 text-lg">Case Details</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedCase.id}</p>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{selectedCase.victimName}</div>
                  <div className="text-sm text-gray-500">Victim ID: {selectedCase.victimId}</div>
                </div>
                <RiskBadge risk={selectedCase.riskLevel} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Case ID</div>
                  <div className="font-mono text-gray-800">{selectedCase.id}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Case Reference</div>
                  <div className="font-mono text-gray-800">{selectedCase.caseRefNo}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">District</div>
                  <div className="text-gray-800">{selectedCase.district}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Police Station</div>
                  <div className="text-gray-800">{selectedCase.policeStation}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Stage</div>
                  <div className="text-gray-800">{selectedCase.stage}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Assigned Caseworker</div>
                  <div className="text-gray-800">{selectedCase.assignedCaseworker}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Last Check-in</div>
                  <div className="text-gray-800">{selectedCase.lastCheckIn}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Follow-up Status</div>
                  <div className={`font-medium ${
                    selectedCase.followUpStatus === "Completed" ? "text-green-600" :
                    selectedCase.followUpStatus === "Overdue" ? "text-red-600" :
                    "text-amber-600"
                  }`}>
                    {selectedCase.followUpStatus}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Protection Status</div>
                  <div className={`font-medium ${
                    selectedCase.protectionStatus === "Active" ? "text-green-600" : 
                    selectedCase.protectionStatus === "Pending" ? "text-amber-600" : 
                    "text-gray-600"
                  }`}>
                    {selectedCase.protectionStatus}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Registered Date</div>
                  <div className="text-gray-800">{selectedCase.registeredDate}</div>
                </div>
              </div>

              {selectedCase.actionRequired && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-800 font-semibold mb-2">
                    <AlertCircle size={18} />
                    Action Required
                  </div>
                  <p className="text-sm text-red-700">
                    This case requires immediate supervisor review and intervention.
                  </p>
                </div>
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Victim Information</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500 font-semibold">Age:</span>
                    <span className="ml-2 text-gray-800">{selectedCase.age}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold">Gender:</span>
                    <span className="ml-2 text-gray-800">{selectedCase.gender}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold">Language:</span>
                    <span className="ml-2 text-gray-800">{selectedCase.language}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold">Contact Preference:</span>
                    <span className="ml-2 text-gray-800">{selectedCase.contactPreference}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-2">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setEscalateCase(selectedCase);
                  setSelectedCase(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Escalate to State
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Escalate to State Modal */}
      {escalateCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
            <div className="bg-red-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle size={24} />
                <h3 className="font-heading font-semibold text-lg">Escalate Case to State Level</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  You are about to escalate this case to the State Administrator. This action should only be taken for critical cases requiring state-level intervention.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-gray-800 mb-2">Case Details</div>
                <div className="space-y-1 text-sm text-gray-700">
                  <div><span className="font-semibold">Case ID:</span> {escalateCase.id}</div>
                  <div><span className="font-semibold">Victim:</span> {escalateCase.victimName}</div>
                  <div><span className="font-semibold">Risk Level:</span> <RiskBadge risk={escalateCase.riskLevel} /></div>
                  <div><span className="font-semibold">District:</span> {escalateCase.district}</div>
                  <div><span className="font-semibold">Caseworker:</span> {escalateCase.assignedCaseworker}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Escalation Reason <span className="text-red-600">*</span>
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={4}
                  placeholder="Provide detailed reason for escalating this case to state level..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Recommended Action
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={3}
                  placeholder="Suggest what state-level action or support is needed..."
                />
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-2">
              <button
                onClick={() => setEscalateCase(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Case ${escalateCase.id} has been escalated to State Administrator for review.`);
                  setEscalateCase(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <AlertTriangle size={16} />
                Confirm Escalation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
