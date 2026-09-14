import { Check } from "lucide-react";
import { CASE_STAGES, type CaseStage } from "../data/mockData";

interface CaseLifecycleProps {
  currentStage: CaseStage;
}

export default function CaseLifecycle({ currentStage }: CaseLifecycleProps) {
  const currentIndex = CASE_STAGES.indexOf(currentStage);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-gray-800">Case Lifecycle</h3>
        <span className="text-xs text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full font-medium">
          Monitoring continues throughout
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex items-center gap-0 min-w-max pb-2">
          {CASE_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isUpcoming = idx > currentIndex;

            return (
              <div key={stage} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 shrink-0
                      ${isCompleted ? "bg-green-500 border-green-500 text-white" : ""}
                      ${isCurrent ? "bg-[#1e3a5f] border-[#1e3a5f] text-white shadow-md" : ""}
                      ${isUpcoming ? "bg-white border-gray-200 text-gray-400" : ""}
                    `}
                  >
                    {isCompleted ? <Check size={13} /> : idx + 1}
                  </div>
                  <div
                    className={`text-[10px] text-center leading-tight max-w-[70px]
                      ${isCompleted ? "text-green-600 font-medium" : ""}
                      ${isCurrent ? "text-[#1e3a5f] font-semibold" : ""}
                      ${isUpcoming ? "text-gray-400" : ""}
                    `}
                  >
                    {stage}
                  </div>
                </div>
                {idx < CASE_STAGES.length - 1 && (
                  <div
                    className={`h-0.5 w-6 mx-1 -mt-5 shrink-0 ${idx < currentIndex ? "bg-green-400" : "bg-gray-200"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
        Mental health monitoring and victim support continue throughout all stages of the case lifecycle.
      </p>
    </div>
  );
}
