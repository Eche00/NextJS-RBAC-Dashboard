"use client";

import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";
import "@/styles/Sidebar.css";


export default function SidebarUser({ open, onClose }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <SidebarDesktop />

      {/* Mobile Sidebar */}
      <SidebarMobile open={open} onClose={onClose} />
    </>
  );
}
