import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Puzzle,
  Check,
  X,
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
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { HeroTerminal } from "@/components/site/HeroTerminal";
import { Reveal } from "@/components/site/Reveal";
import { InActionTerminal, CommandsTerminal, MemoryTerminal } from "@/components/site/InteractiveFeatures";
import logo from "@/assets/vivekmind-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VivekMind CLI — AWS-Native Terminal AI Coding Agent" },
      {
        name: "description",
        content:
          "Open-source terminal AI coding assistant native to AWS Bedrock. Run Claude, Gemini, OpenAI, DeepSeek, and Grok in your terminal securely. BYOK — bring your own keys.",
      },
      {
        property: "og:title",
        content: "VivekMind CLI — AWS-Native Terminal AI Coding Agent",
      },
      {
        property: "og:description",
        content:
          "Open-source terminal AI coding assistant native to AWS Bedrock. Run Claude, Gemini, OpenAI, DeepSeek, and Grok in your terminal securely.",
      },
      { property: "og:url", content: "https://code.vivekmind.com/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "VivekMind" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "VivekMind CLI — AWS-Native Terminal AI Coding Agent" },
      { name: "twitter:description", content: "Open-source terminal AI coding assistant native to AWS Bedrock. Multi-model support with BYOK." },
    ],
    links: [
      { rel: "canonical", href: "https://code.vivekmind.com/" }
    ]
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



/* ── page ── */

function Landing() {
  return (
    <div className="relative min-h-screen text-text-primary bg-white">
      <Nav />
      <Hero />
      <FeaturesSection />
      <ProvidersSection />
      <AdvancedGrid />
      <PackagesSection />
      <ComparisonSection />
      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "VivekMind CLI",
            "description": "Open-source AWS-native terminal AI coding assistant. Connect Claude, GPT, Gemini, DeepSeek, and 20+ providers with your own API keys.",
            "operatingSystem": "Windows, macOS, Linux",
            "applicationCategory": "DeveloperApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "downloadUrl": "https://github.com/Lnxtanx/vivekmind-cli",
            "installUrl": "https://www.npmjs.com/package/vivekmind",
            "softwareVersion": "1.0.0",
            "license": "https://opensource.org/licenses/Apache-2.0",
            "programmingLanguage": "TypeScript",
            "author": {
              "@type": "Organization",
              "name": "VivekMind",
              "url": "https://vivekmind.com"
            },
            "sameAs": [
              "https://github.com/Lnxtanx/vivekmind-cli",
              "https://www.npmjs.com/package/vivekmind"
            ]
          }),
        }}
      />
    </div>
  );
}

/* ═══════════════════════ PACKAGES ═══════════════════════ */

function PackagesSection() {
  const packagesList = [
    { name: "vivekmind", desc: "CLI entrypoint, TUI display, interactive settings, and command handlers" },
    { name: "@vivekmind/core", desc: "Core agentic engine, LLM client connections, permissions manager, loop detection, and telemetry" },
    { name: "@vivekmind/web-templates", desc: "Frontend UI templates for HTML outputs, chat history exports, and interactive developer insights" },
    { name: "@vivekmind/channel-base", desc: "Standard interfaces, types, and bridge connections for daemon-based chat channels" },
    { name: "@vivekmind/channel-telegram", desc: "Telegram adapter leveraging Grammy and markdown formatters for real-time status updates" },
    { name: "@vivekmind/channel-weixin", desc: "WeChat adapter enabling secure login and messaging integrations" },
    { name: "@vivekmind/channel-dingtalk", desc: "DingTalk adapter supporting stream connections and business workflow hooks" },
  ];

  return (
    <section id="packages" className="py-20 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-red-600">Architecture</p>
          <h2 className="mt-3 font-display text-[28px] sm:text-[36px] font-bold tracking-tight text-neutral-900">
            Modular Package Ecosystem
          </h2>
          <p className="mt-4 max-w-xl text-[15px] text-neutral-500 leading-relaxed">
            VivekMind CLI is structured as a monorepo workspace to separate core execution, TUI displays, and channel integrations.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packagesList.map(({ name, desc }) => (
            <Reveal key={name}>
              <div className="rounded-lg border border-neutral-200 bg-white p-5 hover:border-red-300 transition duration-200">
                <span className="font-mono text-[13px] font-bold text-red-600">{name}</span>
                <p className="mt-2 text-[12.5px] text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ HERO ═══════════════════════ */

function Hero() {
  const os = useOS();
  const installCmds = {
    windows: "npm i -g vivekmind",
    mac: "npm i -g vivekmind",
    linux: "npm i -g vivekmind",
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
