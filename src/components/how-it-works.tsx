"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Upload & Audit",
    description:
      "Drop your resume and get an instant AI-powered score. See exactly where your resume excels and where it falls short.",
  },
  {
    number: "02",
    title: "Choose Your Package",
    description:
      "Select the strategy tier that fits your career goals. From a single rewrite to a full executive positioning overhaul.",
  },
  {
    number: "03",
    title: "Hannah Rewrites",
    description:
      "Your resume is personally rewritten by Hannah with recruiter-tested language, quantified impact, and strategic positioning.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".step-card", { y: 30 });

      gsap.to(".step-card", {
        scrollTrigger: {
          trigger: ".steps-grid",
          start: "top 85%",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-24 md:py-32 lg:py-40 bg-white"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-teal-600 font-medium">
            The Process
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mt-4">
            How It Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="steps-grid grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="step-card opacity-0 relative text-center md:text-left"
            >
              {/* Large Background Number */}
              <span className="text-7xl md:text-8xl font-bold text-slate-100 font-serif leading-none select-none">
                {step.number}
              </span>
              <h3 className="font-serif text-xl font-semibold text-slate-900 mt-4">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mt-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
