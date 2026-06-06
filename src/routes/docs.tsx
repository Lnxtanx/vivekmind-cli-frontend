import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronRight,
  Info,
  AlertTriangle,
  Lightbulb,
  Menu,
  X,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs — VivekMind CLI" },
      {
        name: "description",
        content:
          "Install, configure, and master VivekMind CLI. Guides for Mac, Windows, Linux, providers, memory, MCP, channels and more.",
      },
      { property: "og:title", content: "VivekMind CLI — Documentation" },
      {
        property: "og:description",
        content:
          "Get VivekMind running in 60 seconds. Full installation, configuration, and feature guides.",
      },
    ],
  }),
  component: DocsPage,
});

type Section = { id: string; label: string };
type Group = { label: string; items: Section[] };

const groups: Group[] = [
  {
    label: "Getting Started",
    items: [
      { id: "install-mac", label: "Installation (Mac)" },
      { id: "install-windows", label: "Installation (Windows)" },
      { id: "install-linux", label: "Installation (Linux)" },
      { id: "quick-start", label: "Quick Start" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { id: "settings-file", label: "Settings File" },
      { id: "env-vars", label: "Environment Variables" },
      { id: "project-config", label: "Project Config" },
    ],
  },
  {
    label: "AI Providers",
    items: [
      { id: "aws-bedrock", label: "AWS Bedrock" },
      { id: "anthropic", label: "Anthropic" },
      { id: "openai", label: "OpenAI" },
      { id: "gemini", label: "Gemini" },
      { id: "multi-provider", label: "Multi-Provider" },
    ],
  },
  {
    label: "Features",
    items: [
      { id: "memory", label: "Memory" },
      { id: "subagents", label: "Subagents" },
      { id: "skills", label: "Skills" },
      { id: "mcp", label: "MCP" },
      { id: "extensions", label: "Extensions" },
    ],
  },
  {
    label: "Channels",
    items: [
      { id: "telegram", label: "Telegram" },
      { id: "wechat", label: "WeChat" },
      { id: "dingtalk", label: "DingTalk" },
    ],
  },
  {
    label: "Advanced",
    items: [
      { id: "headless", label: "Headless / CI" },
      { id: "arena", label: "Arena" },
      { id: "hooks", label: "Hooks" },
      { id: "cron", label: "Cron" },
      { id: "sandbox", label: "Sandbox" },
    ],
  },
];

function DocsPage() {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary">
      <Nav />
      <div className="mx-auto max-w-[1280px] px-6 pt-28 pb-24">
        <Breadcrumbs />
        <div className="mt-6 grid gap-10 lg:grid-cols-[240px_1fr]">
          <Sidebar />
          <main className="min-w-0">
            <Header />
            <InstallMac />
            <InstallWindows />
            <InstallLinux />
            <QuickStart />
            <SettingsFile />
            <EnvVars />
            <ProjectConfig />
            <AWSBedrock />
            <Anthropic />
            <OpenAI />
            <Gemini />
            <MultiProvider />
            <Memory />
            <Subagents />
            <Skills />
            <MCP />
            <Extensions />
            <Telegram />
            <WeChat />
            <DingTalk />
            <Headless />
            <Arena />
            <Hooks />
            <Cron />
            <Sandbox />
            <PrevNext />
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------- LAYOUT ---------- */

function Breadcrumbs() {
  return (
    <div className="flex items-center gap-2 text-[12px] font-mono text-text-tertiary">
      <a href="/" className="hover:text-text-primary">Home</a>
      <ChevronRight className="h-3 w-3" />
      <span className="text-text-secondary">Docs</span>
    </div>
  );
}

function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="lg:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-bg-secondary px-3 py-2 text-[13px] text-text-secondary"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          Browse docs
        </button>
        {open && (
          <div className="mt-3 rounded-lg border border-white/[0.08] bg-bg-secondary p-4">
            <SidebarList onClick={() => setOpen(false)} />
          </div>
        )}
      </div>

      <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
        <SidebarList />
      </aside>
    </>
  );
}

