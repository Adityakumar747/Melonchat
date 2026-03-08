"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--background)",
      color: "var(--foreground)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 32,
      paddingTop: 96,
    }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🍉</div>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>About MelonChat</h1>
      <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
        MelonChat is a modern real-time chat platform built with Next.js, Clerk, and Stream.
        Connect with anyone through group forums or private one-on-one messages.
      </p>
      <Link href="/contact" style={{ textDecoration: "none" }}>
        <button className="btn-primary">
          Learn More
        </button>
      </Link>
    </div>
  );
}
