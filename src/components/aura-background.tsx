"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function AuraBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0, 0, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full aura-blob"
        style={{
          background:
            "radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, rgba(6, 182, 212, 0.03) 40%, transparent 70%)",
          top: "15%",
          left: "5%",
          y: y1,
          opacity,
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full aura-blob"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, rgba(20, 184, 166, 0.02) 40%, transparent 70%)",
          top: "45%",
          right: "0%",
          y: y2,
          opacity,
        }}
      />
    </div>
  );
}
