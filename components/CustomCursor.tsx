"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let raf: number;

    const themeColors: Record<string, { main: string; glow: string }> = {
      violet: { main: "#c084fc", glow: "rgba(168, 85, 247, 0.4)" },
      amber: { main: "#fbbf24", glow: "rgba(251, 191, 36, 0.4)" },
      emerald: { main: "#00ff88", glow: "rgba(0, 255, 136, 0.4)" },
    };

    let currentColor = themeColors.emerald;

    const applyThemeColor = (themeName: string) => {
      currentColor = themeColors[themeName] || themeColors.emerald;
      if (dotRef.current) {
        dotRef.current.style.backgroundColor = currentColor.main;
        dotRef.current.style.boxShadow = `0 0 8px ${currentColor.main}, 0 0 16px ${currentColor.main}`;
      }
      if (ringRef.current) {
        ringRef.current.style.borderColor = currentColor.main;
        ringRef.current.style.boxShadow = isHovering
          ? `0 0 18px ${currentColor.main}, inset 0 0 10px ${currentColor.glow}`
          : `0 0 12px ${currentColor.glow}, inset 0 0 8px ${currentColor.glow}`;
      }
    };

    // Apply active theme immediately on mount
    const activeTheme = document.documentElement.getAttribute("data-theme") || "emerald";
    applyThemeColor(activeTheme);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        const scale = isHovering ? 1.3 : 1;
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(${scale})`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        // Center offset: default 26px circle -> 13px; hover 36px circle -> 18px
        const offset = isHovering ? 18 : 13;
        ringRef.current.style.transform = `translate(${ringX - offset}px, ${ringY - offset}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      isHovering = true;
      if (ringRef.current) {
        ringRef.current.classList.add("cursor-hover");
        ringRef.current.style.borderColor = currentColor.main;
        ringRef.current.style.boxShadow = `0 0 18px ${currentColor.main}, inset 0 0 10px ${currentColor.glow}`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(1.3)`;
      }
    };

    const onMouseLeaveLink = () => {
      isHovering = false;
      if (ringRef.current) {
        ringRef.current.classList.remove("cursor-hover");
        ringRef.current.style.borderColor = currentColor.main;
        ringRef.current.style.boxShadow = `0 0 12px ${currentColor.glow}, inset 0 0 8px ${currentColor.glow}`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(1)`;
      }
    };

    const addLinkListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    const handleThemeChange = (e: Event) => {
      const customEvt = e as CustomEvent<string>;
      applyThemeColor(customEvt.detail);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("themeChange", handleThemeChange);
    raf = requestAnimationFrame(animate);
    addLinkListeners();

    // Re-add listeners if DOM changes
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("themeChange", handleThemeChange);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Center dot - precise 6px */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full z-[99999] pointer-events-none cursor-dot"
        style={{ willChange: "transform" }}
      />
      {/* Outer trailing ring - compact 26px */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[26px] h-[26px] rounded-full z-[99998] pointer-events-none cursor-ring"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
