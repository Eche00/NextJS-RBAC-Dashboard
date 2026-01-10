"use client";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "../user/loading";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true); // For auth check
  const [loggingIn, setLoggingIn] = useState(false); // For button state
  const router = useRouter();

  // ✅ Check authentication state on mount
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

  // ✅ Handle login
  const handleLogin = async () => {
    try {
      setLoggingIn(true);
      await signInWithEmailAndPassword(auth, email, password);

      // Force reload only after successful login
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.message);
      setLoggingIn(false);
    }
  };

  // ✅ Show loader during auth check
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        disabled={loggingIn || !email || !password}
      >
        {loggingIn ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
