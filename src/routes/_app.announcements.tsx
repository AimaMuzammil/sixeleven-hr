import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Badge } from "@/components/ui-kit";
import { announcements } from "@/lib/mock-data";
import { Megaphone, Calendar, Plus, Pin } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements · SixEleven HR Portal" },
      { name: "description", content: "Company news, notices and events calendar." },
    ],
  }),
  component: AnnouncementsPage,
});

const events = [
  { date: "Jul 12", title: "Q3 Town Hall", time: "10:00 am", color: "bg-primary" },
  { date: "Jul 18", title: "Engineering hack-week kickoff", time: "9:00 am", color: "bg-info" },
  { date: "Jul 22", title: "Wellness Wednesday — yoga", time: "12:30 pm", color: "bg-success" },
  { date: "Jul 30", title: "End-of-month payroll", time: "5:00 pm", color: "bg-warning" },
];

function AnnouncementsPage() {
  return (
    <AppShell title="Announcements">
      <PageHeader
        title="Announcements & events"
        description="What's happening across the company"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
            <Plus className="h-4 w-4" /> New post
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {announcements.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition hover:shadow-elegant"
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  a.tag === "event" ? "bg-info/10 text-info" : a.tag === "policy" ? "bg-warning/15 text-warning-foreground" : "bg-primary/10 text-primary"
                }`}>
                  {a.tag === "event" ? <Calendar className="h-5 w-5" /> : a.tag === "policy" ? <Pin className="h-5 w-5" /> : <Megaphone className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                    <Badge variant={a.tag === "event" ? "info" : a.tag === "policy" ? "warning" : "default"}>{a.tag}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Posted by <span className="font-medium text-foreground">{a.author}</span> · {a.date}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <Card title="Upcoming events" description="July 2026">
          <ul className="space-y-3">
            {events.map((e, i) => (
              <motion.li
                key={e.title}
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-muted/30"
              >
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-muted/60 text-center">
                  <span className={`h-1 w-6 rounded-full ${e.color}`} />
                  <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{e.date.split(" ")[0]}</span>
                  <span className="font-display text-sm font-bold leading-none">{e.date.split(" ")[1]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{e.title}</div>
                  <div className="text-xs text-muted-foreground">{e.time}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
