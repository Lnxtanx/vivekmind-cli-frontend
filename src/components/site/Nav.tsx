import { useEffect, useState } from "react";
import { Github, Menu, X, Terminal } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links: { label: string; href: string; route?: boolean }[] = [
  { label: "Docs", href: "/docs", route: true },
  { label: "Features", href: "/#features" },
  { label: "Providers", href: "/#providers" },
  { label: "Channels", href: "/#channels" },
  { label: "Blog", href: "#" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#0a0a0b]/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-primary/15 border border-red-primary/30 text-red-primary group-hover:red-glow-sm transition-shadow">
            <Terminal className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="font-display text-[15px] font-semibold tracking-tight">
            VivekMind <span className="text-red-primary">CLI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.route ? (
              <Link
                key={l.label}
                to={l.href}
                className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Lnxtanx/vivekmind-cli"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-white/5 transition"
            aria-label="GitHub"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <a
            href="#install"
            className="group relative inline-flex items-center gap-2 rounded-md bg-red-primary px-3.5 py-2 text-[13px] font-medium text-white shadow-[0_0_0_1px_rgba(229,62,62,0.5),0_8px_24px_-8px_rgba(229,62,62,0.6)] hover:bg-red-glow transition-all"
          >
            <span>Install</span>
            <span className="font-mono text-[11px] opacity-70 group-hover:opacity-100">
              npm i -g vivekmind
            </span>
          </a>
        </div>

        <button
          className="md:hidden p-2 text-text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0a0a0b]/95 backdrop-blur-xl">
          <div className="px-6 py-5 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-text-secondary hover:text-text-primary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/Lnxtanx/vivekmind-cli"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-text-secondary"
            >
              GitHub
            </a>
            <a
              href="#install"
              className="inline-flex justify-center rounded-md bg-red-primary px-4 py-2.5 text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Install
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
