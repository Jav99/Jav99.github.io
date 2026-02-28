"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 bg-surface-dark py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Aura glow for CTA */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full aura-blob animate-aura-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
