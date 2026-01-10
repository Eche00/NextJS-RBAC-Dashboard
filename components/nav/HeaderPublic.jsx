"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "@/styles/headerPublic.css";
import NavDash from "../user/NavDash";
import Loader from "../user/loading";

export default function HeaderPublic() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return <Loader />;
  }

  const navLinks = [
    { href: "/play", label: "Games & Fun" },
    { href: "/about", label: "About Us" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/support", label: "Contact Us" },
  ];

  return (
    <header className="public-header">
      {/* Logo */}
      <div className={`public-header-left ${user ? "hide-on-mobiles" : ""}`}>
        <Link href="/" className="public-logo-link logo">
          <img src="/logo.png" alt="SG Trybe Logo" className="public-logo" />
        </Link>
      </div>


      {/* Navigation */}
      <nav className="public-nav">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`public-link ${isActive ? "active" : ""}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Right side */}
      <div className="public-header-right">
        {user ? (
          <NavDash />
        ) : (
          <Link href="/login" className="public-account-btn">
            My Account
          </Link>
        )}
      </div>
    </header>
  );
}
