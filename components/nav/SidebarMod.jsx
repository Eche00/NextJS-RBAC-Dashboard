"use client";

import SidebarModDesktop from "./SidebarModDesktop";
import SidebarModMob from "./SidebarModMob";
import "@/styles/Sidebar.css";

export default function SidebarAdmin({ open, onClose }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <SidebarModDesktop />

      {/* Mobile Sidebar */}
      <SidebarModMob open={open} onClose={onClose} />
    </>
  );
}
