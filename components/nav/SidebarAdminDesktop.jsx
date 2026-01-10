"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    faLandmark,
    faPlusCircle,
    faBookOpen,
    faBriefcase,
    faBell,
    faArrowLeft,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarAdminDesktop() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    
    const navLinks = [
        { href: "/access", label: "Admin Overview", icon: faLandmark },
        { href: "/add-transaction", label: "Add Transactions", icon: faPlusCircle },
        { href: "/all-courses", label: "Courses", icon: faBookOpen },
        { href: "/all-jobs", label: "Jobs", icon: faBriefcase },
        { href: "/notification", label: "Notifications", icon: faBell },
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
