import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, StatCard, Badge } from "@/components/ui-kit";
import { payslips, getEmployee, payrollTrend } from "@/lib/mock-data";
import { DollarSign, Wallet, FileText, TrendingUp, Download } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const Route = createFileRoute("/_app/payroll")({
  head: () => ({
    meta: [
      { title: "Payroll · SixEleven HR Portal" },
      { name: "description", content: "Salaries, payslips and payroll analytics." },
    ],
  }),
  component: PayrollPage,
});

function PayrollPage() {
  const total = payslips.reduce((s, p) => s + p.gross, 0);

  return (
    <AppShell title="Payroll">
      <PageHeader
        title="Payroll"
        description="June 2026 cycle · processed automatically"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
            <Download className="h-4 w-4" /> Export report
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Monthly payroll" value={`$${(total / 1000).toFixed(0)}k`} icon={DollarSign} accent="primary" trend={3.2} trendLabel="vs last month" index={0} />
        <StatCard label="Payslips issued" value={payslips.length} icon={FileText} accent="success" index={1} />
        <StatCard label="Bonuses paid" value="$48.2k" icon={Wallet} accent="info" trend={12} trendLabel="performance bonuses" index={2} />
        <StatCard label="Avg. salary" value={`$${Math.round(total / payslips.length / 1000)}k`} icon={TrendingUp} accent="warning" index={3} />
      </div>

      <div className="mt-6">
        <Card title="Payroll over time" description="Last 6 months in $ thousands">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={payrollTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="payG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.18 255)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="oklch(0.55 0.18 255)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bonusG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.68 0.18 250)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.68 0.18 250)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.015 250)" vertical={false} />
              <XAxis dataKey="month" stroke="oklch(0.52 0.03 250)" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="oklch(0.52 0.03 250)" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.015 250)" }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="payroll" name="Payroll" stroke="oklch(0.55 0.18 255)" strokeWidth={2.5} fill="url(#payG)" />
              <Area type="monotone" dataKey="bonus" name="Bonus" stroke="oklch(0.68 0.18 250)" strokeWidth={2} fill="url(#bonusG)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-6">
        <Card title="Payslips · June 2026">
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Employee</th>
                  <th className="px-3 py-3 text-left font-semibold">Slip ID</th>
                  <th className="px-3 py-3 text-right font-semibold">Gross</th>
                  <th className="px-3 py-3 text-right font-semibold">Tax</th>
                  <th className="px-3 py-3 text-right font-semibold">Net</th>
                  <th className="px-5 py-3 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {payslips.map((p) => {
                  const e = getEmployee(p.employeeId);
                  if (!e) return null;
                  return (
                    <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img src={e.avatar} className="h-8 w-8 rounded-lg" alt="" />
                          <div>
                            <div className="font-medium">{e.name}</div>
                            <div className="text-xs text-muted-foreground">{e.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                      <td className="px-3 py-3 text-right">${p.gross.toLocaleString()}</td>
                      <td className="px-3 py-3 text-right text-muted-foreground">-${p.tax.toLocaleString()}</td>
                      <td className="px-3 py-3 text-right font-semibold">${p.net.toLocaleString()}</td>
                      <td className="px-5 py-3 text-right">
                        <Badge variant={p.status === "paid" ? "success" : p.status === "processing" ? "warning" : "muted"}>
                          {p.status}
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
