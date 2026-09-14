import { useState, useEffect } from "react";
import Sidebar, { type Page } from "./components/Sidebar";
import Header from "./components/Header";
import LoginPage, { type UserSession } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CaseworkerDashboard from "./pages/CaseworkerDashboard";
import DistrictDashboard from "./pages/DistrictDashboard";
import StateAdminDashboard from "./pages/StateAdminDashboard";
import CasesPage from "./pages/CasesPage";
import VictimRegistrationPage from "./pages/VictimRegistrationPage";
import VictimsPage from "./pages/VictimsPage";
import ActionLogPage from "./pages/ActionLogPage";
import CCTNSPage from "./pages/CCTNSPage";
import CCTNSPortalPage from "./pages/CCTNSPortalPage";
import TokenVerificationPage from "./pages/TokenVerificationPage";
import SettingsPage from "./pages/SettingsPage";

type AuthState = "login" | "register" | "app" | "cctns-portal" | "cctns-verify";

const PAGE_TITLES: Record<Page, (user: UserSession | null) => { title: string; subtitle?: string }> = {
  dashboard: (user) => ({ 
    title: "Dashboard", 
    subtitle: `${user?.district || "Nagpur"} District — Overview & Monitoring` 
  }),
  cases: () => ({ title: "Case Management", subtitle: "All active cases with filtering and details" }),
  "victim-registration": () => ({ title: "Victim Registration", subtitle: "Register a new victim for monitoring" }),
  victims: () => ({ title: "Victims", subtitle: "Enrolled victims and wellbeing dashboard" }),
  "action-log": () => ({ title: "Caseworker Action Log", subtitle: "Chronological record of all case actions" }),
  cctns: () => ({ title: "CCTNS Integration", subtitle: "Secure access flow demonstration" }),
  settings: () => ({ title: "Settings", subtitle: "Account and system preferences" }),
};

export default function App() {
  const [auth, setAuth] = useState<AuthState>("login");
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cctnsToken, setCctnsToken] = useState<string>("");

  const handleLogin = (user: UserSession) => {
    setCurrentUser(user);
    setAuth("app");
    // Store in localStorage for persistence across page refreshes
    localStorage.setItem("manasRakshaUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuth("login");
    setCurrentPage("dashboard");
    localStorage.removeItem("manasRakshaUser");
  };

  const handleProfileSettings = () => {
    setCurrentPage("settings");
  };

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("manasRakshaUser");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser) as UserSession;
        setCurrentUser(user);
        setAuth("app");
      } catch (e) {
        localStorage.removeItem("manasRakshaUser");
      }
    }
  }, []);

  if (auth === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoToRegister={() => setAuth("register")}
      />
    );
  }

  if (auth === "register") {
    return <RegisterPage onBack={() => setAuth("login")} />;
  }

  // CCTNS Portal Demo
  if (auth === "cctns-portal") {
    return (
      <CCTNSPortalPage
        onAccessManasRaksha={(token) => {
          setCctnsToken(token);
          setAuth("cctns-verify");
        }}
      />
    );
  }

  // Token Verification Demo
  if (auth === "cctns-verify") {
    return (
      <TokenVerificationPage
        token={cctnsToken}
        onVerified={(role, officer) => {
          // Create UserSession from CCTNS officer data
          const user: UserSession = {
            name: officer.name,
            officerId: officer.emp_id,
            role: officer.rank as "CASEWORKER" | "DISTRICT" | "NATIONAL",
            district: officer.district,
          };
          
          // Set user and store in localStorage
          setCurrentUser(user);
          localStorage.setItem("manasRakshaUser", JSON.stringify(user));
          
          // Route to app
          setAuth("app");
          setCurrentPage("dashboard");
        }}
      />
    );
  }

  const { title, subtitle } = PAGE_TITLES[currentPage](currentUser);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f4f8]">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          title={title}
          subtitle={subtitle}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          currentUser={currentUser}
          onLogout={handleLogout}
          onProfileSettings={handleProfileSettings}
        />

        <main className="flex-1 overflow-y-auto">
          {currentPage === "dashboard" && (
            <>
              {currentUser?.role === "CASEWORKER" && <CaseworkerDashboard currentUser={currentUser} />}
              {currentUser?.role === "DISTRICT" && <DistrictDashboard currentUser={currentUser} />}
              {currentUser?.role === "NATIONAL" && <StateAdminDashboard currentUser={currentUser} />}
            </>
          )}
          {currentPage === "cases" && <CasesPage currentUser={currentUser} />}
          {currentPage === "victim-registration" && <VictimRegistrationPage />}
          {currentPage === "victims" && <VictimsPage currentUser={currentUser} />}
          {currentPage === "action-log" && <ActionLogPage currentUser={currentUser} />}
          {currentPage === "cctns" && (
            <CCTNSPage onStartDemo={() => setAuth("cctns-portal")} />
          )}
          {currentPage === "settings" && <SettingsPage currentUser={currentUser} />}
        </main>
      </div>
    </div>
  );
}
