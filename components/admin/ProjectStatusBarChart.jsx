"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
} from "recharts";
import styles from "./styles/ProjectStatusBarChart.module.css";
import Loader from "../user/loading";

// Simple color mapping for statuses
const statusColors = {
    pending: "#fbbf24",   // yellow
    completed: "#10b981", // green
};

export default function ProjectStatusBarChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectStats = async () => {
            try {
                const snap = await getDocs(collection(db, "projects"));
                const statusMap = {};

                snap.forEach((doc) => {
                    const statusRaw = doc.data()?.status;
                    if (!statusRaw) return;

                    const normalized = statusRaw.trim().toLowerCase();
                    if (!statusMap[normalized]) statusMap[normalized] = 0;
                    statusMap[normalized] += 1;
                });

                const chartData = Object.keys(statusMap).map((key) => ({
                    status: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize
                    count: statusMap[key],
                }));

                setData(chartData);
            } catch (err) {
                console.error("❌ Error fetching project stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectStats();
    }, []);

    if (loading) {
        return (
            <Loader />
        );
    }

    return (
        <div className={styles.cards}>
            <h2 className={styles.title}>Projects by Status</h2>
            <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="0 1" />
                        <XAxis dataKey="status" axisLine={false} tickLine={false} />
                        <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                        <Tooltip
                            formatter={(value, name, props) => [value, props.payload.status]}
                            cursor={{ fill: "rgba(0,0,0,0.05)" }}
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                fontSize: "13px",
                            }}
                        />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {data.map((entry) => (
                                <Cell
                                    key={entry.status}
                                    fill={statusColors[entry.status.toLowerCase()] || "#3b82f6"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
