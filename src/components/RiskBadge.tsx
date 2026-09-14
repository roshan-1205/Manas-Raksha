import type { RiskLevel } from "../data/mockData";

export default function RiskBadge({ level }: { level: RiskLevel }) {
  const styles = {
    High: "bg-red-100 text-red-700 border border-red-200",
    Moderate: "bg-amber-100 text-amber-700 border border-amber-200",
    Low: "bg-green-100 text-green-700 border border-green-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${styles[level]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${level === "High" ? "bg-red-500" : level === "Moderate" ? "bg-amber-500" : "bg-green-500"}`} />
      {level}
    </span>
  );
}
