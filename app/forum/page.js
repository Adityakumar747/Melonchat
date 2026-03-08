"use client";

import React from "react";
import Link from "next/link";

const topics = [
  {
    text: "Python",
    emoji: "🐍",
    desc: "Discuss Python programming, libraries, and best practices.",
    color: "#3b82f6",
    members: "2.4K",
  },
  {
    text: "JavaScript",
    emoji: "⚡",
    desc: "Talk about JavaScript, frameworks, and web development.",
    color: "#f59e0b",
    members: "3.1K",
  },
  {
    text: "AI & Machine Learning",
    emoji: "🤖",
    desc: "Explore AI, ML, deep learning, and model architectures.",
    color: "#8b5cf6",
    members: "1.8K",
  },
  {
    text: "Web Development",
    emoji: "🌐",
    desc: "Frontend, backend, and full-stack development discussions.",
    color: "#22c55e",
    members: "2.9K",
  },
  {
    text: "Cyber Security",
    emoji: "🛡️",
    desc: "Learn about hacking, security tools, and protection strategies.",
    color: "#ef4444",
    members: "980",
  },
  {
    text: "DevOps",
    emoji: "☁️",
    desc: "Discuss cloud, CI/CD, Docker, Kubernetes and automation.",
    color: "#06b6d4",
    members: "1.2K",
  },
];

const Forum = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--background)",
      color: "var(--foreground)",
      paddingTop: 96,
      paddingBottom: 80,
    }}>

      <div style={{ textAlign: "center", padding: "40px 24px 60px", maxWidth: 600, margin: "0 auto" }}>
        <p style={{
          color: "var(--accent)", fontWeight: 600, fontSize: 12,
          letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 12
        }}>
          Community
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 16 }}>
          MelonChat Forum 🍉
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7 }}>
          Join real-time topic channels. Chat with developers and learners from around the world.
        </p>
      </div>

      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20,
      }}>
        {topics.map((topic) => {
          const slug = topic.text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
          return (
            <div
              key={topic.text}
              className="card"
              style={{
                padding: 32,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: `${topic.color}15`,
                  border: `1px solid ${topic.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28,
                }}>
                  {topic.emoji}
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{topic.text}</h2>
                  <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                    <div className="online-dot online-dot-pulse" style={{ width: 8, height: 8 }} />
                    {topic.members} online
                  </div>
                </div>
              </div>

              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, flex: 1 }}>
                {topic.desc}
              </p>

              <Link href={`/forum/${slug}`} style={{ textDecoration: "none" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 12,
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "var(--accent-glow)";
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--surface-2)";
                    e.currentTarget.style.color = "var(--foreground)";
                  }}
                >
                  Join Discussion
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forum;