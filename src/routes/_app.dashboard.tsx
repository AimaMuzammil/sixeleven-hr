import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, Card, Badge } from "@/components/ui-kit";
import { Users, UserCheck, Plane, Briefcase, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area,
  PieChart, Pie, Cell, CartesianGrid,
} from "recharts";
import {
  activities, attendanceTrend, employees, headcountByDept, leaveBreakdown,
  leaveRequests, getEmployee,
} from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · SixEleven HR Portal" },
      { name: "description", content: "Overview of employees, attendance, leave and recent activity." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const active = employees.filter((e) => e.status === "active").length;
  const onLeave = employees.filter((e) => e.status === "on-leave").length;
  const pendingLeave = leaveRequests.filter((l) => l.status === "pending").length;

  return (
    <AppShell title="Dashboard">
      <PageHeader
        title={`Good morning, ${user?.name.split(" ")[0] ?? "there"}`}
        description="Here's what's happening across your team today."
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
            <Calendar className="h-4 w-4" /> Today's schedule
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total employees" value={employees.length * 12 + 280} icon={Users} trend={4.2} trendLabel="vs last month" accent="primary" index={0} />
        <StatCard label="Active today" value={`${active * 12 + 240}`} icon={UserCheck} trend={1.1} trendLabel="attendance rate 96%" accent="success" index={1} />
        <StatCard label="On leave" value={onLeave + 8} icon={Plane} trend={-2.4} trendLabel="vs last week" accent="warning" index={2} />
        <StatCard label="Open positions" value={5} icon={Briefcase} trend={12} trendLabel="193 applicants" accent="info" index={3} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card title="Attendance overview" description="Last 7 days" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="presentG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.18 255)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.55 0.18 255)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.015 250)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.52 0.03 250)" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="oklch(0.52 0.03 250)" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.015 250)", boxShadow: "0 8px 24px rgba(0,0,0,.08)" }} />
              <Area type="monotone" dataKey="present" stroke="oklch(0.55 0.18 255)" strokeWidth={2.5} fill="url(#presentG)" />
              <Area type="monotone" dataKey="late" stroke="oklch(0.78 0.15 75)" strokeWidth={2} fill="transparent" />
              <Area type="monotone" dataKey="absent" stroke="oklch(0.62 0.22 25)" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center gap-5 text-xs text-muted-foreground">
            <Legend dot="bg-primary" label="Present" />
            <Legend dot="bg-warning" label="Late" />
            <Legend dot="bg-destructive" label="Absent" />
          </div>
        </Card>

        <Card title="Leave breakdown" description="This year by type">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={leaveBreakdown} dataKey="value" nameKey="name" innerRadius={56} outerRadius={88} paddingAngle={3}>
                {leaveBreakdown.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.015 250)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-2">
            {leaveBreakdown.map((l) => (
              <div key={l.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                  {l.name}
                </span>
                <span className="font-semibold">{l.value} days</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card title="Headcount by department" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={headcountByDept} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.015 250)" vertical={false} />
              <XAxis dataKey="department" stroke="oklch(0.52 0.03 250)" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="oklch(0.52 0.03 250)" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "oklch(0.96 0.015 245)" }} contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.015 250)" }} />
              <Bar dataKey="count" fill="oklch(0.55 0.18 255)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Recent activity">
          <ul className="space-y-4">
            {activities.map((a, i) => (
              <motion.li
                key={a.id}
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <img src={a.avatar} alt="" className="h-9 w-9 rounded-full" />
                <div className="flex-1 text-sm">
                  <div>
                    <span className="font-semibold">{a.actor}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium">{a.target}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{a.time}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Pending leave requests" description={`${pendingLeave} awaiting your review`} action={<a href="/leave" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">View all <ArrowUpRight className="h-3.5 w-3.5" /></a>}>
          <div className="space-y-3">
            {leaveRequests.filter((l) => l.status === "pending").map((l) => {
              const emp = getEmployee(l.employeeId);
              return (
                <div key={l.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3 hover:bg-muted/40">
                  <div className="flex items-center gap-3 min-w-0">
                    {emp && <img src={emp.avatar} className="h-9 w-9 rounded-full" alt="" />}
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{emp?.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{l.type} · {l.from} → {l.to} · {l.days}d</div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className="rounded-lg bg-success/10 px-3 py-1.5 text-xs font-semibold text-success hover:bg-success/15">Approve</button>
                    <button className="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/15">Reject</button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="New hires this quarter" description="Welcome to the team">
          <div className="grid gap-3 sm:grid-cols-2">
            {employees.slice(0, 4).map((e) => (
              <div key={e.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <img src={e.avatar} className="h-10 w-10 rounded-full" alt="" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{e.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{e.position}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 p-4">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-primary">Engagement</div>
              <div className="mt-1 font-display text-2xl font-bold">87%</div>
              <div className="text-xs text-muted-foreground">Pulse survey · June 2026</div>
            </div>
            <TrendingUp className="h-10 w-10 text-primary opacity-30" />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

// silence unused import warning in some bundlers
void Badge;
