"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faBook,
  faBriefcase,
  faLandmark,
  faUserAstronaut
} from "@fortawesome/free-solid-svg-icons";
import "@/styles/MobileBottomNav.css";

// Simple slugify function
const slugify = (text) =>
  text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") 
    .replace(/[^\w-]+/g, "") 
    .replace(/--+/g, "-"); 

export default function MobileBottomNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const navLinks = [
    { href: "/dashboard", label: "Home", icon: faLandmark },
    { href: "/games", label: "Games", icon: faGamepad },
    { href: "/courses", label: "Courses", icon: faBook },
    { href: "/jobs", label: "Jobs", icon: faBriefcase },
    {
      href: `/profile/${slugify(user.fullName)}`,
      label: "Profile",
      icon: faUserAstronaut
    }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navLinks.map(({ href, label, icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`mbn-item ${isActive ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={icon} className="mbn-icon" />
            <span className="mbn-text">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
