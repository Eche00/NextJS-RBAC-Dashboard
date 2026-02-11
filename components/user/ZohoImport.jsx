"use client";

import { useState } from "react";

export default function ZohoImport() {
  const [collectionName, setCollectionName] = useState("");
  const [status, setStatus] = useState("");

  const handleImport = async () => {
    if (!collectionName) return setStatus("Enter collection name first.");

    setStatus("Importing...");
    try {
      const res = await fetch("/api/zoho-import-contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collectionName }),
      });
      const data = await res.json();
      if (data.success) setStatus(`✅ Imported ${data.imported} contacts successfully!`);
      else setStatus(`❌ Failed: ${data.error}`);
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Zoho Campaigns Import</h2>
      <input
        type="text"
        placeholder="Enter Firestore collection name"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />
      <button onClick={handleImport}>Import Contacts</button>
      <p>{status}</p>
    </div>
  );
}
