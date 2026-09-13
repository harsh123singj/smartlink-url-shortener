import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  BarChart3,
  ChevronLeft,
  Link2,
  LayoutDashboard,
  Menu,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Links",
    path: "/links",
    icon: Link2,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">

      {/* ==========================================
          MOBILE SIDEBAR OVERLAY
      ========================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          bg-[#252525] transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <Link
            to="/dashboard"
            className="flex items-center gap-2"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF5A1F]">
              <Link2 className="h-5 w-5 text-white" />
            </div>

            <span className="text-lg font-bold text-white">
              SmartLink
            </span>
          </Link>

          {/* Close mobile sidebar */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Workspace
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#FF5A1F] text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            );
          })}

          <div className="my-6 border-t border-white/10" />

          <NavLink
            to="/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-[#FF5A1F] text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Settings className="h-5 w-5" />
            Settings
          </NavLink>

        </nav>

        {/* User */}
        <div className="border-t border-white/10 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF5A1F] text-xs font-bold text-white">
              {getInitials(user?.name)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user?.name || "User"}
              </p>

              <p className="truncate text-xs text-gray-500">
                {user?.email || "Account"}
              </p>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

        </div>

        {/* Collapse - Desktop only */}
        <div className="hidden border-t border-white/10 p-4 md:block">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Collapse
          </button>
        </div>

      </aside>

      {/* ==========================================
          MAIN AREA
      ========================================== */}

      <div className="md:pl-64">

        {/* ========================================
            TOP BAR
        ======================================== */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-black/5 bg-[#FAF9F6]/95 px-4 backdrop-blur sm:px-6 lg:px-8">

          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-black/5 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop workspace label */}
          <div className="hidden md:block">
            <p className="text-sm text-gray-500">
              Workspace
            </p>
          </div>

          {/* Mobile logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 md:hidden"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF5A1F]">
              <Link2 className="h-4 w-4 text-white" />
            </div>

            <span className="font-bold text-[#171717]">
              SmartLink
            </span>
          </Link>

          {/* User */}
          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-[#171717]">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-500">
                {user?.email || "Account"}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5A1F] text-sm font-bold text-white">
              {getInitials(user?.name)}
            </div>

          </div>

        </header>

        {/* ========================================
            PAGE CONTENT
        ======================================== */}

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;