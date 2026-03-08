"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { getStreamClient } from "@/lib/stream";
import { Users, Info, ArrowLeft, MessageSquare, ShieldCheck } from "lucide-react";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  TypingIndicator,
  LoadingIndicator,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { CustomMessageStatus } from "@/components/CustomMessageStatus";

const topicMeta = {
  python: { emoji: "🐍", color: "#3b82f6", label: "Python", desc: "For all things Python — from basics to advanced frameworks." },
  javascript: { emoji: "⚡", color: "#f59e0b", label: "JavaScript", desc: "Modern JS web development, Node.js, and ecosystems." },
  "ai-machine-learning": { emoji: "🤖", color: "#8b5cf6", label: "AI & ML", desc: "Machine learning models, neural networks, and future tech." },
  "web-development": { emoji: "🌐", color: "#22c55e", label: "Full-Stack Dev", desc: "Modern frontend, design systems, and backend tools." },
  "cyber-security": { emoji: "🛡️", color: "#ef4444", label: "CyberSecurity", desc: "Infosec, ethical hacking, and digital protection." },
  devops: { emoji: "☁️", color: "#06b6d4", label: "DevOps", desc: "Cloud computing, CI/CD, and infra automation." },
};

export default function TopicPage() {
  const { user, isLoaded } = useUser();
  const { topic } = useParams();
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const [channel, setChannel] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ members: 0, online: 0 });
  const [typingUsers, setTypingUsers] = useState([]);

  const currentTheme = resolvedTheme === 'dark' ? 'str-chat__theme-dark' : 'str-chat__theme-light';
  const meta = useMemo(() => topicMeta[topic] || { emoji: "💬", color: "#3b82f6", label: topic, desc: "Community discussion group." }, [topic]);

  const connectChat = useCallback(async () => {
    if (!isLoaded || !user) return;
    setError(null);

    try {
      const client = getStreamClient();

      if (!client.userID || client.userID !== user.id) {
        if (client.userID) await client.disconnectUser();
        const res = await fetch("/api/stream-token");
        if (!res.ok) throw new Error("Failed to get chat token");
        const { token } = await res.json();

        await client.connectUser(
          {
            id: user.id,
            name: user.fullName || user.firstName || "User",
            image: user.imageUrl,
          },
          token
        );
      }

      const newChannel = client.channel("livestream", `forum-${topic}`, {
        name: meta.label,
        image: meta.emoji,
      });
      
      await newChannel.watch({ presence: true });
      
      
      setStats({
        members: newChannel.data?.member_count || 2, 
        online: newChannel.state.watcher_count || 1,
      });

      setChatClient(client);
      setChannel(newChannel);
    } catch (err) {
      console.error("Chat connection error:", err);
      setError(err.message || "Failed to connect to chat");
    }
  }, [user, isLoaded, topic, meta]);

  useEffect(() => {
    connectChat();
  }, [connectChat]);

  
  useEffect(() => {
    if (!channel) return;
    
    const handleStats = () => {
       setStats({
         members: channel.data?.member_count || 2,
         online: channel.state.watcher_count || 1,
       });
    };

    const handleTyping = (event) => {
      if (!event.user || event.user.id === user?.id) return;
      
      if (event.type === 'typing.start') {
        setTypingUsers(prev => {
          if (prev.find(u => u.id === event.user.id)) return prev;
          return [...prev, event.user];
        });
      } else {
        setTypingUsers(prev => prev.filter(u => u.id !== event.user.id));
      }
    };

    const handleNewMessage = (event) => {
      
      if (event.user?.id) {
        setTypingUsers(prev => prev.filter(u => u.id !== event.user.id));
      }
      
      channel.markRead();
    };

    channel.on('user.watching.start', handleStats);
    channel.on('user.watching.stop', handleStats);
    channel.on('member.added', handleStats);
    channel.on('member.removed', handleStats);
    channel.on('typing.start', handleTyping);
    channel.on('typing.stop', handleTyping);
    channel.on('message.new', handleNewMessage);

    return () => {
       channel.off('user.watching.start', handleStats);
       channel.off('user.watching.stop', handleStats);
       channel.off('member.added', handleStats);
       channel.off('member.removed', handleStats);
       channel.off('typing.start', handleTyping);
       channel.off('typing.stop', handleTyping);
       channel.off('message.new', handleNewMessage);
    };
  }, [channel, user?.id]);

  const typingText = useMemo(() => {
    if (typingUsers.length === 0) return null;
    if (typingUsers.length === 1) return `${typingUsers[0].name || "Someone"} is typing...`;
    if (typingUsers.length === 2) return `${typingUsers[0].name} and ${typingUsers[1].name} are typing...`;
    return "Several people are typing...";
  }, [typingUsers]);

  if (!isLoaded) return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><LoadingIndicator /></div>;

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--background)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>{meta.emoji}</div>
        <h1 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12 }}>Join the {meta.label} community</h1>
        <p style={{ color: "var(--muted)", fontSize: 18, marginBottom: 40, maxWidth: 500, lineHeight: 1.6 }}>{meta.desc}</p>
        <SignInButton mode="modal"><button className="btn-primary" style={{ padding: "16px 40px", fontSize: 16 }}>Get Started Free</button></SignInButton>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--background)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
        <div style={{ width: 64, height: 64, background: "var(--surface-2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: 32 }}>⚠️</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Connection Lost</h2>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>{error}</p>
        <button className="btn-primary" onClick={connectChat}>Reconnect Now</button>
      </div>
    );
  }

  if (!channel || !chatClient) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <LoadingIndicator />
        <p style={{ color: "var(--muted)", fontSize: 14 }}>Entering {meta.label} space...</p>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", background: "var(--background)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      
      <header style={{
        padding: "12px 32px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 72,
        height: 64, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => router.push("/forum")} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", padding: 4, borderRadius: 8 }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'} onMouseLeave={e => e.currentTarget.style.background = 'none'}><ArrowLeft size={20} /></button>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${meta.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{meta.emoji}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1 style={{ fontWeight: 800, fontSize: 16 }}>{meta.label}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "var(--surface-2)", padding: "2px 8px", borderRadius: 100, fontSize: 11, color: "var(--muted)", fontWeight: 600 }}><ShieldCheck size={12} color="#10b981" /> Verified</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 2 }}>
              {typingText ? (
                <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, fontStyle: "italic", display: "flex", alignItems: "center", gap: 6 }}>
                  <div className="online-dot online-dot-pulse" style={{ width: 6, height: 6 }} />
                  {typingText}
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--muted)" }}><div className="online-dot online-dot-pulse" style={{ width: 8, height: 8 }} /> {stats.online} active</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--muted)" }}><Users size={12} /> {stats.members} members</div>
                </>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
           <button style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer" }} title="Topic Info"><Info size={20} /></button>
        </div>
      </header>

      
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
        <Chat client={chatClient} theme={currentTheme}>
          <Channel channel={channel}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "calc(100vh - 136px)" }}>
               <Window>
                 <MessageList MessageStatus={CustomMessageStatus} />
                 <TypingIndicator />
                 <MessageInput focus />
               </Window>
            </div>
          </Channel>
        </Chat>
      </div>
    </div>
  );
}