"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Content fades up */
      gsap.fromTo(
        ".final-cta-content > *",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      /* Aura blob subtle scale on scroll */
      gsap.to(".final-aura", {
        scale: 1.3,
        opacity: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 3,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-surface-dark py-24 md:py-32 overflow-hidden"
    >
      {/* Aura glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="final-aura absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="final-cta-content relative z-10 max-w-4xl mx-auto px-8 md:px-16 lg:px-24 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-tighter">
          Ready to Architect
          <br />
          Your Career?
        </h2>
        <p className="text-slate-400 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          Stop sending a resume that undersells you. Let Hannah position you
          for the role and salary you deserve.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" href="#audit">
            Get Started
          </Button>
          <Button
            size="lg"
            variant="secondary"
            href="#services"
            className="border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-white/5"
          >
            View Packages
          </Button>
        </div>
      </div>
    </section>
  );
}
