import { TrendingUp, TrendingDown, Minus, AlertTriangle, Brain, Info } from "lucide-react";
import type { AIInsight } from "../data/mockData";

interface AIInsightsPanelProps {
  insight: AIInsight;
}

const priorityStyles = {
  Immediate: "bg-red-100 text-red-700 border border-red-200",
  High: "bg-amber-100 text-amber-700 border border-amber-200",
  Routine: "bg-green-100 text-green-700 border border-green-200",
};

const riskStyles = {
  High: "text-red-600",
  Moderate: "text-amber-600",
  Low: "text-green-600",
};

export default function AIInsightsPanel({ insight }: AIInsightsPanelProps) {
  const TrendIcon =
    insight.riskTrend === "Improving"
      ? TrendingDown
      : insight.riskTrend === "Worsening"
      ? TrendingUp
      : Minus;

  const trendColor =
    insight.riskTrend === "Improving"
      ? "text-green-600"
      : insight.riskTrend === "Worsening"
      ? "text-red-600"
      : "text-gray-500";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain size={16} className="text-blue-600" />
          <h3 className="font-heading font-semibold text-gray-800">AI-Assisted Insights</h3>
        </div>
        <span className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded font-medium">
          <Info size={11} />
          Human review required
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Risk Category</div>
          <div className={`font-heading font-bold text-lg ${riskStyles[insight.riskCategory]}`}>
            {insight.riskCategory}
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Risk Trend</div>
          <div className={`flex items-center gap-1 font-semibold text-sm ${trendColor}`}>
            <TrendIcon size={15} />
            {insight.riskTrend}
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Alert Priority</div>
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${priorityStyles[insight.alertPriority]}`}>
            {insight.alertPriority}
          </span>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Confidence</div>
          <div className="font-heading font-bold text-lg text-gray-700">{insight.confidenceIndicator}%</div>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-1 font-medium">Check-in Trend</div>
      <div className="text-sm text-gray-700 mb-4 bg-gray-50 border border-gray-100 rounded px-3 py-2">
        {insight.checkInTrend}
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2 font-medium">Contributing Factors</div>
        <div className="flex flex-wrap gap-1.5">
          {insight.contributingFactors.map((f) => (
            <span key={f} className="bg-red-50 border border-red-100 text-red-700 text-xs px-2 py-0.5 rounded">
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <AlertTriangle size={13} className="text-blue-600" />
          <span className="text-xs font-semibold text-blue-700">Suggested Intervention</span>
        </div>
        <p className="text-sm text-blue-800">{insight.suggestedIntervention}</p>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        AI-assisted assessment — the caseworker is the final decision-maker. This output requires human review before any action is taken.
      </p>
    </div>
  );
}
