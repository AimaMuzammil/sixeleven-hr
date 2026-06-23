import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("sixeleven-auth");
    if (!raw && !user) navigate({ to: "/login" });
  }, [user, navigate]);

  return <Outlet />;
}
