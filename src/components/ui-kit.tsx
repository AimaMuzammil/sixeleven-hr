import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold md:text-3xl">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label, value, icon: Icon, trend, trendLabel, accent = "primary", index = 0,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  accent?: "primary" | "success" | "warning" | "info";
  index?: number;
}) {
  const accentClass = {
    primary: "from-primary/15 to-primary/5 text-primary",
    success: "from-success/15 to-success/5 text-success",
    warning: "from-warning/20 to-warning/5 text-warning-foreground",
    info: "from-info/20 to-info/5 text-info",
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition hover:shadow-elegant hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium text-muted-foreground">{label}</div>
          <div className="mt-2 font-display text-3xl font-bold tracking-tight">{value}</div>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accentClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold ${
            trend >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          }`}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
          {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
        </div>
      )}
    </motion.div>
  );
}

export function Card({
  title, description, action, children, className = "",
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-border bg-card shadow-card ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            {title && <h3 className="font-display text-base font-semibold">{title}</h3>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function Badge({
  children, variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "destructive" | "info" | "muted";
}) {
  const styles = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive",
    info: "bg-info/15 text-info",
    muted: "bg-muted text-muted-foreground",
  }[variant];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles}`}>
      {children}
    </span>
  );
}
