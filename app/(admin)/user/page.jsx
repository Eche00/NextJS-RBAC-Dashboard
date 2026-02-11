"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link"; 
import styles from "@/components/admin/styles/Users.module.css";
import Loader from "@/components/user/loading";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [rankFilter, setRankFilter] = useState("");
  const [verifySort, setVerifySort] = useState(""); 
  const [selected, setSelected] = useState([]);
  const [newRank, setNewRank] = useState("");

  // Fetch users ONCE
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(db, "geeks"));
        const list = [];

        snap.forEach((docSnap) => {
          const data = docSnap.data();
          let balance = 0;

          if (Array.isArray(data.transactions)) {
            data.transactions.forEach((tx) => {
              if (tx.type === "credit") balance += Number(tx.amount || 0);
              if (tx.type === "debit") balance -= Number(tx.amount || 0);
            });
          }

          list.push({
            uid: docSnap.id,
            fullName: data.fullName || "No Name",
            email: data.email || "No Email",
            gender: data.gender || "—",
            rank: data.rank || "Rookie",
            balance,
            isID: Boolean(data.isID), 
          });
        });

        // Sort by highest balance initially
        list.sort((a, b) => b.balance - a.balance);

        setUsers(list);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filters + sorting
  const filteredUsers = useMemo(() => {
    let result = users.filter((u) => {
      const matchSearch =
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchRank = rankFilter ? u.rank === rankFilter : true;

      return matchSearch && matchRank;
    });

    // Sort by verification
    if (verifySort === "verified") {
      result = result.sort((a, b) => Number(b.isID) - Number(a.isID));
    }
    if (verifySort === "unverified") {
      result = result.sort((a, b) => Number(a.isID) - Number(b.isID));
    }

    return result;
  }, [users, search, rankFilter, verifySort]);

  // Selection toggle
  const toggleSelect = (uid) => {
    setSelected((prev) =>
      prev.includes(uid)
        ? prev.filter((id) => id !== uid)
        : [...prev, uid]
    );
  };

  // Bulk delete
  const deleteSelected = async () => {
    if (!selected.length) return;
    if (!confirm(`Delete ${selected.length} users?`)) return;

    try {
      const batch = writeBatch(db);
      selected.forEach((uid) => {
        batch.delete(doc(db, "geeks", uid));
      });

      await batch.commit();

      setUsers((prev) => prev.filter((u) => !selected.includes(u.uid)));
      setSelected([]);
    } catch (err) {
      console.error("❌ Bulk delete failed:", err);
    }
  };

  // Bulk rank update
  const moveToRank = async () => {
    if (!selected.length || !newRank.trim()) return;

    try {
      const batch = writeBatch(db);

      selected.forEach((uid) => {
        batch.update(doc(db, "geeks", uid), {
          rank: newRank.trim(),
        });
      });

      await batch.commit();

      setUsers((prev) =>
        prev.map((u) =>
          selected.includes(u.uid)
            ? { ...u, rank: newRank.trim() }
            : u
        )
      );

      setSelected([]);
      setNewRank("");
    } catch (err) {
      console.error("❌ Bulk rank update failed:", err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const uniqueRanks = [...new Set(users.map((u) => u.rank))];

  return (
    <div className={styles.container}>
      {/* Controls */}
      <div className={styles.controls}>
        <input
          className={styles.inputField}
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.inputField}
          value={rankFilter}
          onChange={(e) => setRankFilter(e.target.value)}
        >
          <option value="">All Ranks</option>
          {uniqueRanks.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* Verification sort */}
        <select
          className={styles.inputField}
          value={verifySort}
          onChange={(e) => setVerifySort(e.target.value)}
        >
          <option value="">All Users</option>
          <option value="verified">Verified First</option>
          <option value="unverified">Unverified First</option>
        </select>

        {selected.length > 0 && (
          <>
            <input
              className={styles.inputField}
              placeholder="New rank…"
              value={newRank}
              onChange={(e) => setNewRank(e.target.value)}
            />

            <span
              className={styles.moveBtn}
              onClick={moveToRank}
            >
              Move ({selected.length})
            </span>

            <span
              className={styles.deleteBtn}
              onClick={deleteSelected}
            >
              Delete ({selected.length})
            </span>
          </>
        )}
      </div>

      {/* Users list */}
      <div className={styles.list}>
        {filteredUsers.map((u) => (
          <div
            key={u.uid}
            className={`${styles.card} ${selected.includes(u.uid) ? styles.selected : ""}`}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selected.includes(u.uid)}
              onChange={(e) => {
                e.stopPropagation();
                toggleSelect(u.uid);
              }}
            />

            {/* Card content */}
            <Link href={`/user/${u.uid}`} className={styles.cardLink}>
              {/* First row */}
              <div className={styles.row}>
                <div className={styles.name}>
                  {u.fullName} {u.isID && " 🎭 "} 
                </div>
                <div className={styles.email}>{u.email}</div>
                <div className={styles.balance}>{u.balance} 🐚</div>
              </div>

              {/* Second row */}
              <div className={styles.rowSmall}>
                <div className={styles.gender}>{u.gender}</div>
                <div className={styles.rank}>{u.rank}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
