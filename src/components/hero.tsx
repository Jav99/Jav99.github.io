"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] md:w-[300px]">
      <div className="relative rounded-[36px] border-[6px] border-slate-700/80 bg-white overflow-hidden shadow-2xl shadow-black/40">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-700/80 rounded-b-xl z-10" />

        {/* Resume content */}
        <div className="px-5 pt-8 pb-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
              <span className="text-teal-600 text-[10px] font-bold">HW</span>
            </div>
            <div className="space-y-1">
              <div className="h-2 w-20 bg-slate-800 rounded-full" />
              <div className="h-1.5 w-14 bg-slate-300 rounded-full" />
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <div className="h-1.5 w-16 bg-teal-500 rounded-full" />
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-200 rounded-full" />
              <div className="h-1 w-4/5 bg-slate-200 rounded-full" />
              <div className="h-1 w-3/5 bg-slate-200 rounded-full" />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <div className="h-1.5 w-12 bg-teal-500 rounded-full" />
            <div className="flex gap-1.5 flex-wrap">
              <div className="h-4 w-12 bg-teal-50 rounded-full" />
              <div className="h-4 w-16 bg-teal-50 rounded-full" />
              <div className="h-4 w-10 bg-teal-50 rounded-full" />
              <div className="h-4 w-14 bg-teal-50 rounded-full" />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <div className="h-1.5 w-14 bg-teal-500 rounded-full" />
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-100 rounded-full" />
              <div className="h-1 w-5/6 bg-slate-100 rounded-full" />
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-2">
            <div className="h-1.5 w-[72px] bg-teal-500 rounded-full" />
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-200 rounded-full" />
              <div className="h-1 w-4/5 bg-slate-200 rounded-full" />
              <div className="h-1 w-full bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCard({
  children,
  className,
  delay = 0,
  animClass = "animate-float",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animClass?: string;
}) {
  return (
    <motion.div
      className={`absolute bg-slate-900/70 backdrop-blur-xl border border-slate-700/40 rounded-2xl px-4 py-3 shadow-xl ${animClass} ${className}`}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen bg-surface-dark overflow-hidden">
      {/* Aura glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full aura-blob animate-aura-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(20, 184, 166, 0.18) 0%, rgba(6, 182, 212, 0.08) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full aura-blob animate-aura-drift-reverse"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(20, 184, 166, 0.04) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-16 lg:px-24 pt-24 pb-16">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-sm uppercase tracking-[0.25em] text-teal-400 font-medium"
          >
            Career Strategist &amp; Ex-Recruiter
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05] mt-6 text-balance"
          >
            Your Resume Is
            <br />
            <span className="bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
              Costing You Money.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mt-6"
          >
            I&apos;m Hannah White &mdash; ex-Head of Recruiting at Tier-1 Tech.
            I&apos;ve read 10,000+ resumes. Let me tell you what&apos;s wrong
            with yours.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" href="#audit">
              Rate My Resume &mdash; Free
            </Button>
            <Button
              size="lg"
              variant="secondary"
              href="#services"
              className="border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-white/5"
            >
              View Services
            </Button>
          </motion.div>
        </motion.div>

        {/* Phone mockup with floating cards */}
        <motion.div
          className="relative mt-16 md:mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          <PhoneMockup />

          {/* Floating stat cards */}
          <FloatingCard
            className="-left-20 md:-left-36 top-6"
            delay={0.8}
            animClass="animate-float"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border-2 border-teal-400 flex items-center justify-center">
                <span className="text-teal-400 text-[11px] font-bold">92</span>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Resume Score
                </p>
                <p className="text-white font-semibold text-sm">92 / 100</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="-right-16 md:-right-32 top-20"
            delay={1.0}
            animClass="animate-float-delayed"
          >
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                Salary Impact
              </p>
              <p className="text-teal-400 font-bold text-lg leading-tight">
                +40%
              </p>
            </div>
          </FloatingCard>

          <FloatingCard
            className="-left-12 md:-left-28 bottom-12"
            delay={1.2}
            animClass="animate-float-slow"
          >
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                Interview Rate
              </p>
              <p className="text-white font-semibold text-sm">3x Higher</p>
            </div>
          </FloatingCard>
        </motion.div>
      </div>
    </section>
  );
}
