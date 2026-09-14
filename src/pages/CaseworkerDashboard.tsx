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
} from "lucide-react";
import StatusCard from "../components/StatusCard";
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
      {/* Role Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Caseworker Dashboard</h2>
            <p className="text-blue-100">
              {currentUser.name} • {currentUser.officerId} • {currentUser.district} District
            </p>
            <p className="text-xs text-blue-200 mt-2">
              Caseworkers manage assigned cases, review alerts, coordinate support, and record follow-up actions.
            </p>
          </div>
          <div className="hidden md:block text-blue-100 text-xs bg-blue-800/30 px-3 py-2 rounded-lg">
            <div className="font-semibold mb-1">Access Level</div>
            <div>Assigned Cases Only</div>
          </div>
        </div>
      </div>

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
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5">
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
                    <button className="flex-1 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 px-3 py-2 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                      Record Action
                    </button>
                    {c.actionRequired && (
                      <button className="px-3 py-2 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                        <ArrowUpCircle size={14} className="inline" /> Escalate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
          
          <button className="mt-4 w-full px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            View All My Actions
          </button>
        </div>
      </div>

      {/* What I Can Do */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-semibold text-blue-900 text-sm mb-3">What I Can Do</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-800">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            View my assigned cases
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            Complete/record human review of alerts
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            Contact victim through approved channels
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            Record counselling/medical/legal referrals
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            Update action status
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            Add factual follow-up notes
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            Escalate urgent cases to supervisor
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            Mark follow-up completion status
          </div>
        </div>
      </div>

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
