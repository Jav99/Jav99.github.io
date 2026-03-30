"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  "15 Years in Recruiting",
  "Career Strategist",
  "Resume Specialist",
  "Interview Coach",
];

const processSteps = [
  {
    number: "01",
    title: "Strategic Audit",
    description:
      "Every rewrite starts with a deep dive into your current resume. I use proprietary AI tools alongside my recruiter eye to identify exactly what's working, what's not, and what's missing entirely.",
  },
  {
    number: "02",
    title: "Gap Analysis",
    description:
      "I break down the what and the why. You'll see where your resume falls short, which sections are costing you interviews, and what hiring managers are looking for that you're not giving them.",
  },
  {
    number: "03",
    title: "Role Alignment",
    description:
      "I pull apart the job description and map it against your experience. Then I reconstruct your resume so every bullet, every metric, and every section speaks directly to what recruiters screening that role actually care about.",
  },
  {
    number: "04",
    title: "ATS Optimization",
    description:
      "Your resume gets formatted and keyword optimized to pass applicant tracking systems. The right terms in the right places so your application reaches a human instead of disappearing into a database.",
  },
  {
    number: "05",
    title: "Line by Line Polish",
    description:
      "Grammar, spelling, phrasing, consistency. Every sentence gets tightened. Weak verbs get replaced. Filler gets cut. What's left is clean, sharp, and intentional.",
  },
  {
    number: "06",
    title: "Professional Formatting",
    description:
      "I apply a proven, recruiter tested template designed for readability. Single column, clean hierarchy, no clutter. It looks polished without trying too hard.",
  },
  {
    number: "07",
    title: "Delivery",
    description:
      "You receive your finished resume by email as both a PDF and an editable Word doc. Ready to submit, ready to land interviews.",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Image slides in from left */
      gsap.fromTo(
        ".about-image",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-grid",
            start: "top 80%",
            once: true,
          },
        }
      );

      /* Bio text slides in from right with stagger */
      gsap.fromTo(
        ".about-text > *",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-grid",
            start: "top 80%",
            once: true,
          },
        }
      );

      /* Credential badges pop in */
      gsap.fromTo(
        ".cred-badge",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".cred-badges",
            start: "top 90%",
            once: true,
          },
        }
      );

      /* Parallax on image */
      gsap.to(".about-image", {
        y: -40,
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* Process sub-heading fade in */
      gsap.fromTo(
        ".process-header > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-header",
            start: "top 85%",
            once: true,
          },
        }
      );

      /* Process steps: each row fades in on scroll */
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        /* Number fades in first */
        const num = step.querySelector(".step-num");
        const content = step.querySelector(".step-content");

        if (num) {
          gsap.fromTo(
            num,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* ── Part A: Hannah's Identity ── */}
        <div className="about-grid grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-start">
          {/* Left: Portrait */}
          <div className="about-image">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-teal-50 to-slate-50 border border-slate-100 overflow-hidden">
              <img
                src="/hannah.jpg"
                alt="Hannah White, Career Strategist and Resume Specialist"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/hannah.svg";
                }}
              />
            </div>
          </div>

          {/* Right: Bio */}
          <div className="about-text">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-600 font-medium">
              Your Strategist
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mt-4">
              Meet Hannah White
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mt-6">
              After 15 years in recruiting, I've reviewed thousands of resumes.
              Most of them made the same mistakes. Good candidates with real
              experience were getting passed over because their resume didn't
              communicate their value in the first six seconds.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed mt-4">
              I started this because I got tired of watching talented people
              sell themselves short. I know what recruiters and hiring managers
              actually look for, and I use that knowledge to rewrite resumes
              that land interviews. No templates, no filler. Just clean,
              strategic positioning built on what actually works.
            </p>

            {/* Credential Tags */}
            <div className="cred-badges flex flex-wrap gap-3 mt-8">
              {credentials.map((cred) => (
                <span
                  key={cred}
                  className="cred-badge px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium border border-teal-100"
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
          </div>
        </div>

        {/* ── Part B: Visual Transition ── */}
        <div className="process-header mt-24 md:mt-32">
          <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tighter text-slate-900">
            How I Rewrite Your Resume
          </h3>
          <div className="w-20 h-px bg-[#8ECDB5] mt-6" />
        </div>

        {/* ── Part C: The 7 Process Steps ── */}
        <div className="mt-12 md:mt-16 space-y-16 md:space-y-20">
          {processSteps.map((step, i) => {
            const isEven = i % 2 === 1;

            return (
              <div
                key={step.number}
                className="process-step relative"
              >
                {/* Desktop: alternating layout */}
                <div
                  className={`hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 items-start ${
                    isEven ? "" : ""
                  }`}
                >
                  {/* Left column */}
                  {!isEven ? (
                    <>
                      <div className="relative flex items-start justify-end">
                        <span className="step-num font-serif text-[100px] lg:text-[120px] leading-none font-bold text-[#8ECDB5] opacity-[0.35] select-none">
                          {step.number}
                        </span>
                      </div>
                      <div className="flex items-center self-center">
                        <div className="w-12 lg:w-16 h-px bg-[#8ECDB5]" />
                      </div>
                      <div className="step-content self-center">
                        <h4 className="font-serif text-xl md:text-2xl font-semibold text-slate-900">
                          {step.title}
                        </h4>
                        <p className="text-slate-500 leading-relaxed mt-2 max-w-md text-[15px]">
                          {step.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="step-content self-center text-right">
                        <h4 className="font-serif text-xl md:text-2xl font-semibold text-slate-900">
                          {step.title}
                        </h4>
                        <p className="text-slate-500 leading-relaxed mt-2 max-w-md ml-auto text-[15px]">
                          {step.description}
                        </p>
                      </div>
                      <div className="flex items-center self-center">
                        <div className="w-12 lg:w-16 h-px bg-[#8ECDB5]" />
                      </div>
                      <div className="relative flex items-start">
                        <span className="step-num font-serif text-[100px] lg:text-[120px] leading-none font-bold text-[#8ECDB5] opacity-[0.35] select-none">
                          {step.number}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile: stacked layout */}
                <div className="md:hidden">
                  <span className="step-num font-serif text-[70px] leading-none font-bold text-[#8ECDB5] opacity-[0.35] select-none block">
                    {step.number}
                  </span>
                  <div className="w-10 h-px bg-[#8ECDB5] mt-2 mb-4" />
                  <div className="step-content">
                    <h4 className="font-serif text-xl font-semibold text-slate-900">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed mt-2 text-[15px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
