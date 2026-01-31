"use client";

import React from "react";
import NavDash from "../user/NavDash";

export default function HeaderUser({ onOpenSidebar }) {

  return (
    <header className="head-user">
      <div className="header-logo-wrapper">
        <img
          src="/logo.png"
          alt="Logo"
          className="header-logo"
        />
      </div>

      <NavDash />

      {/* Hamburger visible only on mobile */}
      <span className="hamburger" onClick={onOpenSidebar} aria-label="Open menu">
        ☰
      </span>
    </header>

  );
}
