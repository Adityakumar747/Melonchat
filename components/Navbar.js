"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/forum", label: "Forum" },
  { href: "/userchat", label: "Messages" },
  { href: "/contact", label: "About" },
];

const MelonLogo = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'scaleX(-1)' }}
  >
    <path d="M26.7 5.3L5.3 26.7C10.7 30.7 21.3 30.7 26.7 25.3C32 20 32 9.3 26.7 5.3Z" fill="#22C55E" />
    <path d="M25 7L7 25C11.5 28.5 20.5 28.5 25 24C29.5 19.5 29.5 10.5 25 7Z" fill="#ff4d4d" />
    <circle cx="18" cy="22" r="1" fill="#222" />
    <circle cx="22" cy="18" r="1" fill="#222" />
    <circle cx="23" cy="23" r="1" fill="#222" />
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled
          ? "var(--background)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

          
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(59,130,246,0.3)"
            }}><MelonLogo /></div>
            <span style={{ fontWeight: 800, fontSize: 20, color: "var(--foreground)", letterSpacing: "-0.5px" }}>
              MelonChat
            </span>
          </Link>

          
          <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="desktop-nav">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                    color: active ? "var(--accent)" : "var(--muted)",
                    background: active ? "var(--accent-glow)" : "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    border: active ? "1px solid var(--border)" : "1px solid transparent",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.color = "var(--foreground)";
                      e.currentTarget.style.background = "var(--surface)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.color = "var(--muted)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          
          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="desktop-nav">
            <ThemeToggle />
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="btn-primary" style={{ fontSize: 14, padding: "10px 24px" }}>
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          
          <div className="mobile-menu-btn" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "var(--surface)", border: "1px solid var(--border)", cursor: "pointer",
                color: "var(--foreground)", padding: 8, borderRadius: 10,
                fontSize: 24, lineHeight: 1, width: 44, height: 44
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      
      <div style={{
        overflow: "hidden",
        maxHeight: menuOpen ? 400 : 0,
        transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "var(--background)",
        borderTop: menuOpen ? "1px solid var(--border)" : "none",
      }}>
        <div style={{ padding: "16px 24px 32px" }}>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "16px",
                  borderRadius: 12,
                  marginBottom: 8,
                  fontSize: 16,
                  fontWeight: active ? 700 : 500,
                  color: active ? "var(--accent)" : "var(--foreground)",
                  background: active ? "var(--accent-glow)" : "var(--surface)",
                  textDecoration: "none",
                  border: active ? "1px solid var(--border)" : "1px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div style={{ marginTop: 16 }}>
            {isSignedIn ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "16px" }}>
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 859px) { .desktop-nav { display: none !important; } }
      `}</style>
    </nav>
  );
}