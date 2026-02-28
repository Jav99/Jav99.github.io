"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 pt-20">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="text-sm uppercase tracking-[0.2em] text-violet-600 font-medium"
        >
          Career Strategist &amp; Ex-Recruiter
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-slate-900 leading-[1.1] mt-6 text-balance"
        >
          Your Resume Is Leaving
          <br />
          Money on the Table.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mt-6"
        >
          I&apos;m Hannah White &mdash; ex-Head of Recruiting at Tier-1 Tech.
          I&apos;ve read 10,000+ resumes. Let me tell you what&apos;s wrong with
          yours.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" href="#audit">
            Rate My Resume &mdash; Free
          </Button>
          <Button size="lg" variant="secondary" href="#services">
            View Services
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-slate-300" />
      </motion.div>
    </section>
  );
}
