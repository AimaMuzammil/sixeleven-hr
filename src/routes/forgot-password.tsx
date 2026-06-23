import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password · SixEleven HR Portal" },
      { name: "description", content: "Reset your SixEleven HR Portal password." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    toast.success("Recovery email sent");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-secondary via-background to-accent/40 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-elegant"
      >
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-display text-lg font-bold">SixEleven</div>
            <div className="text-xs text-muted-foreground -mt-0.5">HR Portal</div>
          </div>
        </div>

        {sent ? (
          <div className="mt-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h1 className="mt-5 font-display text-2xl font-bold">Check your inbox</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We've sent a password recovery link to <span className="font-medium text-foreground">{email}</span>.
              The link expires in 30 minutes.
            </p>
            <Link to="/login" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft">
              Return to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mt-8 font-display text-2xl font-bold">Reset your password</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the email associated with your account and we'll send you a secure reset link.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-5">
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

              <button type="submit" className="w-full rounded-xl bg-gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
                Send recovery link
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
