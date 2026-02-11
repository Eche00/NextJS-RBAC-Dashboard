"use client";
import Link from "next/link";
import MiniDashboard from "../user/Minidash";
import { usePathname } from "next/navigation";
import {
    faLandmark,
    faPlusCircle,
    faArrowLeft,
    faRightFromBracket,
    faUsersGear
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@/context/AuthContext";

export default function SidebarAdminMobile({ open = false, onClose = () => { } }) {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const links = [
        { href: "/access", label: "Admin Overview", icon: faLandmark },
        { href: "/user", label: "All Users", icon: faUsersGear },
        { href: "/tweaks", label: "Add & Tweak", icon: faPlusCircle },
        { href: "/dashboard", label: "Back to Dashboard", icon: faArrowLeft },
    ];

    // Helper to check active links
    const isLinkActive = (href) => pathname === href || pathname.startsWith(href + "/");

    return (
        <aside className={`sidebar-mobile ${open ? "open" : ""}`}>
            <span className="sidebar-close" onClick={onClose}>✕</span>

            <MiniDashboard />

            <nav className="sidebar-nav">
                {links.map(({ href, label, icon }) => {
                    const isActive = isLinkActive(href);

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
