"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "Hannah didn\u2019t just rewrite my resume\u2014she repositioned my entire career narrative. Within three weeks, I had interviews at two FAANG companies and a 40% higher salary offer.",
    name: "Sarah Chen",
    role: "Senior Product Manager",
    company: "Previously at Stripe",
  },
  {
    quote:
      "I\u2019d been sending the same resume for months with zero callbacks. Hannah rewrote it in 48 hours. I landed my dream role within a month.",
    name: "Marcus Thompson",
    role: "Engineering Director",
    company: "Previously at Meta",
  },
  {
    quote:
      "The executive package was worth every penny. Hannah\u2019s salary negotiation playbook alone added $35K to my offer. She thinks like a recruiter because she was one.",
    name: "Priya Patel",
    role: "VP of Operations",
    company: "Previously at Deloitte",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-24 md:py-32 lg:py-40 bg-slate-50/80" ref={ref}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-teal-600 font-medium">
            Results
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mt-4">
            What Clients Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-white rounded-3xl shadow-clay border border-slate-100 p-10 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Decorative Quote */}
              <span
                className="absolute -top-4 left-8 text-8xl text-teal-200 font-serif leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <blockquote className="relative z-10">
                <p className="font-serif text-lg md:text-xl leading-relaxed text-slate-800 italic">
                  {t.quote}
                </p>
              </blockquote>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="font-medium text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500 mt-0.5">
                  {t.role}, {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
