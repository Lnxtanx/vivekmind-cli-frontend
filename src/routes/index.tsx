import { Fragment, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Github,
  Unlock,
  KeyRound,
  Cloud,
  Plug,
  Puzzle,
  Bot,
  Check,
  X,
  Wrench,
  TerminalSquare,
  Brain,
  Cpu,
  MessageSquare,
  Layers,
  Boxes,
  Network,
  Swords,
  Box,
  Code2,
  Globe,
  Palette,
  Keyboard,
  Webhook,
  GitBranch,
  Clock,
  FileCode,
  Copy,
  Send,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { HeroTerminal } from "@/components/site/HeroTerminal";
import { Reveal } from "@/components/site/Reveal";
import { InActionTerminal, CommandsTerminal, MemoryTerminal } from "@/components/site/InteractiveFeatures";
import logo from "@/assets/vivekmind-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VivekMind CLI — Open-source terminal AI coding agent" },
      {
        name: "description",
        content:
          "Open-source terminal AI agent with 20+ provider support, 40+ commands, AWS Bedrock integration, and MCP support.",
      },
      {
        property: "og:title",
        content: "VivekMind CLI — The open source AI coding agent",
      },
      {
        property: "og:description",
        content:
          "Open-source terminal AI coding agent with 20+ providers and full AWS Bedrock support.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

/* ── data ── */

const providers = [
  "AWS Bedrock", "Anthropic", "Google Gemini", "OpenAI", "Azure OpenAI",
  "Vertex AI", "DeepSeek", "Mistral AI", "Alibaba DashScope", "xAI (Grok)",
  "OpenRouter", "Groq", "Together AI", "Fireworks AI", "Cohere",
  "Perplexity", "SiliconFlow", "Hugging Face", "IBM Watsonx", "Novita AI",
  "Ollama", "LM Studio",
];

const tools: [string, string][] = [
  ["Edit", "Search-and-replace file editing"],
  ["WriteFile", "Create or overwrite files"],
  ["ReadFile", "Read file contents"],
  ["Grep", "Regex search across files"],
  ["Glob", "Find files by pattern"],
  ["Shell", "Execute shell commands"],
  ["TodoWrite", "Track task progress"],
  ["Agent", "Spawn subagents for complex tasks"],
  ["WebFetch", "Fetch and read web pages"],
  ["Lsp", "Language Server Protocol integration"],
  ["SaveMemory", "Persist project knowledge"],
  ["CronCreate", "Schedule recurring tasks"],
  ["SendMessage", "Channel integrations"],
  ["Monitor", "Watch files and processes"],
];

const commandGroups: { label: string; cmds: string[] }[] = [
  { label: "Session", cmds: ["/model", "/compress", "/clear", "/resume", "/rewind", "/export", "/plan"] },
  { label: "Config", cmds: ["/settings", "/theme", "/vim", "/init", "/doctor", "/memory"] },
  { label: "Tools", cmds: ["/tools", "/mcp", "/agents", "/skills", "/hooks", "/extensions"] },
  { label: "Advanced", cmds: ["/arena", "/review", "/auth", "/channel"] },
];

const advFeatures = [
  { Icon: Layers, title: "Subagents", desc: "Parallel, focused workflows" },
  { Icon: Boxes, title: "Skills", desc: "Reusable knowledge bundles" },
  { Icon: Network, title: "MCP Protocol", desc: "Unlimited external tools" },
  { Icon: Swords, title: "Arena Mode", desc: "Compare models head-to-head" },
  { Icon: Box, title: "Sandbox", desc: "Docker / Podman execution" },
  { Icon: Code2, title: "LSP", desc: "Code intelligence built-in" },
  { Icon: Puzzle, title: "Extensions", desc: "Community plugins" },
  { Icon: Globe, title: "i18n", desc: "8 languages supported" },
  { Icon: Palette, title: "15+ Themes", desc: "Dracula, Tokyo Night, etc." },
  { Icon: Keyboard, title: "Vim Mode", desc: "Full keybinding support" },
  { Icon: Webhook, title: "Hooks", desc: "Pre/post tool execution" },
  { Icon: GitBranch, title: "Git", desc: "Branch detection, PR review" },
  { Icon: Clock, title: "Cron", desc: "Scheduled tasks" },
  { Icon: FileCode, title: "Headless", desc: "CI/CD JSON output" },
];

const comparison = [
  ["Open Source", "✅ Apache 2.0", "❌ Proprietary", "✅ Apache 2.0", "❌ Proprietary"],
  ["20+ Providers", "✅", "❌ Anthropic only", "✅", "❌ Limited"],
  ["AWS Bedrock", "✅ Native", "❌", "❌", "❌"],
  ["Terminal-first", "✅", "✅", "✅", "❌ (IDE)"],
  ["MCP Support", "✅", "❌", "❌", "❌"],
  ["Channel Bots", "✅", "❌", "❌", "❌"],
  ["Memory", "✅ Auto + Manual", "❌", "✅", "❌"],
  ["Subagents", "✅", "✅", "❌", "❌"],
  ["Self-hosted", "✅", "❌", "✅", "❌"],
  ["Free to use", "✅ BYOK", "❌ $20-200/mo", "✅ BYOK", "❌ $20/mo"],
];

const PRODUCT_URLS = {
  schemaWeaver: "https://schemaweaver.vivekmind.com",
  sqlEditor: "https://sql-editor.schemaweaver.vivekmind.com",
  dataExplorer: "https://data-explorer.schemaweaver.vivekmind.com",
  swDocs: "https://docs.schemaweaver.vivekmind.com",
  pricing: "https://schemaweaver.vivekmind.com/pricing",
  fairyForge: "https://fairyforge.vivekmind.com",
  press: "https://press.vivekmind.com",
};

/* ── helpers ── */

function useOS(): "windows" | "mac" | "linux" {
  const [os, setOs] = useState<"windows" | "mac" | "linux">("mac");
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("win")) setOs("windows");
    else if (ua.includes("mac")) setOs("mac");
    else setOs("linux");
  }, []);
  return os;
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="shrink-0 p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition"
      aria-label="Copy"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function Line({ children, c }: { children: React.ReactNode; c?: string }) {
  return <div className={c}>{children}</div>;
}

