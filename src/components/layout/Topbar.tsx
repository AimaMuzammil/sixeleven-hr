import { useState } from "react";
import { Bell, Search, Menu, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { notifications } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar({ onMenuClick, title }: { onMenuClick: () => void; title: string }) {
  const { user, switchRole } = useAuth();
  const [openNotif, setOpenNotif] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block">
        <h1 className="font-display text-xl font-semibold">{title}</h1>
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search employees, requests…"
            className="w-72 rounded-xl border border-border bg-card pl-9 pr-4 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenNotif((v) => !v)}
            className="relative rounded-xl p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {unread}
              </span>
            )}
          </button>
          <AnimatePresence>
            {openNotif && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenNotif(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-50 mt-2 w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-popover shadow-elegant"
                >
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <div className="font-semibold">Notifications</div>
                    <span className="text-xs text-muted-foreground">{unread} unread</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-border">
                    {notifications.map((n) => (
                      <div key={n.id} className="flex gap-3 px-4 py-3 hover:bg-muted/40">
                        <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          n.type === "warning" ? "bg-warning" : n.type === "success" ? "bg-success" : "bg-info"
                        }`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <div className="truncate text-sm font-medium">{n.title}</div>
                            <div className="shrink-0 text-xs text-muted-foreground">{n.time}</div>
                          </div>
                          <div className="mt-0.5 text-xs text-muted-foreground">{n.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl p-1.5 pr-3 hover:bg-muted">
              {user && <img src={user.avatar} alt="" className="h-8 w-8 rounded-lg" />}
              <div className="hidden text-left md:block">
                <div className="text-sm font-semibold leading-tight">{user?.name}</div>
                <div className="text-xs capitalize text-muted-foreground leading-tight">{user?.role}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Switch role (demo)</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => switchRole("admin")}>Admin view</DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole("hr")}>HR Manager view</DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole("employee")}>Employee view</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
