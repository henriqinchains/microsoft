"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis, autoScroll } from "@/lib/scroll";

/**
 * Lenis suaviza o scroll real da página; o ScrollTrigger lê essa mesma posição,
 * então animações e (futuramente) vídeos continuam presos ao scroll.
 * Com prefers-reduced-motion o scroll nativo é mantido.
 * Barra de espaço liga/desliga o auto-scroll até o fim da página.
 */
export function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let cleanupAuto: (() => void) | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
      cleanupAuto = autoScroll();
    }

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cleanupAuto?.();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}