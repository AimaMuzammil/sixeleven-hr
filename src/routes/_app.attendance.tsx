import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, StatCard, Badge } from "@/components/ui-kit";
import { attendance, attendanceTrend, getEmployee } from "@/lib/mock-data";
import { Clock, UserCheck, UserX, Timer, Download, LogIn, LogOut } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance · SixEleven HR Portal" },
      { name: "description", content: "Daily attendance, check-in / out and reports." },
    ],
  }),
  component: AttendancePage,
});

function AttendancePage() {
  const [checkedIn, setCheckedIn] = useState(true);
  const today = attendance.filter((a) => a.date === attendance[0].date);
  const present = today.filter((a) => a.status === "present").length;
  const late = today.filter((a) => a.status === "late").length;
  const absent = today.filter((a) => a.status === "absent").length;

  return (
    <AppShell title="Attendance">
      <PageHeader
        title="Attendance"
        description="Track check-ins, hours and team presence"
        action={
          <div className="flex gap-2">
            <button onClick={() => { setCheckedIn(!checkedIn); toast.success(checkedIn ? "Checked out" : "Checked in"); }}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-soft ${
                checkedIn ? "bg-destructive/10 text-destructive hover:bg-destructive/15" : "bg-gradient-primary text-primary-foreground"
              }`}>
              {checkedIn ? <><LogOut className="h-4 w-4" /> Check out</> : <><LogIn className="h-4 w-4" /> Check in</>}
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Present today" value={`${present * 12 + 240}`} icon={UserCheck} accent="success" trend={1.2} trendLabel="vs yesterday" index={0} />
        <StatCard label="Late arrivals" value={late * 8 + 12} icon={Timer} accent="warning" trend={-3.4} trendLabel="vs yesterday" index={1} />
        <StatCard label="Absent" value={absent + 5} icon={UserX} accent="primary" trend={0.5} trendLabel="vs yesterday" index={2} />
        <StatCard label="Avg. work hours" value="8.6h" icon={Clock} accent="info" trend={2.1} trendLabel="this week" index={3} />
      </div>

      <div className="mt-6">
        <Card title="Weekly attendance" description="Trend over the past 7 days">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.015 250)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.52 0.03 250)" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="oklch(0.52 0.03 250)" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.015 250)" }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="present" stackId="a" fill="oklch(0.55 0.18 255)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="late" stackId="a" fill="oklch(0.78 0.15 75)" />
              <Bar dataKey="absent" stackId="a" fill="oklch(0.62 0.22 25)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-6">
        <Card title="Today's records" description={today[0]?.date}>
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Employee</th>
                  <th className="px-3 py-3 text-left font-semibold">Department</th>
                  <th className="px-3 py-3 text-left font-semibold">Check-in</th>
                  <th className="px-3 py-3 text-left font-semibold">Check-out</th>
                  <th className="px-3 py-3 text-left font-semibold">Hours</th>
                  <th className="px-5 py-3 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {today.map((rec) => {
                  const e = getEmployee(rec.employeeId);
                  if (!e) return null;
                  return (
                    <tr key={rec.id} className="border-t border-border hover:bg-muted/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img src={e.avatar} className="h-8 w-8 rounded-lg" alt="" />
                          <div>
                            <div className="font-medium">{e.name}</div>
                            <div className="text-xs text-muted-foreground">{e.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">{e.department}</td>
                      <td className="px-3 py-3">{rec.checkIn}</td>
                      <td className="px-3 py-3">{rec.checkOut}</td>
                      <td className="px-3 py-3 font-medium">{rec.hours}h</td>
                      <td className="px-5 py-3 text-right">
                        <Badge variant={rec.status === "present" ? "success" : rec.status === "late" ? "warning" : rec.status === "leave" ? "info" : "destructive"}>
                          {rec.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
