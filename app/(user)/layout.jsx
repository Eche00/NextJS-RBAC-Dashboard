"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import HeaderUser from "@/components/nav/HeaderUser";
import SidebarUser from "@/components/nav/SidebarUser";
import MobileBottomNav from "@/components/nav/MobileBottomNav";
import Loader from "@/components/user/loading";

export default function UserLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login (only after loading false)
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Loader />
    );
  }

  

  if (!user) return null;

  return (
    <div className="user-app-root">
      <HeaderUser onOpenSidebar={() => setSidebarOpen(true)} />

      <SidebarUser open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      <main className="user-main">{children}</main>
      <MobileBottomNav />
    </div>
  );
}
