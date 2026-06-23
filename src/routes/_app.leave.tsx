import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, StatCard, Badge } from "@/components/ui-kit";
import { leaveRequests as initial, getEmployee, type LeaveRequest } from "@/lib/mock-data";
import { Plus, Plane, Check, X, Calendar } from "lucide-react";
import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/leave")({
  head: () => ({
    meta: [
      { title: "Leave · SixEleven HR Portal" },
      { name: "description", content: "Apply for leave, approve requests and track balances." },
    ],
  }),
  component: LeavePage,
});

const balances = [
  { type: "Annual", used: 8, total: 24 },
  { type: "Sick", used: 2, total: 12 },
  { type: "Personal", used: 1, total: 5 },
  { type: "Maternity", used: 0, total: 90 },
];

function LeavePage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initial);
  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;

  const decide = (id: string, status: "approved" | "rejected") => {
    setRequests(requests.map((r) => r.id === id ? { ...r, status } : r));
    toast.success(`Request ${status}`);
  };

  return (
    <AppShell title="Leave">
      <PageHeader
        title="Leave management"
        description="Approve requests and track team time-off"
        action={<ApplyLeaveDialog onApply={(r) => setRequests([r, ...requests])} />}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending" value={pending} icon={Calendar} accent="warning" index={0} />
        <StatCard label="Approved this month" value={approved + 12} icon={Check} accent="success" index={1} />
        <StatCard label="Avg. response time" value="4.2h" icon={Plane} accent="info" index={2} />
        <StatCard label="Available days (you)" value="16" icon={Calendar} accent="primary" index={3} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="Your leave balance" description="2026 allocation">
          <div className="space-y-4">
            {balances.map((b, i) => {
              const pct = (b.used / b.total) * 100;
              return (
                <motion.div key={b.type}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium">{b.type}</span>
                    <span className="text-muted-foreground"><span className="font-semibold text-foreground">{b.total - b.used}</span> / {b.total} left</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-gradient-primary"
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        <Card title="Leave requests" description="All requests this quarter" className="lg:col-span-2">
          <div className="space-y-3">
            {requests.map((r) => {
              const emp = getEmployee(r.employeeId);
              return (
                <div key={r.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {emp && <img src={emp.avatar} className="h-10 w-10 rounded-full" alt="" />}
                    <div className="min-w-0">
                      <div className="font-semibold">{emp?.name}</div>
                      <div className="text-xs text-muted-foreground">{r.type} · {r.from} → {r.to} · {r.days} days</div>
                      <div className="mt-1 text-xs text-muted-foreground italic line-clamp-1">"{r.reason}"</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={r.status === "approved" ? "success" : r.status === "rejected" ? "destructive" : "warning"}>{r.status}</Badge>
                    {r.status === "pending" && (
                      <>
                        <button onClick={() => decide(r.id, "approved")} className="rounded-lg bg-success/10 p-2 text-success hover:bg-success/20"><Check className="h-4 w-4" /></button>
                        <button onClick={() => decide(r.id, "rejected")} className="rounded-lg bg-destructive/10 p-2 text-destructive hover:bg-destructive/20"><X className="h-4 w-4" /></button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function ApplyLeaveDialog({ onApply }: { onApply: (r: LeaveRequest) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "Annual" as LeaveRequest["type"], from: "", to: "", reason: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const days = Math.max(1, Math.ceil((new Date(form.to).getTime() - new Date(form.from).getTime()) / 86400000) + 1);
    onApply({
      id: `LV-${Math.floor(Math.random() * 9000 + 1000)}`,
      employeeId: "E-1003", type: form.type, from: form.from, to: form.to,
      days, reason: form.reason, status: "pending",
    });
    toast.success("Leave request submitted");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
          <Plus className="h-4 w-4" /> Apply for leave
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for leave</DialogTitle>
          <DialogDescription>Your manager will be notified by email.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">Leave type</span>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as LeaveRequest["type"] })}
              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm">
              <option>Annual</option><option>Sick</option><option>Personal</option><option>Maternity</option><option>Unpaid</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">From</span>
              <input required type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })}
                className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">To</span>
              <input required type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })}
                className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">Reason</span>
            <textarea required rows={3} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" placeholder="Brief reason for your leave…" />
          </label>
          <DialogFooter>
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-input px-4 py-2.5 text-sm">Cancel</button>
            <button type="submit" className="rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Submit request</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
