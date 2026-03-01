"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

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
  animClass = "animate-float",
}: {
  children: React.ReactNode;
  className?: string;
  animClass?: string;
}) {
  return (
    <div
      className={`floating-card absolute bg-slate-900/70 backdrop-blur-xl border border-slate-700/40 rounded-2xl px-4 py-3 shadow-xl opacity-0 ${animClass} ${className}`}
    >
      {children}
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial transform states (opacity handled via CSS class)
      gsap.set(".hero-animate", { y: 24 });
      gsap.set(".hero-phone", { y: 40 });
      gsap.set(".floating-card", { scale: 0.85, y: 10 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      // Stagger hero text elements in
      tl.to(".hero-animate", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
      });

      // Phone mockup slides up
      tl.to(
        ".hero-phone",
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "-=0.4"
      );

      // Floating stat cards pop in with stagger
      tl.to(
        ".floating-card",
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-surface-dark overflow-hidden"
    >
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
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="hero-animate opacity-0 text-sm uppercase tracking-[0.25em] text-teal-400 font-medium">
            Career Strategist &amp; Ex-Recruiter
          </p>

          {/* Headline */}
          <h1 className="hero-animate opacity-0 font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05] mt-6 text-balance">
            Your Resume Is
            <br />
            <span className="bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
              Costing You Money.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-animate opacity-0 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mt-6">
            I&apos;m Hannah White &mdash; ex-Head of Recruiting at Tier-1 Tech.
            I&apos;ve read 10,000+ resumes. Let me tell you what&apos;s wrong
            with yours.
          </p>

          {/* CTAs */}
          <div className="hero-animate opacity-0 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </div>
        </div>

        {/* Phone mockup with floating cards */}
        <div className="hero-phone opacity-0 relative mt-16 md:mt-20">
          <PhoneMockup />

          {/* Floating stat cards */}
          <FloatingCard
            className="-left-20 md:-left-36 top-6"
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
            animClass="animate-float-slow"
          >
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                Interview Rate
              </p>
              <p className="text-white font-semibold text-sm">3x Higher</p>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
}