/* ── page ── */

function Landing() {
  return (
    <div className="relative min-h-screen text-text-primary bg-white">
      <Nav />
      <Hero />
      <FeaturesSection />
      <ProvidersSection />
      <TelegramSection />
      <AdvancedGrid />
      <ComparisonSection />
      <Footer />
    </div>
  );
}

/* ═══════════════════════ HERO ═══════════════════════ */

function Hero() {
  const os = useOS();
  const installCmds = {
    windows: "npm install -g vivekmind",
    mac: "npm install -g vivekmind",
    linux: "npm install -g vivekmind",
  };
  const osLabels = { windows: "Windows", mac: "macOS", linux: "Linux" };

  const [activeOS, setActiveOS] = useState<"windows" | "mac" | "linux">(os);
  useEffect(() => { setActiveOS(os); }, [os]);

  return (
    <section className="pt-28 pb-0">
      {/* ── text ── */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[60px] font-extrabold leading-[1.08] tracking-[-0.035em] text-neutral-900">
            The open source AI coding agent
          </h1>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.65] text-neutral-500">
            Connect any model from any provider, including Claude, GPT, Gemini, all native AWS models from AWS Bedrock, and more.
          </p>
        </Reveal>

        {/* ── OS install tabs ── */}
        <Reveal delay={0.12}>
          <div className="mx-auto mt-10 max-w-lg">
            <div className="flex justify-center gap-1 mb-4">
              {(["mac", "linux", "windows"] as const).map((o) => (
                <button
                  key={o}
                  onClick={() => setActiveOS(o)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                    activeOS === o
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {osLabels[o]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-neutral-900 px-5 py-4 shadow-lg">
              <span className="text-neutral-500 font-mono text-sm select-none">$</span>
              <code className="flex-1 font-mono text-[14px] sm:text-[15px] text-white tracking-tight">
                {installCmds[activeOS]}
              </code>
              <CopyBtn text={installCmds[activeOS]} />
            </div>

            <p className="mt-3 text-[12px] text-neutral-400">
              Requires Node.js ≥ 20 ·{" "}
              <a href="https://github.com/Lnxtanx/vivekmind-cli" target="_blank" rel="noreferrer" className="underline hover:text-neutral-600">
                GitHub Repository
              </a>
              {" "}·{" "}
              <a href="/docs" className="underline hover:text-neutral-600">
                View Documentation
              </a>
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── terminal demo ── */}
      <div className="mx-auto max-w-3xl px-6 mt-14 pb-20">
        <Reveal delay={0.18}>
          <HeroTerminal />
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ FEATURES ═══════════════════════ */

function FeaturesSection() {
  return (
    <section id="features" className="py-20 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-red-600">Features</p>
          <h2 className="mt-3 font-display text-[28px] sm:text-[36px] font-bold tracking-tight text-neutral-900">
            Everything you need to code with AI
          </h2>
        </Reveal>

        {/* ── Tools table + terminal ── */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 items-start">
          <Reveal>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-4">
              Built-in Tools
            </h3>
            <div className="overflow-hidden rounded-lg border border-neutral-200">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-neutral-100 text-left">
                    <th className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Tool</th>
                    <th className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map(([t, d], i) => (
                    <tr key={t} className={i % 2 ? "bg-neutral-50" : "bg-white"}>
                      <td className="px-4 py-2 font-mono text-red-600 font-medium">{t}</td>
                      <td className="px-4 py-2 text-neutral-600">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-4">
              In Action
            </h3>
            <InActionTerminal />
          </Reveal>
        </div>

        {/* ── Commands + Memory ── */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 items-start">
          <Reveal>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-4">
              40+ Slash Commands
            </h3>
            <CommandsTerminal />
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-4">
              Project Memory
            </h3>
            <MemoryTerminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ PROVIDERS ═══════════════════════ */

function ProvidersSection() {
  return (
    <section id="providers" className="py-20 border-t border-neutral-200">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-red-600">Providers</p>
          <h2 className="mt-3 font-display text-[28px] sm:text-[36px] font-bold tracking-tight text-neutral-900">
            Connect any model from any provider
          </h2>
          <p className="mt-4 max-w-xl text-[15px] text-neutral-500 leading-relaxed">
            Your keys. Your models. No subscriptions, no usage caps.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-2">
            {providers.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-[12px] font-mono text-neutral-600 hover:border-neutral-300 transition"
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ TELEGRAM ═══════════════════════ */

function TelegramSection() {
  return (
    <section id="telegram" className="py-20 border-t border-neutral-200 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0088cc]/10 px-3 py-1 text-[12px] font-semibold text-[#0088cc] mb-4">
                <Send className="h-3.5 w-3.5" />
                Telegram Bot
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display text-[28px] sm:text-[36px] font-bold tracking-tight text-neutral-900">
                Bring AI to your Telegram
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-md text-[15px] text-neutral-500 leading-relaxed">
                Connect VivekMind to Telegram and interact with AI directly from your chats. 
                Perfect for teams, communities, or personal productivity.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-6 space-y-3">
                {[
                  "Chat with AI in groups or private messages",
                  "Share context across team members",
                  "Use any model from any provider",
                  "Full tool access: read files, run commands, search web",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-neutral-600">
                    <Check className="h-4 w-4 text-[#0088cc] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://t.me/vivekmind_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0088cc] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0077b5] transition shadow-sm"
                >
                  <Send className="h-4 w-4" />
                  Open in Telegram
                </a>
                <a
                  href="/docs#telegram"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-5 py-2.5 text-[14px] font-medium text-neutral-700 hover:bg-neutral-100 transition"
                >
                  View Documentation
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl transform rotate-1" />
              <div className="relative bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                <div className="bg-[#0088cc] px-4 py-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-[14px]">VivekMind Bot</div>
                    <div className="text-white/70 text-[12px]">Online</div>
                  </div>
                </div>
                <div className="p-4 space-y-3 bg-neutral-50">
                  <div className="flex justify-end">
                    <div className="bg-[#0088cc] text-white px-4 py-2 rounded-2xl rounded-br-sm text-[13px] max-w-[80%]">
                      Analyze the performance of this database query
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white border border-neutral-200 px-4 py-2 rounded-2xl rounded-bl-sm text-[13px] max-w-[80%] text-neutral-700">
                      I've analyzed the query. The main bottleneck is a missing index on the <code className="bg-neutral-100 px-1 rounded text-red-600">user_id</code> column. Adding an index would improve performance by ~85%.
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#0088cc] text-white px-4 py-2 rounded-2xl rounded-br-sm text-[13px] max-w-[80%]">
                      Show me the optimized query
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white border border-neutral-200 px-4 py-3 rounded-2xl rounded-bl-sm text-[13px] max-w-[80%]">
                      <code className="block bg-neutral-900 text-green-400 px-3 py-2 rounded-lg text-[12px] font-mono">
                        CREATE INDEX idx_user_id ON orders(user_id);
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ ADVANCED ═══════════════════════ */

function AdvancedGrid() {
  return (
    <section className="py-20 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-red-600">Capabilities</p>
          <h2 className="mt-3 font-display text-[28px] sm:text-[36px] font-bold tracking-tight text-neutral-900">
            Go as deep as you want
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {advFeatures.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.015}>
              <div className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 transition">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-red-600">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-neutral-900">{title}</div>
                  <div className="text-[12px] text-neutral-500 leading-relaxed">{desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ COMPARISON ═══════════════════════ */

function ComparisonSection() {
  const headers = ["Feature", "VivekMind", "Claude Code", "Aider", "Cursor"];

  const cell = (v: string) => {
    if (v.startsWith("✅")) {
      return (
        <span className="inline-flex items-center gap-1 text-emerald-600">
          <Check className="h-3.5 w-3.5" />
          <span className="text-neutral-700 text-[12px]">{v.replace("✅ ", "").replace("✅", "Yes")}</span>
        </span>
      );
    }
    if (v.startsWith("❌")) {
      return (
        <span className="inline-flex items-center gap-1 text-neutral-300">
          <X className="h-3.5 w-3.5" />
          <span className="text-neutral-400 text-[12px]">{v.replace("❌ ", "").replace("❌", "No")}</span>
        </span>
      );
    }
    return <span className="text-[12px] text-neutral-500">{v}</span>;
  };

  return (
    <section className="py-20 border-t border-neutral-200">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-red-600">Compare</p>
          <h2 className="mt-3 font-display text-[28px] sm:text-[36px] font-bold tracking-tight text-neutral-900">
            How VivekMind stacks up
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 overflow-x-auto rounded-lg border border-neutral-200">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-neutral-50">
                  {headers.map((h, i) => (
                    <th
                      key={h}
                      className={`px-4 py-3 font-mono text-[11px] uppercase tracking-wider font-medium ${
                        i === 1 ? "text-red-600 border-b-2 border-red-600" : "text-neutral-400 border-b border-neutral-200"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className={i % 2 ? "bg-neutral-50/50" : "bg-white"}>
                    {row.map((c, j) => (
                      <td key={j} className={`px-4 py-3 border-t border-neutral-100 ${j === 0 ? "font-medium text-neutral-800" : j === 1 ? "bg-red-50/30" : ""}`}>
                        {j === 0 ? c : cell(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ FOOTER ═══════════════════════ */

function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="VivekMind" className="h-7 w-auto brightness-0 invert" />
              <span className="text-[15px] font-bold">VivekMind</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/50">
              AI systems, tools, and infrastructure for developers and technical teams.
            </p>
          </div>

          <FooterCol title="Schema Weaver" links={[
            ["Overview", PRODUCT_URLS.schemaWeaver],
            ["SQL Editor", PRODUCT_URLS.sqlEditor],
            ["Data Explorer", PRODUCT_URLS.dataExplorer],
            ["Docs", PRODUCT_URLS.swDocs],
            ["Pricing", PRODUCT_URLS.pricing],
          ]} />

          <FooterCol title="More Products" links={[
            ["FairyForge", PRODUCT_URLS.fairyForge],
            ["VivekMind Press", PRODUCT_URLS.press],
          ]} />

          <FooterCol title="Company" links={[
            ["Products", "https://vivekmind.com/products"],
            ["About", "https://vivekmind.com/about"],
            ["Support", "https://vivekmind.com/support"],
            ["Contact", "https://vivekmind.com/contact"],
          ]} />

          <FooterCol title="Legal" links={[
            ["Privacy Policy", "https://vivekmind.com/privacy"],
            ["Terms of Service", "https://vivekmind.com/terms"],
            ["Refund Policy", "https://vivekmind.com/refund-policy"],
            ["Cancellation Policy", "https://vivekmind.com/cancellation-policy"],
          ]} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-white/40 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="mailto:support@vivekmind.com" className="hover:text-white/60">support@vivekmind.com</a>
            <a href="mailto:vivek@vivekmind.com" className="hover:text-white/60">vivek@vivekmind.com</a>
          </div>
          <p>© 2026 VivekMind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">{title}</p>
      <div className="mt-3 flex flex-col gap-2">
        {links.map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/55 hover:text-white/80 transition-opacity">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
