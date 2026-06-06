import { Fragment } from "react";
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
  Mail,
  ExternalLink,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { CopyCommand } from "@/components/site/CopyCommand";
import { HeroTerminal } from "@/components/site/HeroTerminal";
import { TerminalWindow } from "@/components/site/TerminalWindow";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VivekMind CLI — Open-source terminal AI coding agent" },
      {
        name: "description",
        content:
          "Open-source terminal AI agent with 20+ provider support, 40+ commands, deep AWS Bedrock integration, MCP, and channel bots. Bring your own keys.",
      },
      { property: "og:title", content: "VivekMind CLI — Code at the speed of thought." },
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

const providers = [
  "AWS Bedrock", "Anthropic", "Google Gemini", "OpenAI", "Azure OpenAI",
  "Vertex AI", "DeepSeek", "Mistral AI", "Alibaba DashScope", "xAI (Grok)",
  "OpenRouter", "Groq", "Together AI", "Fireworks AI", "Cohere",
  "Perplexity", "SiliconFlow", "Hugging Face", "IBM Watsonx", "Novita AI",
  "Ollama", "LM Studio",
];

const trustItems = [
  { Icon: Unlock, title: "Open Source", desc: "Apache 2.0, fully inspectable" },
  { Icon: KeyRound, title: "No Vendor Lock-in", desc: "Bring your own API keys" },
  { Icon: Cloud, title: "AWS Bedrock Native", desc: "First-class Bedrock integration" },
  { Icon: Plug, title: "20+ AI Providers", desc: "Claude, GPT, Gemini, more" },
  { Icon: Puzzle, title: "MCP Compatible", desc: "Connect any MCP server" },
  { Icon: Bot, title: "Channel Integrations", desc: "Telegram, WeChat, DingTalk" },
];

const tools = [
  ["Edit", "Search-and-replace file editing"],
  ["WriteFile", "Create or overwrite files"],
  ["ReadFile", "Read file contents"],
  ["Grep", "Regex search across files (bundled ripgrep)"],
  ["Glob", "Find files by pattern"],
  ["Shell", "Execute shell commands"],
  ["TodoWrite", "Track and manage task progress"],
  ["Agent", "Spawn subagents for complex tasks"],
  ["WebFetch", "Fetch and read web pages"],
  ["Lsp", "Language Server Protocol integration"],
  ["SaveMemory", "Save information to project memory"],
  ["CronCreate", "Schedule and manage recurring tasks"],
  ["SendMessage", "Send messages via channel integrations"],
  ["Monitor", "Watch files and processes for changes"],
];

const commandGroups: { label: string; cmds: string[] }[] = [
  { label: "Session", cmds: ["/model", "/compress", "/clear", "/resume", "/rewind", "/export", "/plan"] },
  { label: "Config", cmds: ["/settings", "/theme", "/vim", "/init", "/doctor", "/memory"] },
  { label: "Tools", cmds: ["/tools", "/mcp", "/agents", "/skills", "/hooks", "/extensions"] },
  { label: "Advanced", cmds: ["/arena", "/review", "/auth", "/channel"] },
];

const advFeatures = [
  { Icon: Layers, title: "Subagents", desc: "Break complex tasks into parallel, focused workflows" },
  { Icon: Boxes, title: "Skills System", desc: "4-level reusable knowledge with conditional activation" },
  { Icon: Network, title: "MCP Protocol", desc: "Connect any MCP-compatible server for unlimited tools" },
  { Icon: Swords, title: "Arena Mode", desc: "Compare AI models head-to-head on the same task" },
  { Icon: Box, title: "Sandbox", desc: "Docker and Podman support for safe code execution" },
  { Icon: Code2, title: "LSP Integration", desc: "Language Server Protocol for code intelligence" },
  { Icon: Puzzle, title: "Extensions", desc: "Install community extensions from GitHub or npm" },
  { Icon: Globe, title: "i18n", desc: "EN, ZH, JA, DE, FR, RU, PT, CA" },
  { Icon: Palette, title: "15+ Themes", desc: "Dracula, GitHub, Ayu, Tokyo Night, and more" },
  { Icon: Keyboard, title: "Vim Mode", desc: "Full vim keybinding support" },
  { Icon: Webhook, title: "Hooks", desc: "Pre/post tool execution hooks (shell + HTTP)" },
  { Icon: GitBranch, title: "Git Integration", desc: "Branch detection, PR review, presubmit checks" },
  { Icon: Clock, title: "Cron Jobs", desc: "Schedule recurring tasks from within the CLI" },
  { Icon: FileCode, title: "Headless / CI", desc: "JSON output for scripts and pipelines" },
];