function SidebarList({ onClick }: { onClick?: () => void }) {
  return (
    <nav className="space-y-6">
      {groups.map((g) => (
        <div key={g.label}>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-text-tertiary">
            {g.label}
          </div>
          <ul className="mt-3 space-y-1.5 border-l border-white/[0.06] pl-3">
            {g.items.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  onClick={onClick}
                  className="block text-[13px] text-text-secondary hover:text-red-glow transition-colors"
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Header() {
  return (
    <div className="border-b border-white/[0.06] pb-8">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-red-primary">
        Documentation · v0.15.6
      </div>
      <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight">
        Get up and running.
      </h1>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-text-secondary">
        Install VivekMind on any machine, plug in your favorite AI provider, and
        start coding from your terminal. Everything you need is on this page.
      </p>
    </div>
  );
}

/* ---------- PRIMITIVES ---------- */

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 mt-20 font-display text-3xl sm:text-4xl font-bold tracking-tight"
    >
      {children}
    </h2>
  );
}
function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 font-display text-xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
      {children}
    </p>
  );
}
function Code({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[12.5px] rounded bg-red-primary/10 text-red-glow px-1.5 py-0.5">
      {children}
    </span>
  );
}
function Block({ lang, children }: { lang?: string; children: string }) {
  return (
    <div className="mt-5 overflow-hidden rounded-md border border-white/[0.08] bg-[#0d0d10]">
      <div className="flex items-center justify-between border-t-2 border-red-primary/60 border-b border-white/[0.06] bg-bg-secondary px-4 py-1.5">
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-tertiary">
          {lang ?? "shell"}
        </span>
      </div>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-[1.7] text-text-primary/90 whitespace-pre">
        {children}
      </pre>
    </div>
  );
}

function Callout({
  kind,
  title,
  children,
}: {
  kind: "tip" | "note" | "warning";
  title: string;
  children: React.ReactNode;
}) {
  const cfg = {
    tip: { Icon: Lightbulb, color: "text-accent-green", border: "border-accent-green/60", bg: "bg-accent-green/[0.05]" },
    note: { Icon: Info, color: "text-accent-blue", border: "border-accent-blue/60", bg: "bg-accent-blue/[0.05]" },
    warning: { Icon: AlertTriangle, color: "text-accent-yellow", border: "border-accent-yellow/60", bg: "bg-accent-yellow/[0.05]" },
  }[kind];
  const { Icon } = cfg;
  return (
    <div className={`mt-5 flex gap-3 rounded-md border border-white/[0.06] ${cfg.bg} border-l-2 ${cfg.border} p-4`}>
      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${cfg.color}`} />
      <div className="text-[13.5px]">
        <div className={`font-semibold ${cfg.color}`}>{title}</div>
        <div className="mt-1 text-text-secondary leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* ---------- SECTIONS ---------- */

function InstallMac() {
  return (
    <section>
      <H2 id="install-mac">Installation — macOS</H2>
      <P>
        VivekMind runs on Node.js 20+. The fastest way is with Homebrew.
      </P>
      <Block lang="bash">{`brew install node            # Node.js 20+
npm install -g vivekmind
vivekmind --version`}</Block>
      <H3>Troubleshooting</H3>
      <P>
        If you see <Code>EACCES</Code> permission errors when installing globally,
        switch npm to a user-owned prefix:
      </P>
      <Block lang="bash">{`mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc`}</Block>
      <Callout kind="note" title="Requirements">
        macOS 12 (Monterey) or later. Apple Silicon and Intel both supported.
      </Callout>
    </section>
  );
}

function InstallWindows() {
  return (
    <section>
      <H2 id="install-windows">Installation — Windows</H2>
      <P>Install Node.js via winget (or download from nodejs.org), then install VivekMind globally.</P>
      <Block lang="powershell">{`winget install OpenJS.NodeJS.LTS
npm install -g vivekmind
vivekmind --version`}</Block>
      <H3>Troubleshooting</H3>
      <P>
        If global install fails with a permission error, run PowerShell as
        Administrator. Restart your terminal after install so the new <Code>PATH</Code>
        is picked up.
      </P>
      <Callout kind="note" title="Requirements">
        Windows 10 build 19041+ or Windows 11. PowerShell 7+ recommended.
        WSL2 is fully supported — install via the Linux instructions inside WSL.
      </Callout>
    </section>
  );
}

function InstallLinux() {
  return (
    <section>
      <H2 id="install-linux">Installation — Linux</H2>
      <H3>Ubuntu / Debian</H3>
      <Block lang="bash">{`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g vivekmind`}</Block>
      <H3>Fedora</H3>
      <Block lang="bash">{`sudo dnf install -y nodejs npm
npm install -g vivekmind`}</Block>
      <H3>Arch</H3>
      <Block lang="bash">{`sudo pacman -S nodejs npm
npm install -g vivekmind`}</Block>
      <Callout kind="tip" title="No sudo for global installs">
        Configure a user prefix with <Code>npm config set prefix ~/.npm-global</Code>
        and add <Code>~/.npm-global/bin</Code> to your <Code>PATH</Code>.
      </Callout>
    </section>
  );
}

function QuickStart() {
  return (
    <section>
      <H2 id="quick-start">Quick Start</H2>
      <P>Three steps. Sixty seconds.</P>
      <H3>1. Set a provider key</H3>
      <Block lang="bash">{`# Anthropic
export ANTHROPIC_API_KEY=sk-ant-...

# AWS Bedrock
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...

# OpenAI
export OPENAI_API_KEY=sk-...

# Gemini
export GEMINI_API_KEY=...

# Ollama (local, no key needed)
export OLLAMA_HOST=http://localhost:11434`}</Block>
      <H3>2. Run it</H3>
      <Block lang="bash">{`vivekmind        # auto-creates ~/.vivekmind/settings.json on first run`}</Block>
      <H3>3. Prompt naturally</H3>
      <Block>{`> Refactor src/auth to use JWT with refresh tokens
> Add tests for the cart reducer
> Find every unused export in this repo`}</Block>
      <H3>One-shot mode</H3>
      <Block lang="bash">{`vivekmind -p "fix the failing test in src/api/auth.test.ts"`}</Block>
    </section>
  );
}

function SettingsFile() {
  return (
    <section>
      <H2 id="settings-file">Settings File</H2>
      <P>
        VivekMind reads <Code>~/.vivekmind/settings.json</Code> on startup. You can
        edit it directly or via <Code>/settings</Code> inside the CLI.
      </P>
      <Block lang="json">{`{
  "provider": "bedrock",
  "model": "anthropic.claude-opus-4-v1:0",
  "theme": "tokyo-night",
  "vim": true,
  "memory": { "auto": true, "consolidateEvery": 50 }
}`}</Block>
    </section>
  );
}

function EnvVars() {
  return (
    <section>
      <H2 id="env-vars">Environment Variables</H2>
      <P>Every provider is configured purely through env vars — no dashboards, no logins.</P>
      <Block lang="bash">{`ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...
GEMINI_API_KEY=...
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
OLLAMA_HOST=http://localhost:11434
VIVEKMIND_LOG_LEVEL=info`}</Block>
    </section>
  );
}

function ProjectConfig() {
  return (
    <section>
      <H2 id="project-config">Project Config</H2>
      <P>
        Drop a <Code>.vivekmind/</Code> folder at the root of any repo to override
        global config, add custom slash commands, and seed project memory.
      </P>
      <Block>{`.vivekmind/
  config.json          # per-project overrides
  commands/            # *.md files become /commands
  memory/              # seeded project knowledge`}</Block>
    </section>
  );
}

function AWSBedrock() {
  return (
    <section>
      <H2 id="aws-bedrock">AWS Bedrock</H2>
      <P>First-class Bedrock support — Claude, Llama, Mistral, and Titan models all work natively.</P>
      <Block lang="bash">{`export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
vivekmind /model anthropic.claude-opus-4-v1:0`}</Block>
      <Callout kind="tip" title="IAM least privilege">
        VivekMind only needs <Code>bedrock:InvokeModel</Code> and
        <Code> bedrock:InvokeModelWithResponseStream</Code>.
      </Callout>
    </section>
  );
}

function Anthropic() {
  return (
    <section>
      <H2 id="anthropic">Anthropic</H2>
      <Block lang="bash">{`export ANTHROPIC_API_KEY=sk-ant-...
vivekmind /model claude-sonnet-4`}</Block>
    </section>
  );
}

function OpenAI() {
  return (
    <section>
      <H2 id="openai">OpenAI</H2>
      <Block lang="bash">{`export OPENAI_API_KEY=sk-...
vivekmind /model gpt-5`}</Block>
    </section>
  );
}

function Gemini() {
  return (
    <section>
      <H2 id="gemini">Gemini</H2>
      <Block lang="bash">{`export GEMINI_API_KEY=...
vivekmind /model gemini-2.5-pro`}</Block>
    </section>
  );
}

function MultiProvider() {
  return (
    <section>
      <H2 id="multi-provider">Multi-Provider</H2>
      <P>
        Switch providers mid-session with <Code>/model</Code>. Run multiple in parallel
        with <Code>/arena</Code> to compare answers head-to-head.
      </P>
    </section>
  );
}

function Memory() {
  return (
    <section>
      <H2 id="memory">Memory</H2>
      <P>
        VivekMind auto-extracts facts from every turn and consolidates them into
        long-term project memory. Inspect with <Code>/memory</Code>, save with
        <Code>/remember</Code>, drop with <Code>/forget</Code>.
      </P>
    </section>
  );
}

function Subagents() {
  return (
    <section>
      <H2 id="subagents">Subagents</H2>
      <P>Spawn focused subagents to tackle parts of a task in parallel.</P>
      <Block>{`> Use a subagent to write tests while you refactor the handler.`}</Block>
    </section>
  );
}

function Skills() {
  return (
    <section>
      <H2 id="skills">Skills</H2>
      <P>
        Skills are reusable, conditionally-activated knowledge bundles. Drop a
        <Code> SKILL.md</Code> + helpers into <Code>.vivekmind/skills/</Code>.
      </P>
    </section>
  );
}

function MCP() {
  return (
    <section>
      <H2 id="mcp">MCP</H2>
      <P>Connect any Model Context Protocol server for unlimited extra tools.</P>
      <Block lang="json">{`{
  "mcpServers": {
    "filesystem": { "command": "npx", "args": ["-y", "@mcp/filesystem"] },
    "postgres":   { "command": "npx", "args": ["-y", "@mcp/postgres", "$DATABASE_URL"] }
  }
}`}</Block>
    </section>
  );
}

function Extensions() {
  return (
    <section>
      <H2 id="extensions">Extensions</H2>
      <P>Install community extensions from GitHub or npm via <Code>/extensions install</Code>.</P>
    </section>
  );
}

function Telegram() {
  return (
    <section>
      <H2 id="telegram">Telegram</H2>
      <Block lang="bash">{`vivekmind channel configure-telegram
vivekmind channel start my-telegram`}</Block>
    </section>
  );
}

function WeChat() {
  return (
    <section>
      <H2 id="wechat">WeChat</H2>
      <P>Use the WeChat adapter to talk to VivekMind from Weixin.</P>
    </section>
  );
}

function DingTalk() {
  return (
    <section>
      <H2 id="dingtalk">DingTalk</H2>
      <P>Enterprise-ready DingTalk adapter, ideal for team workflows.</P>
    </section>
  );
}

function Headless() {
  return (
    <section>
      <H2 id="headless">Headless / CI</H2>
      <Block lang="bash">{`vivekmind -p "regenerate openapi.yaml from src/routes" --json`}</Block>
    </section>
  );
}

function Arena() {
  return (
    <section>
      <H2 id="arena">Arena</H2>
      <P>Pit two or more models against each other on the same prompt and compare.</P>
      <Block>{`/arena claude-opus-4 vs gpt-5 vs gemini-2.5-pro`}</Block>
    </section>
  );
}

function Hooks() {
  return (
    <section>
      <H2 id="hooks">Hooks</H2>
      <P>Run shell commands or HTTP webhooks before/after any tool execution.</P>
    </section>
  );
}

function Cron() {
  return (
    <section>
      <H2 id="cron">Cron</H2>
      <P>Schedule recurring tasks directly from the CLI.</P>
      <Block>{`/cron "0 9 * * *" "summarize yesterday's commits"`}</Block>
    </section>
  );
}

function Sandbox() {
  return (
    <section>
      <H2 id="sandbox">Sandbox</H2>
      <P>Run shell tools inside Docker or Podman for safer execution.</P>
    </section>
  );
}

function PrevNext() {
  return (
    <div className="mt-24 grid gap-3 sm:grid-cols-2 border-t border-white/[0.06] pt-8">
      <a
        href="#install-mac"
        className="group rounded-lg border border-white/[0.08] bg-bg-secondary p-5 hover:border-red-primary/40 transition"
      >
        <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-text-tertiary">
          ← Back to top
        </div>
        <div className="mt-1 font-display text-[15px] font-semibold">
          Installation
        </div>
      </a>
      <a
        href="https://github.com/Lnxtanx/vivekmind-cli"
        target="_blank"
        rel="noreferrer"
        className="group rounded-lg border border-white/[0.08] bg-bg-secondary p-5 text-right hover:border-red-primary/40 transition"
      >
        <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-text-tertiary">
          Next →
        </div>
        <div className="mt-1 font-display text-[15px] font-semibold">
          Read the source on GitHub
        </div>
      </a>
    </div>
  );
}
