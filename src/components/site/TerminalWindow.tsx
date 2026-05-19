import { type ReactNode } from "react";

export function TerminalWindow({
  title = "vivekmind — bash",
  children,
  className = "",
  glow = false,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-white/10 bg-[#0d0d10] ${
        glow ? "red-glow" : ""
      } ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#15151a] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-text-tertiary">
          {title}
        </span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-[1.65] text-text-primary/90">
        {children}
      </div>
    </div>
  );
}
