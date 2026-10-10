"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import {
  Send, RefreshCw, Copy, Check, Sparkles, User, ChevronRight,
  GitFork, Link2, Code2, Download, Layers, Award,
  Volume2, VolumeX, Terminal, ExternalLink
} from "lucide-react";
import { PROFILE } from "@/data/profile";
import DossierDrawer from "./DossierDrawer";
import { soundManager } from "@/utils/sound";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: Date;
};

const INITIAL_MSG: Message = {
  id: "init",
  role: "assistant",
  content: `Hey there! 👋 I'm Sundram's AI Portfolio Assistant.

I'm trained exclusively on **Sundram Singhal's** professional profile — his engineering journey, projects, skills, and career story.

Ask me anything about him — whether you're a **recruiter, hiring manager, or fellow engineer**. I'm here to give you real, detailed answers.

Some things I can tell you:
- 🛡️ How **ZeroMesh-UPI** handles offline payments without double-spending
- ☁️ His hands-on **AWS CI/CD pipeline** experience
- ⚡ Why he's a strong fit as a **Backend Developer / SDE-1 hire**
- 📊 His **DSA track record** and academic achievements

💡 *Pro-tip:* Press \`Ctrl + K\` to open Recruiter Dossier, or type \`/help\` for terminal commands.`,
  ts: new Date(),
};