const comparison = [
  ["Open Source", "✅ Apache 2.0", "❌ Proprietary", "✅ Apache 2.0", "❌ Proprietary"],
  ["20+ AI Providers", "✅", "❌ Anthropic only", "✅ Many", "❌ Limited"],
  ["AWS Bedrock Native", "✅", "❌", "❌", "❌"],
  ["Terminal-first", "✅", "✅", "✅", "❌ (IDE)"],
  ["MCP Support", "✅", "❌", "❌", "❌"],
  ["Channel Bots", "✅ Telegram/WeChat", "❌", "❌", "❌"],
  ["Memory System", "✅ Auto + Manual", "❌", "✅ Git-based", "❌"],
  ["Subagents", "✅", "✅", "❌", "❌"],
  ["Self-hosted / Local", "✅", "❌", "✅", "❌"],
  ["Custom Extensions", "✅", "❌", "❌", "❌"],
  ["Free to use", "✅ (BYOK)", "❌ ($20-200/mo)", "✅ (BYOK)", "❌ ($20/mo)"],
];

function Landing() {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary">
      <Nav />
      <Hero />
      <TrustBar />
      <FeaturesSection />
      <ProvidersSection />
      <ChannelsSection />
      <AdvancedGrid />
      <GettingStarted />
      <InstallSection />
      <StructureSection />
      <ComparisonSection />
      <Footer />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 hero-radial" />
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative h-full">
          <div className="scan-line" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-10 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-primary/30 bg-red-primary/10 px-3 py-1 text-[11.5px] font-mono text-red-glow">
                <span className="h-1.5 w-1.5 rounded-full bg-red-glow shadow-[0_0_8px_rgba(252,92,92,0.9)]" />
                v0.15.6 · Open Source · Apache 2.0
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-[44px] sm:text-[72px] lg:text-[104px] xl:text-[120px] font-bold leading-[1.02] sm:leading-[0.98] tracking-[-0.03em]">
                Code at the
                <br />
                speed of <span className="text-red-primary">thought.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl font-display text-[22px] sm:text-[26px] lg:text-[30px] leading-[1.3] tracking-[-0.01em] text-text-primary">
                Stop switching between your terminal, browser, and AI chatbot.
                VivekMind brings a powerful AI agent directly into your shell —
                with <span className="text-red-glow">20+ model providers</span>,
                zero vendor lock-in, and full AWS Bedrock support.
              </p>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-secondary">
                Your keys. Your models. Your workflow. Open-source under Apache 2.0,
                forked from Qwen Code by Google &amp; Alibaba Cloud.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="relative">
                  <CopyCommand command="npm i -g vivekmind" />
                </div>
                <a
                  href="https://github.com/Lnxtanx/vivekmind-cli"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-red-primary/40 bg-transparent px-5 py-3 text-[14px] font-medium text-text-primary hover:bg-red-primary/10 hover:border-red-primary transition"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 overflow-hidden">
                <div className="flex gap-2 whitespace-nowrap marquee">
                  {[...providers, ...providers].map((p, i) => (
                    <span
                      key={i}
                      className="font-mono text-[11.5px] text-text-tertiary px-2"
                    >
                      {p} <span className="text-red-primary/50">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-y-3 gap-x-5 max-w-xl font-mono text-[11.5px] text-text-tertiary">
                {[
                  ["20+", "Providers"],
                  ["40+", "Commands"],
                  ["15+", "Themes"],
                  ["9", "Languages"],
                  ["★", "On GitHub"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="text-text-primary font-display text-base font-semibold">
                      {n}
                    </div>
                    <div className="mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-6 bg-red-primary/[0.06] blur-3xl rounded-full" />
              <div className="relative">
                <HeroTerminal />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- TRUST BAR ---------- */
function TrustBar() {
  return (
    <section className="border-y border-white/[0.06] bg-bg-secondary/60">
      <div className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-4">
          {trustItems.map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className={`flex items-start gap-3 ${
                i !== 0 ? "lg:border-l lg:border-white/[0.06] lg:pl-5" : ""
              }`}
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-red-primary/30 bg-red-primary/10 text-red-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-text-primary">
                  {title}
                </div>
                <div className="text-[11.5px] text-text-secondary">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTION HEADER ---------- */
function SectionHeader({
  eyebrow,
  title,
  benefit,
  desc,
}: {
  eyebrow: string;
  title: string;
  benefit?: string;
  desc?: string;
}) {
  return (
    <Reveal>
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-red-primary">
          <span className="h-px w-6 bg-red-primary/60" />
          {eyebrow}
        </div>
        <h2 className="mt-5 font-display text-4xl sm:text-6xl lg:text-[64px] font-bold leading-[1.05] tracking-[-0.025em]">
          {title}
        </h2>
        {benefit && (
          <p className="mt-6 max-w-3xl font-display text-[22px] sm:text-[26px] lg:text-[28px] leading-[1.35] tracking-[-0.01em] text-text-primary">
            {benefit}
          </p>
        )}
        {desc && (
          <p className="mt-5 text-[16px] leading-relaxed text-text-secondary">
            {desc}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ---------- FEATURES ---------- */
function FeaturesSection() {
  return (
    <section id="features" className="relative py-32">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow="Features"
          title="An AI agent that ships code — not just talk."
          benefit="VivekMind reaches into your files, runs your shell, remembers your project, and lands real changes. The rest of the AI tools are just chat windows."
          desc="Direct file access, shell control, memory across sessions, and a command-driven workflow built for terminals."
        />

        {/* A - Built-in Tools */}
        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <Reveal>
            <FeatureLabel n="A" label="Built-in Tools" icon={Wrench} />
            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              An AI agent that edits, searches, runs, and deploys.
            </h3>
            <p className="mt-4 text-text-secondary leading-relaxed">
              VivekMind gives the AI agent direct access to powerful tools for
              real coding workflows — not just text generation. Edit files,
              search code, run shell commands, manage tasks, and more. All with
              safety controls and sandbox support.
            </p>
            <div className="mt-8 rounded-lg border border-white/[0.08] bg-bg-secondary overflow-hidden">
              <div className="grid grid-cols-[140px_1fr] gap-px bg-white/[0.06] text-[12.5px]">
                <div className="bg-bg-secondary px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                  Tool
                </div>
                <div className="bg-bg-secondary px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                  What it does
                </div>
                {tools.map(([t, d]) => (
                  <Fragment key={t}>
                    <div className="bg-bg-secondary px-4 py-2.5 font-mono text-red-glow">
                      {t}
                    </div>
                    <div className="bg-bg-secondary px-4 py-2.5 text-text-secondary">
                      {d}
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <TerminalWindow title="vivekmind — tools demo">
              <div className="space-y-1">
                <Line c="text-text-primary">$ vivekmind</Line>
                <Line c="text-accent-blue">  &gt; Find all TODO comments and</Line>
                <Line c="text-accent-blue">    create issues for each</Line>
                <Line c="">{"\u00A0"}</Line>
                <Line c="text-text-secondary">  🔧 Grep: /TODO\(.+\)/ in src/**</Line>
                <Line c="text-text-secondary">     ↳ 14 matches in 9 files</Line>
                <Line c="text-text-secondary">  🔧 ReadFile: src/api/auth.ts</Line>
                <Line c="text-accent-yellow">  ✏ TodoWrite: 14 tasks queued</Line>
                <Line c="text-text-secondary">  🔧 Shell: gh issue create ×14</Line>
                <Line c="text-accent-green">  ✓ 14 issues created on GitHub</Line>
              </div>
            </TerminalWindow>
          </Reveal>
        </div>

        {/* B - Commands */}
        <div className="mt-32 grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <Reveal delay={0.05} className="lg:order-2">
            <FeatureLabel n="B" label="40+ Slash Commands" icon={TerminalSquare} />
            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Everything is a slash command away. No mouse, no menus, no friction.
            </h3>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Over 40 built-in commands for session control, configuration, and
              workflow management. From switching models to managing MCP
              servers, from arena mode to exporting conversations.
            </p>
            <p className="mt-3 text-[13px] text-text-tertiary font-mono">
              Create custom commands by adding .md files to{" "}
              <span className="text-red-glow">.vivekmind/commands/</span>
            </p>
          </Reveal>
          <Reveal className="lg:order-1">
            <TerminalWindow title="vivekmind — commands">
              <div className="space-y-3">
                {commandGroups.map((g) => (
                  <div key={g.label}>
                    <div className="text-[10.5px] uppercase tracking-[0.18em] text-text-tertiary">
                      {g.label}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      {g.cmds.map((c) => (
                        <span key={c} className="text-red-glow">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          </Reveal>
        </div>

        {/* C - Memory */}
        <div className="mt-32 grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <Reveal>
            <FeatureLabel n="C" label="Memory System" icon={Brain} />
            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Stop re-explaining your project. VivekMind remembers everything.
            </h3>
            <p className="mt-4 text-text-secondary leading-relaxed">
              VivekMind remembers your project context across sessions —
              automatically. Key facts are extracted from every conversation,
              periodically consolidated, and injected into future prompts.
            </p>
            <ul className="mt-6 space-y-2.5 text-[14px]">
              {[
                ["Auto-extraction", "Key facts extracted from every turn"],
                ["Dream consolidation", "Periodic merge and deduplication"],
                ["Relevance recall", "Relevant memories injected automatically"],
                ["Manual control", "/remember, /forget, /memory, /dream"],
                ["Per-project storage", "~/.vivekmind/auto-memory/"],
              ].map(([t, d]) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-green shadow-[0_0_8px_rgba(72,187,120,0.6)]" />
                  <div>
                    <span className="font-semibold text-text-primary">{t}</span>{" "}
                    <span className="text-text-secondary">— {d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <TerminalWindow title="vivekmind — memory">
              <div className="space-y-1">
                <Line c="text-text-primary">$ vivekmind /memory</Line>
                <Line c="">{"\u00A0"}</Line>
                <Line c="text-red-glow">  PROJECT MEMORY (acme-api)</Line>
                <Line c="text-text-secondary">  ── consolidated 2h ago ──</Line>
                <Line c="">{"\u00A0"}</Line>
                <Line c="text-accent-yellow">  • Auth uses JWT + httpOnly refresh</Line>
                <Line c="text-accent-yellow">  • DB: PostgreSQL via Drizzle</Line>
                <Line c="text-accent-yellow">  • Tests run with vitest, not jest</Line>
                <Line c="text-accent-yellow">  • Deploy: Cloudflare Workers</Line>
                <Line c="text-accent-yellow">  • Style: kebab-case files</Line>
                <Line c="">{"\u00A0"}</Line>
                <Line c="text-text-secondary">  $ /dream — consolidating 47 facts...</Line>
                <Line c="text-accent-green">  ✓ Merged into 18 stable memories</Line>
              </div>
            </TerminalWindow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureLabel({
  n,
  label,
  icon: Icon,
}: {
  n: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-red-primary/30 bg-red-primary/10 font-mono text-[13px] font-bold text-red-primary">
        {n}
      </span>
      <div className="flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-text-tertiary">
        <Icon className="h-3.5 w-3.5 text-red-primary" />
        {label}
      </div>
    </div>
  );
}

function Line({ children, c }: { children: React.ReactNode; c?: string }) {
  return <div className={c}>{children}</div>;
}

/* ---------- PROVIDERS ---------- */
function ProvidersSection() {
  return (
    <section id="providers" className="relative py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow="Providers"
          title="One CLI. Every AI model. No subscription."
          benefit="Point VivekMind at any model from any provider. No monthly fees, no usage caps written by someone else — just your API keys and the models you actually want."
        />
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-2">
            {providers.map((p, i) => (
              <span
                key={p}
                className={`inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-[13px] font-mono transition ${
                  i % 5 === 0
                    ? "border-red-primary/40 bg-red-primary/10 text-red-glow"
                    : "border-white/[0.08] bg-bg-secondary text-text-secondary hover:border-red-primary/40 hover:text-text-primary"
                }`}
              >
                <Cpu className="h-3.5 w-3.5 opacity-70" />
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CHANNELS ---------- */
function ChannelsSection() {
  const channels = [
    {
      name: "Telegram",
      desc: "Full support via grammY framework. Interactive setup, inline keyboards, tool approval, session handoff.",
      badge: "Production",
    },
    {
      name: "WeChat / Weixin",
      desc: "Adapter available for WeChat integration with native messaging support.",
      badge: "Available",
    },
    {
      name: "DingTalk",
      desc: "Adapter available for DingTalk integration. Enterprise-ready.",
      badge: "Available",
    },
    {
      name: "Custom",
      desc: "Build your own channel using the @vivekmind/channel-base plugin framework.",
      badge: "SDK",
    },
  ];

  return (
    <section id="channels" className="relative py-32 border-t border-white/[0.06] bg-bg-secondary/40">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow="Channels"
          title="Your agent. Wherever you chat."
          benefit="Run VivekMind from Telegram, WeChat, or DingTalk — same agent, same project memory, just a different keyboard. Configure once, deploy as a background process."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="group h-full rounded-lg border border-white/[0.08] bg-bg-primary p-6 hover:border-red-primary/40 transition-colors">
                <div className="flex items-center justify-between">
                  <MessageSquare className="h-5 w-5 text-red-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary border border-white/[0.08] rounded px-2 py-0.5">
                    {c.badge}
                  </span>
                </div>
                <div className="mt-5 font-display text-lg font-semibold">
                  {c.name}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                  {c.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12">
            <TerminalWindow title="vivekmind — channel setup">
              <div className="space-y-1">
                <Line c="text-text-primary">$ vivekmind channel configure-telegram</Line>
                <Line c="text-accent-blue">? Enter your Telegram bot token: ****</Line>
                <Line c="text-accent-blue">? Allowed chat IDs (comma separated): 123456,789012</Line>
                <Line c="text-accent-green">✓ Telegram channel configured!</Line>
                <Line c="">{"\u00A0"}</Line>
                <Line c="text-text-primary">$ vivekmind channel start my-telegram</Line>
                <Line c="text-accent-green">✓ Channel "my-telegram" running (PID 48291)</Line>
              </div>
            </TerminalWindow>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- ADVANCED GRID ---------- */
function AdvancedGrid() {
  return (
    <section className="py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow="Capabilities"
          title="Go as deep as you want."
          benefit="Subagents that work in parallel. Skills that auto-activate. MCP servers that add infinite tools. An arena that pits models against each other. VivekMind is deep — here's the rest."
        />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {advFeatures.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.02}>
              <div className="group relative h-full rounded-lg border border-white/[0.08] bg-bg-secondary p-5 hover:border-red-primary/40 hover:bg-bg-elevated transition">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.08] bg-bg-primary text-red-primary group-hover:border-red-primary/40 transition">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-4 font-display text-[15px] font-semibold">
                  {title}
                </div>
                <div className="mt-1 text-[12.5px] text-text-secondary leading-relaxed">
                  {desc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GETTING STARTED ---------- */
function GettingStarted() {
  const steps = [
    {
      n: "01",
      title: "Install",
      body: (
        <>
          <pre className="font-mono text-[13px] text-red-glow">
            npm install -g vivekmind
          </pre>
          <p className="mt-3 text-[12.5px] text-text-tertiary">
            Requires Node.js &gt;= 20
          </p>
        </>
      ),
    },
    {
      n: "02",
      title: "Configure",
      body: (
        <>
          <pre className="font-mono text-[12.5px] text-red-glow whitespace-pre-wrap leading-relaxed">
{`export ANTHROPIC_API_KEY=sk-ant-...
# Or for Bedrock:
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...`}
          </pre>
          <p className="mt-3 text-[12.5px] text-text-tertiary">
            Or run vivekmind — it auto-creates settings on first run.
          </p>
        </>
      ),
    },
    {
      n: "03",
      title: "Code",
      body: (
        <>
          <pre className="font-mono text-[12.5px] text-red-glow whitespace-pre-wrap leading-relaxed">
{`vivekmind                    # Interactive
vm                           # Short alias
vivekmind -p "fix auth.ts"   # One-shot`}
          </pre>
          <p className="mt-3 text-[12.5px] text-text-tertiary">
            That's it. Start coding with an AI in your terminal.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="py-32 border-t border-white/[0.06] bg-bg-secondary/40">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow="Get Started"
          title="Up and running in 60 seconds."
        />
        <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
          <div className="hidden lg:block absolute top-6 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-red-primary/40 to-transparent" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative rounded-lg border border-white/[0.08] bg-bg-primary p-6 h-full">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-red-primary/40 bg-red-primary/15 font-mono text-[12px] font-bold text-red-glow shadow-[0_0_16px_rgba(229,62,62,0.25)]">
                    {s.n}
                  </span>
                  <span className="font-display text-lg font-semibold">
                    {s.title}
                  </span>
                </div>
                <div className="mt-5 rounded-md border border-white/[0.08] bg-[#0d0d10] p-4">
                  {s.body}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- INSTALL ---------- */
function InstallSection() {
  const rows = [
    ["npm (recommended)", "npm install -g vivekmind"],
    [
      "Clone & build",
      "git clone https://github.com/Lnxtanx/vivekmind-cli.git && cd vivekmind-cli && npm ci && npm run build",
    ],
    ["Use short alias", "Run `vm` instead of `vivekmind`"],
  ];

  return (
    <section id="install" className="py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader eyebrow="Install" title="Pick your install path." />
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-[12px] font-mono">
            <span className="inline-flex items-center gap-2 rounded border border-red-primary/40 bg-red-primary/10 px-2.5 py-1 text-red-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-red-glow" />
              v0.15.6
            </span>
            <span className="inline-flex items-center gap-2 rounded border border-white/[0.08] bg-bg-secondary px-2.5 py-1 text-text-secondary">
              Node.js &gt;= 20
            </span>
            <span className="inline-flex items-center gap-2 rounded border border-white/[0.08] bg-bg-secondary px-2.5 py-1 text-text-secondary">
              Apache 2.0
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-hidden rounded-lg border border-white/[0.08]">
            {rows.map(([method, cmd], i) => (
              <div
                key={i}
                className={`grid grid-cols-1 md:grid-cols-[240px_1fr] ${
                  i !== 0 ? "border-t border-white/[0.06]" : ""
                } bg-bg-secondary`}
              >
                <div className="px-5 py-4 text-[13px] font-semibold text-text-primary border-b md:border-b-0 md:border-r border-white/[0.06]">
                  {method}
                </div>
                <div className="px-5 py-4 font-mono text-[12.5px] text-red-glow break-all">
                  {cmd}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- STRUCTURE ---------- */
function StructureSection() {
  const tree = `vivekmind-cli/
  packages/
    cli/                  Main CLI (React + Ink terminal UI)
    core/                 Agent logic, providers, tools, memory, MCP
    web-templates/        HTML/CSS templates for export
    channels/
      base/               Channel framework (ACP bridge, session router)
      telegram/           Telegram bot adapter (grammY)
      weixin/             WeChat adapter
      dingtalk/           DingTalk adapter
      plugin-example/     Reference channel plugin`;

  return (
    <section className="py-32 border-t border-white/[0.06] bg-bg-secondary/40">
      <div className="mx-auto max-w-[1280px] px-6 grid gap-10 lg:grid-cols-[1fr_1.3fr] items-center">
        <Reveal>
          <SectionHeader
            eyebrow="Architecture"
            title="A monorepo built to scale."
            desc="VivekMind is a cleanly separated monorepo — CLI, core agent, and a pluggable channels system. Every part is open and inspectable."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <TerminalWindow title="project structure">
            <pre className="font-mono text-[12.5px] leading-[1.7] text-text-secondary whitespace-pre">
              {tree}
            </pre>
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- COMPARISON ---------- */
function ComparisonSection() {
  const headers = ["Feature", "VivekMind CLI", "Claude Code", "Aider", "Cursor"];

  const cell = (v: string) => {
    if (v.startsWith("✅")) {
      return (
        <span className="inline-flex items-center gap-1.5 text-accent-green">
          <Check className="h-3.5 w-3.5" />
          <span className="text-text-primary text-[12.5px]">{v.replace("✅ ", "").replace("✅", "Yes")}</span>
        </span>
      );
    }
    if (v.startsWith("❌")) {
      return (
        <span className="inline-flex items-center gap-1.5 text-text-tertiary">
          <X className="h-3.5 w-3.5" />
          <span className="text-[12.5px]">{v.replace("❌ ", "").replace("❌", "No")}</span>
        </span>
      );
    }
    return <span className="text-[12.5px] text-text-secondary">{v}</span>;
  };

  return (
    <section className="py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow="Compare"
          title="Why we built VivekMind."
          benefit="Nothing else gave us open-source freedom, multi-provider flexibility, and terminal-native speed — all in one tool. So we built it."
        />
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-x-auto rounded-lg border border-white/[0.08]">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg-secondary">
                  {headers.map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-3.5 text-[11px] uppercase tracking-wider font-mono ${
                        i === 1
                          ? "text-red-glow border-b-2 border-red-primary"
                          : "text-text-tertiary border-b border-white/[0.06]"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className={i % 2 ? "bg-bg-secondary/40" : ""}>
                    {row.map((c, j) => (
                      <td
                        key={j}
                        className={`px-5 py-3.5 border-t border-white/[0.04] ${
                          j === 0
                            ? "text-[13px] font-medium text-text-primary"
                            : j === 1
                              ? "bg-red-primary/[0.04]"
                              : ""
                        }`}
                      >
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

/* ---------- FOOTER ---------- */
function Footer() {
  const products = [
    {
      name: "VivekMind CLI",
      desc: "Terminal AI coding agent",
      href: "#",
      current: true,
    },
    {
      name: "Schema Weaver",
      desc: "PostgreSQL schema management",
      href: "https://vivekmind.com/products",
    },
    {
      name: "FairyForge",
      desc: "Workflow intelligence engine",
      href: "https://vivekmind.com/products",
    },
    {
      name: "VivekMind Press",
      desc: "AI-powered publishing",
      href: "https://vivekmind.com/products",
    },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-bg-secondary/60">
      <div className="mx-auto max-w-[1280px] px-6 py-20">
        {/* product ecosystem */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target={p.current ? undefined : "_blank"}
              rel="noreferrer"
              className={`group rounded-lg border p-5 transition ${
                p.current
                  ? "border-red-primary/50 bg-red-primary/[0.06] red-glow-sm"
                  : "border-white/[0.08] bg-bg-primary hover:border-red-primary/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-[15px] font-semibold text-text-primary">
                  {p.name}
                </div>
                {!p.current && (
                  <ExternalLink className="h-3.5 w-3.5 text-text-tertiary group-hover:text-red-primary transition" />
                )}
              </div>
              <div className="mt-1 text-[12.5px] text-text-secondary">
                {p.desc}
              </div>
            </a>
          ))}
        </div>

        {/* links + contact */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_2fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-primary/15 border border-red-primary/30 text-red-primary">
                <TerminalSquare className="h-4 w-4" />
              </div>
              <span className="font-display text-[15px] font-semibold">
                VivekMind <span className="text-red-primary">CLI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-text-secondary">
              AI-first technology company building intelligent developer tools.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <FooterCol
              title="Product"
              links={[
                ["Features", "#features"],
                ["Providers", "#providers"],
                ["Channels", "#channels"],
                ["Install", "#install"],
                ["Changelog", "#"],
              ]}
            />
            <FooterCol
              title="Resources"
              links={[
                ["Documentation", "https://github.com/Lnxtanx/vivekmind-cli"],
                ["GitHub", "https://github.com/Lnxtanx/vivekmind-cli"],
                ["Blog", "#"],
                ["Contributing", "https://github.com/Lnxtanx/vivekmind-cli"],
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                ["About", "https://vivekmind.com"],
                ["Contact", "mailto:support@vivekmind.com"],
                ["Privacy", "#"],
                ["Terms", "#"],
              ]}
            />
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              Contact
            </div>
            <div className="mt-4 space-y-2">
              <a
                href="mailto:support@vivekmind.com"
                className="flex items-center gap-2 text-[13px] text-text-secondary hover:text-text-primary"
              >
                <Mail className="h-3.5 w-3.5 text-red-primary" />
                support@vivekmind.com
              </a>
              <a
                href="mailto:vivek@vivekmind.com"
                className="flex items-center gap-2 text-[13px] text-text-secondary hover:text-text-primary"
              >
                <Mail className="h-3.5 w-3.5 text-red-primary" />
                vivek@vivekmind.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/[0.06] pt-6 text-[11.5px] text-text-tertiary font-mono">
          <div>© 2026 VivekMind. All rights reserved.</div>
          <div>
            Fork of Qwen Code by Google LLC &amp; Alibaba Cloud. · Built with{" "}
            <span className="text-red-primary">♥</span> for developers.
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
        {title}
      </div>
      <ul className="mt-4 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
