"use client";

import { useEffect, useRef } from "react";

/**
 * Global aura background — vivid gradient blobs that drift down
 * through the entire page as the user scrolls, creating a living,
 * breathing ambient light effect behind all content.
 */
export function AuraBackground() {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let current = 0;
    let running = true;

    function tick() {
      if (!running) return;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const raw = docHeight > 0 ? window.scrollY / docHeight : 0;

      /* Smooth lerp — buttery interpolation */
      current += (raw - current) * 0.04;
      const p = current;

      /* Blob 1: teal — starts top-left of hero, drifts right and down */
      if (blob1.current) {
        const x = -5 + p * 30;
        const y = 8 + p * 75;
        blob1.current.style.transform =
          `translate(${x}vw, ${y}vh) scale(${1 + p * 0.4})`;
        blob1.current.style.opacity = `${0.7 + p * 0.3}`;
      }

      /* Blob 2: lime/yellow — starts top-right, drifts left and down */
      if (blob2.current) {
        const x = 5 - p * 35;
        const y = 15 + p * 80;
        blob2.current.style.transform =
          `translate(${x}vw, ${y}vh) scale(${1 + p * 0.3})`;
        blob2.current.style.opacity = `${0.6 + p * 0.3}`;
      }

      /* Blob 3: subtle cyan — mid-page accent, drifts slowly */
      if (blob3.current) {
        const x = 10 - p * 15;
        const y = 30 + p * 55;
        blob3.current.style.transform =
          `translate(${x}vw, ${y}vh) scale(${1 + p * 0.25})`;
        blob3.current.style.opacity = `${0.3 + p * 0.4}`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Teal blob */}
      <div
        ref={blob1}
        className="absolute rounded-full"
        style={{
          width: "min(900px, 80vw)",
          height: "min(900px, 80vw)",
          left: "-10%",
          top: "-5%",
          background:
            "radial-gradient(circle, rgba(120, 215, 245, 0.45) 0%, rgba(140, 225, 250, 0.2) 30%, rgba(170, 238, 255, 0.06) 55%, transparent 72%)",
          filter: "blur(50px)",
          willChange: "transform, opacity",
        }}
      />
      {/* Lime / yellow blob */}
      <div
        ref={blob2}
        className="absolute rounded-full"
        style={{
          width: "min(850px, 75vw)",
          height: "min(850px, 75vw)",
          right: "-15%",
          top: "0%",
          background:
            "radial-gradient(circle, rgba(210, 235, 60, 0.4) 0%, rgba(215, 240, 80, 0.18) 30%, rgba(225, 248, 110, 0.05) 55%, transparent 72%)",
          filter: "blur(50px)",
          willChange: "transform, opacity",
        }}
      />
      {/* Subtle cyan accent */}
      <div
        ref={blob3}
        className="absolute rounded-full"
        style={{
          width: "min(600px, 60vw)",
          height: "min(600px, 60vw)",
          left: "30%",
          top: "20%",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(20, 184, 166, 0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
