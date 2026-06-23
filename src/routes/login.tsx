import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, ArrowRight, Shield, Users, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · SixEleven HR Portal" },
      { name: "description", content: "Sign in to your SixEleven HR Portal account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("amelia@sixeleven.com");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const u = await login(email, password);
    toast.success(`Welcome back, ${u.name.split(" ")[0]}`);
    navigate({ to: "/dashboard" });
  };

  const quickLogin = async (mail: string) => {
    setEmail(mail);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    const u = await login(mail, "demo");
    toast.success(`Signed in as ${u.role}`);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/login" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-display text-lg font-bold">SixEleven</div>
              <div className="text-xs text-muted-foreground -mt-0.5">HR Portal</div>
            </div>
          </Link>

          <div className="mt-10">
            <h1 className="font-display text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to manage your team, payroll and people operations.
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium">Work email</label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-input" defaultChecked />
              Keep me signed in
            </label>

            <button
              type="submit" disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="mt-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Demo accounts</div>
            <div className="mt-3 grid gap-2">
              {[
                { role: "Admin", mail: "amelia@sixeleven.com", icon: Shield },
                { role: "HR Manager", mail: "jordan@sixeleven.com", icon: Users },
                { role: "Employee", mail: "priya@sixeleven.com", icon: TrendingUp },
              ].map((d) => (
                <button
                  key={d.mail} type="button" onClick={() => quickLogin(d.mail)}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-2.5 text-left text-sm transition hover:border-primary/40 hover:bg-accent/40"
                >
                  <span className="flex items-center gap-3">
                    <d.icon className="h-4 w-4 text-primary" />
                    <span><span className="font-medium">{d.role}</span> <span className="text-muted-foreground">· {d.mail}</span></span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-hero lg:block">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.25), transparent 50%)",
        }} />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div className="text-sm font-medium opacity-80">SixEleven · People platform</div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="font-display text-5xl font-bold leading-tight">
              Everything your<br />people team needs.<br />
              <span className="opacity-70">In one calm dashboard.</span>
            </h2>

            <div className="grid gap-3 max-w-md">
              {[
                { k: "12,480", l: "active employees managed" },
                { k: "98.4%", l: "average attendance rate" },
                { k: "$4.2M", l: "monthly payroll processed" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-baseline gap-4 rounded-2xl glass-dark p-4"
                >
                  <div className="font-display text-2xl font-bold">{s.k}</div>
                  <div className="text-sm opacity-80">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="text-xs opacity-60">© 2026 SixEleven, Inc. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
