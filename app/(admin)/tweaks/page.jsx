"use client";

import { useState } from "react";
import "@/styles/EditCourse.css";
import ExtractData from "@/components/ExtractData";
import MoveUsersAccordion from "@/components/Migration";
import ZohoImportUI from "@/components/user/ZohoImport";
import JsonToCsv from "@/components/user/Json2CSV";

export default function AdminTweakPage() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleAccordion = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="edit-course">
            <div className="edit-course-containers">

                {/* Accordion 1: Move Users */}
                <div className="module-accordion">
                    <div className="module-header" onClick={() => toggleAccordion(0)}>
                        <strong>Move Users to new DB Collection</strong>
                        <span>{expandedIndex === 0 ? "" : "▼"}</span>
                    </div>
                    {expandedIndex === 0 && (
                        <div className="module-contents">
                            <MoveUsersAccordion />
                        </div>
                    )}
                </div>

                {/* Accordion 2 */}
                <div className="module-accordion">
                    <div className="module-header" onClick={() => toggleAccordion(1)}>
                        <strong>Extract Users from DB as JSON</strong>
                        <span>{expandedIndex === 1 ? "" : "▼"}</span>
                    </div>
                    {expandedIndex === 1 && <div className="module-contents">
                        <ExtractData />
                    </div>}
                </div>

                {/* Accordion 3 */}
                <div className="module-accordion">
                    <div className="module-header" onClick={() => toggleAccordion(2)}>
                        <strong>Convert Json to CSV</strong>
                        <span>{expandedIndex === 2 ? "" : "▼"}</span>
                    </div>
                    {expandedIndex === 2 && <div className="module-contents">
                        <JsonToCsv />
                    </div>}
                </div>
            </div>
        </div>
    );
}
