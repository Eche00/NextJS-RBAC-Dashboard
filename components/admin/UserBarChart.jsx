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
import styles from "./styles/UserBarChart.module.css";
import Loader from "../user/loading";

// Gender colors
const genderColors = {
  male: "#3b82f6",   // blue
  female: "#ec4899", // pink
};

export default function UserBarChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenderStats = async () => {
      try {
        const snap = await getDocs(collection(db, "geeks"));

        const genderMap = {};

        snap.forEach((doc) => {
          const genderRaw = doc.data()?.gender;
          if (!genderRaw) return;
          const normalized = genderRaw.trim().toLowerCase();
          if (!genderMap[normalized]) genderMap[normalized] = 0;
          genderMap[normalized] += 1;
        });

        const chartData = Object.keys(genderMap).map((key) => ({
          gender: key.charAt(0).toUpperCase() + key.slice(1),
          count: genderMap[key],
        }));

        setData(chartData);
      } catch (err) {
        console.error("❌ Error fetching gender stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenderStats();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className={styles.cards}>
      <h2 className={styles.title}>Users by Gender</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="0 1" />
            <XAxis dataKey="gender" axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value, name, props) => [value, props.payload.gender]}
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
                  key={entry.gender}
                  fill={genderColors[entry.gender.toLowerCase()] || "#3b82f6"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
