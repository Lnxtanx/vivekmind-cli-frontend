import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronRight,
  Info,
  AlertTriangle,
  Lightbulb,
  Menu,
  X,
  Copy,
  Check,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs — VivekMind CLI" },
      {
        name: "description",
        content: "Install, configure, and master VivekMind CLI.",
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
      { id: "install", label: "Installation" },
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
    label: "Advanced",
    items: [
      { id: "headless", label: "Headless / CI" },
      { id: "arena", label: "Arena" },
      { id: "sandbox", label: "Sandbox" },
    ],
  },
];

function DocsPage() {
  return (
    <div className="relative min-h-screen bg-white text-neutral-900">
      <Nav />
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-20">
        <Breadcrumbs />
        <div className="mt-6 grid gap-10 lg:grid-cols-[200px_1fr]">
          <Sidebar />
          <main className="min-w-0">
            <Header />
            <Install />
            <QuickStart />
            <SettingsFile />
            <EnvVars />
            <ProjectConfig />
            <AWSBedrock />
            <Anthropic />
            <OpenAI />
            <Gemini />
            <Memory />
            <Subagents />
            <Skills />
            <MCP />
            <Extensions />
            <Headless />
            <Arena />
            <Sandbox />
          </main>
        </div>
      </div>
    </div>
  );
}

/* ── layout ── */

function Breadcrumbs() {
  return (
    <div className="flex items-center gap-2 text-[12px] text-neutral-400">
      <a href="/" className="hover:text-neutral-700">Home</a>
      <ChevronRight className="h-3 w-3" />
      <span className="text-neutral-600">Docs</span>
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
          className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-[13px] text-neutral-600"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          Browse docs
        </button>
        {open && (
          <div className="mt-3 rounded-lg border border-neutral-200 bg-white p-4">
            <SidebarList onClick={() => setOpen(false)} />
          </div>
        )}
      </div>
      <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
        <SidebarList />
      </aside>
    </>
  );
}

function SidebarList({ onClick }: { onClick?: () => void }) {
  return (
    <nav className="space-y-5">
      {groups.map((g) => (
        <div key={g.label}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
            {g.label}
          </div>
          <ul className="mt-2 space-y-1 border-l border-neutral-200 pl-3">
            {g.items.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  onClick={onClick}
                  className="block text-[13px] text-neutral-500 hover:text-red-600 transition-colors"
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
    <div className="border-b border-neutral-200 pb-6">
      <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-red-600">
        Documentation
      </p>
      <h1 className="mt-2 font-display text-[32px] sm:text-[40px] font-bold leading-[1.1] tracking-tight">
        Get up and running
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-500">
        Install VivekMind, plug in your favorite AI provider, and start coding.
      </p>
    </div>
  );
}

/* ── primitives ── */

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 mt-16 font-display text-[24px] sm:text-[28px] font-bold tracking-tight">
      {children}
    </h2>
  );
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 text-[16px] font-semibold">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">{children}</p>;
}
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[12px] rounded bg-neutral-100 text-red-600 px-1.5 py-0.5">
      {children}
    </code>
  );
}

