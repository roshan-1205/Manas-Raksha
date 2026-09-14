import type { LucideIcon } from "lucide-react";

interface StatusCardProps {
  label: string;
  value: number | string;
  Icon: LucideIcon;
  color: "blue" | "red" | "amber" | "green" | "purple" | "cyan";
  note?: string;
}

const colorMap = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  red: "bg-red-50 text-red-600 border-red-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  green: "bg-green-50 text-green-600 border-green-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
};

const textColorMap = {
  blue: "text-blue-700",
  red: "text-red-700",
  amber: "text-amber-700",
  green: "text-green-700",
  purple: "text-purple-700",
  cyan: "text-cyan-700",
};

export default function StatusCard({ label, value, Icon, color, note }: StatusCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
        <div className={`w-8 h-8 rounded-md flex items-center justify-center border ${colorMap[color]}`}>
          <Icon size={15} />
        </div>
      </div>
      <div className={`font-heading text-2xl font-bold ${textColorMap[color]}`}>{value}</div>
      {note && <div className="text-xs text-gray-400">{note}</div>}
    </div>
  );
}
