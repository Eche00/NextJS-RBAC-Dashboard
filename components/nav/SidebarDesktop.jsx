"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  faGamepad,
  faBook,
  faBriefcase,
  faLandmark,
  faUserAstronaut,
  faShieldAlt,
  faRightFromBracket,
  faShieldBlank,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarDesktop() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: faLandmark },
    { href: "/games", label: "Games", icon: faGamepad },
    { href: "/courses", label: "Courses", icon: faBook },
    { href: "/jobs", label: "Jobs", icon: faBriefcase },
    {
      href: `/profile`,
      label: "Profile",
      icon: faUserAstronaut
    },
  ];

  // Updated admin check using custom claims
  if (user?.admin || user?.moderator) {
    navLinks.push({ href: "/mod", label: "Moderator Dashboard", icon: faShieldBlank });
  }

  if (user?.admin) {
    navLinks.push({ href: "/access", label: "Admin Dashboard", icon: faShieldAlt });
  }

  return (
    <aside className="sidebar-desktop">
      <div className="sidebar-brand">
        <img src="/logo.png" alt="MyApp Logo" className="sidebar-logo" />
      </div>

      <nav className="sidebar-nav">
        {navLinks.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={icon} className="sidebar-icon" />
              <span>{label}</span>
            </Link>
          );
        })}

        {user && (
          <span
            className="sidebar-item logout-btn"
            onClick={logout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="sidebar-icon" />
            <span>Logout</span>
          </span>
        )}
      </nav>
    </aside>
  );
}
