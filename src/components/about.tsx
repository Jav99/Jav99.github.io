"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  "Ex-Head of Recruiting",
  "Tier-1 Tech",
  "10,000+ Resumes",
  "500+ Executives",
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
        <div className="about-grid grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Portrait */}
          <div className="about-image">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-teal-50 to-slate-50 border border-slate-100 overflow-hidden">
              <img
                src="/hannah.jpg"
                alt="Hannah White — Career Strategist and Ex-Recruiter"
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
              I spent a decade as Head of Recruiting at companies you'd
              recognize instantly. I've sat across the table from 10,000+
              candidates. I know exactly what makes a hiring manager stop
              scrolling—and what makes them hit delete.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed mt-4">
              Now I use that insider knowledge to architect resumes that don't
              just get interviews—they command top-tier offers. No templates.
              No AI-generated filler. Just sharp, strategic positioning that
              reflects your actual value.
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
      </div>
    </section>
  );
}
