"use client";

import React from "react";

const stack = [
  { name: "Next.js 16", desc: "React full-stack framework", emoji: "▲", color: "#ffffff" },
  { name: "Clerk", desc: "Authentication & user management", emoji: "🔐", color: "#7c3aed" },
  { name: "Stream Chat", desc: "Real-time messaging API", emoji: "💬", color: "#005fff" },
  { name: "Tailwind CSS", desc: "Utility-first styling", emoji: "🎨", color: "#06b6d4" },
];

export default function AboutPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--background)",
      color: "var(--foreground)",
      paddingTop: 96,
      paddingBottom: 80,
    }}>
      
      <div style={{ textAlign: "center", padding: "40px 24px 64px", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🍉</div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 16 }}>
          About MelonChat
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>
          MelonChat is a modern real-time chat platform built by developers, for developers.
          Connect through topic forums or private DMs — powered by cutting-edge infrastructure.
        </p>
      </div>

      
      <div style={{ maxWidth: 840, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {[
            { icon: "💬", title: "Real-Time Group Chat", desc: "Topic-based channels where anyone can join and chat live." },
            { icon: "📩", title: "Private DMs", desc: "One-on-one private messaging with any registered user." },
            { icon: "🔒", title: "Secure Auth", desc: "Enterprise-grade authentication and session management." },
            { icon: "⚡", title: "Instant Delivery", desc: "Messages appear instantly for all users in the channel." },
          ].map((f) => (
            <div key={f.title} className="card" style={{ padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, textAlign: "center" }}>
          Built With
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
        }}>
          {stack.map((s) => (
            <div key={s.name} className="card" style={{ padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: s.color }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
