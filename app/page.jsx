"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/user/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faUsers, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.push("/dashboard");
  }, [user, loading, router]);

  if (loading) return <Loader />;
  if (user) return null;

  const cards = [
    { icon: faBriefcase, title: "Find Jobs Easily", desc: "Search and apply for jobs across Africa with just a few clicks.", color: "#8b5cf6" },
    { icon: faUsers, title: "Build Your Network", desc: "Connect with professionals, mentors, and industry leaders.", color: "#f97316" },
    { icon: faGraduationCap, title: "Upskill & Learn", desc: "Discover courses and resources to boost your career growth.", color: "#10b981" },
  ];

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Welcome to Local Africa LinkedIn 🌍</h1>
      <p style={{ marginBottom: "50px", fontSize: "1.2rem", color: "#555" }}>
        Discover jobs, courses, and connect with professionals across Africa.
      </p>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              flex: "1 1 250px",
              padding: "30px 20px",
              borderRadius: "16px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              background: "#111827",
              color: "#fff",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            className="home-card"
          >
            <FontAwesomeIcon
              icon={card.icon}
              style={{
                fontSize: "36px",
                marginBottom: "20px",
                color: card.color,
              }}
            />
            <h3 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>{card.title}</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.4" }}>{card.desc}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .home-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
