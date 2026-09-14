import {
  FolderOpen,
  AlertTriangle,
  Users,
  TrendingUp,
  BarChart3,
  MapPin,
  Award,
  Activity,
} from "lucide-react";
import StatusCard from "../components/StatusCard";
import { dashboardStats, DISTRICTS } from "../data/mockData";
import { type UserSession } from "./LoginPage";

interface StateAdminDashboardProps {
  currentUser: UserSession;
}

export default function StateAdminDashboard({ currentUser }: StateAdminDashboardProps) {
  // State-wide statistics
  const districtData = [
    { district: "Nagpur", cases: 42, highRisk: 8, caseworkers: 12, resolution: 73 },
    { district: "Mumbai", cases: 68, highRisk: 15, caseworkers: 24, resolution: 71 },
    { district: "Pune", cases: 54, highRisk: 11, caseworkers: 18, resolution: 78 },
    { district: "Nashik", cases: 31, highRisk: 6, caseworkers: 10, resolution: 75 },
    { district: "Aurangabad", cases: 28, highRisk: 5, caseworkers: 8, resolution: 69 },
    { district: "Solapur", cases: 23, highRisk: 4, caseworkers: 7, resolution: 72 },
  ];

  const totalCases = districtData.reduce((sum, d) => sum + d.cases, 0);
  const totalHighRisk = districtData.reduce((sum, d) => sum + d.highRisk, 0);
  const totalCaseworkers = districtData.reduce((sum, d) => sum + d.caseworkers, 0);
  const avgResolution = Math.round(districtData.reduce((sum, d) => sum + d.resolution, 0) / districtData.length);

  // Monthly trends
  const monthlyData = [
    { month: "Jan", cases: 178, resolved: 132 },
    { month: "Feb", cases: 195, resolved: 145 },
    { month: "Mar", cases: 212, resolved: 158 },
    { month: "Apr", cases: 246, resolved: 182 },
  ];

  return (
    <div className="p-5 space-y-6 max-w-7xl mx-auto">
      {/* Role Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">State Administration Dashboard</h2>
            <p className="text-purple-100">
              {currentUser.name} • {currentUser.officerId} • Maharashtra State
            </p>
            <p className="text-xs text-purple-200 mt-2">
              State Administrators monitor state-wide trends, supervise district performance, support resource planning, and ensure compliance with approved procedures.
            </p>
          </div>
          <div className="hidden md:block text-purple-100 text-xs bg-purple-800/30 px-3 py-2 rounded-lg">
            <div className="font-semibold mb-1">Access Level</div>
            <div>State-Wide Aggregated View</div>
          </div>
        </div>
      </div>

      {/* State-wide Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard 
          label="Total State Cases" 
          value={totalCases} 
          Icon={FolderOpen} 
          color="blue" 
          note="Across all districts"
        />
        <StatusCard 
          label="High-Risk Cases" 
          value={totalHighRisk} 
          Icon={AlertTriangle} 
          color="red" 
          note="Statewide priority" 
        />
        <StatusCard 
          label="Total Caseworkers" 
          value={totalCaseworkers} 
          Icon={Users} 
          color="green" 
          note="Active personnel" 
        />
        <StatusCard 
          label="Avg. Resolution Rate" 
          value={`${avgResolution}%`} 
          Icon={TrendingUp} 
          color="purple" 
          note="State average" 
        />
      </div>

      {/* District Comparison */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="font-heading font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" />
          District-wise Performance Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">District</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3">Total Cases</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3">High-Risk</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3">Caseworkers</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3">Resolution Rate</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3">Performance</th>
              </tr>
            </thead>
            <tbody>
              {districtData.map((d) => (
                <tr key={d.district} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 text-sm font-medium text-gray-800">{d.district}</td>
                  <td className="py-3 text-center text-sm text-gray-700">{d.cases}</td>
                  <td className="py-3 text-center">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded">
                      {d.highRisk}
                    </span>
                  </td>
                  <td className="py-3 text-center text-sm text-gray-700">{d.caseworkers}</td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex-1 max-w-[80px] bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${d.resolution}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 min-w-[35px]">{d.resolution}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      d.resolution >= 75 ? "bg-green-100 text-green-700" :
                      d.resolution >= 70 ? "bg-yellow-100 text-yellow-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {d.resolution >= 75 ? "Excellent" : d.resolution >= 70 ? "Good" : "Needs Attention"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly Trends */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-heading font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-blue-600" />
            Monthly Case Trends
          </h3>
          <div className="space-y-4">
            {monthlyData.map((month) => (
              <div key={month.month}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{month.month} 2024</span>
                  <div className="text-xs text-gray-500">
                    {month.cases} cases • {month.resolved} resolved
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" 
                      style={{ width: `${(month.resolved / month.cases) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 min-w-[40px]">
                    {Math.round((month.resolved / month.cases) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-green-600">
              <TrendingUp size={14} />
              <span>15% improvement in resolution rate over last quarter</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity size={20} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-blue-800">System Utilization</div>
                <div className="text-2xl font-bold text-blue-900">87%</div>
              </div>
            </div>
            <div className="text-xs text-blue-700">
              Average across all districts and caseworkers
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Award size={20} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-green-800">Top Performing District</div>
                <div className="text-2xl font-bold text-green-900">Pune</div>
              </div>
            </div>
            <div className="text-xs text-green-700">
              78% resolution rate with 54 active cases
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-purple-800">Active Users</div>
                <div className="text-2xl font-bold text-purple-900">{totalCaseworkers + 12}</div>
              </div>
            </div>
            <div className="text-xs text-purple-700">
              Caseworkers and district supervisors combined
            </div>
          </div>
        </div>
      </div>

      {/* System-wide Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900 text-sm">Attention Required</h4>
            <p className="text-xs text-yellow-800 mt-1">
              Aurangabad district has the lowest resolution rate (69%). Consider allocating additional resources or training.
            </p>
          </div>
        </div>
      </div>

      {/* What I Can Do */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
        <h4 className="font-semibold text-purple-900 text-sm mb-3 flex items-center gap-2">
          <Activity size={16} />
          What I Can Do as State Administrator
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-purple-800">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            View state-wide aggregated dashboards
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            Compare district-level performance
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            Monitor unresolved high-priority cases
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            Review district response times
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            Allocate resources across districts
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            Approve state-level escalation workflows
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            Manage district & supervisor accounts
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            Review audit and compliance reports
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            Configure approved reporting periods
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            Coordinate with relevant departments
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-purple-200">
          <p className="text-xs text-purple-700">
            <strong>Note:</strong> State Administrator does not routinely view private counselling conversations or raw voice recordings. Access is controlled and aggregated for privacy protection.
          </p>
        </div>
      </div>
    </div>
  );
}
