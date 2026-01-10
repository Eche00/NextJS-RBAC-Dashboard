"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import "@/styles/loading.css";

export default function NotFound() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [visibleLines, setVisibleLines] = useState([]);
  const [showActions, setShowActions] = useState(false);

  const baseLines = [
    "> 404 NOT FOUND",
    "> Possible reasons:",
    "  - The page does not exist (typo or moved).",
    "  - You might not have permission to view this."
  ];

  const authHints = [
    "> Additional suggestions:",
    "  - Try logging in.",
    "  - Ask an admin for access."
  ];

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setIsAuthenticated(!!u));
    return () => unsub();
  }, []);

  // typewriter lines
  useEffect(() => {
    if (isAuthenticated === null) return;

    setVisibleLines([]);
    const all = isAuthenticated ? baseLines : [...baseLines, ...authHints];
    let idx = 0;

    const t = setInterval(() => {
      if (idx < all.length) {
        setVisibleLines((prev) => [...prev, all[idx]]);
        idx++;
      } else {
        clearInterval(t);
        setTimeout(() => setShowActions(true), 400);
      }
    }, 200);

    return () => clearInterval(t);
  }, [isAuthenticated]);

  const handleGoBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const handleGoHome = () => router.push("/");

  return (
    <div className="loader-overlay">
      <div className="loader-box">
        <div className="loader-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="loader-content">
          <div className="terminal-lines">
            <div>404 NOT FOUND</div>
            {visibleLines.map((line, i) => {
              if (!line) return null;
              const hasPrompt = line.startsWith(">");
              return (
                <div key={i}>
                  {hasPrompt && <span className="prompt">&gt;</span>}
                  <span className="text">{line.replace(/^>\s*/, "")}</span>
                </div>
              );
            })}

         {showActions && (
  <div className="terminal-actions">
    <span className="prompt">&gt;</span>{" "}
    <span className="action-link" onClick={handleGoBack}>
      Go back
    </span>
    <span className="divider"> | </span>
    <span className="action-link" onClick={handleGoHome}>
      Go home
    </span>
  </div>
)}


            <span className="cursor">█</span>
          </div>
        </div>
      </div>
    </div>
  );
}
