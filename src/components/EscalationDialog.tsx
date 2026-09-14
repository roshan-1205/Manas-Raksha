import { AlertTriangle, X } from "lucide-react";
import type { Case } from "../data/mockData";

interface EscalationDialogProps {
  caseData: Case;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EscalationDialog({ caseData, onConfirm, onCancel }: EscalationDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-600" />
            <h2 className="font-heading font-semibold text-gray-900">Escalate Case</h2>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Case ID</div>
              <div className="font-mono text-sm font-medium text-gray-800">{caseData.id}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Risk Category</div>
              <div className="text-sm font-semibold text-red-600">{caseData.riskLevel}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Reason for Escalation</div>
              <div className="text-sm text-gray-700">High risk — immediate intervention required</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Intended Recipient</div>
              <div className="text-sm text-gray-700">District Social Welfare Officer</div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-1">
            <p className="text-xs text-red-700">
              This will submit an escalation request in the system log. No real notification will be sent in this prototype.
            </p>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Confirm Escalation
          </button>
        </div>
      </div>
    </div>
  );
}
