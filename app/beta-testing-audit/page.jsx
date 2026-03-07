"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  Search,
  Terminal,
  Activity,
  FileText,
} from "react-feather";
import "../../styles/BetaTestingAudit.css";
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  Search,
  Terminal,
  Activity,
  FileText,
} from "react-feather";
import "../../styles/BetaTestingAudit.css";

const Page = () => {
  const router = useRouter();

  const auditAreas = [
    {
      title: "UX & Usability Audit",
      description:
        "Evaluating the application flow to ensure maximum intuition and minimum friction for the end user.",
    },
    {
      title: "Functional Stability",
      description:
        "Stress-testing features to uncover edge cases and ensure consistent behavior across all environments.",
    },
    {
      title: "Security & Permissions",
      description:
        "Verifying RBAC (Role-Based Access Control) integrity and data leakage vulnerabilities.",
    },
  ];

  return (
    <div className="audit-page">
      <div className="audit-container">
        <nav>
          <div className="back-link" onClick={() => router.push("/about")}>
            <ArrowLeft size={18} />
            Back to About
          </div>
        </nav>

        <motion.header
          className="audit-header"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span>Quality Assurance & Auditing</span>
          <h1>Beta Testing Audit Services</h1>
          <p>
            We don't just find bugs; we architect quality. Our audit process
            provides deep insights into your product's readiness for the real
            world through comprehensive community-driven beta testing.
          </p>
        </motion.header>

        <div className="audit-content">
          <section className="audit-section">
            <h2>
              <Activity size={24} /> Audit Methodology
            </h2>
            <div className="audit-grid">
              {auditAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="audit-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="audit-section">
            <h2>
              <FileText size={24} /> Detailed Expertise
            </h2>
            <p style={{ color: "var(--zinc-400)" }}>
              Leveraging our global trybe of sarcastic geeks, we provide a
              diverse range of testing perspectives that traditional QA teams
              often miss.
            </p>
            <ul className="expertise-list">
              <li>Performance Benchmarking</li>
              <li>API Integration Testing</li>
              <li>Mobile Responsiveness</li>
              <li>Load & Stress Testing</li>
              <li>Accessibility Compliance</li>
              <li>Localization Audit</li>
            </ul>
          </section>

          <section className="audit-section" style={{ marginTop: "40px" }}>
            <div
              className="audit-item"
              style={{
                background: "rgba(139, 92, 246, 0.05)",
                borderColor: "rgba(139, 92, 246, 0.2)",
              }}
            >
              <h3 style={{ color: "var(--purple-light)" }}>
                Human-Centric Feedback
              </h3>
              <p>
                Our auditors provide qualitative feedback that goes beyond
                simple "Pass/Fail" metrics. We tell you how your product feels
                to a developer, a designer, and a user.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
