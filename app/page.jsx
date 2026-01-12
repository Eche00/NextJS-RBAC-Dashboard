"use client";

import Link from "next/link";
import "./Home.css";

export default function HomePage() {
  return (
    <div className="home-root">
      {/* Hero */}
      <section className="home-hero">
        <h1 className="home-title">RBAC Dashboard Boilerplate</h1>
        <p className="home-subtitle">
          A production-ready role-based access control dashboard built with
          Next.js and Firebase.
        </p>

        <Link href="/login" className="home-cta">
          Get Started
        </Link>
      </section>

      {/* What it does */}
      <section className="home-section">
        <h2 className="section-title">What This Dashboard Does</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Role-Based Access Control</h3>
            <p>
              Control access using Firebase custom claims such as{" "}
              <strong>admin</strong>, <strong>moderator</strong>, and{" "}
              <strong>user</strong>.
            </p>
          </div>

          <div className="feature-card">
            <h3>Protected Routes</h3>
            <p>
              Routes are guarded at the layout level using the Next.js App
              Router. Users only see what they’re allowed to see.
            </p>
          </div>

          <div className="feature-card">
            <h3>Scalable Architecture</h3>
            <p>
              Uses route groups like <code>(admin)</code> and <code>(mod)</code>{" "}
              for clean separation of concerns.
            </p>
          </div>

          <div className="feature-card">
            <h3>Firebase Powered</h3>
            <p>
              Authentication, Firestore, and role management powered entirely
              by Firebase.
            </p>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="home-section alt">
        <h2 className="section-title">How to Use</h2>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Login</h3>
            <p>
              Sign in using Firebase Authentication. New users default to a
              standard user role.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Assign Roles</h3>
            <p>
              Use the scripts in <code>/scripts</code> (e.g.{" "}
              <code>makeadmin.js</code>) to assign roles locally.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Access Dashboards</h3>
            <p>
              Admins and moderators automatically see their dashboards based
              on Firebase custom claims.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>
          Built for developers who want a clean, scalable RBAC foundation.
        </p>
      </footer>
    </div>
  );
}
