"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import "@/styles/minidash.css";


export default function MiniDashboard() {
  const { user } = useAuth();

  // fallback balance (if you pass props, remove this)
  const balance =
    user?.balance ??
    0; // prevents crash if balance hasn't loaded yet

  return (
    <div className="dashboardContainer">
      <div className="profileSection">
        <img
          src={user?.profilePictureUrl}
          alt="Profile"
          className="profileImages"
        />

        <div className="profileDetails">
          <div className="profileName">{user?.fullName}</div>

          <div className="balanceSection">
            <strong>Balance: </strong>
            <span className="bal">
              {balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              🐚
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
