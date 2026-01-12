"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../user/loading";
import "@/styles/Auth.css";
import Link from "next/link";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setRegistering(true);

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create Firestore record
      await setDoc(doc(db, "geeks", user.uid), {
        fullName,
        email,
        transactions: [],
        createdAt: new Date(),
      });

      // Redirect to dashboard
      router.replace("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to register.");
      setRegistering(false);
    }
  };

  if (registering) return <Loader />;

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">Sign up to access your dashboard</p>

        <div className="auth-form">
          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

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

          {error && <p className="auth-error">{error}</p>}

          <button
            className="auth-btn"
            onClick={handleRegister}
            disabled={registering || !fullName || !email || !password}
          >
            {registering ? "Registering..." : "Register"}
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
