"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global aura background — vivid gradient blobs that drift down
 * through the entire page as the user scrolls, synced with Lenis
 * via GSAP ScrollTrigger for perfectly smooth parallax.
 */
export function AuraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Blob 1: teal — drifts right and down */
      gsap.to(".aura-blob-1", {
        x: "25vw",
        y: "70vh",
        scale: 1.4,
        opacity: 1,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
        },
      });

      /* Blob 2: lime — drifts left and down */
      gsap.to(".aura-blob-2", {
        x: "-30vw",
        y: "75vh",
        scale: 1.3,
        opacity: 0.9,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
        },
      });

      /* Blob 3: subtle cyan accent — slow drift */
      gsap.to(".aura-blob-3", {
        x: "-10vw",
        y: "50vh",
        scale: 1.25,
        opacity: 0.7,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 4,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Teal blob */}
      <div
        className="aura-blob-1 absolute rounded-full"
        style={{
          width: "min(900px, 80vw)",
          height: "min(900px, 80vw)",
          left: "-10%",
          top: "-5%",
          background:
            "radial-gradient(circle, rgba(120, 215, 245, 0.45) 0%, rgba(140, 225, 250, 0.2) 30%, rgba(170, 238, 255, 0.06) 55%, transparent 72%)",
          filter: "blur(50px)",
          willChange: "transform, opacity",
          opacity: 0.7,
        }}
      />
      {/* Lime / yellow blob */}
      <div
        className="aura-blob-2 absolute rounded-full"
        style={{
          width: "min(850px, 75vw)",
          height: "min(850px, 75vw)",
          right: "-15%",
          top: "0%",
          background:
            "radial-gradient(circle, rgba(210, 235, 60, 0.4) 0%, rgba(215, 240, 80, 0.18) 30%, rgba(225, 248, 110, 0.05) 55%, transparent 72%)",
          filter: "blur(50px)",
          willChange: "transform, opacity",
          opacity: 0.6,
        }}
      />
      {/* Subtle cyan accent */}
      <div
        className="aura-blob-3 absolute rounded-full"
        style={{
          width: "min(600px, 60vw)",
          height: "min(600px, 60vw)",
          left: "30%",
          top: "20%",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(20, 184, 166, 0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform, opacity",
          opacity: 0.3,
        }}
      />
    </div>
  );
}
