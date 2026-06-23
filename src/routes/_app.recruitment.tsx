import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, StatCard, Badge } from "@/components/ui-kit";
import { jobListings, candidates } from "@/lib/mock-data";
import { Briefcase, Users, Calendar, TrendingUp, Plus, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/recruitment")({
  head: () => ({
    meta: [
      { title: "Recruitment · SixEleven HR Portal" },
      { name: "description", content: "Manage job listings, candidates and interviews." },
    ],
  }),
  component: RecruitmentPage,
});

const stages = ["Applied", "Screening", "Interview", "Offer", "Hired"] as const;

function RecruitmentPage() {
  const totalApplicants = jobListings.reduce((s, j) => s + j.applicants, 0);

  return (
    <AppShell title="Recruitment">
      <PageHeader
        title="Recruitment"
        description="Pipeline, interviews and hiring activity"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
            <Plus className="h-4 w-4" /> Post new job
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open roles" value={jobListings.filter((j) => j.status === "open").length} icon={Briefcase} accent="primary" index={0} />
        <StatCard label="Total applicants" value={totalApplicants} icon={Users} accent="info" trend={18} trendLabel="this month" index={1} />
        <StatCard label="Interviews scheduled" value="14" icon={Calendar} accent="warning" index={2} />
        <StatCard label="Time-to-hire (avg)" value="22d" icon={TrendingUp} accent="success" trend={-12} trendLabel="vs last quarter" index={3} />
      </div>

      <div className="mt-6">
        <Card title="Candidate pipeline" description="Drag candidates across stages (demo)">
          <div className="grid gap-3 md:grid-cols-5">
            {stages.map((stage, si) => {
              const stageCands = candidates.filter((c) => c.stage === stage);
              return (
                <div key={stage} className="rounded-xl bg-muted/40 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-semibold">{stage}</div>
                    <Badge variant="muted">{stageCands.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {stageCands.map((c, ci) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: si * 0.04 + ci * 0.03 }}
                        className="cursor-grab rounded-lg border border-border bg-card p-3 shadow-soft transition hover:shadow-card"
                      >
                        <div className="flex items-center gap-2">
                          <img src={c.avatar} className="h-8 w-8 rounded-full" alt="" />
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold">{c.name}</div>
                            <div className="truncate text-xs text-muted-foreground">{c.role}</div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1 text-warning-foreground">
                            <Star className="h-3 w-3 fill-warning text-warning" /> {c.rating}
                          </span>
                          <span className="text-muted-foreground">{c.appliedAt.slice(5)}</span>
                        </div>
                      </motion.div>
                    ))}
                    {stageCands.length === 0 && (
                      <div className="rounded-lg border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
                        Empty
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Active job listings" description={`${jobListings.length} positions`}>
          <div className="space-y-3">
            {jobListings.map((j) => (
              <div key={j.id} className="flex items-start justify-between gap-3 rounded-xl border border-border p-4 hover:bg-muted/30">
                <div className="min-w-0">
                  <div className="font-semibold">{j.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{j.department}</span> ·
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {j.location}</span> ·
                    <span>{j.type}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold">{j.applicants} <span className="font-normal text-muted-foreground">applicants</span></div>
                  <Badge variant={j.status === "open" ? "success" : j.status === "draft" ? "muted" : "destructive"}>{j.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Upcoming interviews" description="Next 7 days">
          <ul className="space-y-3">
            {candidates.filter((c) => c.stage === "Interview").map((c, i) => (
              <li key={c.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <img src={c.avatar} className="h-10 w-10 rounded-full" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{c.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.role}</div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-semibold">{["Mon", "Tue", "Wed", "Thu"][i % 4]}, 4:00 pm</div>
                  <div className="text-muted-foreground">Zoom · 45 min</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
