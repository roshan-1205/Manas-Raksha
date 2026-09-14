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
} from "lucide-react";
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
      {/* Role Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">District Supervisor Dashboard</h2>
            <p className="text-indigo-100">
              {currentUser.name} • {currentUser.officerId} • {currentUser.district} District
            </p>
            <p className="text-xs text-indigo-200 mt-2">
              Supervisors oversee district cases, monitor response performance, review escalations, and ensure that follow-up actions are completed.
            </p>
          </div>
          <div className="hidden md:block text-indigo-100 text-xs bg-indigo-800/30 px-3 py-2 rounded-lg">
            <div className="font-semibold mb-1">Access Level</div>
            <div>District-Wide View</div>
            <div className="text-indigo-300 mt-1">{currentUser.district} Only</div>
          </div>
        </div>
      </div>

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
                      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
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
                    <button className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                      Review Details
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                      Escalate to State
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What I Can Do */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
        <h4 className="font-semibold text-indigo-900 text-sm mb-3 flex items-center gap-2">
          <FileText size={16} />
          What I Can Do as District Supervisor
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-indigo-800">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            View ALL cases in my district
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            Monitor ALL caseworker activities
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            View ALL action logs in district
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            Review escalated cases
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            Reassign cases between caseworkers
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            Approve district-level interventions
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            Monitor high-risk alert acknowledgment
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            Escalate critical cases to state officials
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            Review delayed/incomplete follow-ups
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            Approve referrals per departmental procedure
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            Review caseworker workload & performance
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            Generate district-level reports
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-indigo-200">
          <p className="text-xs text-indigo-800">
            <strong>Full District Visibility:</strong> You have complete access to view all cases, caseworker actions, follow-ups, and logs within {currentUser.district} district for supervision and coordination.
          </p>
        </div>
      </div>

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
    </div>
  );
}
