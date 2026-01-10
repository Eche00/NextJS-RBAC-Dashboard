"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the CSS
    import("@/styles/loading.css").then(() => setCssLoaded(true));
  }, []);

  if (!cssLoaded) return null; // Don't render until CSS is loaded

  return (
    <div className="loader-overlay">
      <div className="loader-box">
        <div className="loader-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="loader-content">
          <span className="prompt">&gt; </span>
          <span className="text">Please wait...</span>
          <span className="cursor">█</span>
        </div>
      </div>
    </div>
  );
}
