"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Executives Coached" },
  { value: 10000, suffix: "+", label: "Resumes Reviewed" },
  { value: 2.4, prefix: "$", suffix: "M", label: "Salary Negotiated" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState("0");
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(
          value % 1 !== 0
            ? v.toFixed(1)
            : v >= 1000
              ? Math.round(v).toLocaleString()
              : Math.round(v).toString()
        );
      },
    });
    return controls.stop;
  }, [inView, value, motionVal]);

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-slate-50 py-16 md:py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="font-serif text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </p>
              <p className="text-sm text-slate-500 uppercase tracking-widest mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
