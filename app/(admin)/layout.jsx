"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import HeaderUser from "@/components/nav/HeaderUser";
import SidebarAdmin from "@/components/nav/SidebarAdmin";
import Loader from "@/components/user/loading";

export default function AdminLayout({ children }) {
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

      // Logged in but not admin → send to user dashboard
      // 🔹 Updated: use `user.admin` from custom claims
      if (!user.admin) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading) return <Loader />;

  // Prevent flashing UI before redirect
  // 🔹 Updated: use `user.admin` instead of `user.role`
  if (!user || !user.admin) return null;

  return (
    <div className="admin-app-root">
      <HeaderUser onOpenSidebar={() => setSidebarOpen(true)} />

      <SidebarAdmin open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
