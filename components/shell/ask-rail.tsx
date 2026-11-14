"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Send, X } from "lucide-react";

import { ASK_API_URL } from "@/lib/ask-api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Source {
  title: string;
  url: string;
  snippet: string;
}

interface ChatResponse {
  answer?: string;
  sources?: Source[];
  retrieval_only?: boolean;
}

export function AskRail({ onCloseAction }: { onCloseAction: () => void }) {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"online" | "offline" | "unknown">("unknown");
  const [templatesVisible, setTemplatesVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch(`${ASK_API_URL}/health`, { signal: AbortSignal.timeout(3000) });
        if (!cancelled) setApiStatus(res.ok ? "online" : "offline");
      } catch {
        if (!cancelled) setApiStatus("offline");
      }
    };
    check();
    const timer = setInterval(check, 15000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const submit = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;

    setMessages((m) => [...m, { role: "user", content: q }]);
    setValue("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${ASK_API_URL}/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      if (!response.ok) throw new Error(`server responded ${response.status}`);
      const data = (await response.json()) as ChatResponse;

      if (data.retrieval_only) {
        if (data.answer) {
          setMessages((m) => [...m, { role: "assistant", content: data.answer ?? "" }]);
        }
      } else {
        if (data.answer) {
          setMessages((m) => [...m, { role: "assistant", content: data.answer ?? "" }]);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "request failed — is the ask service running?");
    } finally {
      setLoading(false);
      scrollIntoView();
    }
  };

  const handleForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await submit(value);
  };

  const statusColor =
    apiStatus === "online"
      ? "var(--green)"
      : apiStatus === "offline"
        ? "var(--red)"
        : "var(--comment)";

  const templates = [
    "What projects has Rohmad built?",
    "Where does he work now?",
    "What's his experience with Kubernetes?",
    "Tell me about the unified login system",
  ];

  return (
    <aside className="ask-rail" aria-label="Ask">
      <div className="rail-header">
        <span className="rail-label">ask</span>
        <div className="rail-status">
          <span className="rail-status-dot" style={{ color: statusColor }} />
          <span className="rail-status-text" style={{ color: statusColor }}>
            {apiStatus}
          </span>
        </div>
        <button
          className="rail-close"
          onClick={onCloseAction}
          aria-label="Close ask panel"
          type="button"
        >
          <X size={14} strokeWidth={1.8} />
        </button>
      </div>

      <div className="ask-messages" role="log" aria-label="Conversation">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`ask-message ${message.role === "user" ? "ask-message-user" : "ask-message-assistant"}`}
          >
            <div className="ask-bubble">{renderMessage(message.content)}</div>
          </div>
        ))}
        {error && (
          <div className="ask-message ask-message-assistant">
            <div className="ask-bubble ask-bubble-error">{error}</div>
          </div>
        )}
        {loading && (
          <div className="ask-message ask-message-assistant">
            <div className="ask-bubble">
              <span className="ask-thinking">
                Thinking<span className="ask-thinking-dots">…</span>
              </span>
            </div>
          </div>
        )}
        {templatesVisible && messages.length === 0 && (
          <div className="ask-templates">
            <span className="ask-template-label">try asking:</span>
            <div className="ask-template-list">
              {templates.map((t) => (
                <button
                  className="ask-template"
                  key={t}
                  onClick={() => {
                    setTemplatesVisible(false);
                    submit(t);
                  }}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="ask-form" onSubmit={handleForm}>
        <div className="ask-input-wrap">
          <input
            className="ask-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask about the site…"
            disabled={loading}
          />
          <button
            className="ask-send"
            disabled={loading || !value.trim()}
            type="submit"
            aria-label="Send"
          >
            <Send size={13} />
          </button>
        </div>
        <div className="ask-hint">
          <ArrowRight size={11} />
          <span>static corpus · optional LLM</span>
        </div>
      </form>
    </aside>
  );
}

function renderMessage(content: string): React.ReactNode {
  const lines = content.split("\n");
  return (
    <div className="ask-content">
      {lines.map((line, index) => (
        <div key={index} className="ask-line">
          {renderInline(line)}
        </div>
      ))}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  const chunks = text.split(/(\[[^\]]+\]\([^)]+\))/);
  return (
    <>
      {chunks.map((chunk, index) => {
        const match = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <span key={index}>{chunk}</span>;
        return (
          <a
            key={index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="ask-link"
          >
            {match[1]}
          </a>
        );
      })}
    </>
  );
}
