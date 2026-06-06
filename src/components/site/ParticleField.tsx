import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  hx: number; // home x
  hy: number; // home y
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  bright: boolean;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    const RADIUS = 150;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 240 : 650;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        // Vignette: edges denser. Use bias toward edges by rejection.
        let x = 0;
        let y = 0;
        for (let tries = 0; tries < 4; tries++) {
          const cx = Math.random() * width;
          const cy = Math.random() * height;
          const dx = (cx - width / 2) / (width / 2);
          const dy = (cy - height / 2) / (height / 2);
          const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));
          // Accept with prob proportional to edge distance
          if (Math.random() < 0.25 + dist * 0.75) {
            x = cx;
            y = cy;
            break;
          }
          x = cx;
          y = cy;
        }
        const bright = Math.random() < 0.08;
        particles.push({
          x,
          y,
          hx: x,
          hy: y,
          vx: 0,
          vy: 0,
          size: bright ? 1.6 + Math.random() * 0.6 : 0.8 + Math.random() * 1.0,
          alpha: 0.18 + Math.random() * 0.42,
          bright,
        });
      }
    };

    const onMove = (x: number, y: number) => {
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const handleMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    };
    const handleTouchEnd = () => onLeave();

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    window.addEventListener("resize", resize);
    resize();

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // repel
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < RADIUS * RADIUS) {
            const d = Math.sqrt(d2) || 0.001;
            const f = (1 - d / RADIUS) * 2.4;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        // spring back to home
        const sx = (p.hx - p.x) * 0.025;
        const sy = (p.hy - p.y) * 0.025;
        p.vx = (p.vx + sx) * 0.88;
        p.vy = (p.vy + sy) * 0.88;
        p.x += p.vx;
        p.y += p.vy;

        // brightness boost based on displacement
        const ddx = p.x - p.hx;
        const ddy = p.y - p.hy;
        const disp = Math.min(1, Math.sqrt(ddx * ddx + ddy * ddy) / 60);
        const a = Math.min(0.95, p.alpha + disp * 0.5);

        if (p.bright) {
          ctx.shadowBlur = 3;
          ctx.shadowColor = "rgba(252, 92, 92, 0.6)";
          ctx.fillStyle = `rgba(252, 92, 92, ${a})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(229, 62, 62, ${a})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };

    if (!reduced) {
      raf = requestAnimationFrame(tick);
    } else {
      // single static render
      tick();
      cancelAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ touchAction: "none" }}
    />
  );
}
