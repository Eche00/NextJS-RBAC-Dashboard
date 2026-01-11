"use client";
import Link from "next/link";
import MiniDashboard from "../user/Minidash";
import { usePathname } from "next/navigation";
import {
  faGamepad,
  faBook,
  faBriefcase,
  faLandmark,
  faUserAstronaut,
  faShieldAlt,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@/context/AuthContext";

export default function SidebarMobile({ open = false, onClose = () => { } }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const links = [
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

  // 🔹 Updated admin check using custom claims
  if (user?.admin) {
    links.push({ href: "/access", label: "Admin Dashboard", icon: faShieldAlt });
  }

  return (
    <aside className={`sidebar-mobile ${open ? "open" : ""}`}>
      <MiniDashboard />

      <button className="sidebar-close" onClick={onClose}>✕</button>

      <nav className="sidebar-nav">
        {links.map(({ href, label, icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-item ${isActive ? "active" : ""}`}
              onClick={onClose}
            >
              <FontAwesomeIcon icon={icon} className="sidebar-icon" />
              <span>{label}</span>
            </Link>
          );
        })}

        {/* Logout button */}
        {user && (
          <span
            className="sidebar-item logout-btn"
            onClick={() => {
              logout();
              onClose();
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="sidebar-icon" />
            <span>Logout</span>
          </span>
        )}
      </nav>
    </aside>
  );
}
