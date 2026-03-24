"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula nulla at urna fermentum, eget tincidunt arcu venenatis. Sed auctor ligula in justo bibendum, a facilisis lorem placerat.",
  },
  {
    question: "How does the process work from start to finish?",
    answer:
      "Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui, vestibulum id ligula porta felis euismod semper.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur.",
  },
  {
    question: "What does it cost?",
    answer:
      "Maecenas faucibus mollis interdum. Duis mollis est non commodo luctus, nisi erat porttitor ligula. Fusce dapibus tellus ac cursus commodo, tortor mauris condimentum nibh.",
  },
  {
    question: "Do you work with clients remotely?",
    answer:
      "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla.",
  },
  {
    question: "How do I get started?",
    answer:
      "Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
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
