import { useState } from "react";
import Sidebar, { type Page } from "./components/Sidebar";
import Header from "./components/Header";
import SecurityFooter from "./components/SecurityFooter";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CasesPage from "./pages/CasesPage";
import VictimRegistrationPage from "./pages/VictimRegistrationPage";
import VictimsPage from "./pages/VictimsPage";
import ActionLogPage from "./pages/ActionLogPage";
import CCTNSPage from "./pages/CCTNSPage";
import CCTNSPortalPage from "./pages/CCTNSPortalPage";
import TokenVerificationPage from "./pages/TokenVerificationPage";
import SettingsPage from "./pages/SettingsPage";

type AuthState = "login" | "register" | "app" | "cctns-portal" | "cctns-verify";

const PAGE_TITLES: Record<Page, { title: string; subtitle?: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Nagpur District — Overview & Monitoring" },
  cases: { title: "Case Management", subtitle: "All active cases with filtering and details" },
  "victim-registration": { title: "Victim Registration", subtitle: "Register a new victim for monitoring" },
  victims: { title: "Victims", subtitle: "Enrolled victims and wellbeing dashboard" },
  "action-log": { title: "Caseworker Action Log", subtitle: "Chronological record of all case actions" },
  cctns: { title: "CCTNS Integration", subtitle: "Secure access flow demonstration" },
  settings: { title: "Settings", subtitle: "Account and system preferences" },
};

export default function App() {
  const [auth, setAuth] = useState<AuthState>("login");
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cctnsToken, setCctnsToken] = useState<string>("");

  if (auth === "login") {
    return (
      <LoginPage
        onLogin={() => setAuth("app")}
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
          // Route to appropriate dashboard based on role
          setAuth("app");
          setCurrentPage("dashboard");
        }}
      />
    );
  }

  const { title, subtitle } = PAGE_TITLES[currentPage];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f4f8]">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          title={title}
          subtitle={subtitle}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto">
          {currentPage === "dashboard" && <DashboardPage />}
          {currentPage === "cases" && <CasesPage />}
          {currentPage === "victim-registration" && <VictimRegistrationPage />}
          {currentPage === "victims" && <VictimsPage />}
          {currentPage === "action-log" && <ActionLogPage />}
          {currentPage === "cctns" && (
            <CCTNSPage onStartDemo={() => setAuth("cctns-portal")} />
          )}
          {currentPage === "settings" && <SettingsPage />}

          <SecurityFooter />
        </main>
      </div>
    </div>
  );
}
