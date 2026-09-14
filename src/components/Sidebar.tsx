import {
  LayoutDashboard,
  FolderOpen,
  UserPlus,
  Users,
  ClipboardList,
  Link2,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export type Page =
  | "dashboard"
  | "cases"
  | "victim-registration"
  | "victims"
  | "action-log"
  | "cctns"
  | "settings";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  open: boolean;
  onToggle: () => void;
}

const NAV_ITEMS: { id: Page; label: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "cases", label: "Cases", Icon: FolderOpen },
  { id: "victim-registration", label: "Victim Registration", Icon: UserPlus },
  { id: "victims", label: "Victims", Icon: Users },
  { id: "action-log", label: "Caseworker Action Log", Icon: ClipboardList },
  { id: "cctns", label: "CCTNS Integration", Icon: Link2 },
  { id: "settings", label: "Settings", Icon: Settings },
];

export default function Sidebar({ currentPage, onNavigate, open, onToggle }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          bg-[#1e3a5f] text-white
          transition-transform duration-200
          w-64
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-400/20 flex items-center justify-center">
              <Shield size={18} className="text-blue-200" />
            </div>
            <div>
              <div className="font-heading font-700 text-sm leading-tight">Manas Raksha</div>
              <div className="text-[10px] text-blue-200/70 font-mono leading-tight">Mental Health Monitoring</div>
            </div>
          </div>
          <button onClick={onToggle} className="lg:hidden text-white/60 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { onNavigate(id); if (open) onToggle(); }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-left transition-colors
                ${currentPage === id
                  ? "bg-white/15 text-white"
                  : "text-blue-100/70 hover:bg-white/8 hover:text-white"
                }
              `}
            >
              <Icon size={16} className="shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="px-3 pb-5 border-t border-white/10 pt-4">
          <div className="px-3 py-2 text-xs text-blue-200/50 font-mono">
            Caseworker: Priya Deshmukh
          </div>
          <div className="px-3 py-1 text-xs text-blue-200/40 font-mono">
            District: Nagpur
          </div>
          <button className="mt-3 w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-blue-100/60 hover:bg-white/8 hover:text-white transition-colors">
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
    >
      <Menu size={20} />
    </button>
  );
}
