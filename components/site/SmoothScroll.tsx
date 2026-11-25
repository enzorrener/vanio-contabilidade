"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Rolagem suave (Lenis). Mantém a rolagem nativa (só suaviza), então
// position: sticky das seções presas continua funcionando. Com movimento
// reduzido no sistema, não liga. Âncoras (#areas etc.) rolam suave.

let current: Lenis | null = null;
export const getLenis = () => current;

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, anchors: { offset: -20 } });
    current = lenis;
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (current === lenis) current = null;
      html.style.scrollBehavior = prev;
    };
  }, []);
  return null;
}
