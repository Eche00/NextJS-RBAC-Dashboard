"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function NavDash() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div className="users-menu">
            <div className="users-info">
                <div className="user-dp">
                    <img
                        src={user.profilePictureUrl}
                        alt="User avatar"
                        className="avatar-dp"
                        onError={(e) => { e.target.src = "/images/brain.PNG"; }}
                    />
                </div>
                <div className="users-details">
                    <span className="user-name">{user.fullName}</span>
                    <div className="user-links">
                        <a href="/" className="user-link">Dashboard</a>
                        <a onClick={logout} className="user-link red-link">Logout</a>
                    </div>
                </div>
            </div>
        </div>

    );
}
