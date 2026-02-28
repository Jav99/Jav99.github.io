"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const credentials = [
  "Ex-Head of Recruiting",
  "Tier-1 Tech",
  "10,000+ Resumes",
  "500+ Executives",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative z-10 py-24 md:py-32 lg:py-40" ref={ref}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Visual / Portrait Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-teal-50 to-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
              <div className="text-center px-12">
                <span className="font-serif text-8xl text-teal-200 select-none">
                  HW
                </span>
                <p className="text-sm text-slate-300 mt-4 uppercase tracking-widest">
                  Portrait
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-teal-600 font-medium">
              Your Strategist
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mt-4">
              Meet Hannah White
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mt-6">
              I spent a decade as Head of Recruiting at companies you&apos;d
              recognize instantly. I&apos;ve sat across the table from 10,000+
              candidates. I know exactly what makes a hiring manager stop
              scrolling&mdash;and what makes them hit delete.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed mt-4">
              Now I use that insider knowledge to architect resumes that don&apos;t
              just get interviews&mdash;they command top-tier offers. No templates.
              No AI-generated filler. Just sharp, strategic positioning that
              reflects your actual value.
            </p>

            {/* Credential Tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              {credentials.map((cred) => (
                <span
                  key={cred}
                  className="px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium border border-teal-100"
                >
                  {cred}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <Button size="lg" href="#services">
                Work With Hannah
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
