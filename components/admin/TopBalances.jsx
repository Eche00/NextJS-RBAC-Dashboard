"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "./styles/TopBalances.module.css";
import Link from "next/link"; 
import Loader from "../user/loading";

export default function TopBalances() {
  const [users, setUsers] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const snap = await getDocs(collection(db, "geeks"));
        const allUsers = [];
        let total = 0;

        snap.forEach((doc) => {
          const data = doc.data();
          let balance = 0;

          if (Array.isArray(data.transactions)) {
            data.transactions.forEach((tx) => {
              if (tx.type === "credit") balance += Number(tx.amount || 0);
              if (tx.type === "debit") balance -= Number(tx.amount || 0);
            });
          }

          total += balance;

          allUsers.push({
            uid: doc.id,
            fullName: data.fullName || "No Name",
            email: data.email || "No Email",
            rank: data.rank || "Rookie",
            profilePictureUrl: data.profilePictureUrl || null,
            balance,
            isID: data.isID || false, // for verification badge
          });
        });

        // Sort descending by balance
        allUsers.sort((a, b) => b.balance - a.balance);

        setUsers(allUsers.slice(0, 5)); // top 5
        setTotalBalance(total);
      } catch (err) {
        console.error("❌ Error fetching balances:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.cards}>
      <h2 className={styles.title}>Total System Balance : {totalBalance} 🐚</h2>

      <h3 className={styles.subtitle}>Top 5 Users</h3>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.uid} className={styles.listItem}>
            <div className={styles.userInfo}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ position: "relative", marginRight: "8px" }}>
                  <img
                    src={user.profilePictureUrl || "/images/brain.PNG"}
                    alt={user.fullName}
                    className={styles.avatar}
                  />
                </div>

                {/* Verified emoji outside avatar*/}
                {user.isID && (
                  <span
                    style={{
                      position: "relative",
                      bottom: "-10px",
                      marginLeft: "-25px",
                      fontSize: "1.2rem",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      borderRadius: "50%",
                      padding: "2px 4px",
                    }}
                    title="Verified"
                  >
                    🎭
                  </span>
                )}

                <div className={styles.userText}>
                  <Link href={`/user/${user.uid}`} className={styles.nameLink}>
                    <h4 className={styles.nameLink}>{user.fullName}</h4>
                  </Link>
                  <span className={styles.emailRole}>{user.rank}</span>
                </div>
              </div>
            </div>
            <div className={styles.userBalance}>{user.balance} 🐚</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
