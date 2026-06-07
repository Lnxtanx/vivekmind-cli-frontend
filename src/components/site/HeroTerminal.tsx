import { useEffect, useState, useRef } from "react";
import { TerminalWindow } from "./TerminalWindow";

type LogLine = {
  text: string;
  cls?: string;
};

const INITIAL_WELCOME: LogLine[] = [
  { text: "VivekMind CLI v0.15.6 — Interactive Terminal", cls: "text-red-400 font-bold" },
  { text: "Type any command or click a preset below to test-drive the CLI.", cls: "text-white/60" },
  { text: "" },
];

const PRESETS = [
  { label: 'vivekmind "Refactor auth"', cmd: 'vivekmind "Refactor auth"' },
  { label: '/arena', cmd: '/arena' },
  { label: '/model', cmd: '/model' },
  { label: '/mcp', cmd: '/mcp' },
  { label: 'clear', cmd: 'clear' },
];

export function HeroTerminal() {
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_WELCOME);
  const [inputValue, setInputValue] = useState("");
  const [activeModel, setActiveModel] = useState("claude-opus-4-7 (Bedrock)");
  const [isSimulating, setIsSimulating] = useState<"auth" | "arena" | "none">("none");
  const [simStep, setSimStep] = useState(0);
  const [waitingForApproval, setWaitingForApproval] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, isSimulating, waitingForApproval]);

  // Focus input on container click
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Simulate "Refactor Auth" steps
  useEffect(() => {
    if (isSimulating !== "auth") return;

    const authSteps: { text: string; cls: string; delay: number }[] = [
      { text: "🤖 Analyzing workspace...", cls: "text-white/60", delay: 500 },
      { text: "🔍 Searching for auth tokens in src/**", cls: "text-white/40", delay: 600 },
      { text: "🔧 Tool Call: ReadFile [src/auth.ts]", cls: "text-white/50", delay: 400 },
      { text: "✏️ Proposed edit to src/auth.ts (Replace raw tokens with JWT refresh rotation):", cls: "text-amber-400 font-semibold", delay: 600 },
      { text: "   - const token = generateSimpleToken();", cls: "text-red-400/80 pl-4", delay: 100 },
      { text: "   + const token = jwt.sign({ uid }, JWT_SECRET, { expiresIn: '15m' });", cls: "text-emerald-400 pl-4", delay: 100 },
      { text: "   + const refreshToken = jwt.sign({ uid }, REFRESH_SECRET, { expiresIn: '7d' });", cls: "text-emerald-400 pl-4", delay: 100 },
      { text: "⚠️ Requesting permission: Run shell command 'npm test' and WriteFile 'src/auth.ts'", cls: "text-red-500 font-semibold", delay: 700 },
    ];

    if (simStep < authSteps.length) {
      const step = authSteps[simStep];
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, { text: step.text, cls: step.cls }]);
        setSimStep((s) => s + 1);
      }, step.delay);
      return () => clearTimeout(timer);
    } else if (simStep === authSteps.length) {
      setWaitingForApproval(true);
    }
  }, [isSimulating, simStep]);

  // Simulate "Arena" comparison steps
  useEffect(() => {
    if (isSimulating !== "arena") return;

    const arenaSteps: { text: string; cls: string; delay: number }[] = [
      { text: "⚔️ Starting Arena comparison (Topic: Refactor SQL query to use window functions)", cls: "text-red-400 font-bold", delay: 400 },
      { text: "🧠 Initializing models...", cls: "text-white/50", delay: 600 },
      { text: "🤖 Claude 3.7 (AWS Bedrock) → Generating solution...", cls: "text-white/80", delay: 800 },
      { text: "🤖 Gemini 2.5 Pro → Generating solution...", cls: "text-white/80", delay: 600 },
      { text: "🤖 GPT-4o → Generating solution...", cls: "text-white/80", delay: 900 },
      { text: "📊 Evaluating efficiency and accuracy...", cls: "text-white/50", delay: 700 },
      { text: "🏆 Results:", cls: "text-amber-400 font-semibold", delay: 400 },
      { text: "   - Gemini 2.5 Pro: 4.2s | 94% accuracy | 🚀 Fastest execution", cls: "text-emerald-400 pl-4", delay: 200 },
      { text: "   - Claude 3.7: 7.8s | 96% accuracy | 🎯 Most robust code layout", cls: "text-white/90 pl-4", delay: 200 },
      { text: "   - GPT-4o: 6.9s | 89% accuracy | 📝 Good comments", cls: "text-white/70 pl-4", delay: 200 },
      { text: "✨ Claude 3.7 wins on code elegance, Gemini 2.5 Pro wins on speed!", cls: "text-red-400 font-semibold", delay: 500 },
    ];

    if (simStep < arenaSteps.length) {
      const step = arenaSteps[simStep];
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, { text: step.text, cls: step.cls }]);
        setSimStep((s) => s + 1);
      }, step.delay);
      return () => clearTimeout(timer);
    } else {
      setIsSimulating("none");
    }
  }, [isSimulating, simStep]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);

    // Add command echo
    setLogs((prev) => [...prev, { text: `$ ${trimmed}`, cls: "text-white font-medium" }]);

    if (trimmed.toLowerCase() === "clear") {
      setLogs([]);
      return;
    }

    if (trimmed.toLowerCase() === "help" || trimmed.toLowerCase() === "/help") {
      setLogs((prev) => [
        ...prev,
        { text: "Available commands:", cls: "text-red-400 font-semibold mt-1" },
        { text: "  vivekmind \"Refactor auth\"  - Run auth refactor simulation", cls: "text-white/80" },
        { text: "  /arena                    - Run model comparison arena", cls: "text-white/80" },
        { text: "  /model                    - View/change current LLM provider", cls: "text-white/80" },
        { text: "  /mcp                      - List connected Model Context Protocol servers", cls: "text-white/80" },
        { text: "  clear                     - Clear terminal history", cls: "text-white/80" },
        { text: "  help                      - Show this help message", cls: "text-white/80" },
        { text: "" },
      ]);
      return;
    }

    if (trimmed.toLowerCase().startsWith("vivekmind") && trimmed.toLowerCase().includes("auth")) {
      setIsSimulating("auth");
      setSimStep(0);
      return;
    }

    if (trimmed.toLowerCase() === "/arena") {
      setIsSimulating("arena");
      setSimStep(0);
      return;
    }

    if (trimmed.toLowerCase().startsWith("/model")) {
      const args = trimmed.split(" ").slice(1);
      if (args.length === 0) {
        setLogs((prev) => [
          ...prev,
          { text: `Current active model: ${activeModel}`, cls: "text-amber-400 font-medium" },
          { text: "Available models:", cls: "text-white/60 mt-1" },
          { text: "  1. claude-opus-4-7 (AWS Bedrock)", cls: "text-white/80" },
          { text: "  2. claude-3-5-sonnet (Anthropic)", cls: "text-white/80" },
          { text: "  3. gemini-2.5-pro (Google)", cls: "text-white/80" },
          { text: "  4. gpt-4o (OpenAI)", cls: "text-white/80" },
          { text: "To change: type '/model <number>' (e.g. '/model 3')", cls: "text-white/40 mt-1" },
          { text: "" },
        ]);
      } else {
        const choice = args[0];
        let nextModel = "";
        if (choice === "1") nextModel = "claude-opus-4-7 (AWS Bedrock)";
        else if (choice === "2") nextModel = "claude-3-5-sonnet (Anthropic)";
        else if (choice === "3") nextModel = "gemini-2.5-pro (Google)";
        else if (choice === "4") nextModel = "gpt-4o (OpenAI)";

        if (nextModel) {
          setActiveModel(nextModel);
          setLogs((prev) => [
            ...prev,
            { text: `✓ Successfully switched model to ${nextModel}`, cls: "text-emerald-400" },
            { text: "" },
          ]);
        } else {
          setLogs((prev) => [
            ...prev,
            { text: `❌ Invalid choice. Please choose 1, 2, 3, or 4.`, cls: "text-red-400" },
            { text: "" },
          ]);
        }
      }
      return;
    }

    if (trimmed.toLowerCase() === "/mcp") {
      setLogs((prev) => [
        ...prev,
        { text: "🔌 Connected MCP Servers (3 active):", cls: "text-red-400 font-semibold mt-1" },
        { text: "  filesystem    - Read/write access under project root (active)", cls: "text-white/80" },
        { text: "  github        - Read/write GitHub Issues/PRs (active)", cls: "text-white/80" },
        { text: "  brave-search  - Brave search engine API (active)", cls: "text-white/80" },
        { text: "All 18 tools successfully loaded into context.", cls: "text-emerald-400/80 mt-1" },
        { text: "" },
      ]);
      return;
    }

    // Default responder (chatbot)
    setLogs((prev) => [
      ...prev,
      { text: `🤖 I'm a terminal simulation of VivekMind CLI. I don't support custom prompt parsing yet, but you can try typing:`, cls: "text-white/80 mt-1" },
      { text: `   • vivekmind "Refactor auth"`, cls: "text-red-400" },
      { text: `   • /arena`, cls: "text-red-400" },
      { text: `   • /model`, cls: "text-red-400" },
      { text: `   • /mcp`, cls: "text-red-400" },
      { text: `Type 'help' to see all simulated commands.`, cls: "text-white/50" },
      { text: "" },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(inputValue);
      setInputValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputValue(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputValue(history[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputValue("");
      }
    }
  };

  const handleApproval = (approved: boolean) => {
    setWaitingForApproval(false);
    if (approved) {
      setLogs((prev) => [
        ...prev,
        { text: `User approved tool execution.`, cls: "text-white/40 italic" },
        { text: "⚡ Writing changes to src/auth.ts...", cls: "text-amber-400" },
      ]);
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          { text: "🧪 Running tests (vitest --run)...", cls: "text-white/50" },
        ]);
        setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            { text: "✓ 12 tests passed successfully.", cls: "text-emerald-400" },
            { text: "🎉 Refactoring complete! Auth system now rotated via JWT refresh tokens.", cls: "text-emerald-400 font-bold" },
            { text: "" },
          ]);
          setIsSimulating("none");
        }, 800);
      }, 500);
    } else {
      setLogs((prev) => [
        ...prev,
        { text: `User denied tool execution.`, cls: "text-white/40 italic" },
        { text: "❌ Operation aborted.", cls: "text-red-400" },
        { text: "" },
      ]);
      setIsSimulating("none");
    }
  };

  return (
    <div className="space-y-4">
      {/* ── presets bar ── */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 px-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-neutral-400 mr-1.5 select-none">
          Try presets:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              if (isSimulating !== "none" || waitingForApproval) return;
              setInputValue("");
              runCommand(p.cmd);
            }}
            disabled={isSimulating !== "none" || waitingForApproval}
            className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-mono text-neutral-600 shadow-sm hover:border-red-400 hover:text-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ── interactive terminal window ── */}
      <TerminalWindow
        title={`vivekmind — ${activeModel}`}
        className="cursor-text shadow-xl"
      >
        <div
          ref={containerRef}
          onClick={focusInput}
          className="min-h-[380px] max-h-[440px] overflow-y-auto pr-1 space-y-1 scrollbar-thin select-text"
        >
          {logs.map((l, i) => (
            <div key={i} className={`whitespace-pre-wrap ${l.cls ?? "text-white/90"}`}>
              {l.text === "" ? "\u00A0" : l.text}
            </div>
          ))}

          {/* ── approval prompt overlay ── */}
          {waitingForApproval && (
            <div className="my-3 flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/5 p-3.5 select-none animate-pulse">
              <span className="text-red-400 font-semibold">Approve suggested changes?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApproval(true)}
                  className="rounded bg-red-600 hover:bg-red-700 px-3.5 py-1 text-[12px] font-bold text-white transition active:scale-95 cursor-pointer"
                >
                  Approve (y)
                </button>
                <button
                  onClick={() => handleApproval(false)}
                  className="rounded border border-white/20 hover:border-white/40 px-3.5 py-1 text-[12px] font-semibold text-white/90 transition active:scale-95 cursor-pointer"
                >
                  Deny (n)
                </button>
              </div>
            </div>
          )}

          {/* ── interactive typing line ── */}
          {isSimulating === "none" && !waitingForApproval && (
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold select-none">$</span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-white/90 p-0 font-mono text-[13px] leading-[1.6] focus:ring-0 focus:border-none focus:outline-none"
                  placeholder="Type a command or help..."
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
            </div>
          )}
        </div>
      </TerminalWindow>
    </div>
  );
}
