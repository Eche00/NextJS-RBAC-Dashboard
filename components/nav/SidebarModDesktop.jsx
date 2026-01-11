"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    faLandmark,
    faPlusCircle,
    faBookOpen,
    faArrowLeft,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarModDesktop() {
    const { user, logout } = useAuth();
    const pathname = usePathname();


    const navLinks = [
        { href: "/mod", label: "Moderator Overview", icon: faLandmark },
        { href: "/user-balance", label: "Add Transactions", icon: faPlusCircle },
        { href: "/user-list", label: "Courses", icon: faBookOpen },
        { href: "/dashboard", label: "Back to Dashboard", icon: faArrowLeft },
    ];



    return (
        <aside className="sidebar-desktop">
            {/* Logo */}
            <div className="sidebar-brand">
                <img src="/logo.png" alt="MyApp Logo" className="sidebar-logo" />
            </div>

            {/* Navigation links */}
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
