import { useState, useEffect, useRef } from "react";
import { TerminalWindow } from "./TerminalWindow";

/* ═══════════════════════ IN ACTION TERMINAL ═══════════════════════ */

export function InActionTerminal() {
  const [logs, setLogs] = useState<string[]>([
    "$ vivekmind",
    " > Find TODO comments, create GitHub issues",
    ""
  ]);
  const [running, setRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startSimulation = () => {
    if (running) return;
    setRunning(true);
    setLogs(["$ vivekmind", " > Find TODO comments, create GitHub issues", ""]);

    const steps = [
      { text: "🔧 Grep: /TODO/ in src/** → 14 matches", delay: 400 },
      { text: "🔧 ReadFile: src/api/auth.ts", delay: 500 },
      { text: "✏️ TodoWrite: 14 tasks queued", delay: 400 },
      { text: "🔧 Shell: gh issue create ×14", delay: 600 },
      { text: "✓ 14 issues created successfully.", delay: 400 },
    ];

    let currentDelay = 0;
    steps.forEach((step) => {
      currentDelay += step.delay;
      setTimeout(() => {
        setLogs((prev) => [...prev, step.text]);
      }, currentDelay);
    });

    setTimeout(() => {
      setRunning(false);
    }, currentDelay + 200);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center min-h-[32px] px-1">
        <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-neutral-400">
          Agentic Action Demo
        </span>
        <button
          onClick={startSimulation}
          disabled={running}
          className="rounded-full border border-red-200 bg-red-50/50 px-4 py-1 font-mono text-[11px] font-semibold text-red-600 shadow-sm hover:bg-red-50 hover:border-red-300 transition disabled:opacity-50 cursor-pointer"
        >
          {running ? "Running..." : "Run Demo"}
        </button>
      </div>
      <TerminalWindow title="vivekmind">
        <div ref={containerRef} className="h-[320px] font-mono text-[12.5px] space-y-1.5 overflow-y-auto pr-1 scrollbar-thin select-text">
          {logs.map((log, index) => {
            let color = "text-white/80";
            if (log.startsWith("$")) color = "text-white font-semibold";
            else if (log.startsWith(" >")) color = "text-blue-400 font-medium";
            else if (log.startsWith("🔧")) color = "text-white/45";
            else if (log.startsWith("✏️")) color = "text-amber-400 font-semibold";
            else if (log.startsWith("✓")) color = "text-emerald-400 font-bold";
            return (
              <div key={index} className={color}>
                {log === "" ? "\u00A0" : log}
              </div>
            );
          })}
        </div>
      </TerminalWindow>
    </div>
  );
}

/* ═══════════════════════ COMMANDS TERMINAL ═══════════════════════ */

export function CommandsTerminal() {
  const [logs, setLogs] = useState<string[]>([
    "Type or click a slash command below to inspect:",
    ""
  ]);

  const commandDescriptions: Record<string, string[]> = {
    "/model": [
      "$ /model",
      "🤖 Current active model: claude-opus-4-7 (AWS Bedrock)",
      "Available models:",
      "  - claude-opus-4-7 (AWS Bedrock)",
      "  - claude-3-5-sonnet (Anthropic)",
      "  - gemini-2.5-pro (Google)",
      "  - gpt-4o (OpenAI)"
    ],
    "/settings": [
      "$ /settings",
      "⚙️ Current configuration:",
      "  - autocommit: false",
      "  - maxIterations: 15",
      "  - defaultModel: claude-opus-4-7",
      "  - useMemory: true"
    ],
    "/mcp": [
      "$ /mcp",
      "🔌 Connected MCP Servers (3 active):",
      "  - filesystem (Read/write access under project root)",
      "  - github (Manage issues, PRs)",
      "  - brave-search (Brave search engine API)"
    ],
    "/plan": [
      "$ /plan \"Setup Auth\"",
      "📝 Planning session started for \"Setup Auth\"",
      "  1. Install jose JWT package",
      "  2. Add middleware validation tests",
      "  3. Configure JWT verify hooks",
      "Use '/plan approve' to apply plan."
    ],
    "/arena": [
      "$ /arena",
      "⚔️ Starting Arena head-to-head comparison...",
      "🏆 Claude 3.7 vs Gemini 2.5 vs GPT-4o",
      "Evaluate speed, correctness, and token cost in real-time."
    ],
    "/clear": [
      "$ /clear",
      "✓ Terminal history cleared."
    ],
    "/doctor": [
      "$ /doctor",
      "🩺 Diagnosing environment...",
      "  ✓ Node.js version: v20.11.0 (>=20 required)",
      "  ✓ Git initialized and configured",
      "  ✓ AWS Bedrock credentials verified",
      "  ✓ 18 tools accessible",
      "All systems operational."
    ]
  };

  const handleCommand = (cmd: string) => {
    const lines = commandDescriptions[cmd] || [`$ ${cmd}`, `❌ Command not simulated.`];
    setLogs(lines);
  };

  const categories = [
    { label: "Session", cmds: ["/model", "/plan", "/clear"] },
    { label: "Config", cmds: ["/settings", "/doctor"] },
    { label: "Tools", cmds: ["/mcp"] },
    { label: "Advanced", cmds: ["/arena"] }
  ];

  return (
    <div className="space-y-4">
      {/* Terminal Window on Top */}
      <TerminalWindow title="commands">
        <div className="h-[220px] font-mono text-[12.5px] space-y-1.5 overflow-y-auto pr-1 scrollbar-thin select-text">
          {logs.map((log, index) => {
            let color = "text-white/80";
            if (log.startsWith("$")) color = "text-white font-semibold";
            else if (log.startsWith("⚙️") || log.startsWith("📝") || log.startsWith("⚔️") || log.startsWith("🩺") || log.startsWith("🔌")) color = "text-amber-400";
            else if (log.startsWith("✓")) color = "text-emerald-400";
            else if (log.startsWith("🏆")) color = "text-red-400 font-semibold";
            return (
              <div key={index} className={color}>
                {log === "" ? "\u00A0" : log}
              </div>
            );
          })}
        </div>
      </TerminalWindow>

      {/* Unified clean panel for commands directly below terminal */}
      <div className="rounded-lg border border-neutral-200 bg-neutral-50/50 p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.label} className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block border-b border-neutral-200/60 pb-1">
              {cat.label}
            </span>
            <div className="flex flex-col gap-1.5">
              {cat.cmds.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="text-left font-mono text-[12px] text-neutral-600 hover:text-red-600 hover:translate-x-0.5 transition-all duration-150 cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════ MEMORY TERMINAL ═══════════════════════ */

export function MemoryTerminal() {
  const [logs, setLogs] = useState<string[]>([
    "$ vivekmind /memory",
    "",
    " PROJECT MEMORY (acme-api)",
    " ── consolidated 2h ago ──",
    "",
    " • Auth: JWT + httpOnly refresh",
    "",
    " ✓ 1 stable memory"
  ]);

  const [addedLabels, setAddedLabels] = useState<string[]>([]);

  const addMemory = (label: string, text: string) => {
    if (addedLabels.includes(label)) return;
    setAddedLabels((prev) => [...prev, label]);
    setLogs((prev) => {
      const newLogs = [...prev];
      const lastLine = newLogs.pop() || " ✓ 1 stable memory";
      const countMatch = lastLine.match(/\d+/);
      const count = countMatch ? parseInt(countMatch[0], 10) + 1 : 2;
      
      newLogs.push(` • ${text}`);
      newLogs.push("");
      newLogs.push(` ✓ ${count} stable memories`);
      return newLogs;
    });
  };

  const quickAdds = [
    { label: "DB", value: "DB: PostgreSQL via Drizzle ORM" },
    { label: "CSS", value: "CSS: Tailwind CSS v4" },
    { label: "CI/CD", value: "CI/CD: GitHub Actions pipeline" }
  ];

  return (
    <div className="space-y-4">
      {/* Terminal Window on Top */}
      <TerminalWindow title="memory">
        <div className="h-[220px] font-mono text-[12.5px] space-y-1.5 overflow-y-auto pr-1 scrollbar-thin select-text">
          {logs.map((log, index) => {
            let color = "text-white/80";
            if (log.startsWith("$")) color = "text-white font-semibold";
            else if (log.includes("PROJECT MEMORY")) color = "text-red-400 font-semibold";
            else if (log.includes("── consolidated")) color = "text-white/30";
            else if (log.startsWith(" •")) color = "text-amber-400";
            else if (log.startsWith(" ✓")) color = "text-emerald-400";
            return (
              <div key={index} className={color}>
                {log === "" ? "\u00A0" : log}
              </div>
            );
          })}
        </div>
      </TerminalWindow>

      {/* Aligned presets styling below terminal */}
      <div className="flex flex-wrap items-center gap-1.5 min-h-[32px] px-1">
        <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-neutral-400 mr-1.5 select-none">
          Quick Add Memory:
        </span>
        {quickAdds.map((item) => {
          const isAdded = addedLabels.includes(item.label);
          return (
            <button
              key={item.label}
              onClick={() => addMemory(item.label, item.value)}
              disabled={isAdded}
              className={`rounded-full border px-3.5 py-1 text-[11px] font-mono shadow-sm transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isAdded
                  ? "border-neutral-200 bg-neutral-100 text-neutral-400"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-red-400 hover:text-red-600"
              }`}
            >
              + {item.label} {isAdded && "✓"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
