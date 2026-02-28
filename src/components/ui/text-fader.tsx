"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TextFaderProps {
  messages: string[];
  interval?: number;
  onComplete?: () => void;
}

export function TextFader({
  messages,
  interval = 2200,
  onComplete,
}: TextFaderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= messages.length) {
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      setIndex((i) => i + 1);
    }, interval);
    return () => clearTimeout(timer);
  }, [index, messages.length, interval, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-16 min-h-[200px]">
      <AnimatePresence mode="wait">
        {index < messages.length && (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-lg text-slate-500 font-medium tracking-wide"
          >
            {messages[index]}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="mt-8 flex gap-2">
        {messages.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i <= index ? "w-8 bg-violet-500" : "w-4 bg-slate-200"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
