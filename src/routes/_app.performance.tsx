import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, StatCard, Badge } from "@/components/ui-kit";
import { reviews, getEmployee } from "@/lib/mock-data";
import { TrendingUp, Target, Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

export const Route = createFileRoute("/_app/performance")({
  head: () => ({
    meta: [
      { title: "Performance · SixEleven HR Portal" },
      { name: "description", content: "Evaluations, performance reviews and KPI tracking." },
    ],
  }),
  component: PerformancePage,
});

function PerformancePage() {
  const avg = reviews.filter((r) => r.score > 0).reduce((s, r) => s + r.score, 0) / reviews.filter((r) => r.score > 0).length;
  const completed = reviews.filter((r) => r.status === "completed").length;

  return (
    <AppShell title="Performance">
      <PageHeader
        title="Performance"
        description="H1 2026 review cycle"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
            <Calendar className="h-4 w-4" /> Schedule review
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Avg. score" value={avg.toFixed(1)} icon={Award} accent="primary" trend={4} trendLabel="vs last cycle" index={0} />
        <StatCard label="Reviews completed" value={`${completed}/${reviews.length}`} icon={Target} accent="success" index={1} />
        <StatCard label="High performers" value="32%" icon={TrendingUp} accent="info" trend={6} trendLabel="rated 4.5+" index={2} />
        <StatCard label="Goals on-track" value="84%" icon={Target} accent="warning" trend={3.1} trendLabel="OKR progress" index={3} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {reviews.map((r, i) => {
          const emp = getEmployee(r.employeeId);
          if (!emp) return null;
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} className="h-12 w-12 rounded-xl" alt="" />
                    <div>
                      <div className="font-semibold">{emp.name}</div>
                      <div className="text-xs text-muted-foreground">{emp.position} · {r.period}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Reviewer: <span className="font-medium text-foreground">{r.reviewer}</span></div>
                    </div>
                  </div>
                  <Badge variant={r.status === "completed" ? "success" : r.status === "in-progress" ? "warning" : "muted"}>
                    {r.status}
                  </Badge>
                </div>

                {r.score > 0 ? (
                  <div className="mt-4 grid grid-cols-[140px_1fr] gap-4 items-center">
                    <div className="relative">
                      <ResponsiveContainer width="100%" height={140}>
                        <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: (r.score / 5) * 100, fill: "oklch(0.55 0.18 255)" }]} startAngle={90} endAngle={-270}>
                          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                          <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "oklch(0.92 0.015 250)" } as object} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-display text-2xl font-bold">{r.score.toFixed(1)}</div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">/ 5.0</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {r.kpis.map((kpi) => (
                        <div key={kpi.label}>
                          <div className="flex justify-between text-xs">
                            <span className="font-medium">{kpi.label}</span>
                            <span className="font-semibold">{kpi.value}%</span>
                          </div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                            <motion.div
                              initial={{ width: 0 }} animate={{ width: `${kpi.value}%` }}
                              transition={{ duration: 0.6, delay: i * 0.04 }}
                              className={`h-full rounded-full ${kpi.value >= 90 ? "bg-success" : kpi.value >= 75 ? "bg-gradient-primary" : "bg-warning"}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                    Review scheduled · awaiting kickoff
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </AppShell>
  );
}
