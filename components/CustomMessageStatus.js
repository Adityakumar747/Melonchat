"use client";

import React from "react";
import { Check, CheckCheck } from "lucide-react";
import { useChatContext } from "stream-chat-react";

export const CustomMessageStatus = (props) => {
  const { message } = props;
  const { client, channel } = useChatContext();

  if (channel?.type === 'livestream') return null;


  const isMyMessage = message.user?.id === client.userID;
  if (!isMyMessage) return null;


  const readByOthers = (message.read_by || []).filter(r => r.user.id !== client.userID);
  const isRead = readByOthers.length > 0;

  const isSending = message.status === 'sending';
  const isReceived = message.status === 'received';

  return (
    <div className="message-status">
      {isSending ? (
        <span className="tick-grey" style={{ fontSize: 10, opacity: 0.8 }}>🕒</span>
      ) : isRead ? (
        <CheckCheck size={14} className="tick-blue" style={{ color: '#3b82f6' }} />
      ) : isReceived ? (
        <CheckCheck size={14} className="tick-grey" style={{ color: '#9ca3af' }} />
      ) : (
        <Check size={14} className="tick-grey" style={{ color: '#9ca3af' }} />
      )}
    </div>
  );
};
