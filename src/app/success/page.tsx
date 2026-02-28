"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-20">
      <motion.div
        className="max-w-lg mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-violet-600" />
          </div>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-slate-900">
          You&apos;re In.
        </h1>

        <p className="text-lg text-slate-500 leading-relaxed mt-6 max-w-md mx-auto">
          Payment confirmed. Hannah is preparing your strategy workspace. Let&apos;s
          get the details she needs to transform your resume.
        </p>

        <div className="mt-10 space-y-4">
          <Button size="lg" href="/onboarding">
            Complete Your Intake Form
          </Button>
          <p className="text-sm text-slate-400">
            Takes about 5 minutes. The more detail, the better Hannah can
            position you.
          </p>
        </div>

        {/* Reassurance */}
        <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100">
          <p className="text-sm uppercase tracking-widest text-violet-600 font-medium">
            What Happens Next
          </p>
          <div className="mt-4 space-y-3 text-left text-slate-600">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              <p>Complete the intake form with your career goals and context.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              <p>Hannah reviews your resume and begins the strategic rewrite.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                3
              </span>
              <p>
                Your new resume is delivered within the package timeline.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
