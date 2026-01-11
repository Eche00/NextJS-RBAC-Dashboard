"use client";
import Link from "next/link";
import MiniDashboard from "../user/Minidash";
import { usePathname } from "next/navigation";
import {
    faLandmark,
    faPlusCircle,
    faBookOpen,
    faArrowLeft,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@/context/AuthContext";

export default function SidebarModMob({ open = false, onClose = () => { } }) {
    const { user, logout } = useAuth();
    const pathname = usePathname();


    const links = [
        { href: "/mod", label: "Moderator Overview", icon: faLandmark },
        { href: "/user-balance", label: "Add Transactions", icon: faPlusCircle },
        { href: "/user-list", label: "Courses", icon: faBookOpen },
        { href: "/dashboard", label: "Back to Dashboard", icon: faArrowLeft },
    ];


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
