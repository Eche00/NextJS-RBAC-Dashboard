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
import styles from "./styles/UserRankBarChart.module.css";
import Loader from "../user/loading";

// Generate unlimited colors dynamically
const generateColor = (index, total) => {
  const hue = (index * 360) / total;
  return `hsl(${hue}, 70%, 50%)`;
};

export default function UserRankBarChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankStats = async () => {
      try {
        const snap = await getDocs(collection(db, "geeks"));
        const rankMap = {};

        snap.forEach((doc) => {
          const rankRaw = doc.data()?.rank;
          if (!rankRaw) return;

          const normalized = rankRaw.trim().toLowerCase();

          if (!rankMap[normalized]) {
            const displayName = rankRaw
              .trim()
              .toLowerCase()
              .split(" ")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ");

            rankMap[normalized] = {
              name: displayName,
              users: 0,
            };
          }

          rankMap[normalized].users += 1;
        });

        // Sort alphabetically by rank name
        const sorted = Object.values(rankMap).sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setData(sorted);
      } catch (err) {
        console.error("❌ Error fetching rank stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRankStats();
  }, []);

  if (loading) {
    return (
     <Loader />
    );
  }

  return (
    <div className={styles.cards}>
      <h2 className={styles.title}>Users by Rank</h2>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            {/* Hide X-axis labels */}
            <XAxis dataKey="name" tick={false} axisLine={false} />

            <YAxis allowDecimals={false} />

            {/* Tooltip shows rank name + count */}
            <Tooltip
              formatter={(value, name, props) => [
                value,
                props.payload.name,
              ]}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "13px",
              }}
            />

            <Bar dataKey="users" radius={[6, 6, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={generateColor(index, data.length)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
