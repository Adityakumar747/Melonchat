"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { getStreamClient } from "@/lib/stream";
import { 
  Search, User, MessageCircle, MoreVertical, 
  ArrowLeft, MessageSquare, Hash 
} from "lucide-react";
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

export default function UserChatPage() {
  const { user, isLoaded } = useUser();
  const { theme, resolvedTheme } = useTheme();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingChannel, setLoadingChannel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [typingUsers, setTypingUsers] = useState([]);

  const currentTheme = resolvedTheme === 'dark' ? 'str-chat__theme-dark' : 'str-chat__theme-light';

  
  const initClient = useCallback(async () => {
    if (!user) return;
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
      setChatClient(client);
    } catch (err) {
      console.error("Stream init error:", err);
    }
  }, [user]);

  
  const fetchUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to load users");
      const list = await res.json();
      
      setUsers(Array.isArray(list) ? list : (list.users || []));
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && user) {
      initClient();
      fetchUsers();
    }
  }, [isLoaded, user, initClient, fetchUsers]);

  
  useEffect(() => {
    if (!channel) return;
    
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
      
      
      if (channel && event.user?.id !== user?.id) {
         channel.markRead();
      }
    };

    channel.on('typing.start', handleTyping);
    channel.on('typing.stop', handleTyping);
    channel.on('message.new', handleNewMessage);

    return () => {
       channel.off('typing.start', handleTyping);
       channel.off('typing.stop', handleTyping);
       channel.off('message.new', handleNewMessage);
    };
  }, [channel, user?.id]);

  const typingText = useMemo(() => {
    if (typingUsers.length === 0) return null;
    return "Typing...";
  }, [typingUsers]);

  
  const openDM = useCallback(async (targetUser) => {
    if (!chatClient || !user) return;
    setSelectedUser(targetUser);
    setLoadingChannel(true);
    setChannel(null);
    setTypingUsers([]);

    try {
      
      await fetch("/api/stream/upsert-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: targetUser.id }),
      });

      
      const dmChannel = chatClient.channel("messaging", {
        members: [user.id, targetUser.id],
      });
      await dmChannel.watch({ presence: true, state: true });
      await dmChannel.markRead();
      setChannel(dmChannel);
      if (window.innerWidth < 1024) setSidebarOpen(false);
    } catch (err) {
      console.error("DM connect error:", err);
    } finally {
      setLoadingChannel(false);
    }
  }, [chatClient, user]);

  const filteredUsers = users.filter((u) =>
    (u.fullName || u.firstName || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoaded || !chatClient) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LoadingIndicator />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--background)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>💬</div>
        <h1 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12 }}>Direct Messaging</h1>
        <p style={{ color: "var(--muted)", fontSize: 18, marginBottom: 40, maxWidth: 500, lineHeight: 1.6 }}>
          Sign in to start private conversations with anyone in the MelonChat community.
        </p>
        <SignInButton mode="modal"><button className="btn-primary" style={{ padding: "16px 40px", fontSize: 16 }}>Start Chatting</button></SignInButton>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", background: "var(--background)", display: "flex", overflow: "hidden", paddingTop: 72 }}>
      
      
      <aside style={{
        width: sidebarOpen ? 340 : 0,
        minWidth: sidebarOpen ? 340 : 0,
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        overflow: "hidden",
        position: "relative",
        zIndex: 20,
      }}>
        <div style={{ padding: "24px", borderBottom: "1px solid var(--border)" }}>
           <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
             <MessageCircle size={24} color="var(--accent)" /> Messages
           </h2>
           <div style={{ position: "relative" }}>
             <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
             <input
               type="text"
               placeholder="Search contacts..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               style={{
                 width: "100%", padding: "10px 12px 10px 40px", borderRadius: "10px",
                 background: "var(--surface-2)", border: "1px solid var(--border)",
                 color: "var(--foreground)", fontSize: 13, outline: "none"
               }}
             />
           </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
          {loadingUsers ? (
            <div style={{ padding: 20, textAlign: "center" }}><LoadingIndicator /></div>
          ) : filteredUsers.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--muted)", fontSize: 14 }}>No users found</div>
          ) : (
            filteredUsers.map((u) => {
              const active = selectedUser?.id === u.id;
              const isOnline = chatClient.state.users[u.id]?.online || false;
              return (
                <div
                  key={u.id}
                  onClick={() => openDM(u)}
                  style={{
                    padding: "10px 12px", borderRadius: "12px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12, marginBottom: 4,
                    background: active ? "var(--accent-glow)" : "transparent",
                    transition: "all 0.2s ease",
                    border: active ? "1px solid var(--border)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-2)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ position: "relative" }}>
                    {u.imageUrl ? (
                      <img src={u.imageUrl} alt="" style={{ width: 44, height: 44, borderRadius: "12px", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: "12px", background: "var(--surface-3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <User size={20} color="var(--muted)" />
                      </div>
                    )}
                    {isOnline && (
                      <div className="online-dot online-dot-pulse" style={{ position: "absolute", right: -2, bottom: -2, border: "2px solid var(--surface)" }} />
                    )}
                  </div>
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: active ? "var(--accent)" : "var(--foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {u.fullName || u.firstName || "User"}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{isOnline ? "Online now" : "Offline"}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>

      
      <main style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
        
        {!sidebarOpen && (
          <button
             onClick={() => setSidebarOpen(true)}
             style={{
               position: "absolute", left: 16, top: 16, zIndex: 30,
               background: "var(--surface)", border: "1px solid var(--border)",
               color: "var(--foreground)", padding: 8, borderRadius: 10, cursor: "pointer"
             }}
          >
            <ArrowLeft size={18} />
          </button>
        )}

        {loadingChannel ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <LoadingIndicator />
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Connecting...</p>
          </div>
        ) : !channel ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "24px", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
               <MessageSquare size={40} color="var(--accent)" />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Your Conversations</h2>
            <p style={{ color: "var(--muted)", fontSize: 15, maxWidth: 360 }}>Select a contact to start a private message.</p>
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
            
            <div style={{ padding: "16px 32px", background: "var(--surface)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
               <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                 <img src={selectedUser?.imageUrl} alt="" style={{ width: 40, height: 40, borderRadius: "10px", objectFit: "cover" }} />
                 <div>
                    <h3 style={{ fontWeight: 700, fontSize: 16 }}>{selectedUser?.fullName || selectedUser?.firstName}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: typingText ? "var(--accent)" : "var(--muted)", fontWeight: typingText ? 700 : 400 }}>
                       {typingText ? (
                         <>
                           <div className="online-dot online-dot-pulse" style={{ width: 6, height: 6 }} />
                           {typingText}
                         </>
                       ) : (
                         <>
                           <Hash size={12} /> Direct Message
                         </>
                       )}
                    </div>
                 </div>
               </div>
               <button style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer" }}><MoreVertical size={20} /></button>
            </div>

            
            <div style={{ flex: 1, overflow: "hidden" }}>
              <Chat client={chatClient} theme={currentTheme}>
                <Channel channel={channel}>
                  <Window>
                    <MessageList MessageStatus={CustomMessageStatus} />
                    <TypingIndicator />
                    <MessageInput focus />
                  </Window>
                </Channel>
              </Chat>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
