import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Badge } from "@/components/ui-kit";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { Shield, Users, Bell, User, Lock, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings · SixEleven HR Portal" },
      { name: "description", content: "User management, roles, permissions and profile settings." },
    ],
  }),
  component: SettingsPage,
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "users", label: "Users", icon: Users },
  { id: "roles", label: "Roles & permissions", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];

const permissions = [
  { feature: "Manage employees", admin: true, hr: true, employee: false },
  { feature: "Approve leave requests", admin: true, hr: true, employee: false },
  { feature: "View payroll", admin: true, hr: true, employee: false },
  { feature: "Edit payroll", admin: true, hr: false, employee: false },
  { feature: "Post announcements", admin: true, hr: true, employee: false },
  { feature: "Schedule interviews", admin: true, hr: true, employee: false },
  { feature: "View own profile", admin: true, hr: true, employee: true },
  { feature: "Apply for leave", admin: true, hr: true, employee: true },
];

function SettingsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("profile");

  return (
    <AppShell title="Settings">
      <PageHeader title="Settings" description="Manage your profile, team and organization" />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="rounded-2xl border border-border bg-card p-2 shadow-card lg:sticky lg:top-20 lg:h-fit">
          {tabs.map((t) => (
            <button
              key={t.id} onClick={() => setTab(t.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                tab === t.id ? "bg-gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </nav>

        <div>
          {tab === "profile" && user && (
            <Card title="Profile" description="Update your personal information">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <img src={user.avatar} className="h-24 w-24 rounded-2xl" alt="" />
                <div className="flex-1 space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Full name" defaultValue={user.name} />
                    <Field label="Work email" defaultValue={user.email} />
                    <Field label="Phone" defaultValue={user.phone} />
                    <Field label="Location" defaultValue={user.location} />
                    <Field label="Department" defaultValue={user.department} />
                    <Field label="Position" defaultValue={user.position} />
                  </div>
                  <button onClick={() => toast.success("Profile updated")} className="rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
                    Save changes
                  </button>
                </div>
              </div>
            </Card>
          )}

          {tab === "users" && (
            <Card title="Team members" description="Invite teammates and manage access">
              <div className="space-y-3">
                {["Amelia Carter", "Jordan Reyes", "Priya Sharma", "Elena Rossi"].map((n, i) => (
                  <div key={n} className="flex items-center justify-between rounded-xl border border-border p-3">
                    <div className="flex items-center gap-3">
                      <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(n)}&backgroundColor=2563eb`} className="h-9 w-9 rounded-full" alt="" />
                      <div>
                        <div className="text-sm font-semibold">{n}</div>
                        <div className="text-xs text-muted-foreground">{["Admin", "HR Manager", "Employee", "HR Manager"][i]}</div>
                      </div>
                    </div>
                    <Badge variant={i === 0 ? "default" : "muted"}>{i === 0 ? "Owner" : "Active"}</Badge>
                  </div>
                ))}
                <button className="w-full rounded-xl border border-dashed border-border py-3 text-sm font-semibold text-primary hover:bg-primary/5">
                  + Invite teammate
                </button>
              </div>
            </Card>
          )}

          {tab === "roles" && (
            <Card title="Roles & permissions" description="What each role can access">
              <div className="overflow-x-auto -mx-5 -mb-5">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 text-left font-semibold">Feature</th>
                      <th className="px-3 py-3 text-center font-semibold">Admin</th>
                      <th className="px-3 py-3 text-center font-semibold">HR Manager</th>
                      <th className="px-5 py-3 text-center font-semibold">Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((p) => (
                      <tr key={p.feature} className="border-t border-border">
                        <td className="px-5 py-3 font-medium">{p.feature}</td>
                        <td className="px-3 py-3 text-center">{p.admin && <Check className="mx-auto h-4 w-4 text-success" />}</td>
                        <td className="px-3 py-3 text-center">{p.hr && <Check className="mx-auto h-4 w-4 text-success" />}</td>
                        <td className="px-5 py-3 text-center">{p.employee && <Check className="mx-auto h-4 w-4 text-success" />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {tab === "notifications" && (
            <Card title="Notifications" description="Choose what you want to be notified about">
              <div className="space-y-1">
                {[
                  "Leave requests submitted",
                  "Payroll cycle reminders",
                  "Performance review updates",
                  "New company announcements",
                  "Interview schedule changes",
                ].map((n, i) => (
                  <label key={n} className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 hover:bg-muted/30">
                    <div>
                      <div className="text-sm font-medium">{n}</div>
                      <div className="text-xs text-muted-foreground">Email + in-app</div>
                    </div>
                    <input type="checkbox" defaultChecked={i < 3} className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-muted checked:bg-primary transition relative
                      after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition checked:after:translate-x-4" />
                  </label>
                ))}
              </div>
            </Card>
          )}

          {tab === "security" && (
            <Card title="Security" description="Password and account protection">
              <div className="space-y-4">
                <Field label="Current password" type="password" />
                <Field label="New password" type="password" />
                <Field label="Confirm new password" type="password" />
                <button onClick={() => toast.success("Password updated")} className="rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
                  Update password
                </button>
                <div className="mt-6 rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Two-factor authentication</div>
                      <div className="text-xs text-muted-foreground">Add an extra layer of security to your account</div>
                    </div>
                    <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">Enable</button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input type={type} defaultValue={defaultValue}
        className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30" />
    </label>
  );
}
