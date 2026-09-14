import { Lock, Shield, UserCheck, FileText, Database, Eye } from "lucide-react";

const items = [
  { Icon: Lock, label: "Encryption" },
  { Icon: UserCheck, label: "RBAC" },
  { Icon: Database, label: "Row-Level Security" },
  { Icon: FileText, label: "Audit Logs" },
  { Icon: Shield, label: "Secure Backup" },
  { Icon: Eye, label: "Human-in-the-loop" },
];

export default function SecurityFooter() {
  return (
    <footer className="bg-[#1e3a5f] mt-8">
      <div className="px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {items.map(({ Icon, label }, idx) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={13} className="text-blue-300" />
              <span className="text-blue-100/80 text-xs font-medium">{label}</span>
              {idx < items.length - 1 && (
                <span className="text-blue-400/40 ml-4 text-xs">·</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-blue-200/40 text-[10px] mt-2 font-mono">
          Manas Raksha — Smart India Hackathon Prototype · All data is fictional and for demonstration purposes only
        </p>
      </div>
    </footer>
  );
}
