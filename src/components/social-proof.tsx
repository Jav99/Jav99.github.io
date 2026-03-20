"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "500+", label: "Executives Coached" },
  { value: "10,000+", label: "Resumes Reviewed" },
  { value: "$2.4M", label: "Salary Negotiated" },
  { value: "98%", label: "Client Satisfaction" },
];

/* Triple the items for seamless infinite loop */
const marqueeItems = [...stats, ...stats, ...stats];

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Section fade-in */
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            once: true,
          },
        }
      );

      /* Infinite marquee ticker */
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth / 3;
        gsap.to(trackRef.current, {
          x: -totalWidth,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-10 md:py-14 overflow-hidden border-y border-slate-100"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-0 whitespace-nowrap will-change-transform"
      >
        {marqueeItems.map((stat, i) => (
          <div key={i} className="flex items-center gap-8 px-8 md:px-12 shrink-0">
            <span className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">
              {stat.label}
            </span>
            <span className="text-slate-200 text-2xl select-none" aria-hidden="true">
              /
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
