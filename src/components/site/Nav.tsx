import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/vivekmind-logo.png";

const links: { label: string; href: string; route?: boolean }[] = [
  { label: "Docs", href: "/docs", route: true },
  { label: "Features", href: "/#features" },
  { label: "Providers", href: "/#providers" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-neutral-200 bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="VivekMind" className="h-7 w-7 object-contain" />
          <span className="text-[14px] font-bold tracking-tight text-neutral-900">
            VivekMind <span className="font-semibold text-red-600">CLI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) =>
            l.route ? (
              <Link
                key={l.label}
                to={l.href}
                className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                {l.label}
              </a>
            ),
          )}
          <a
            href="https://github.com/Lnxtanx/vivekmind-cli"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-neutral-900"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[14px] text-neutral-600 hover:text-neutral-900"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/Lnxtanx/vivekmind-cli"
              target="_blank"
              rel="noreferrer"
              className="text-[14px] text-neutral-600"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
