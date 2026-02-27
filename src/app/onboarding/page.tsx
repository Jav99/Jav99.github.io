"use client";

import { motion } from "framer-motion";

export default function OnboardingPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 pt-20 pb-24">
      <motion.div
        className="max-w-3xl mx-auto text-center w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-violet-600 font-medium">
          Onboarding
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mt-4">
          Your Strategy Session Begins Here
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed mt-4 max-w-xl mx-auto">
          The more Hannah knows about your goals, the more precisely she can
          position you. Take 5 minutes to give her the full picture.
        </p>

        {/* Tally Form Embed */}
        <div className="mt-12 bg-white rounded-3xl shadow-clay border border-slate-100 overflow-hidden">
          <iframe
            data-tally-src="https://tally.so/embed/YOUR_FORM_ID?alignLeft=1&hideTitle=1&transparentBackground=1"
            loading="lazy"
            width="100%"
            height="800"
            title="Career Strategy Intake Form"
            className="w-full border-0"
          />

          {/* Placeholder when Tally is not configured */}
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Intake Form
            </h3>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              The Tally form will appear here once configured. Replace{" "}
              <code className="text-xs bg-slate-100 px-2 py-0.5 rounded">
                YOUR_FORM_ID
              </code>{" "}
              in the source code with your actual Tally form ID.
            </p>
            <div className="mt-8 space-y-4 text-left max-w-md mx-auto">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-sm font-medium text-slate-700">
                  What is your target role?
                </p>
                <div className="h-10 mt-2 rounded-xl bg-white border border-slate-200" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-sm font-medium text-slate-700">
                  Years of experience?
                </p>
                <div className="h-10 mt-2 rounded-xl bg-white border border-slate-200" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-sm font-medium text-slate-700">
                  What are your biggest career hurdles?
                </p>
                <div className="h-24 mt-2 rounded-xl bg-white border border-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
