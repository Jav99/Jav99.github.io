"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-slate-900 py-24 md:py-32" ref={ref}>
      <div className="max-w-4xl mx-auto px-8 md:px-16 lg:px-24 text-center">
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
          <p className="text-slate-300 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
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
              className="border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"
            >
              View Packages
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
