"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const THEME_PALETTES: Record<string, { colors: string[]; lineBase: string }> = {
      emerald: {
        colors: ["rgba(0,255,136", "rgba(0,212,255", "rgba(124,58,237"],
        lineBase: "rgba(0,255,136",
      },
      amber: {
        colors: ["rgba(251,191,36", "rgba(245,158,11", "rgba(217,119,6"],
        lineBase: "rgba(251,191,36",
      },
      violet: {
        colors: ["rgba(192,132,252", "rgba(56,189,248", "rgba(168,85,247"],
        lineBase: "rgba(192,132,252",
      },
    };

    let activeTheme = document.documentElement.getAttribute("data-theme") || "emerald";
    let currentPalette = THEME_PALETTES[activeTheme] || THEME_PALETTES.emerald;

    // Particles
    const PARTICLE_COUNT = 60;
    type Particle = {
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; colorIndex: number;
    };

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      colorIndex: Math.floor(Math.random() * currentPalette.colors.length),
    }));

    const onThemeChange = (e: Event) => {
      const customEvt = e as CustomEvent<string>;
      activeTheme = customEvt.detail || "emerald";
      currentPalette = THEME_PALETTES[activeTheme] || THEME_PALETTES.emerald;
    };
    window.addEventListener("themeChange", onThemeChange);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${currentPalette.lineBase},${0.06 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const colorPrefix = currentPalette.colors[p.colorIndex % currentPalette.colors.length];
        ctx.fillStyle = `${colorPrefix},${p.alpha})`;
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themeChange", onThemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
