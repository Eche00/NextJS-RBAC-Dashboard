// * THIS HELPS EXTRACT ALL USER DATA FROM DB COLLECTION
"use client";

import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import "@/styles/ExtractData.css";

const ExtractData = () => {
  const [collectionName, setCollectionName] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleExtract = async () => {
    if (!collectionName.trim()) {
      setMessage("⚠️ Please enter a collection name.");
      return;
    }

    setLoading(true);
    setMessage("");
    setUsers([]);

    try {
      const querySnapshot = await getDocs(
        collection(db, collectionName.trim())
      );

      const extracted = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        extracted.push({
          fullName: data.fullName || "",
          email: data.email || "",
          address: data.address || "",
          gender: data.gender || "",
          dob: data.dob || "",
          phoneNumber: data.phoneNumber || "",
          profilePictureUrl: data.profilePictureUrl || "",
          rank: data.rank || "",
          techStack: data.techStack || [],
          github: data.github || "",
          portfolio: data.portfolio || [],
          isID: typeof data.isID === "boolean" ? data.isID : false, 
        });
      });

      extracted.length === 0
        ? setMessage(`⚠️ No documents found in "${collectionName}".`)
        : setUsers(extracted);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("❌ Failed to fetch data.");
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(users, null, 2));
    setMessage("✅ JSON copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(users, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${collectionName || "data"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="extract-container">
      <div className="extract-card">
        <input
          className="extract-input"
          placeholder="Enter collection name (e.g. users, geeks)"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />

        <span
          className="extract-button"
          onClick={handleExtract}
        >
          {loading ? "Extracting..." : "Extract Data"}
        </span>

        {message && <p className="extract-message">{message}</p>}

        {users.length > 0 && (
          <div className="extract-resultBox">
            <pre className="extract-pre">
              {JSON.stringify(users, null, 2)}
            </pre>

            <div style={{ display: "flex", gap: "10px" }}>
              <span
                className="extract-copyButton"
                onClick={handleCopy}
              >
                📋 Copy JSON
              </span>

              <span
                className="extract-copyButton"
                onClick={handleDownload}
              >
                ⬇️ Download JSON
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtractData;
