import { type ReactNode } from "react";

export function TerminalWindow({
  title = "terminal",
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-neutral-200 bg-[#1a1b26] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#24253a] px-3.5 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10px] text-white/25">
          {title}
        </span>
      </div>
      <div className="p-4 font-mono text-[13px] leading-[1.6] text-white/90">
        {children}
      </div>
    </div>
  );
}
