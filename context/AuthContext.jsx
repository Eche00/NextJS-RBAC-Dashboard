"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "geeks", firebaseUser.uid);

      try {
        // --------------------------------------------------
        // Initial fetch of user data (prevents ad-blocker issues)
        // --------------------------------------------------
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          setUser(null);
          setLoading(false);
          return;
        }

        const firestoreUser = snap.data();

        // --------------------------------------------------
        //  Fetch custom claims (admin/moderator)
        // --------------------------------------------------
        const tokenResult = await firebaseUser.getIdTokenResult(true); // force refresh to get latest claims
        const claims = tokenResult.claims || {};

        // --------------------------------------------------
        //  Auto-logout if lastLogin is more than 24h ago
        // --------------------------------------------------
        if (firestoreUser.lastLogin) {
          const lastLogin = firestoreUser.lastLogin.toDate
            ? firestoreUser.lastLogin.toDate()
            : new Date(firestoreUser.lastLogin);

          const now = new Date();
          const hoursDiff = (now - lastLogin) / (1000 * 60 * 60);

          if (hoursDiff > 24) {
            await signOut(auth);
            router.push("/login");
            return;
          }
        }

        // --------------------------------------------------
        //  Compute balance from transactions array
        // --------------------------------------------------
        let balance = 0;
        if (Array.isArray(firestoreUser.transactions)) {
          firestoreUser.transactions.forEach((tx) => {
            if (tx.type === "credit") balance += Number(tx.amount || 0);
            if (tx.type === "debit") balance -= Number(tx.amount || 0);
          });
        }

        const finalUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firestoreUser.fullName || firebaseUser.displayName,
          ...firestoreUser,
          balance,
          // --------------------------------------------------
          //  Merge custom claims for role checks
          // --------------------------------------------------
          admin: !!claims.admin,
          moderator: !!claims.moderator,
        };

        setUser(finalUser);
        setLoading(false);

        // --------------------------------------------------
        //  Real-time updates for user document
        // --------------------------------------------------
        const unsubSnapshot = onSnapshot(userRef, async (liveSnap) => {
          if (!liveSnap.exists()) return;
          const updated = liveSnap.data();

          // Compute live balance
          let liveBalance = 0;
          if (Array.isArray(updated.transactions)) {
            updated.transactions.forEach((tx) => {
              if (tx.type === "credit") liveBalance += Number(tx.amount || 0);
              if (tx.type === "debit") liveBalance -= Number(tx.amount || 0);
            });
          }

          // --------------------------------------------------
          // Refresh custom claims if roles may have changed
          // --------------------------------------------------
          let currentClaims = { admin: !!finalUser.admin, moderator: !!finalUser.moderator };
          try {
            const refreshedToken = await firebaseUser.getIdTokenResult(true); // force refresh claims
            currentClaims = {
              admin: !!refreshedToken.claims.admin,
              moderator: !!refreshedToken.claims.moderator,
            };
          } catch (err) {
            console.error("❌ error refreshing custom claims:", err);
          }

          // Update user state
          setUser({
            ...finalUser,
            ...updated,
            balance: liveBalance,
            ...currentClaims, // merge latest roles
          });

          // Auto-logout in real-time if lastLogin expires
          if (updated.lastLogin) {
            const lastLoginRT = updated.lastLogin.toDate
              ? updated.lastLogin.toDate()
              : new Date(updated.lastLogin);
            const hoursDiffRT = (new Date() - lastLoginRT) / (1000 * 60 * 60);

            if (hoursDiffRT > 24) {
              signOut(auth);
              router.push("/login");
            }
          }
        });

        // Cleanup snapshot listener on unmount
        return () => unsubSnapshot();
      } catch (err) {
        console.error("Auth load error:", err);
        setUser(null);
        setLoading(false);
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubAuth();
  }, [router]);

  // --------------------------------------------------
  // Logout helper
  // --------------------------------------------------
  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume AuthContext
export const useAuth = () => useContext(AuthContext);
