import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Badge } from "@/components/ui-kit";
import { employees, departments, type Employee } from "@/lib/mock-data";
import { useMemo, useState } from "react";
import { Plus, Search, Filter, Mail, Phone, MapPin, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/employees")({
  head: () => ({
    meta: [
      { title: "Employees · SixEleven HR Portal" },
      { name: "description", content: "Manage employee profiles, departments and contact info." },
    ],
  }),
  component: EmployeesPage,
});

function EmployeesPage() {
  const [list, setList] = useState<Employee[]>(employees);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [selected, setSelected] = useState<Employee | null>(null);

  const filtered = useMemo(() => list.filter((e) => {
    const q = query.toLowerCase();
    const matchQ = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.position.toLowerCase().includes(q);
    const matchD = dept === "all" || e.department === dept;
    const matchS = status === "all" || e.status === status;
    return matchQ && matchD && matchS;
  }), [list, query, dept, status]);

  const deleteEmp = (id: string) => {
    setList((l) => l.filter((e) => e.id !== id));
    toast.success("Employee removed");
  };

  return (
    <AppShell title="Employees">
      <PageHeader
        title="Employees"
        description={`${list.length} people across ${departments.length} departments`}
        action={<AddEmployeeDialog onAdd={(e) => setList([e, ...list])} />}
      />

      <Card className="mb-6">
        <div className="-m-1 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-56">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, role…"
              className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <select value={dept} onChange={(e) => setDept(e.target.value)}
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm">
            <option value="all">All departments</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm">
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="on-leave">On leave</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 text-sm">
            <Filter className="h-4 w-4" /> More filters
          </button>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i, 8) * 0.03 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant cursor-pointer"
            onClick={() => setSelected(e)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={e.avatar} className="h-12 w-12 rounded-xl ring-2 ring-primary/10" alt="" />
                <div>
                  <div className="font-semibold leading-tight">{e.name}</div>
                  <div className="text-xs text-muted-foreground">{e.position}</div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button onClick={(ev) => ev.stopPropagation()} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(ev) => { ev.stopPropagation(); setSelected(e); }}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(ev) => { ev.stopPropagation(); deleteEmp(e.id); }} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Badge variant={e.status === "active" ? "success" : e.status === "on-leave" ? "warning" : "muted"}>
                {e.status}
              </Badge>
              <span className="text-xs font-medium text-muted-foreground">{e.department}</span>
            </div>

            <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 truncate"><Mail className="h-3.5 w-3.5" /> {e.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {e.phone}</div>
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {e.location}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <div className="font-semibold">No employees match your filters</div>
          <div className="mt-1 text-sm text-muted-foreground">Try clearing the filters above.</div>
        </div>
      )}

      <EmployeeDialog employee={selected} onClose={() => setSelected(null)}
        onSave={(u) => { setList((l) => l.map((e) => e.id === u.id ? u : e)); setSelected(null); toast.success("Employee updated"); }} />
    </AppShell>
  );
}

function AddEmployeeDialog({ onAdd }: { onAdd: (e: Employee) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", department: departments[2], position: "", location: "Remote" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `E-${Math.floor(Math.random() * 9000 + 1000)}`;
    onAdd({
      id, name: form.name, email: form.email, role: "employee",
      department: form.department, position: form.position,
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(form.name)}&backgroundColor=2563eb,1d4ed8,3b82f6&textColor=ffffff`,
      phone: "+1 415 555 0000", joinedAt: new Date().toISOString().slice(0, 10),
      status: "active", salary: 90000, location: form.location,
    });
    toast.success("Employee added");
    setOpen(false);
    setForm({ name: "", email: "", department: departments[2], position: "", location: "Remote" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
          <Plus className="h-4 w-4" /> Add employee
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new employee</DialogTitle>
          <DialogDescription>Create a new employee profile in seconds.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <Field label="Full name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" /></Field>
          <Field label="Work email"><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Department">
              <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="input">
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Position"><input required value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="input" /></Field>
          </div>
          <Field label="Location"><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" /></Field>
          <DialogFooter>
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-input px-4 py-2.5 text-sm">Cancel</button>
            <button type="submit" className="rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Create employee</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EmployeeDialog({ employee, onClose, onSave }: { employee: Employee | null; onClose: () => void; onSave: (e: Employee) => void }) {
  const [form, setForm] = useState<Employee | null>(employee);
  // sync when employee changes
  if (employee && form?.id !== employee.id) setForm(employee);
  if (!employee || !form) return null;

  return (
    <Dialog open={!!employee} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img src={employee.avatar} className="h-10 w-10 rounded-lg" alt="" />
            Edit {employee.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" /></Field>
            <Field label="Email"><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" /></Field>
            <Field label="Department">
              <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="input">
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Position"><input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="input" /></Field>
            <Field label="Location"><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" /></Field>
            <Field label="Status">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Employee["status"] })} className="input">
                <option value="active">Active</option>
                <option value="on-leave">On leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          </div>
          <DialogFooter>
            <button type="button" onClick={onClose} className="rounded-xl border border-input px-4 py-2.5 text-sm">Cancel</button>
            <button type="submit" className="rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Save changes</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
      <style>{`.input { width: 100%; border-radius: 0.75rem; border: 1px solid var(--color-input); background: var(--color-background); padding: 0.625rem 0.75rem; font-size: 0.875rem; outline: none; }
      .input:focus { border-color: var(--color-ring); box-shadow: 0 0 0 2px color-mix(in oklab, var(--color-ring) 30%, transparent); }`}</style>
    </label>
  );
}
