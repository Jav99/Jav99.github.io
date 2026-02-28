"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Resume Rewrite",
    price: "$497",
    period: "one-time",
    features: [
      "Full resume rewrite",
      "ATS-optimized formatting",
      "48-hour turnaround",
      "1 round of revisions",
    ],
    featured: false,
  },
  {
    name: "Career Strategy",
    price: "$997",
    period: "one-time",
    features: [
      "Everything in Resume Rewrite",
      "LinkedIn profile overhaul",
      "Cover letter template",
      "30-min strategy call",
      "2 rounds of revisions",
    ],
    featured: true,
  },
  {
    name: "Executive Package",
    price: "$2,497",
    period: "one-time",
    features: [
      "Everything in Career Strategy",
      "Personal brand positioning",
      "Interview preparation guide",
      "Salary negotiation playbook",
      "60-min executive coaching call",
      "Unlimited revisions",
    ],
    featured: false,
  },
];

export function ServicesPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative z-10 py-24 md:py-32 lg:py-40 bg-slate-50/80" ref={ref}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-teal-600 font-medium">
            Investment
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mt-4">
            Packages Built for Results
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
            Every package is personally delivered by Hannah. No templates.
            No AI-generated fluff. Real strategy.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card
                featured={plan.featured}
                className={`p-10 flex flex-col h-full ${
                  plan.featured ? "relative" : ""
                }`}
              >
                {plan.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}

                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  {plan.name}
                </h3>

                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-400 ml-2">
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-3 flex-1" role="list">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-slate-600"
                    >
                      <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    variant={plan.featured ? "primary" : "secondary"}
                    size="lg"
                    className="w-full"
                    href="#audit"
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