function Block({ lang, children }: { lang?: string; children: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200 bg-[#1a1b26]">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#24253a] px-4 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/25">
          {lang ?? "shell"}
        </span>
        <button onClick={onCopy} className="p-1 rounded text-white/25 hover:text-white/60 transition" aria-label="Copy">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[12.5px] leading-[1.6] text-white/85 whitespace-pre">
        {children}
      </pre>
    </div>
  );
}

function Callout({ kind, title, children }: { kind: "tip" | "note" | "warning"; title: string; children: React.ReactNode }) {
  const cfg = {
    tip: { Icon: Lightbulb, color: "text-emerald-600", border: "border-l-emerald-500", bg: "bg-emerald-50" },
    note: { Icon: Info, color: "text-blue-600", border: "border-l-blue-500", bg: "bg-blue-50" },
    warning: { Icon: AlertTriangle, color: "text-amber-600", border: "border-l-amber-500", bg: "bg-amber-50" },
  }[kind];
  const { Icon } = cfg;
  return (
    <div className={`mt-4 flex gap-3 rounded-lg ${cfg.bg} border-l-2 ${cfg.border} p-4`}>
      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${cfg.color}`} />
      <div className="text-[13px]">
        <div className={`font-semibold ${cfg.color}`}>{title}</div>
        <div className="mt-1 text-neutral-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* ── sections ── */

function Install() {
  return (
    <section>
      <H2 id="install">Installation</H2>
      <P>VivekMind CLI requires Node.js 20 or later.</P>

      <H3>macOS</H3>
      <Block lang="bash">{`brew install node
npm install -g vivekmind`}</Block>

      <H3>Windows</H3>
      <Block lang="powershell">{`winget install OpenJS.NodeJS.LTS
npm install -g vivekmind`}</Block>

      <H3>Linux (Ubuntu/Debian)</H3>
      <Block lang="bash">{`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g vivekmind`}</Block>

      <H3>Verify</H3>
      <Block lang="bash">{`vivekmind --version`}</Block>

      <Callout kind="tip" title="Permission errors?">
        Use <Code>npm config set prefix ~/.npm-global</Code> and add <Code>~/.npm-global/bin</Code> to your PATH.
      </Callout>
    </section>
  );
}

function QuickStart() {
  return (
    <section>
      <H2 id="quick-start">Quick Start</H2>

      <H3>1. Set a provider key</H3>
      <Block lang="bash">{`export ANTHROPIC_API_KEY=sk-ant-...
# or
export OPENAI_API_KEY=sk-...
# or
export GEMINI_API_KEY=...`}</Block>

      <H3>2. Run</H3>
      <Block lang="bash">{`vivekmind`}</Block>

      <H3>3. One-shot mode</H3>
      <Block lang="bash">{`vivekmind -p "fix the failing test in src/api/auth.test.ts"`}</Block>
    </section>
  );
}

function SettingsFile() {
  return (
    <section>
      <H2 id="settings-file">Settings File</H2>
      <P>VivekMind reads <Code>~/.vivekmind/settings.json</Code> on startup.</P>
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
      <Block lang="bash">{`ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...
GEMINI_API_KEY=...
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
OLLAMA_HOST=http://localhost:11434`}</Block>
    </section>
  );
}

function ProjectConfig() {
  return (
    <section>
      <H2 id="project-config">Project Config</H2>
      <P>Drop a <Code>.vivekmind/</Code> folder at the root of any repo.</P>
      <Block>{`.vivekmind/
  config.json     # per-project overrides
  commands/       # *.md → /commands
  memory/         # seeded project knowledge`}</Block>
    </section>
  );
}

function AWSBedrock() {
  return (
    <section>
      <H2 id="aws-bedrock">AWS Bedrock</H2>
      <Block lang="bash">{`export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
vivekmind /model anthropic.claude-opus-4-v1:0`}</Block>
      <Callout kind="tip" title="IAM">
        Only needs <Code>bedrock:InvokeModel</Code> and <Code>bedrock:InvokeModelWithResponseStream</Code>.
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

function Memory() {
  return (
    <section>
      <H2 id="memory">Memory</H2>
      <P>Auto-extracts facts from conversations and consolidates them. Use <Code>/memory</Code>, <Code>/remember</Code>, <Code>/forget</Code>.</P>
    </section>
  );
}

function Subagents() {
  return (
    <section>
      <H2 id="subagents">Subagents</H2>
      <P>Spawn focused subagents to tackle parts of a task in parallel.</P>
    </section>
  );
}

function Skills() {
  return (
    <section>
      <H2 id="skills">Skills</H2>
      <P>Reusable, conditionally-activated knowledge bundles. Drop <Code>SKILL.md</Code> into <Code>.vivekmind/skills/</Code>.</P>
    </section>
  );
}

function MCP() {
  return (
    <section>
      <H2 id="mcp">MCP</H2>
      <P>Connect any Model Context Protocol server.</P>
      <Block lang="json">{`{
  "mcpServers": {
    "filesystem": { "command": "npx", "args": ["-y", "@mcp/filesystem"] },
    "postgres": { "command": "npx", "args": ["-y", "@mcp/postgres", "$DATABASE_URL"] }
  }
}`}</Block>
    </section>
  );
}

function Extensions() {
  return (
    <section>
      <H2 id="extensions">Extensions</H2>
      <P>Install community extensions via <Code>/extensions install</Code>.</P>
    </section>
  );
}

function Headless() {
  return (
    <section>
      <H2 id="headless">Headless / CI</H2>
      <Block lang="bash">{`vivekmind -p "regenerate openapi.yaml" --json`}</Block>
    </section>
  );
}

function Arena() {
  return (
    <section>
      <H2 id="arena">Arena</H2>
      <P>Compare models head-to-head on the same prompt.</P>
      <Block>{`/arena claude-opus-4 vs gpt-5 vs gemini-2.5-pro`}</Block>
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
