import { Bell, Calendar, LogOut, User } from "lucide-react";
import { MobileMenuButton } from "./Sidebar";
import { type UserSession } from "../pages/LoginPage";
import { useState } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle: () => void;
  currentUser?: UserSession | null;
  onLogout?: () => void;
  onProfileSettings?: () => void;
}

export default function Header({ title, subtitle, onMenuToggle, currentUser, onLogout, onProfileSettings }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
        
        {currentUser && (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xs font-semibold">
                {getInitials(currentUser.name)}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.role}</p>
              </div>
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  <div className="px-4 py-4 bg-[#1e3a5f] text-white">
                    <p className="text-xs text-blue-200 mb-1">Caseworker: {currentUser.name}</p>
                    <p className="text-xs text-blue-200">District: {currentUser.district}</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        if (onProfileSettings) onProfileSettings();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <User size={16} />
                      <span>Profile Settings</span>
                    </button>
                    {onLogout && (
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mt-1"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
