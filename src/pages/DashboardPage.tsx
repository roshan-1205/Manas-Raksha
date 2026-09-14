import {
  FolderOpen,
  AlertTriangle,
  Clock,
  Zap,
  PhoneCall,
  MessageSquare,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import StatusCard from "../components/StatusCard";
import DistrictHeatmap from "../components/DistrictHeatmap";
import { dashboardStats, mockCases, heatmapData } from "../data/mockData";
import RiskBadge from "../components/RiskBadge";

export default function DashboardPage() {
  const highRiskCases = mockCases.filter((c) => c.riskLevel === "High");

  // Recent activities mock data
  const recentActivities = [
    {
      id: 1,
      victimId: "V-MH-2024-0421",
      victimName: "Priya S.",
      activity: "Completed phone check-in",
      time: "2 hours ago",
      icon: PhoneCall,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      id: 2,
      victimId: "V-MH-2024-0389",
      victimName: "Anjali M.",
      activity: "SMS wellness check sent",
      time: "4 hours ago",
      icon: MessageSquare,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: 3,
      victimId: "V-MH-2024-0512",
      victimName: "Kavita R.",
      activity: "Caseworker visit scheduled",
      time: "5 hours ago",
      icon: UserCheck,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      id: 4,
      victimId: "V-MH-2024-0298",
      victimName: "Meera K.",
      activity: "Risk level escalated",
      time: "6 hours ago",
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      id: 5,
      victimId: "V-MH-2024-0445",
      victimName: "Sunita D.",
      activity: "Completed phone check-in",
      time: "7 hours ago",
      icon: PhoneCall,
      color: "text-green-600",
      bg: "bg-green-50"
    },
  ];

  return (
    <div className="p-5 space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatusCard label="Total Active Cases" value={dashboardStats.totalActiveCases} Icon={FolderOpen} color="blue" note="Across all stages" />
        <StatusCard label="High-Risk Victims" value={dashboardStats.highRiskVictims} Icon={AlertTriangle} color="red" note="Require priority attention" />
        <StatusCard label="Pending Follow-ups" value={dashboardStats.pendingFollowUps} Icon={Clock} color="amber" note="Awaiting caseworker action" />
        <StatusCard label="Immediate Action Reqd." value={dashboardStats.immediateActionRequired} Icon={Zap} color="red" note="Urgent caseworker review" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-5">
          <DistrictHeatmap />
          
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-heading font-semibold text-gray-800 text-lg mb-4">My Assigned Cases</h3>
            <div className="space-y-4">
              {mockCases.slice(0, 3).map((c) => (
                <div key={c.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-mono text-sm font-semibold text-gray-800 mb-1">{c.id}</div>
                      {c.followUpStatus === "Overdue" && (
                        <div className="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded mb-2">
                          Overdue
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">Victim:</span>
                      <span className="ml-1 text-gray-800">{c.victimName}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">Stage:</span>
                      <span className="ml-1 text-gray-800">{c.stage}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-sm mb-3">
                    <div>
                      <span className="font-semibold text-gray-700">Station:</span>
                      <span className="ml-1 text-gray-800">{c.policeStation}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Last Check-in:</span>
                      <span className="ml-1 text-gray-800">{c.lastCheckIn}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Protection:</span>
                      <span className={`ml-1 font-medium ${
                        c.protectionStatus === "Active" ? "text-green-600" : 
                        c.protectionStatus === "Pending" ? "text-amber-600" : 
                        "text-gray-600"
                      }`}>
                        {c.protectionStatus}
                      </span>
                    </div>
                  </div>

                  {c.actionRequired && (
                    <div className="flex items-center gap-1.5 text-sm text-red-600 font-medium mb-3 py-2">
                      <AlertCircle size={16} />
                      <span>Human review required</span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      Record Action
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors">
                      Escalate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-heading font-semibold text-gray-800 mb-3">Recent Activity</h3>
            <div className="space-y-2.5">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className={`w-8 h-8 rounded-lg ${activity.bg} flex items-center justify-center shrink-0`}>
                      <Icon size={14} className={activity.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-800">{activity.activity}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-semibold text-gray-700">{activity.victimName}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="font-mono text-xs text-gray-500">{activity.victimId}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">{activity.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gray-100 pt-3 mt-3 text-xs text-gray-500">
              Showing last 5 activities across all victims
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-heading font-semibold text-gray-800 mb-3">Priority Cases</h3>
            <div className="space-y-2">
              {highRiskCases.slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-semibold text-gray-800">{c.victimName}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="font-mono text-xs text-gray-500">{c.victimId}</span>
                    </div>
                    <div className="font-mono text-xs font-medium text-gray-700">{c.id}</div>
                    <div className="text-xs text-gray-500">{c.district} · {c.stage}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <RiskBadge level={c.riskLevel} />
                    {c.actionRequired && (
                      <span className="text-[10px] text-red-600 font-medium">Action Required</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
