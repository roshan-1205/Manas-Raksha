import {
  FolderOpen,
  AlertTriangle,
  Users,
  TrendingUp,
  BarChart3,
  MapPin,
  Award,
  Activity,
  Shield,
} from "lucide-react";
import StatusCard from "../components/StatusCard";
import { dashboardStats, DISTRICTS } from "../data/mockData";
import { type UserSession } from "./LoginPage";

interface StateAdminDashboardProps {
  currentUser: UserSession;
}

export default function StateAdminDashboard({ currentUser }: StateAdminDashboardProps) {
  // Genuine national statistics from NCRB 2023
  const nationalContext = {
    scCases2023: 57766,
    stCases2023: 12959,
    totalCases2023: 70725,
  };

  // State-level context (example from Uttar Pradesh)
  // Note: These are state-level crime statistics, not Manas Raksha operational data
  const stateContextData = [
    { 
      state: "Uttar Pradesh", 
      cases: 15130, // SC cases in 2023 (state context)
      highRisk: "To be measured", 
      caseworkers: "Not available", 
      resolution: "To be measured",
      note: "State-level SC cases, 2023"
    },
    { 
      state: "Rajasthan", 
      cases: "From NCRB extract", 
      highRisk: "To be measured", 
      caseworkers: "Not available", 
      resolution: "To be measured",
      note: "Pending authorised data access"
    },
    { 
      state: "Madhya Pradesh", 
      cases: "From NCRB extract", 
      highRisk: "To be measured", 
      caseworkers: "Not available", 
      resolution: "To be measured",
      note: "Pending authorised data access"
    },
    { 
      state: "Maharashtra", 
      cases: "From NCRB extract", 
      highRisk: "To be measured", 
      caseworkers: "Not available", 
      resolution: "To be measured",
      note: "Pending authorised data access"
    },
  ];

  // Monthly trends - will be available after pilot deployment
  const monthlyData = [
    { month: "Jan", cases: "—", resolved: "—", alerts: "—", interventions: "—" },
    { month: "Feb", cases: "—", resolved: "—", alerts: "—", interventions: "—" },
    { month: "Mar", cases: "—", resolved: "—", alerts: "—", interventions: "—" },
    { month: "Apr", cases: "—", resolved: "—", alerts: "—", interventions: "—" },
    { month: "May", cases: "—", resolved: "—", alerts: "—", interventions: "—" },
    { month: "Jun", cases: "—", resolved: "—", alerts: "—", interventions: "—" },
  ];

  return (
    <div className="p-5 space-y-6 max-w-7xl mx-auto">
      {/* National Case Context */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 text-sm mb-2">National Case Context (2023)</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="text-blue-600 font-medium">SC Cases</div>
            <div className="text-xl font-bold text-blue-900">{nationalContext.scCases2023.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-blue-600 font-medium">ST Cases</div>
            <div className="text-xl font-bold text-blue-900">{nationalContext.stCases2023.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-blue-600 font-medium">Total SC/ST Cases</div>
            <div className="text-xl font-bold text-blue-900">{nationalContext.totalCases2023.toLocaleString()}</div>
          </div>
        </div>
        <p className="text-xs text-blue-700 mt-2">
          Data source: NCRB figures reported through Government of India
        </p>
      </div>

      {/* Pilot Metrics - Placeholder */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard 
          label="High-Risk Cases" 
          value="Pilot" 
          Icon={AlertTriangle} 
          color="red" 
          note="To be measured during pilot"
        />
        <StatusCard 
          label="Active Caseworkers" 
          value="TBD" 
          Icon={Users} 
          color="green" 
          note="To be configured by department" 
        />
        <StatusCard 
          label="Avg. Response Time" 
          value="Pilot" 
          Icon={TrendingUp} 
          color="purple" 
          note="To be measured during pilot" 
        />
        <StatusCard 
          label="Resolution Rate" 
          value="Pilot" 
          Icon={BarChart3} 
          color="blue" 
          note="To be measured during pilot" 
        />
      </div>

      {/* State-Level Context Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="font-heading font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" />
          State-Level Context Overview
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          State-level crime statistics shown for context. District-level Manas Raksha metrics will be populated after authorised CCTNS/departmental data access and pilot deployment.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-2">State</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 px-2">Context Cases</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 px-2">High-Risk</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 px-2">Caseworkers</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 px-2">Resolution Rate</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {stateContextData.map((s) => (
                <tr key={s.state} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 px-2 text-sm font-medium text-gray-800">{s.state}</td>
                  <td className="py-3 px-2 text-center text-sm text-gray-700">
                    {typeof s.cases === 'number' ? s.cases.toLocaleString() : s.cases}
                  </td>
                  <td className="py-3 px-2 text-center text-xs text-gray-500 italic">{s.highRisk}</td>
                  <td className="py-3 px-2 text-center text-xs text-gray-500 italic">{s.caseworkers}</td>
                  <td className="py-3 px-2 text-center text-xs text-gray-500 italic">{s.resolution}</td>
                  <td className="py-3 px-2 text-xs text-gray-600">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 bg-amber-50 rounded p-3">
          <p className="text-xs text-amber-800">
            <strong>Important:</strong> Official crime statistics are shown for national context. Manas Raksha operational metrics will be generated only from authorised, consent-based pilot data and should not be inferred from crime-registration figures.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly Trends */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-heading font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <BarChart3 size={18} className="text-blue-600" />
            Monthly Manas Raksha Trends
          </h3>
          <p className="text-xs text-gray-600 mb-4">
            Monthly Manas Raksha trends will be generated from consent-based pilot data.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600">Month</th>
                  <th className="text-center py-2 text-gray-600">Registered</th>
                  <th className="text-center py-2 text-gray-600">High-Risk</th>
                  <th className="text-center py-2 text-gray-600">Alerts</th>
                  <th className="text-center py-2 text-gray-600">Interventions</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((month) => (
                  <tr key={month.month} className="border-b border-gray-100 last:border-0">
                    <td className="py-2.5 text-gray-700 font-medium">{month.month}</td>
                    <td className="py-2.5 text-center text-gray-400">{month.cases}</td>
                    <td className="py-2.5 text-center text-gray-400">{month.resolved}</td>
                    <td className="py-2.5 text-center text-gray-400">{month.alerts}</td>
                    <td className="py-2.5 text-center text-gray-400">{month.interventions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 bg-blue-50 rounded p-2">
            <p className="text-xs text-blue-800">
              Available after pilot deployment and authorised data collection
            </p>
          </div>
        </div>

        {/* Key Metrics - Pilot Status */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity size={20} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-blue-800">System Utilization</div>
                <div className="text-lg font-bold text-blue-900">To be measured</div>
              </div>
            </div>
            <div className="text-xs text-blue-700">
              Available after pilot deployment
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Award size={20} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-green-800">Top Performing District</div>
                <div className="text-sm font-bold text-green-900">To be identified</div>
              </div>
            </div>
            <div className="text-xs text-green-700">
              After comparable pilot data is available
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-purple-800">Active Users</div>
                <div className="text-lg font-bold text-purple-900">Not available</div>
              </div>
            </div>
            <div className="text-xs text-purple-700">
              Available after authorised onboarding
            </div>
          </div>
        </div>
      </div>

      {/* System-wide Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield size={20} className="text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 text-sm">Manas Raksha Pilot Platform</h4>
            <p className="text-xs text-blue-800 mt-1">
              This dashboard displays genuine national crime statistics (NCRB 2023) for context. All Manas Raksha operational metrics—including high-risk classifications, caseworker activity, resolution rates, and user data—will be generated only from authorised, consent-based pilot deployment and should not be inferred from crime-registration figures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
