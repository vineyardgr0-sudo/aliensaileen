"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SCENARIOS, type Scenario } from "@/lib/ai/prompts";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatClient() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  function selectScenario(s: Scenario) {
    setSelectedScenario(s);
    setMessages([{
      role: "assistant",
      content: `**${s.label}** 모드입니다.\n\n${s.description}\n\nKorean을 입력하거나 질문해 보세요 — 어떤 표현이든 실제로 어떻게 들리는지 솔직하게 말해드릴게요.`,
    }]);
    setInput(s.starterPrompt);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  async function send() {
    if (!input.trim() || isLoading || !selectedScenario) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "42px";
    }

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          scenarioId: selectedScenario.id,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error ?? "API error");
      }
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreamingContent(full);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: full }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: `연결에 문제가 생겼어요: ${msg}\n\nAPI 키가 설정되어 있는지 확인해 주세요.`,
      }]);
    } finally {
      setIsLoading(false);
      setStreamingContent("");
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function handleInput(e: React.FormEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }

  // ── SCENARIO SELECT ──────────────────────────────────────────
  if (!selectedScenario) {
    return (
      <main className="min-h-screen bg-s0">
        <nav className="sticky top-0 z-50 border-b border-b-dim bg-s0/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-5 py-3 max-w-2xl mx-auto">
            <Link href="/" className="font-mono text-[9px] tracking-wider uppercase text-t300 hover:text-t100 transition-colors px-2.5 py-1.5 border border-b-mid rounded-full">
              ← Home
            </Link>
            <span className="font-syne text-[11px] font-bold tracking-[0.1em]">
              ALIEN&apos;S <span className="text-mint">AILEEN</span>
            </span>
            <Link href="/ai/tone" className="font-mono text-[9px] tracking-wider uppercase text-mint/60 hover:text-mint transition-colors">
              Tone →
            </Link>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-5 py-8">
          <div className="mb-8">
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-mint/60 mb-3">AI Conversation Mode</p>
            <h1 className="font-syne text-2xl font-extrabold leading-tight mb-3">
              Choose a situation.<br />
              <span className="text-mint">Feel the difference.</span>
            </h1>
            <p className="font-mono text-[10px] text-t300 leading-[1.75]">
              Same language. Different relationships. Completely different energy.<br />
              Pick a scenario — experience Korean the way natives actually feel it.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => selectScenario(s)}
                className="w-full text-left px-4 py-3.5 border border-b-mid rounded-xl hover:border-mint/35 hover:bg-mint/[0.025] transition-all group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl flex-shrink-0">{s.emoji}</span>
                    <div>
                      <p className="font-syne text-sm font-bold text-t100 mb-0.5">{s.label}</p>
                      <p className="font-mono text-[8.5px] text-t300">{s.description}</p>
                    </div>
                  </div>
                  <span className="text-t400 text-sm group-hover:text-mint/50 transition-colors flex-shrink-0">›</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/ai/tone" className="font-mono text-[9px] tracking-wider uppercase text-t400 hover:text-mint transition-colors">
              Or try the Tone Corrector →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── CHAT SCREEN ──────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-s0 flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-b-dim bg-s0/95 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center justify-between px-5 py-3 max-w-2xl mx-auto">
          <button
            onClick={() => { setSelectedScenario(null); setMessages([]); setStreamingContent(""); }}
            className="font-mono text-[9px] tracking-wider uppercase text-t300 hover:text-t100 transition-colors px-2.5 py-1.5 border border-b-mid rounded-full"
          >
            ← Scenarios
          </button>
          <span className="font-syne text-[11px] font-bold">
            {selectedScenario.emoji} <span className="text-mint">{selectedScenario.label}</span>
          </span>
          <span className="font-mono text-[9px] text-mint/40">Aileen</span>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full px-5 py-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-mint/15 border border-mint/25 flex items-center justify-center font-mono text-[8px] text-mint flex-shrink-0 mr-2 mt-1">
                AA
              </div>
            )}
            <div className={cn(
              "max-w-[85%] px-3.5 py-2.5 rounded-xl text-[13px] leading-[1.7]",
              msg.role === "user"
                ? "bg-mint/10 border border-mint/20 text-t100 rounded-tr-sm font-mono"
                : "bg-s2 border border-b-dim text-t100 rounded-tl-sm"
            )}>
              <MessageContent content={msg.content} />
            </div>
          </div>
        ))}

        {/* Streaming bubble */}
        {streamingContent && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-mint/15 border border-mint/25 flex items-center justify-center font-mono text-[8px] text-mint flex-shrink-0 mr-2 mt-1">
              AA
            </div>
            <div className="max-w-[85%] px-3.5 py-2.5 rounded-xl rounded-tl-sm bg-s2 border border-b-dim text-t100 text-[13px] leading-[1.7]">
              <MessageContent content={streamingContent} />
              <span className="inline-block w-0.5 h-3.5 bg-mint/70 ml-0.5 animate-pulse align-middle" />
            </div>
          </div>
        )}

        {/* Loading dots */}
        {isLoading && !streamingContent && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-mint/15 border border-mint/25 flex items-center justify-center font-mono text-[8px] text-mint flex-shrink-0 mr-2">AA</div>
            <div className="px-3.5 py-3 rounded-xl rounded-tl-sm bg-s2 border border-b-dim flex gap-1 items-center">
              {[0,1,2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-mint/50 animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-b-dim bg-s0 max-w-2xl mx-auto w-full">
        <div className="px-5 py-3 flex gap-2 items-end">
          <textarea
            ref={(el) => {
              (inputRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
              (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            onInput={handleInput}
            placeholder="Korean, English, or mix — try anything..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-s2 border border-b-mid rounded-xl px-3.5 py-2.5 font-mono text-[12px] text-t100 placeholder:text-t400 resize-none outline-none focus:border-mint/40 transition-colors leading-relaxed disabled:opacity-50"
            style={{ minHeight: "42px", maxHeight: "120px" }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-mint/15 border border-mint/30 flex items-center justify-center text-mint hover:bg-mint/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <p className="font-mono text-[8px] text-t400 text-center pb-3">Enter to send · Shift+Enter for new line</p>
      </div>
    </main>
  );
}

function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <span key={i}>
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j}>{part.slice(2, -2)}</strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
            {i < lines.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}
