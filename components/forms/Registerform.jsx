"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../user/loading";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setRegistering(true);

      // ✅ Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Create Firestore record in "geeks" collection
      await setDoc(doc(db, "geeks", user.uid), {
        email: user.email,
        fullName: email, // placeholder, replace with actual name input if needed
        transactions: [],
        createdAt: new Date(),
      });

      // ✅ Send emails (non-blocking)
      await Promise.all([
        fetch("/api/email/welcome", {
          method: "POST",
          body: JSON.stringify({ email, name: email }),
        }),
        fetch("/api/email/notify-admin", {
          method: "POST",
          body: JSON.stringify({ email }),
        }),
      ]);

      // ✅ Force refresh only after successful registration
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.message);
      setRegistering(false);
    }
  };

  // ✅ Show full loader when registering
  if (registering) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Register</h1>
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
        onClick={handleRegister}
        disabled={!email || !password || registering}
      >
        {registering ? "Registering..." : "Register"}
      </button>
    </div>
  );
}
