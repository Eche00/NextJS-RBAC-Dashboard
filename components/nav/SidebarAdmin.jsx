"use client";

import SidebarAdminDesktop from "./SidebarAdminDesktop";
import SidebarAdminMobile from "./SidebarAdminMobile";
import "@/styles/Sidebar.css";

export default function SidebarAdmin({ open, onClose }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <SidebarAdminDesktop />

      {/* Mobile Sidebar */}
      <SidebarAdminMobile open={open} onClose={onClose} />
    </>
  );
}
