"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileUpload } from "@/components/ui/file-upload";
import { TextFader } from "@/components/ui/text-fader";
import { ScoreRing } from "@/components/ui/score-ring";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AuditResult {
  score: number;
  tier: "Elite" | "Rising" | "Needs Architecting";
  critiques: string[];
  hannah_take: string;
}

const loadingMessages = [
  "Scanning visual hierarchy...",
  "Analyzing quantifiable impact...",
  "Cross-referencing market standards...",
  "Generating Hannah\u2019s Take...",
];

const tierVariant = {
  Elite: "elite" as const,
  Rising: "rising" as const,
  "Needs Architecting": "needs-architecting" as const,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function ResumeScanner() {
  const [state, setState] = useState<"idle" | "loading" | "results">("idle");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileSelect = useCallback(async (file: File) => {
    setFileName(file.name);
    setState("loading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/rate-resume", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Analysis failed");

      const data: AuditResult = await res.json();
      setResult(data);
      setState("results");
    } catch {
      // Fallback to demo data if API is not configured
      setTimeout(() => {
        setResult({
          score: 72,
          tier: "Rising",
          critiques: [
            "Your bullet points describe tasks, not results. Hiring managers want to see revenue generated, costs saved, or teams scaled\u2014not processes followed.",
            "The career narrative lacks a clear upward trajectory. Your most impressive role is buried below less relevant positions.",
            "Corporate jargon like \u2018synergized cross-functional teams\u2019 dilutes your authority. Replace with concrete, metric-driven language.",
          ],
          hannah_take:
            "You have strong fundamentals and real experience, but your resume reads like a job description, not a career highlight reel. With the right positioning, you\u2019re a top-quartile candidate.",
        });
        setState("results");
      }, 9000);
    }
  }, []);

  const handleReset = useCallback(() => {
    setState("idle");
    setResult(null);
    setFileName("");
  }, []);

  return (
    <section id="audit" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-8 md:px-16 text-center">
        {/* Section Header */}
        <p className="text-sm uppercase tracking-[0.2em] text-violet-600 font-medium">
          Free AI Audit
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mt-4">
          Rate My Resume
        </h2>
        <p className="text-lg text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
          Drop your PDF below. Hannah&apos;s AI will score it in seconds.
        </p>

        {/* Upload / Loading / Results */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-12">
                  <FileUpload onFileSelect={handleFileSelect} />
                </Card>
              </motion.div>
            )}

            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-12">
                  <p className="text-sm text-slate-400 mb-2">
                    Analyzing {fileName}
                  </p>
                  <TextFader messages={loadingMessages} />
                </Card>
              </motion.div>
            )}

            {state === "results" && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Score */}
                <motion.div
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center"
                >
                  <ScoreRing score={result.score} />
                  <Badge
                    variant={tierVariant[result.tier]}
                    className="mt-4"
                  >
                    {result.tier}
                  </Badge>
                </motion.div>

                {/* Critiques */}
                <div className="space-y-4 text-left">
                  {result.critiques.map((critique, i) => (
                    <motion.div
                      key={i}
                      custom={i + 1}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                    >
                      <Card className="p-6">
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </span>
                          <p className="text-slate-600 leading-relaxed">
                            {critique}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Hannah's Take */}
                <motion.div
                  custom={4}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="p-8 border-l-4 border-l-violet-500 text-left">
                    <p className="text-xs uppercase tracking-widest text-violet-600 font-medium mb-3">
                      Hannah&apos;s Take
                    </p>
                    <p className="text-slate-700 leading-relaxed font-medium text-lg">
                      &ldquo;{result.hannah_take}&rdquo;
                    </p>
                  </Card>
                </motion.div>

                {/* CTA */}
                <motion.div
                  custom={5}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="pt-4"
                >
                  <p className="text-slate-600 text-lg mb-4">
                    You scored{" "}
                    <span className="font-bold text-slate-900">
                      {result.score}/100
                    </span>
                    . You&apos;re leaving{" "}
                    <span className="font-bold text-violet-600">
                      {100 - result.score} points
                    </span>{" "}
                    of salary negotiation on the table.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" href="#services">
                      Let Hannah Bridge the Gap
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
                      onClick={handleReset}
                    >
                      Try Another Resume
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