const SLASH_COMMANDS = [
  { cmd: "/resume", desc: "Download & view full PDF resume" },
  { cmd: "/dossier", desc: "Open recruiter slide-over (Ctrl+K)" },
  { cmd: "/projects", desc: "ZeroMesh-UPI & WanderLust overview" },
  { cmd: "/skills", desc: "Backend, Cloud & Database stack" },
  { cmd: "/dsa", desc: "GFG Rank #3 & LeetCode track record" },
  { cmd: "/clear", desc: "Reset conversation history" },
  { cmd: "/help", desc: "List all terminal commands" },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"emerald" | "amber" | "violet">("emerald");
  const [soundMuted, setSoundMuted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const THEME_VARS: Record<string, Record<string, string>> = {
    emerald: {
      "--bg-primary": "#080C14",
      "--bg-secondary": "#0D1421",
      "--bg-card": "rgba(13, 20, 33, 0.8)",
      "--border-glow": "rgba(0, 255, 136, 0.2)",
      "--accent-green": "#00ff88",
      "--accent-cyan": "#00d4ff",
      "--accent-purple": "#7c3aed",
    },
    amber: {
      "--bg-primary": "#0f0c08",
      "--bg-secondary": "#1a140d",
      "--bg-card": "rgba(26, 20, 13, 0.8)",
      "--border-glow": "rgba(251, 191, 36, 0.25)",
      "--accent-green": "#fbbf24",
      "--accent-cyan": "#f59e0b",
      "--accent-purple": "#d97706",
    },
    violet: {
      "--bg-primary": "#0c0814",
      "--bg-secondary": "#140d21",
      "--bg-card": "rgba(20, 13, 33, 0.8)",
      "--border-glow": "rgba(168, 85, 247, 0.25)",
      "--accent-green": "#c084fc",
      "--accent-cyan": "#38bdf8",
      "--accent-purple": "#a855f7",
    },
  };

  const changeTheme = (newTheme: "emerald" | "amber" | "violet") => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
    if (THEME_VARS[newTheme]) {
      Object.entries(THEME_VARS[newTheme]).forEach(([k, v]) => {
        document.documentElement.style.setProperty(k, v);
      });
    }
    window.dispatchEvent(new CustomEvent("themeChange", { detail: newTheme }));
    soundManager.playSwoosh();
  };

  const toggleSound = () => {
    const next = soundManager.toggleMuted();
    setSoundMuted(next);
  };

  useEffect(() => {
    setMounted(true);
    setSoundMuted(soundManager.isMuted());
  }, []);

  // Global Keyboard Shortcuts (Ctrl+K, /, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Dossier on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setDrawerOpen((prev) => {
          const next = !prev;
          if (next) soundManager.playSwoosh();
          else soundManager.playBlip();
          return next;
        });
        return;
      }

      // Focus input on '/' key when not already inside an input/textarea
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        textareaRef.current?.focus();
        soundManager.playBlip();
        return;
      }

      // Escape to close drawer
      if (e.key === "Escape") {
        setDrawerOpen((prev) => {
          if (prev) {
            soundManager.playBlip();
            return false;
          }
          return prev;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const handleCommand = (rawCmd: string): boolean => {
    const trimmed = rawCmd.trim().toLowerCase();

    if (trimmed === "/clear" || trimmed === "/reset") {
      setMessages([INITIAL_MSG]);
      setInput("");
      soundManager.playBlip();
      return true;
    }

    if (trimmed === "/dossier") {
      setDrawerOpen(true);
      soundManager.playSwoosh();
      const userMsg: Message = { id: Date.now().toString(), role: "user", content: "/dossier", ts: new Date() };
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `📂 **Recruiter Dossier Opened.** You can also toggle this anytime using \`Ctrl + K\` (or \`⌘K\`).`,
        ts: new Date(),
      };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      return true;
    }

    if (trimmed === "/resume") {
      soundManager.playReceive();

      const userMsg: Message = { id: Date.now().toString(), role: "user", content: "/resume", ts: new Date() };
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `📄 **Sundram Singhal — Resume Options:**\n\n- 👁️ [**View Resume in New Tab**](${PROFILE.contact.resume}) *(Instant browser preview, zero storage clutter)*\n- ⬇️ [**Download Resume (PDF)**](${PROFILE.contact.resume}) *(Direct file download for ATS / HR records)*`,
        ts: new Date(),
      };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      return true;
    }

    if (trimmed === "/help") {
      soundManager.playReceive();
      const userMsg: Message = { id: Date.now().toString(), role: "user", content: "/help", ts: new Date() };
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `⚡ **Available Terminal Commands:**

- \`/resume\` — Instant download of Sundram's official PDF resume
- \`/dossier\` — Open slide-over Recruiter Dossier (\`Ctrl + K\`)
- \`/projects\` — Architecture breakdown of ZeroMesh-UPI & WanderLust
- \`/skills\` — Technical stack matrix (.NET Core, Java Spring Boot, AWS)
- \`/dsa\` — Verified DSA statistics (GFG Rank #3 & LeetCode)
- \`/clear\` or \`/reset\` — Reset conversation history
- \`/theme [violet|amber|emerald]\` — Switch color theme

⌨️ **Shortcuts:** \`Ctrl+K\` for Dossier, \`/\` to focus chat input.`,
        ts: new Date(),
      };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      return true;
    }

    if (trimmed.startsWith("/theme")) {
      const parts = trimmed.split(" ");
      const selected = parts[1] as "emerald" | "amber" | "violet";
      if (selected && ["emerald", "amber", "violet"].includes(selected)) {
        changeTheme(selected);
        const userMsg: Message = { id: Date.now().toString(), role: "user", content: rawCmd, ts: new Date() };
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `🎨 Theme switched to **${selected.toUpperCase()}**.`,
          ts: new Date(),
        };
        setMessages((prev) => [...prev, userMsg, assistantMsg]);
        setInput("");
        return true;
      }
    }

    return false;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    // Check if it's a client terminal command
    if (text.trim().startsWith("/") && handleCommand(text.trim())) {
      return;
    }

    soundManager.playSend();

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim(), ts: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), history: messages }),
      });
      const data = await res.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "I apologize, I couldn't generate a response. Please try again.",
        ts: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      soundManager.playReceive();
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Something went wrong on my end. Please try again in a moment!",
          ts: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyMsg = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    soundManager.playBlip();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const reset = () => {
    setMessages([INITIAL_MSG]);
    soundManager.playBlip();
  };

  // Filter slash commands for auto-suggest popup
  const matchingCommands = input.startsWith("/")
    ? SLASH_COMMANDS.filter((c) => c.cmd.toLowerCase().startsWith(input.toLowerCase().trim()))
    : [];

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* ─── Left Sidebar ─── */}
      <motion.aside
        className="hidden md:flex flex-col w-[280px] flex-shrink-0 border-r border-[var(--border-glow)] overflow-y-auto sidebar-scroll"
        style={{ background: "rgba(8,12,20,0.95)" }}
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Profile card */}
        <div className="p-5 border-b border-[var(--border-glow)]">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div
                className="w-20 h-20 rounded-full overflow-hidden"
                style={{ border: "2px solid var(--accent-green)", boxShadow: "0 0 24px var(--border-glow)" }}
              >
                <Image src={PROFILE.contact.photo} alt={PROFILE.name} width={80} height={80} className="object-cover" />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#080C14] flex items-center justify-center border border-[var(--border-glow)]"
              >
                <div className="w-2.5 h-2.5 rounded-full pulse-status" style={{ background: "var(--accent-green)" }} />
              </div>
            </div>
            <h1 className="text-base font-bold text-white">{PROFILE.name}</h1>
            <p className="text-xs mt-0.5 leading-relaxed font-medium" style={{ color: "var(--accent-green)" }}>{PROFILE.tagline}</p>
            <div className="mt-2 px-3 py-1.5 rounded-full text-[10px] font-medium"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-glow)", color: "var(--accent-green)" }}>
              🟢 {PROFILE.status.noticePeriod}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-[var(--border-glow)] space-y-2">
          <button
            type="button"
            onClick={() => {
              setDrawerOpen(true);
              soundManager.playSwoosh();
            }}
            className="flex items-center gap-2.5 w-full p-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer hover:scale-[1.02] active:scale-[0.98] group"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-glow)",
              color: "var(--accent-green)",
              boxShadow: "0 0 16px var(--border-glow)",
            }}
          >
            <Layers size={16} />
            <span>Recruiter Dossier</span>
            <span className="ml-auto flex items-center gap-1.5">
              <kbd className="hidden lg:inline text-[9px] px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] border border-[var(--border-glow)] text-[#94a3b8]">Ctrl K</kbd>
              <ChevronRight size={14} />
            </span>
          </button>
          {/* Resume Section with clear heading and theme-aware styling */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2 px-0.5">
              <span className="text-[10px] text-[#94a3b8] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                Resume / CV
              </span>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded font-mono font-medium"
                style={{
                  background: "var(--border-glow)",
                  color: "var(--accent-green)",
                  border: "1px solid var(--border-glow)",
                }}
              >
                PDF
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={PROFILE.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playBlip()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all hover:brightness-125 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, var(--border-glow) 0%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid var(--border-glow)",
                  color: "var(--accent-green)",
                  boxShadow: "0 0 12px var(--border-glow)",
                }}
                title="Preview Sundram's Resume in a new browser tab"
              >
                <ExternalLink size={13} />
                <span>View Resume</span>
              </a>
              <a
                href={PROFILE.contact.resume}
                download="Sundram_Singhal_Resume.pdf"
                onClick={() => soundManager.playBlip()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all hover:brightness-125 hover:border-[var(--border-glow)] active:scale-[0.98]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                }}
                title="Download Sundram's Resume PDF directly"
              >
                <Download size={13} />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="p-4 border-b border-[var(--border-glow)]">
          <p className="text-[10px] text-[#475569] uppercase tracking-widest mb-3">Connect</p>
          <div className="space-y-1.5">
            {[
              { icon: GitFork, label: "GitHub", href: PROFILE.contact.github },
              { icon: Link2, label: "LinkedIn", href: PROFILE.contact.linkedin },
              { icon: Code2, label: "LeetCode (385 Solved)", href: PROFILE.contact.leetcode },
              { icon: Award, label: "GFG Profile (Rank #3)", href: PROFILE.contact.gfg },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                onClick={() => soundManager.playBlip()}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors group">
                <Icon size={14} className="text-[#475569] group-hover:text-[var(--accent-green)] transition-colors" />
                <span className="text-xs text-[#475569] group-hover:text-[#94a3b8] transition-colors">{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Suggested Topics */}
        <div className="p-4 flex-1">
          <p className="text-[10px] text-[#475569] uppercase tracking-widest mb-3">Quick Questions</p>
          <div className="space-y-1.5">
            {PROFILE.promptChips.map((c) => (
              <button
                key={c.text}
                onClick={() => sendMessage(c.text)}
                className="prompt-chip text-xs"
                disabled={loading}
              >
                <span className="mr-1.5">{c.emoji}</span>
                {c.text}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-glow)]">
          <p className="text-[10px] text-[#1e293b] text-center">
            AI Portfolio · Sundram Singhal © 2026
          </p>
        </div>
      </motion.aside>

      {/* ─── Main Chat Area ─── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top navbar */}
        <motion.header
          className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3.5 border-b border-[var(--border-glow)] flex-shrink-0"
          style={{ background: "rgba(8,12,20,0.9)", backdropFilter: "blur(16px)" }}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Theme switcher capsule with generous click target */}
            <div
              className="flex items-center gap-0.5 p-0.5 rounded-full border"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                borderColor: "var(--border-glow)",
              }}
            >
              <button
                type="button"
                onClick={() => changeTheme("violet")}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-[rgba(192,132,252,0.18)] transition-all cursor-pointer"
                title="Switch to Cyberpunk Violet Theme"
              >
                <span
                  className={`w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#c084fc] transition-all duration-200 ${
                    theme === "violet"
                      ? "ring-2 ring-white scale-125 shadow-[0_0_12px_#c084fc]"
                      : "opacity-60 hover:opacity-100 hover:scale-110"
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => changeTheme("amber")}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-[rgba(251,191,36,0.18)] transition-all cursor-pointer"
                title="Switch to Sunset Amber Theme"
              >
                <span
                  className={`w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#fbbf24] transition-all duration-200 ${
                    theme === "amber"
                      ? "ring-2 ring-white scale-125 shadow-[0_0_12px_#fbbf24]"
                      : "opacity-60 hover:opacity-100 hover:scale-110"
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => changeTheme("emerald")}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-[rgba(0,255,136,0.18)] transition-all cursor-pointer"
                title="Switch to Matrix Emerald Theme"
              >
                <span
                  className={`w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#00ff88] transition-all duration-200 ${
                    theme === "emerald"
                      ? "ring-2 ring-white scale-125 shadow-[0_0_12px_#00ff88]"
                      : "opacity-60 hover:opacity-100 hover:scale-110"
                  }`}
                />
              </button>
            </div>

            <div className="h-4 w-[1px] hidden xs:block" style={{ background: "var(--border-glow)" }} />

            {/* Audio sound toggle - icon only on mobile, text on desktop */}
            <button
              type="button"
              onClick={toggleSound}
              className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-lg transition-all cursor-pointer border"
              style={
                !soundMuted
                  ? {
                      borderColor: "var(--border-glow)",
                      color: "var(--accent-green)",
                      background: "rgba(255,255,255,0.04)",
                      boxShadow: "0 0 10px var(--border-glow)",
                    }
                  : {
                      borderColor: "rgba(255,255,255,0.06)",
                      color: "#475569",
                      background: "transparent",
                    }
              }
              title={soundMuted ? "Audio: Muted (Click to turn ON)" : "Audio: Active (Click to Mute)"}
            >
              {soundMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span className="text-[10px] font-mono font-semibold tracking-wider hidden sm:inline">
                {soundMuted ? "MUTED" : "SOUND ON"}
              </span>
            </button>

            <div className="h-4 w-[1px] hidden sm:block" style={{ background: "var(--border-glow)" }} />

            <div className="items-center gap-2 hidden sm:flex">
              <Sparkles size={14} style={{ color: "var(--accent-green)" }} />
              <span className="text-sm font-semibold text-white">
                Sundram<span style={{ color: "var(--accent-green)" }}>.AI</span>
              </span>
              <span className="text-xs text-[#475569] hidden md:block">— Portfolio Assistant</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile: Recruiter View btn */}
            <button
              onClick={() => {
                setDrawerOpen(true);
                soundManager.playSwoosh();
              }}
              className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all active:scale-95"
              style={{ background: "var(--border-glow)", border: "1px solid var(--accent-green)", color: "var(--accent-green)" }}
            >
              <Layers size={13} />
              <span>Recruiter View</span>
            </button>
            <button
              onClick={reset}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors text-[#475569] hover:text-[var(--accent-green)] cursor-pointer"
              title="Reset chat"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </motion.header>

        {/* Messages feed */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll px-4 py-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i === 0 ? 0.3 : 0 }}
                className={`flex gap-3 max-w-4xl mx-auto ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                  {msg.role === "assistant" ? (
                    <div
                      className="w-8 h-8 rounded-full overflow-hidden"
                      style={{ border: "1.5px solid var(--accent-green)", boxShadow: "0 0 12px var(--border-glow)" }}
                    >
                      <Image src={PROFILE.contact.photo} alt="Sundram AI" width={32} height={32} className="object-cover" />
                    </div>
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(0,212,255,0.1)", border: "1.5px solid rgba(0,212,255,0.3)" }}
                    >
                      <User size={14} className="text-[#00d4ff]" />
                    </div>
                  )}
                </div>

                {/* Bubble */}
                <div className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                  <div
                    className="rounded-2xl px-4 py-3 relative group"
                    style={
                      msg.role === "user"
                        ? {
                            background: "rgba(0,212,255,0.08)",
                            border: "1px solid rgba(0,212,255,0.2)",
                            borderBottomRightRadius: "4px",
                          }
                        : {
                            background: "rgba(13,20,33,0.7)",
                            border: "1px solid var(--border-glow)",
                            borderBottomLeftRadius: "4px",
                          }
                    }
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose-dark">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({ href, children, ...props }) => {
                              const isResumeDownload = href?.includes("Resume") && String(children).toLowerCase().includes("download");
                              return (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download={isResumeDownload ? "Sundram_Singhal_Resume.pdf" : undefined}
                                  onClick={() => soundManager.playBlip()}
                                  {...props}
                                >
                                  {children}
                                </a>
                              );
                            },
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm text-[#e2e8f0]">{msg.content}</p>
                    )}
                    {/* Copy button */}
                    <button
                      type="button"
                      onClick={() => copyMsg(msg.id, msg.content)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-[rgba(255,255,255,0.06)] cursor-pointer"
                    >
                      {copiedId === msg.id
                        ? <Check size={11} style={{ color: "var(--accent-green)" }} />
                        : <Copy size={11} className="text-[#475569]" />}
                    </button>
                  </div>
                  <span className="text-[10px] text-[#475569] px-1">
                    {msg.role === "assistant" ? "Sundram.AI" : "You"} {mounted && `· ${msg.ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex gap-3 max-w-4xl mx-auto"
              >
                <div
                  className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: "1.5px solid var(--accent-green)", boxShadow: "0 0 12px var(--border-glow)" }}
                >
                  <Image src={PROFILE.contact.photo} alt="Sundram AI" width={32} height={32} className="object-cover" />
                </div>
                <div
                  className="flex items-center gap-1.5 px-4 py-3.5 rounded-2xl"
                  style={{ background: "rgba(13,20,33,0.7)", border: "1px solid var(--border-glow)", borderBottomLeftRadius: "4px" }}
                >
                  <div className="w-2 h-2 rounded-full typing-dot" style={{ background: "var(--accent-green)" }} />
                  <div className="w-2 h-2 rounded-full typing-dot" style={{ background: "var(--accent-green)" }} />
                  <div className="w-2 h-2 rounded-full typing-dot" style={{ background: "var(--accent-green)" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Prompt chips (mobile) */}
        <div className="md:hidden px-4 pb-2 flex gap-2 overflow-x-auto">
          {PROFILE.promptChips.slice(0, 3).map((c) => (
            <button
              key={c.text}
              type="button"
              onClick={() => sendMessage(c.text)}
              disabled={loading}
              className="flex-shrink-0 max-w-[220px] truncate px-3 py-1.5 rounded-full text-xs text-left"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-glow)", color: "var(--accent-green)" }}
            >
              <span className="mr-1">{c.emoji}</span>
              {c.text}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <motion.div
          className="flex-shrink-0 px-3 sm:px-4 pb-3 sm:pb-5 pt-2 sm:pt-3 relative"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Slash command floating suggestion popup */}
          <AnimatePresence>
            {matchingCommands.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="absolute bottom-full mb-2 left-4 right-4 max-w-4xl mx-auto p-2 rounded-xl z-30"
                style={{
                  background: "rgba(13, 20, 33, 0.95)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid var(--border-glow)",
                  boxShadow: "0 -8px 24px rgba(0,0,0,0.5)",
                }}
              >
                <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-[#475569] font-mono border-b border-[var(--border-glow)] mb-1">
                  <Terminal size={12} className="text-[var(--accent-green)]" />
                  <span>Terminal Slash Commands:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {matchingCommands.map((c) => (
                    <button
                      key={c.cmd}
                      type="button"
                      onClick={() => {
                        setInput(c.cmd);
                        sendMessage(c.cmd);
                      }}
                      className="flex items-center justify-between p-2 rounded-lg text-left hover:bg-[rgba(255,255,255,0.06)] transition-all cursor-pointer group"
                    >
                      <span className="text-xs font-mono font-semibold" style={{ color: "var(--accent-green)" }}>
                        {c.cmd}
                      </span>
                      <span className="text-[11px] text-[#94a3b8] group-hover:text-white transition-colors">
                        {c.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="flex gap-3 items-center px-4 py-3 rounded-2xl max-w-4xl mx-auto"
            style={{
              background: "rgba(13,20,33,0.85)",
              border: "1px solid var(--border-glow)",
              boxShadow: "0 0 30px var(--border-glow)",
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Ask anything about Sundram or type '/' for terminal commands..."
              rows={1}
              disabled={loading}
              className="flex-1 bg-transparent text-sm text-[#e2e8f0] placeholder-[#475569] resize-none outline-none leading-normal py-1"
              style={{ minHeight: "24px", maxHeight: "160px", caretColor: "var(--accent-green)" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer self-center"
              style={
                input.trim() && !loading
                  ? { background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-glow)", color: "var(--accent-green)", boxShadow: "0 0 12px var(--border-glow)" }
                  : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#475569" }
              }
            >
              <Send size={15} />
            </button>
          </div>
          <div className="flex items-center justify-between max-w-4xl mx-auto px-2 mt-2">
            <p className="text-[10px] text-[#475569]">
              Press <kbd className="text-[#94a3b8] px-1 py-0.5 rounded bg-[rgba(255,255,255,0.04)]">Enter</kbd> to send · Type <kbd className="text-[#94a3b8] px-1 py-0.5 rounded bg-[rgba(255,255,255,0.04)]">/</kbd> for quick commands
            </p>
            <p className="text-[10px] text-[#475569] hidden sm:block">
              <kbd className="text-[#94a3b8] px-1 py-0.5 rounded bg-[rgba(255,255,255,0.04)]">Ctrl + K</kbd> Recruiter Dossier
            </p>
          </div>
        </motion.div>
      </div>

      {/* Dossier Drawer */}
      <DossierDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
