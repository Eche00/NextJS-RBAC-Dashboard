"use client";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "../user/loading";
import "@/styles/Auth.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    setError("");
    setMessage("");

    try {
      setLoggingIn(true);
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/dashboard";
    } catch {
      setError("Invalid email or password.");
      setLoggingIn(false);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoggingIn(true);
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch {
      setError("Failed to send reset email.");
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">
          {forgotMode ? "Reset your password" : "Welcome back"}
        </h1>
        <p className="auth-subtitle">
          {forgotMode
            ? "Enter your email and we’ll send you a reset link"
            : "Login to continue to your dashboard"}
        </p>

        <div className="auth-form">
          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!forgotMode && (
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-success">{message}</p>}

          {!forgotMode ? (
            <button
              className="auth-btn"
              onClick={handleLogin}
              disabled={loggingIn || !email || !password}
            >
              {loggingIn ? "Signing in..." : "Sign in"}
            </button>
          ) : (
            <button
              className="auth-btn"
              onClick={handlePasswordReset}
              disabled={loggingIn || !email}
            >
              {loggingIn ? "Sending..." : "Send reset link"}
            </button>
          )}
        </div>

        <div className="auth-footer">
          {!forgotMode ? (
            <>
              <button
                className="auth-text-btn"
                onClick={() => setForgotMode(true)}
              >
                Forgot password?
              </button>
              <p>
                New here? <Link href="/register">Create an account</Link>
              </p>
            </>
          ) : (
            <button
              className="auth-text-btn"
              onClick={() => setForgotMode(false)}
            >
              ← Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}