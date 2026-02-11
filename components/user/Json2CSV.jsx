"use client";

import { useState } from "react";
import "@/styles/JsonToCsv.css";

export default function JsonToCsv() {
  const [jsonText, setJsonText] = useState("");
  const [csvData, setCsvData] = useState("");

  const convertToCsv = () => {
    try {
      const data = JSON.parse(jsonText);
      if (!Array.isArray(data)) {
        alert("JSON must be an array of objects");
        return;
      }

      const headers = Array.from(
        new Set(data.flatMap((obj) => Object.keys(obj)))
      );

      const csvRows = [
        headers.join(","),
        ...data.map((row) =>
          headers
            .map((header) => {
              const val = row[header] ?? "";
              return `"${String(val).replace(/"/g, '""')}"`;
            })
            .join(",")
        ),
      ];

      setCsvData(csvRows.join("\n"));
    } catch (err) {
      alert("Invalid JSON");
      console.error(err);
    }
  };

  const downloadCsv = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="json-container">
      <h2 className="title">JSON → CSV Converter</h2>

      <textarea
        className="input-area"
        rows={10}
        placeholder="Paste your JSON array here"
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />

      <div className="button-group">
        <span className="btn primary" onClick={convertToCsv}>
          Convert to CSV
        </span>

        {csvData && (
          <span className="btn secondary" onClick={downloadCsv}>
            Download CSV
          </span>
        )}
      </div>

      {csvData && (
        <div className="preview">
          <h4>CSV Preview</h4>
          <textarea
            className="output-area"
            rows={10}
            value={csvData}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
