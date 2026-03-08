"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";

const stats = [
  { label: "Active Users", value: "10K+" },
  { label: "Messages Sent", value: "5M+" },
  { label: "Topics", value: "50+" },
];

const MelonLogo = ({ size = "1em" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ 
      marginLeft: 20, 
      verticalAlign: 'middle', 
      display: 'inline-block', 
      marginBottom: '0.1em',
      transform: 'scaleX(-1)'
    }}
  >
    <path d="M26.7 5.3L5.3 26.7C10.7 30.7 21.3 30.7 26.7 25.3C32 20 32 9.3 26.7 5.3Z" fill="#22C55E" />
    <path d="M25 7L7 25C11.5 28.5 20.5 28.5 25 24C29.5 19.5 29.5 10.5 25 7Z" fill="#ff4d4d" />
    <circle cx="18" cy="22" r="1.2" fill="#222" />
    <circle cx="22" cy="18" r="1.2" fill="#222" />
    <circle cx="23" cy="23" r="1.2" fill="#222" />
  </svg>
);

const features = [
  {
    icon: "⚡",
    title: "Real-Time Messaging",
    desc: "Zero-latency messages powered by Stream. Every message appears instantly for all participants.",
    color: "#f59e0b",
  },
  {
    icon: "🔒",
    title: "Secure Authentication",
    desc: "Enterprise-grade auth with Clerk. Your identity and conversations stay private.",
    color: "#6366f1",
  },
  {
    icon: "💬",
    title: "Group Forum Channels",
    desc: "Join topic-based channels — Python, AI, DevOps and more. Connect with communities.",
    color: "#22c55e",
  },
  {
    icon: "📩",
    title: "Private DMs",
    desc: "Send direct messages to any user, privately. One-on-one conversations, anytime.",
    color: "#ec4899",
  },
  {
    icon: "🌎",
    title: "Works Everywhere",
    desc: "Fully responsive. Chat from your phone, tablet, or desktop without compromise.",
    color: "#06b6d4",
  },
  {
    icon: "🚀",
    title: "Blazing Fast",
    desc: "Built on Next.js 16 and React 19. Instant page loads, smooth transitions.",
    color: "#f97316",
  },
];

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main style={{ background: "var(--background)", minHeight: "100vh", overflowX: "hidden" }}>

      
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        position: "relative",
      }}>
        
        <div style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700, height: 400,
          background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "var(--accent-glow)",
          border: "1px solid var(--border)",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: 32,
          fontSize: 13,
          color: "var(--accent)",
          fontWeight: 600,
        }}>
          <div className="online-dot online-dot-pulse" style={{ width: 8, height: 8 }}></div>
          Real-time chat — now live
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 7vw, 84px)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-3px",
          marginBottom: 24,
          maxWidth: 900,
          color: "var(--foreground)"
        }}>
          Chat Smarter with{" "}
          <span className="gradient-text">MelonChat</span>
          <MelonLogo />
        </h1>

        <p style={{
          fontSize: 18, color: "var(--muted)",
          maxWidth: 600, lineHeight: 1.7, marginBottom: 44,
        }}>
          A premium real-time messaging platform built for modern communities.
          Secure, lighting-fast, and elegantly designed for your workflow.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {isSignedIn ? (
            <>
              <button
                className="btn-primary"
                onClick={() => router.push("/forum")}
                style={{ fontSize: 16, padding: "14px 36px" }}
              >
                Enter Forum
              </button>
              <button
                className="btn-outline"
                onClick={() => router.push("/userchat")}
                style={{ fontSize: 16, padding: "14px 36px" }}
              >
                Direct Messages
              </button>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="btn-primary" style={{ fontSize: 16, padding: "14px 36px" }}>
                  Join the Community
                </button>
              </SignInButton>
              <Link href="/forum" style={{ textDecoration: "none" }}>
                <button className="btn-outline" style={{ fontSize: 16, padding: "14px 36px" }}>
                  Explore Topics
                </button>
              </Link>
            </>
          )}
        </div>

        
        <div style={{
          display: "flex", gap: 64, marginTop: 96,
          flexWrap: "wrap", justifyContent: "center"
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "var(--foreground)" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      
      <div className="glow-line" style={{ maxWidth: 1000, margin: "0 auto", opacity: 0.2 }} />

      
      <section style={{ padding: "120px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
            Premium Features
          </p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-2px", color: "var(--foreground)" }}>
            Everything you need
          </h2>
          <p style={{ color: "var(--muted)", marginTop: 16, fontSize: 18, maxWidth: 600, margin: "16px auto 0" }}>
            The power of Stream Chat combined with Clerk Auth and Next.js 16.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}>
          {features.map((f) => (
            <div key={f.title} className="card" style={{ padding: 40, background: "var(--surface)" }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: `${f.color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, marginBottom: 24,
                border: `1px solid ${f.color}25`
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 12, color: "var(--foreground)" }}>{f.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section style={{ padding: "0 24px 120px", textAlign: "center" }}>
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 32,
          padding: "96px 32px",
          maxWidth: 900,
          margin: "0 auto",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", bottom: "-50%", right: "-20%",
            width: 400, height: 400,
            background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
            pointerEvents: "none", opacity: 0.5
          }} />

          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, marginBottom: 20, letterSpacing: "-2px" }}>
            Ready to jump in? 🚀
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 48, fontSize: 18, maxWidth: 480, margin: "0 auto 48px" }}>
            Join the conversation. Secure, real-time, and built for everyone.
          </p>
          {isSignedIn ? (
            <button
              className="btn-primary"
              onClick={() => router.push("/forum")}
              style={{ fontSize: 16, padding: "16px 48px" }}
            >
              Back to Forum
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="btn-primary" style={{ fontSize: 16, padding: "16px 48px" }}>
                Create Free Account
              </button>
            </SignInButton>
          )}
        </div>
      </section>

    </main>
  );
}