"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "Resume rewrites, LinkedIn profile optimization, and full career positioning packages. Every service is personally handled by Hannah. No templates, no outsourcing.",
  },
  {
    question: "How does the process work from start to finish?",
    answer:
      "Start with a free AI resume audit to see your score. Choose a package, then Hannah personally rewrites your resume using recruiter tested strategy. You'll receive your final draft within 72 hours, plus one round of revisions.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most resume rewrites are delivered within 72 hours. The LinkedIn Bundle typically takes 3 to 4 business days since it includes your profile optimization and banner design.",
  },
  {
    question: "What does it cost?",
    answer:
      "The Resume Rewrite is $149 and the LinkedIn Bundle is $249. Both are one time investments. No subscriptions, no hidden fees.",
  },
  {
    question: "Do you work with clients remotely?",
    answer:
      "Yes, 100%. Everything is handled online. Clients come from across the US and internationally. You'll upload your resume, receive your rewrite by email, and submit revision notes all without a single meeting unless you want one.",
  },
  {
    question: "How do I get started?",
    answer:
      "Use the free AI resume audit at the top of this page. Once you see your score, pick the package that fits your goals and check out. Hannah will get started within 24 hours of purchase.",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-header",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".faq-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-24 md:py-32 lg:py-40 bg-slate-50/80"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="faq-header text-center mb-16 md:mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-teal-600 font-medium">
            Answers
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mt-4">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-list max-w-3xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="faq-item border-b border-slate-200 first:border-t"
              >
                <button
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center justify-between gap-4 py-6 px-6 text-left transition-colors duration-200 ${
                    isOpen
                      ? "border-l-[3px] border-l-[#1D9E75] bg-slate-50"
                      : "border-l-[3px] border-l-transparent hover:bg-slate-100/60"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg md:text-xl font-semibold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 flex items-center justify-center text-slate-400 text-2xl leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-[350ms]"
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div className="px-6 pb-6 pt-0 ml-[3px]">
                    <p className="text-slate-500 leading-relaxed">
                      {faq.answer}
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
