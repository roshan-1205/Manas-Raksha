import { Bell, Calendar } from "lucide-react";
import { MobileMenuButton } from "./Sidebar";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle: () => void;
}

export default function Header({ title, subtitle, onMenuToggle }: HeaderProps) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-white border-b border-gray-200 px-5 py-3.5 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={onMenuToggle} />
        <div>
          <h1 className="font-heading font-semibold text-lg text-gray-900 leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar size={13} />
          {today}
        </div>
        <button className="relative p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xs font-semibold">
          PD
        </div>
      </div>
    </header>
  );
}
