import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCommand({
  command,
  className = "",
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      /* ignore */
    }
  };
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      onClick={onCopy}
      className={`group inline-flex items-center gap-3 rounded-md bg-red-primary px-5 py-3 text-[14px] font-medium text-white shadow-[0_0_0_1px_rgba(229,62,62,0.5),0_12px_32px_-10px_rgba(229,62,62,0.7)] hover:bg-red-glow transition-all pulse-glow ${className}`}
    >
      <span className="font-mono text-text-primary/90">$</span>
      <span className="font-mono">{command}</span>
      <span className="ml-2 flex h-6 w-6 items-center justify-center rounded bg-white/10 group-hover:bg-white/20 transition">
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </span>
      {copied && (
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 rounded bg-bg-elevated border border-white/10 px-2 py-1 text-[11px] text-text-primary">
          Copied!
        </span>
      )}
    </button>
  );
}
