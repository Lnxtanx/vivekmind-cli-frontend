import { useEffect, useState } from "react";
import { TerminalWindow } from "./TerminalWindow";

type Line = { text: string; cls?: string; delay?: number };

const LINES: Line[] = [
  { text: "$ vivekmind", cls: "text-text-primary" },
  { text: "" },
  { text: "  VivekMind v0.15.6", cls: "text-red-glow" },
  { text: "  Model: claude-opus-4-7 (Bedrock)", cls: "text-text-secondary" },
  { text: "  Session: new", cls: "text-text-secondary" },
  { text: "" },
  { text: "  > Refactor the auth module to use", cls: "text-accent-blue" },
  { text: "    JWT tokens with refresh rotation", cls: "text-accent-blue" },
  { text: "" },
  { text: "  📁 Reading src/auth/handler.ts", cls: "text-text-secondary" },
  { text: "  📁 Reading src/auth/middleware.ts", cls: "text-text-secondary" },
  { text: "  ✏  Editing src/auth/handler.ts", cls: "text-accent-yellow" },
  { text: "  ✏  Editing src/auth/middleware.ts", cls: "text-accent-yellow" },
  { text: "  🧪 Running npm test", cls: "text-text-secondary" },
  { text: "  ✓  All 12 tests passing", cls: "text-accent-green" },
  { text: "" },
  { text: "  Done. Refactored auth module with", cls: "text-text-primary" },
  { text: "  JWT + refresh token rotation.", cls: "text-text-primary" },
];

export function HeroTerminal() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 400 : 110);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <TerminalWindow glow title="vivekmind — bash">
      <div className="min-h-[420px]">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className={l.cls ?? "text-text-primary"}>
            {l.text || "\u00A0"}
          </div>
        ))}
        {shown < LINES.length && (
          <span className="inline-block h-[14px] w-[8px] bg-red-glow blink" />
        )}
      </div>
    </TerminalWindow>
  );
}
