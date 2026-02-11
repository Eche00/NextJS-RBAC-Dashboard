"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, deleteDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "@/components/admin/styles/UserDetails.module.css";
import Loader from "@/components/user/loading";

export default function UserDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    // Temporary state for editing fields
    const [tempUser, setTempUser] = useState({});

    const [txAmount, setTxAmount] = useState("");
    const [txDate, setTxDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [txAccount, setTxAccount] = useState("Snake");

    const [savingProfile, setSavingProfile] = useState(false);
    const [deletingUser, setDeletingUser] = useState(false);
    const [addingTx, setAddingTx] = useState(false);
    const [updatingTxIndex, setUpdatingTxIndex] = useState(null);

    // ---------- FETCH USER ----------
    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            const snap = await getDoc(doc(db, "geeks", id));
            if (snap.exists()) {
                setUser({ id: snap.id, ...snap.data() });
                setTempUser({ id: snap.id, ...snap.data() }); // initialize temp state
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, [id]);

    const formatDate = (value, includeTime = true) => {
        if (!value) return "—";
        let dateObj = value?.seconds ? new Date(value.seconds * 1000) : new Date(value);
        if (includeTime) {
            return dateObj.toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
        } else {
            return dateObj.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });
        }
    };

    // ---------- SAVE PROFILE ----------
    const saveProfile = async () => {
        if (!tempUser) return;
        setSavingProfile(true);
        try {
            const { email, lastLogin, transactions, ...safeData } = tempUser;
            await updateDoc(doc(db, "geeks", id), safeData);
            setUser(tempUser); // commit temp state to main user
            setEditMode(false);
        } finally {
            setSavingProfile(false);
        }
    };

    // ---------- DELETE USER ----------
    const deleteUser = async () => {
        const ok = confirm("This will permanently delete this user. Continue?");
        if (!ok) return;

        setDeletingUser(true);
        try {
            await deleteDoc(doc(db, "geeks", id));
            router.push("/admin/users");
        } finally {
            setDeletingUser(false);
        }
    };

    // ---------- ADD TRANSACTION ----------
    const addTransaction = async () => {
        if (!txAmount || !txDate) return;

        setAddingTx(true);
        try {
            const formattedDate = new Date(txDate).toISOString().split("T")[0];
            const newTx = {
                type: "credit",
                account: txAccount,
                amount: Number(txAmount),
                status: "complete",
                date: formattedDate,
            };

            await updateDoc(doc(db, "geeks", id), {
                transactions: arrayUnion(newTx),
            });

            setUser((prev) => ({
                ...prev,
                transactions: [...(prev.transactions || []), newTx],
            }));

            setTxAmount("");
            setTxDate(new Date().toISOString().split("T")[0]);
            setTxAccount("Snake");
        } finally {
            setAddingTx(false);
        }
    };

    // ---------- DELETE TRANSACTION ----------
    const deleteTransaction = async (index) => {
        setUpdatingTxIndex(index);
        try {
            if (!user.transactions) return;
            const updatedTx = user.transactions.filter((_, i) => i !== index);

            await updateDoc(doc(db, "geeks", id), {
                transactions: updatedTx,
            });

            setUser((prev) => ({ ...prev, transactions: updatedTx }));
        } finally {
            setUpdatingTxIndex(null);
        }
    };

    if (loading) return <Loader />;
    if (!user) return <p className={styles.loading}>User not found</p>;

    const balance =
        user.transactions?.reduce((sum, t) => sum + Number(t.amount || 0), 0) || 0;

    return (
        <div className={styles.container}>
            {/* HEADER */}
            <div className={styles.header}>
                <img
                    src={user.profilePictureUrl || "/brain.PNG"}
                    className={styles.avatar}
                    alt={user.fullName}
                />

                <div className={styles.headerInfo}>
                    {editMode ? (
                        <input
                            className={styles.input}
                            value={tempUser.fullName || ""}
                            onChange={(e) =>
                                setTempUser((p) => ({ ...p, fullName: e.target.value }))
                            }
                        />
                    ) : (
                        <>
                            <h2>
                                {user.fullName}
                                {user.isID && (
                                    <span
                                        style={{ marginLeft: "5px", color: "#dedede" }}
                                        title="Verified"
                                    >
                                        🎭
                                    </span>
                                )}
                            </h2>
                            <div className={styles.balance}>{balance.toFixed(2)} 🐚</div>
                        </>
                    )}

                    <div className={styles.badges}>
                        {editMode ? (
                            <input className={styles.input} value={tempUser.email || ""} readOnly />
                        ) : (
                            <p className={styles.email}>{user.email}</p>
                        )}
                    </div>

                    <div className={styles.badges}>
                        {editMode ? (
                            <select
                                className={styles.select}
                                value={tempUser.isID ? "true" : "false"}
                                onChange={(e) =>
                                    setTempUser((p) => ({ ...p, isID: e.target.value === "true" }))
                                }
                            >
                                <option value="true">Verified</option>
                                <option value="false">Not Verified</option>
                            </select>
                        ) : (
                            <span className={user.isID ? styles.verified : styles.unverified}>
                                {user.isID ? "Verified" : "Not Verified"}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* ACTIONS */}
            <div className={styles.actions}>
                <span
                    className={styles.actionBtn}
                    onClick={() => {
                        setEditMode(!editMode);
                        setTempUser(user);
                    }}
                >
                    {editMode ? "Cancel" : "Edit Profile"}
                </span>

                {editMode && (
                    <>
                        <span
                            className={`${styles.actionBtn} ${styles.saveBtn}`}
                            onClick={saveProfile}
                            disabled={savingProfile}
                        >
                            {savingProfile ? "Saving…" : "Save"}
                        </span>

                        <span
                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                            onClick={deleteUser}
                            disabled={deletingUser}
                        >
                            {deletingUser ? "Deleting…" : "Delete User"}
                        </span>
                    </>
                )}
            </div>

            {/* DETAILS GRID */}
            <div className={styles.grid}>
                {[
                    ["Rank", "rank"],
                    ["Tech Stack", "techStack"],
                    ["GitHub", "github"],
                    ["Portfolio", "portfolio"],
                    ["Gender", "gender"],
                    ["Date of Birth", "dob"],
                    ["Phone", "phoneNumber"],
                    ["Address", "address"],
                    ["Twitter", "username"],
                    ["Group", "group"],
                    ["Code", "code"],
                ].map(([label, key]) => (
                    <div key={key} className={styles.field}>
                        <span className={styles.fieldLabel}>{label}</span>
                        {editMode ? (
                            <input
                                className={styles.input}
                                value={tempUser[key] || ""}
                                onChange={(e) =>
                                    setTempUser((p) => ({ ...p, [key]: e.target.value }))
                                }
                            />
                        ) : key === "dob" ? (
                            <strong className={styles.fieldValue}>{formatDate(user[key], false)}</strong>
                        ) : (
                            <strong className={styles.fieldValue}>{user[key] || "—"}</strong>
                        )}
                    </div>
                ))}

                {/* 100 DAYS */}
                <div className={styles.field}>
                    <span className={styles.fieldLabel}>100 Days</span>
                    {editMode ? (
                        <select
                            className={styles.select}
                            value={tempUser["100Days"] ? "true" : "false"}
                            onChange={(e) =>
                                setTempUser((p) => ({ ...p, ["100Days"]: e.target.value === "true" }))
                            }
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    ) : (
                        <strong className={styles.fieldValue}>{user["100Days"] ? "Yes" : "No"}</strong>
                    )}
                </div>

                {/* LAST LOGIN */}
                <div className={styles.field}>
                    <span className={styles.fieldLabel}>Last Login</span>
                    <strong className={styles.fieldValue}>{formatDate(user.lastLogin)}</strong>
                </div>

                {/* PROFILE PICTURE URL (EDIT MODE ONLY) */}
                {editMode && (
                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>Profile Picture URL</span>
                        <input
                            className={styles.input}
                            value={tempUser.profilePictureUrl || ""}
                            onChange={(e) =>
                                setTempUser((p) => ({ ...p, profilePictureUrl: e.target.value }))
                            }
                        />
                    </div>
                )}
            </div>

            {/* TRANSACTIONS */}
            <div className={styles.transactions}>
                <h3 className={styles.transactionsTitle}>Transactions</h3>

                <div className={styles.txList}>
                    {(user.transactions || []).map((tx, i) => (
                        <div key={i} className={styles.tx}>
                            <input
                                type="number"
                                className={styles.txInput}
                                value={tx.amount}
                                onChange={(e) => {
                                    const updated = [...user.transactions];
                                    updated[i] = { ...updated[i], amount: Number(e.target.value) };
                                    setUser((p) => ({ ...p, transactions: updated }));
                                }}
                                onBlur={() => commitTransactions()}
                            />

                            <input
                                type="date"
                                className={styles.txInput}
                                value={new Date(tx.date).toISOString().split("T")[0]}
                                onChange={(e) => {
                                    const updated = [...user.transactions];
                                    updated[i] = { ...updated[i], date: e.target.value };
                                    setUser((p) => ({ ...p, transactions: updated }));
                                }}
                                onBlur={() => commitTransactions()}
                                disabled={updatingTxIndex === i}
                            />

                            <input
                                type="text"
                                className={styles.txInput}
                                value={tx.account || ""}
                                placeholder="Account"
                                onChange={(e) => {
                                    const updated = [...user.transactions];
                                    updated[i] = { ...updated[i], account: e.target.value };
                                    setUser((p) => ({ ...p, transactions: updated }));
                                }}
                                onBlur={() => commitTransactions()}
                                disabled={updatingTxIndex === i}
                            />

                            <span
                                className={styles.txDeleteBtn}
                                onClick={() => deleteTransaction(i)}
                            >
                                {updatingTxIndex === i ? "Deleting…" : "Delete"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ADD TRANSACTION */}
                <div className={styles.addTx}>
                    <input
                        type="number"
                        placeholder="Amount"
                        className={styles.addTxInput}
                        value={txAmount}
                        onChange={(e) => setTxAmount(e.target.value)}
                        disabled={addingTx}
                    />

                    <input
                        type="date"
                        className={styles.addTxInput}
                        value={txDate}
                        onChange={(e) => setTxDate(e.target.value)}
                        disabled={addingTx}
                    />

                    <input
                        type="text"
                        className={styles.addTxInput}
                        placeholder="Account"
                        value={txAccount}
                        onChange={(e) => setTxAccount(e.target.value)}
                        disabled={addingTx}
                    />

                    <span
                        className={styles.addTxButton}
                        onClick={addTransaction}
                        disabled={addingTx}
                    >
                        {addingTx ? "Adding…" : "Add"}
                    </span>
                </div>
            </div>
        </div>
    );
}
