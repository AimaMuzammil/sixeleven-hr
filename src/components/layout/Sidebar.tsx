import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, CalendarCheck2, Plane, Briefcase, DollarSign,
  TrendingUp, Megaphone, Settings, LogOut, Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/employees", label: "Employees", icon: Users },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck2 },
  { to: "/leave", label: "Leave", icon: Plane },
  { to: "/recruitment", label: "Recruitment", icon: Briefcase },
  { to: "/payroll", label: "Payroll", icon: DollarSign },
  { to: "/performance", label: "Performance", icon: TrendingUp },
  { to: "/announcements", label: "Announcements", icon: Megaphone },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-full w-72 flex-col bg-gradient-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-display text-lg font-bold leading-none">SixEleven</div>
          <div className="text-xs text-white/60 mt-1">HR Portal</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
        {nav.map((item, i) => {
          const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
            >
              <Link
                to={item.to}
                onClick={onNavigate}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-white/10 text-white shadow-soft"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-gradient-primary"
                  />
                )}
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-3 m-3 rounded-2xl glass-dark">
        <div className="flex items-center gap-3">
          {user && (
            <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full ring-2 ring-white/20" />
          )}
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">{user?.name ?? "Guest"}</div>
            <div className="truncate text-xs text-white/60 capitalize">{user?.role ?? "—"}</div>
          </div>
          <button
            onClick={logout}
            className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
