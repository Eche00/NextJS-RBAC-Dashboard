"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    faLandmark,
    faPlusCircle,
    faArrowLeft,
    faRightFromBracket,
    faUsersGear
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarAdminDesktop() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const navLinks = [
        { href: "/access", label: "Admin Overview", icon: faLandmark },
        { href: "/user", label: "All Users", icon: faUsersGear },
        { href: "/tweaks", label: "Add & Tweak", icon: faPlusCircle },
        { href: "/dashboard", label: "Back to Dashboard", icon: faArrowLeft },
    ];

    // Helper to check active links
    const isLinkActive = (href) => pathname === href || pathname.startsWith(href + "/");

    return (
        <aside className="sidebar-desktop">
            {/* Logo */}
            <div className="sidebar-brand">
                     <Image
                       src="/logo.png"
                       alt="MyApp Logo"
                       width={120}
                       height={120}
                       priority
                       className="sidebar-logo"
                     />
                 </div>

            {/* Navigation links */}
            <nav className="sidebar-nav">
                {navLinks.map(({ href, label, icon }) => {
                    const isActive = isLinkActive(href);
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

                {/* Logout button */}
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
