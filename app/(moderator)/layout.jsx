"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import HeaderUser from "@/components/nav/HeaderUser";
import SidebarMod from "@/components/nav/SidebarMod";
import Loader from "@/components/user/loading";

export default function ModeratorLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth + Role guard
  useEffect(() => {
    if (!loading) {
      // Not logged in → send to login
      if (!user) {
        router.push("/login");
        return;
      }

      // Logged in but not moderator or admin → send to dashboard
      if (!user.moderator && !user.admin) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading) return <Loader />;

  // Prevent flashing UI before redirect
  if (!user || (!user.moderator && !user.admin)) return null;

  return (
    <div className="moderator-app-root">
      <HeaderUser onOpenSidebar={() => setSidebarOpen(true)} />

      <SidebarMod open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="user-main">{children}</main>
    </div>
  );
}
