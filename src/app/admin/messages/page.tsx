"use client";

import { useState, useEffect } from "react";
import { Mail, MailOpen, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) setMessages(await res.json());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function toggleRead(id: string, currentRead: boolean) {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead }),
      });
      fetchMessages();
    } catch {
      // ignore
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });
      fetchMessages();
    } catch {
      // ignore
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="font-body text-foreground/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="font-heading text-2xl text-accent mb-8 uppercase tracking-wider">
        Messages
      </h1>

      {messages.length === 0 ? (
        <p className="text-center font-body text-foreground/60 py-12">
          No messages yet.
        </p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`parchment-card ${
                !msg.read ? "border-accent/30" : ""
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {msg.read ? (
                        <MailOpen size={16} className="text-foreground/40 shrink-0" />
                      ) : (
                        <Mail size={16} className="text-accent shrink-0" />
                      )}
                      <h3
                        className={`font-heading text-base truncate ${
                          !msg.read ? "text-accent" : "text-foreground/80"
                        }`}
                      >
                        {msg.subject}
                      </h3>
                    </div>
                    <p className="text-sm font-body text-foreground/60">
                      {msg.name} &lt;{msg.email}&gt;
                    </p>
                    <p className="text-xs font-body text-foreground/40 mt-1">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleRead(msg.id, msg.read)}
                      className="p-1.5 text-foreground/60 hover:text-accent transition-colors"
                      title={msg.read ? "Mark as unread" : "Mark as read"}
                    >
                      {msg.read ? <Mail size={16} /> : <MailOpen size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-1.5 text-foreground/60 hover:text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() =>
                        setExpanded(expanded === msg.id ? null : msg.id)
                      }
                      className="p-1.5 text-foreground/60 hover:text-accent transition-colors"
                    >
                      {expanded === msg.id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {expanded === msg.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-body text-foreground/90 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <p className="mt-3 text-sm font-body text-foreground/60">
                      Reply to:{" "}
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                        className="text-accent hover:underline"
                      >
                        {msg.email}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
