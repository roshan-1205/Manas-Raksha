import { useState } from "react";
import { mockCases } from "../data/mockData";
import RiskBadge from "../components/RiskBadge";
import { Shield, Phone, MessageSquare, CheckCircle, Clock, AlertCircle, X, UserCheck, User } from "lucide-react";
import type { Case } from "../data/mockData";
import { type UserSession } from "./LoginPage";

interface VictimsPageProps {
  currentUser?: UserSession | null;
}

export default function VictimsPage({ currentUser }: VictimsPageProps) {
  const [selectedVictim, setSelectedVictim] = useState<Case | null>(null);
  const [checkedIn, setCheckedIn] = useState<Set<string>>(new Set());

  // RBAC: Filter cases based on user role
  const accessibleCases = mockCases.filter((c) => {
    if (!currentUser) return false;
    
    // CASEWORKER: Only see assigned cases
    if (currentUser.role === "CASEWORKER") {
      return c.assignedCaseworker === currentUser.name && c.district === currentUser.district;
    }
    
    // DISTRICT: Only see cases in their district
    if (currentUser.role === "DISTRICT") {
      return c.district === currentUser.district;
    }
    
    // NATIONAL: See all cases (state-wide)
    if (currentUser.role === "NATIONAL") {
      return true;
    }
    
    return false;
  });

  return (
    <div className="p-5 max-w-7xl mx-auto space-y-5">
      {/* RBAC Info Banner for District Supervisor */}
      {currentUser?.role === "DISTRICT" && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <UserCheck size={18} className="text-indigo-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-indigo-900 text-sm">District Supervisor View - All Victims</h4>
              <p className="text-xs text-indigo-700 mt-1">
                Viewing all {accessibleCases.length} victims across all caseworkers in {currentUser.district} district.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RBAC Info Banner for Caseworker */}
      {currentUser?.role === "CASEWORKER" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <User size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 text-sm">Caseworker View - My Assigned Victims</h4>
              <p className="text-xs text-blue-700 mt-1">
                Viewing only {accessibleCases.length} victim(s) assigned to you ({currentUser.name}).
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accessibleCases.map((c) => (
          <div key={c.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-gray-800 mb-0.5">{c.victimName}</div>
                <div className="font-mono text-xs text-gray-500">{c.victimId}</div>
                <div className="text-xs text-gray-500 mt-0.5 font-mono">{c.id}</div>
              </div>
              <RiskBadge level={c.riskLevel} />
            </div>

            <div className="space-y-1.5 text-xs text-gray-600 mb-3">
              <div className="flex items-center gap-1.5">
                <Shield size={11} className="text-gray-400" />
                {c.stage}
              </div>
              <div className="flex items-center gap-1.5">
                {c.contactPreference === "Phone" ? <Phone size={11} className="text-gray-400" /> : <MessageSquare size={11} className="text-gray-400" />}
                {c.contactPreference} · {c.language}
              </div>
              <div className="flex items-center gap-1.5">
                {c.followUpStatus === "Completed" ? (
                  <CheckCircle size={11} className="text-green-500" />
                ) : c.followUpStatus === "Overdue" ? (
                  <AlertCircle size={11} className="text-red-500" />
                ) : (
                  <Clock size={11} className="text-amber-500" />
                )}
                Follow-up: {c.followUpStatus}
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setSelectedVictim(c)}
                className="flex-1 py-1.5 text-xs border border-blue-200 text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 font-medium transition-colors"
              >
                View Dashboard
              </button>
              {!checkedIn.has(c.id) && (
                <button
                  onClick={() => setCheckedIn((prev) => new Set([...prev, c.id]))}
                  className="px-3 py-1.5 text-xs border border-green-200 text-green-700 bg-green-50 rounded-md hover:bg-green-100 font-medium transition-colors"
                >
                  Check-in
                </button>
              )}
              {checkedIn.has(c.id) && (
                <span className="px-3 py-1.5 text-xs text-green-700 font-medium">Checked in ✓</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedVictim && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg my-6">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <h2 className="font-heading font-semibold text-gray-900">Victim Dashboard</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-semibold text-gray-700">{selectedVictim.victimName}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="font-mono text-xs text-gray-500">{selectedVictim.victimId}</span>
                </div>
              </div>
              <button onClick={() => setSelectedVictim(null)} className="text-gray-400 hover:text-gray-700">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-xs text-blue-600 font-medium mb-1">Victim Information</div>
                <div className="text-sm font-bold text-blue-900 mb-1">{selectedVictim.victimName}</div>
                <div className="font-mono text-xs text-blue-700">{selectedVictim.victimId}</div>
                <div className="text-xs text-blue-600/70 mt-2">Your information is protected and confidential.</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <div className="text-gray-500 mb-1">Current Case Stage</div>
                  <div className="font-semibold text-gray-800">{selectedVictim.stage}</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <div className="text-gray-500 mb-1">Monitoring Status</div>
                  <div className="font-semibold text-green-700">Active</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <div className="text-gray-500 mb-1">Next Follow-up</div>
                  <div className="font-semibold text-gray-800">In 3 days</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <div className="text-gray-500 mb-1">Assigned Support</div>
                  <div className="font-semibold text-gray-800">{selectedVictim.assignedCaseworker}</div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                <div className="text-xs font-semibold text-gray-700 mb-2">Available Support</div>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Counselling referral available</div>
                  <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Legal aid support</div>
                  <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Contact your assigned caseworker: {selectedVictim.assignedCaseworker}</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-3">
                <div className="text-xs font-semibold text-gray-700 mb-2">Recent Updates</div>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div>· Caseworker follow-up completed — {selectedVictim.lastCheckIn}</div>
                  <div>· Case stage: {selectedVictim.stage}</div>
                  <div>· Protection status: {selectedVictim.protectionStatus}</div>
                </div>
              </div>

              {checkedIn.has(selectedVictim.id) && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-800 font-medium">
                  ✓ Check-in completed for this session.
                </div>
              )}

              <p className="text-xs text-gray-400 text-center border-t border-gray-100 pt-3">
                This view is designed to be simple and accessible. Sensitive internal risk information is not shown here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
