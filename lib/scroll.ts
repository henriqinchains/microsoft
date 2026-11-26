"use client";

import type Lenis from "lenis";

const AUTO_SPEED = 550; // px/s

let instance: Lenis | null = null;
let running = false;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

type ScrollOptions = {
  duration?: number;
  easing?: (t: number) => number;
  onComplete?: () => void;
};

/** Rola até um seletor ou posição, usando Lenis quando ativo. */
export function scrollToTarget(
  target: string | number,
  { duration = 1.6, easing, onComplete }: ScrollOptions = {}
) {
  if (instance) {
    instance.scrollTo(target, { duration, easing, onComplete });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
  } else {
    document.querySelector(target)?.scrollIntoView();
  }
  onComplete?.();
}

function resolveY(target: string | number): number | null {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  let y: number;

  if (typeof target === "number") {
    y = target;
  } else {
    const el = document.querySelector(target);
    if (!el) return null;
    y = el.getBoundingClientRect().top + window.scrollY;
  }
  return Math.min(Math.max(y, 0), max);
}

export function stopAutoScroll() {
  if (!running) return;
  running = false;
  if (instance) {
    // stop() + start() cancela a animação em curso e reseta o estado interno do Lenis
    instance.stop();
    instance.start();
  }
}

function startAutoScroll(target: string | number) {
  // Sem Lenis (reduced-motion) ou com scroll travado (ex.: loader): não roda
  if (!instance || instance.isStopped) return;

  const y = resolveY(target);
  if (y === null) return;

  const distance = Math.abs(y - window.scrollY);
  if (distance < 2) return;

  running = true;
  scrollToTarget(y, {
    duration: distance / AUTO_SPEED, // velocidade constante
    easing: (t) => t, // linear
    onComplete: () => {
      running = false;
    },
  });
}

function isTypingTarget(t: EventTarget | null) {
  const el = t as HTMLElement | null;
  return !!el?.closest("input, textarea, select, button, [contenteditable='true']");
}

/** Espaço alterna o auto-scroll até `target` (padrão: fim da página). Retorna cleanup. */
export function autoScroll(target: string | number = Number.POSITIVE_INFINITY) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code !== "Space" || e.repeat || isTypingTarget(e.target)) return;
    e.preventDefault();
    if (running) stopAutoScroll();
    else startAutoScroll(target);
  };

  const onInterrupt = () => stopAutoScroll();

  // capture: true => roda antes do listener do Lenis
  const opts = { passive: true, capture: true } as const;

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("wheel", onInterrupt, opts);
  window.addEventListener("touchstart", onInterrupt, opts);
  window.addEventListener("mousedown", onInterrupt, opts);

  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("wheel", onInterrupt, opts);
    window.removeEventListener("touchstart", onInterrupt, opts);
    window.removeEventListener("mousedown", onInterrupt, opts);
    stopAutoScroll();
  };
}