"use client";

import { useAuth } from "@/context/AuthContext";
import "@/styles/RoleLoader.css";

export default function RoleLoader({ message }) {
  const { user } = useAuth();

  const getRoleMessage = () => {
    if (message) return message;

    if (!user) return "Authenticating user...";
    if (user.admin) return "Preparing Admin Dashboard...";
    if (user.moderator) return "Loading Moderator Tools...";
    return "Setting up your workspace...";
  };

  return (
    <div className="role-loader-wrapper">
      <div className="role-loader-card">
        <div className="role-loader-spinner" />

        <p className="role-loader-text">
          {getRoleMessage()}
        </p>
      </div>
    </div>
  );
}
