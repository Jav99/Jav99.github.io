'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Easing helpers ───────────────────────────────────── */
function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ─── Floating element config ──────────────────────────── */
interface FloatConfig {
  startX: number; startY: number;
  finalX: number; finalY: number;
  startRot: number; finalRot: number;
  enter: number;
  wobbleAmp: number; wobbleFreq: number;
}

/*
 * Final positions reference the image:
 * - Phone center, elements arranged around it
 * - Resume doc: upper-left
 * - Donut chart: right, slightly above center (partially behind phone)
 * - Purple squiggle: large, weaves right side and behind phone
 * - Teal squiggle curl: left area
 * - Chat bubbles: lower-left, overlapping
 * - Triangles: lower-right cluster
 * - Dots/shapes scattered as accents
 */
const FLOAT_CONFIGS: FloatConfig[] = [
  /* 0: Resume icon — top-left */
  { startX: -60, startY: -55, finalX: -28, finalY: -24, startRot: -25, finalRot: -2, enter: 0.20, wobbleAmp: 3, wobbleFreq: 2.5 },
  /* 1: Chat bubble coral — bottom-left */
  { startX: -55, startY: 60, finalX: -14, finalY: 22, startRot: 20, finalRot: 0, enter: 0.24, wobbleAmp: 4, wobbleFreq: 2.0 },
  /* 2: Chat bubble orange — bottom-left offset, overlapping */
  { startX: -60, startY: 55, finalX: -10, finalY: 16, startRot: -15, finalRot: 3, enter: 0.27, wobbleAmp: 3, wobbleFreq: 3.0 },
  /* 3: Donut chart — right, slightly above center */
  { startX: 60, startY: -45, finalX: 20, finalY: -8, startRot: 30, finalRot: 0, enter: 0.22, wobbleAmp: 4, wobbleFreq: 1.8 },
  /* 4: Large triangle amber — bottom-right */
  { startX: 60, startY: 60, finalX: 24, finalY: 18, startRot: 45, finalRot: 0, enter: 0.25, wobbleAmp: 3, wobbleFreq: 2.2 },
  /* 5: Med triangle teal — right of large, slightly above */
  { startX: 55, startY: 55, finalX: 32, finalY: 10, startRot: -30, finalRot: 5, enter: 0.28, wobbleAmp: 2.5, wobbleFreq: 2.8 },
  /* 6: Small triangle dark blue — far bottom-right */
  { startX: 65, startY: 55, finalX: 36, finalY: 24, startRot: -50, finalRot: -10, enter: 0.30, wobbleAmp: 2, wobbleFreq: 3.2 },
  /* 7: Large purple squiggle — weaves right side, behind phone */
  { startX: 55, startY: -55, finalX: 6, finalY: 2, startRot: 15, finalRot: 0, enter: 0.21, wobbleAmp: 3.5, wobbleFreq: 1.5 },
  /* 8: Teal squiggle curl — left area */
  { startX: -65, startY: 50, finalX: -24, finalY: 2, startRot: -20, finalRot: 0, enter: 0.26, wobbleAmp: 3, wobbleFreq: 2.0 },
  /* 9: Dot purple — upper-left accent */
  { startX: -55, startY: -55, finalX: -20, finalY: -34, startRot: 0, finalRot: 0, enter: 0.30, wobbleAmp: 2, wobbleFreq: 4.0 },
  /* 10: Dot amber — right side accent */
  { startX: 55, startY: 50, finalX: 18, finalY: 30, startRot: 0, finalRot: 0, enter: 0.32, wobbleAmp: 2, wobbleFreq: 3.5 },
  /* 11: Dot coral — left mid accent */
  { startX: -60, startY: 50, finalX: -34, finalY: 8, startRot: 0, finalRot: 0, enter: 0.35, wobbleAmp: 1.5, wobbleFreq: 3.0 },
  /* ── 5 NEW ELEMENTS ── */
  /* 12: Checkmark badge (green circle + check) — top-right area */
  { startX: 55, startY: -60, finalX: 28, finalY: -22, startRot: 35, finalRot: 0, enter: 0.23, wobbleAmp: 3, wobbleFreq: 2.4 },
  /* 13: Bar chart icon (blue) — left mid */
  { startX: -60, startY: -45, finalX: -32, finalY: -8, startRot: -20, finalRot: 0, enter: 0.25, wobbleAmp: 2.5, wobbleFreq: 2.6 },
  /* 14: Lightning bolt (amber) — top accent */
  { startX: 30, startY: -60, finalX: 10, finalY: -32, startRot: 25, finalRot: -5, enter: 0.29, wobbleAmp: 3, wobbleFreq: 3.0 },
  /* 15: Purple loop squiggle — bottom area behind phone */
  { startX: -50, startY: 60, finalX: -4, finalY: 28, startRot: 10, finalRot: 0, enter: 0.24, wobbleAmp: 3.5, wobbleFreq: 1.8 },
  /* 16: Dot teal — lower-right accent */
  { startX: 60, startY: 60, finalX: 38, finalY: 16, startRot: 0, finalRot: 0, enter: 0.33, wobbleAmp: 1.5, wobbleFreq: 3.8 },
];

const TOTAL_ELEMENTS = FLOAT_CONFIGS.length;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const squiggle1Ref = useRef<SVGPathElement>(null);
  const squiggle2Ref = useRef<SVGPathElement>(null);
  const squiggle3Ref = useRef<SVGPathElement>(null);
  const donutCenterRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    /* ── Squiggle dash setup ── */
    const squiggles = [squiggle1Ref.current, squiggle2Ref.current, squiggle3Ref.current];
    const sqLens = squiggles.map(sq => {
      if (!sq) return 0;
      const len = sq.getTotalLength();
      sq.style.strokeDasharray = String(len);
      sq.style.strokeDashoffset = String(len);
      return len;
    });

    /* ── Compute initial scale so the phone screen fills viewport ── */
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let phoneW = 220;
    if (vw >= 1024) phoneW = 310;
    else if (vw >= 768) phoneW = 270;
    const phoneH = phoneW * (1200 / 556);
    /* Screen area is roughly 90% width, 93% height of the image */
    const screenW = phoneW * 0.90;
    const screenH = phoneH * 0.93;
    const initialScale = Math.max(vw / screenW, vh / screenH) * 1.08;

    const ctx = gsap.context(() => {
      /* ── Phone starts hidden; will appear on scroll ── */
      gsap.set('.hero-phone', { xPercent: -50, yPercent: -50, scale: initialScale, opacity: 0 });

      /* ── Entrance: headline + scroll indicator ── */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hero-headline', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.3);
      tl.fromTo('.hero-scroll-indicator', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.9);

      const base = { trigger: sectionRef.current, scrub: true };

      /* ══════════════════════════════════════════════
       * PHASE 1 — Text fades, then iPhone appears & shrinks (0–40%)
       * ══════════════════════════════════════════════ */

      gsap.to('.hero-headline', {
        opacity: 0, y: -60, immediateRender: false,
        scrollTrigger: { ...base, start: 'top top', end: '10% top' },
      });

      gsap.to('.hero-scroll-indicator', {
        opacity: 0, y: -20, immediateRender: false,
        scrollTrigger: { ...base, start: 'top top', end: '5% top' },
      });

      /* Phone fades in quickly once scrolling begins */
      gsap.to('.hero-phone', {
        opacity: 1, immediateRender: false,
        scrollTrigger: { ...base, start: '5% top', end: '15% top' },
      });

      /* Phone scales down from fullscreen to normal */
      gsap.to('.hero-phone', {
        scale: 1, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { ...base, start: '8% top', end: '40% top' },
      });

      gsap.to('.hero-dark-overlay', {
        opacity: 0, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { ...base, start: '15% top', end: '40% top' },
      });

      /* ══════════════════════════════════════════════
       * PHASE 2 — Floating elements enter (20–70%)
       * PHASE 3 — End frame (70–100%)
       * ══════════════════════════════════════════════ */

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;

          for (let i = 0; i < TOTAL_ELEMENTS; i++) {
            const el = elRefs.current[i];
            if (!el) continue;
            const c = FLOAT_CONFIGS[i];
            const elSettle = Math.min(c.enter + 0.35, 0.70);

            if (p < c.enter) {
              el.style.opacity = '0';
              el.style.transform = `translate(calc(-50% + ${c.startX}vw), calc(-50% + ${c.startY}vh)) rotate(${c.startRot}deg)`;
            } else {
              const elP = clamp((p - c.enter) / (elSettle - c.enter), 0, 1);
              const easedP = easeOutBack(elP);

              let x = lerp(c.startX, c.finalX, easedP);
              let y = lerp(c.startY, c.finalY, easedP);
              const rot = lerp(c.startRot, c.finalRot, easedP);

              const wobbleFade = 1 - elP;
              x += Math.sin(elP * Math.PI * c.wobbleFreq) * c.wobbleAmp * wobbleFade;
              y += Math.cos(elP * Math.PI * c.wobbleFreq * 0.7) * c.wobbleAmp * 0.6 * wobbleFade;

              const elOpacity = clamp(elP * 4, 0, 1);
              el.style.opacity = String(elOpacity);
              el.style.transform = `translate(calc(-50% + ${x.toFixed(2)}vw), calc(-50% + ${y.toFixed(2)}vh)) rotate(${rot.toFixed(2)}deg)`;
            }
          }

          /* Squiggle stroke-dash animations */
          const sqIndices = [7, 8, 15]; // indices of squiggle elements
          for (let s = 0; s < 3; s++) {
            const sq = squiggles[s];
            const len = sqLens[s];
            if (!sq || !len) continue;
            const sqP = clamp((p - FLOAT_CONFIGS[sqIndices[s]].enter) / 0.30, 0, 1);
            const sqEased = 1 - Math.pow(1 - sqP, 3);
            sq.style.strokeDashoffset = String(len * (1 - sqEased));
          }

          /* Donut center fill matches background */
          if (donutCenterRef.current) {
            const bgP = clamp((p - 0.70) / 0.30, 0, 1);
            const bgEased = 1 - Math.pow(1 - bgP, 3);
            const v = Math.round(lerp(10, 255, bgEased));
            donutCenterRef.current.setAttribute('fill', `rgb(${v},${v},${v})`);
          }
        },
      });

      /* ── Phase 3 background + shadow ── */

      gsap.to('.hero-sticky-frame', {
        backgroundColor: '#ffffff', ease: 'power3.out', immediateRender: false,
        scrollTrigger: { ...base, start: '70% top', end: '100% top' },
      });

      gsap.to('.hero-phone', {
        filter: 'drop-shadow(0 25px 60px rgba(0,0,0,0.18))',
        ease: 'power3.out', immediateRender: false,
        scrollTrigger: { ...base, start: '70% top', end: '100% top' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setElRef = (i: number) => (el: HTMLDivElement | null) => { elRefs.current[i] = el; };

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={`${styles.stickyFrame} hero-sticky-frame`}>
        {/* ── Dark overlay ── */}
        <div className={`${styles.darkOverlay} hero-dark-overlay`} />

        {/* ── Opening: headline + scroll indicator ── */}
        <div className={styles.opening}>
          <h1 className={`${styles.headline} hero-headline`}>
            Rate your resume today.
          </h1>
          <div className={`${styles.scrollIndicator} hero-scroll-indicator`}>
            <span className={styles.scrollText}>Scroll</span>
            <div className={styles.scrollArrow} />
          </div>
        </div>

        {/* ══════ 17 Floating elements (z-index: 8, behind phone) ══════ */}

        {/* 0: Resume/document icon */}
        <div ref={setElRef(0)} className={styles.floatingEl}>
          <svg width="100" height="120" viewBox="0 0 100 120" fill="none" aria-hidden="true">
            <rect x="5" y="5" width="80" height="105" rx="6" fill="#EAF2FB" stroke="#3B8BD4" strokeWidth="3" />
            <path d="M60 5v22h22" stroke="#3B8BD4" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="60,5 82,27 60,27" fill="#d0e3f5" />
            <circle cx="35" cy="42" r="12" fill="#d0e8e0" />
            <circle cx="35" cy="40" r="5" fill="#1D9E75" />
            <path d="M25 52c0-5 4.5-9 10-9s10 4 10 9" stroke="#1D9E75" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="20" y="62" width="50" height="3" rx="1.5" fill="#3B8BD4" opacity="0.4" />
            <rect x="20" y="72" width="40" height="3" rx="1.5" fill="#3B8BD4" opacity="0.3" />
            <rect x="20" y="82" width="45" height="3" rx="1.5" fill="#3B8BD4" opacity="0.3" />
            <rect x="20" y="92" width="30" height="3" rx="1.5" fill="#3B8BD4" opacity="0.2" />
          </svg>
        </div>

        {/* 1: Chat bubble (coral) */}
        <div ref={setElRef(1)} className={styles.floatingEl}>
          <svg width="80" height="70" viewBox="0 0 80 70" fill="none" aria-hidden="true">
            <path d="M5 10c0-5.5 4.5-10 10-10h50c5.5 0 10 4.5 10 10v30c0 5.5-4.5 10-10 10H30l-15 15V50H15c-5.5 0-10-4.5-10-10V10z" fill="#E24B4A" />
            <circle cx="28" cy="25" r="4" fill="#fff" />
            <circle cx="42" cy="25" r="4" fill="#fff" />
            <circle cx="56" cy="25" r="4" fill="#fff" />
          </svg>
        </div>

        {/* 2: Smaller chat bubble (orange) */}
        <div ref={setElRef(2)} className={styles.floatingEl}>
          <svg width="70" height="60" viewBox="0 0 70 60" fill="none" aria-hidden="true">
            <path d="M5 8c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v24c0 4.4-3.6 8-8 8H25l-12 12V40H13c-4.4 0-8-3.6-8-8V8z" fill="#F28C50" />
            <rect x="16" y="14" width="30" height="3" rx="1.5" fill="#fff" opacity="0.8" />
            <rect x="16" y="22" width="22" height="3" rx="1.5" fill="#fff" opacity="0.6" />
          </svg>
        </div>

        {/* 3: Donut chart (4 segments) */}
        <div ref={setElRef(3)} className={styles.floatingEl}>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" aria-hidden="true">
            <circle cx="70" cy="70" r="55" stroke="#1D9E75" strokeWidth="24" strokeDasharray="115.2 345.6" strokeDashoffset="0" transform="rotate(-90 70 70)" />
            <circle cx="70" cy="70" r="55" stroke="#3B8BD4" strokeWidth="24" strokeDasharray="86.4 345.6" strokeDashoffset="-115.2" transform="rotate(-90 70 70)" />
            <circle cx="70" cy="70" r="55" stroke="#EF9F27" strokeWidth="24" strokeDasharray="69.12 345.6" strokeDashoffset="-201.6" transform="rotate(-90 70 70)" />
            <circle cx="70" cy="70" r="55" stroke="#E24B4A" strokeWidth="24" strokeDasharray="75.28 345.6" strokeDashoffset="-270.72" transform="rotate(-90 70 70)" />
            <circle ref={donutCenterRef} cx="70" cy="70" r="43" fill="#0a0a0a" />
          </svg>
        </div>

        {/* 4: Large triangle (amber) */}
        <div ref={setElRef(4)} className={styles.floatingEl}>
          <svg width="110" height="100" viewBox="0 0 110 100" fill="none" aria-hidden="true">
            <polygon points="55,5 105,95 5,95" fill="#EF9F27" />
          </svg>
        </div>

        {/* 5: Medium triangle (teal) */}
        <div ref={setElRef(5)} className={styles.floatingEl}>
          <svg width="65" height="58" viewBox="0 0 65 58" fill="none" aria-hidden="true">
            <polygon points="32,3 62,55 2,55" fill="#1D9E75" />
          </svg>
        </div>

        {/* 6: Small triangle (dark blue) */}
        <div ref={setElRef(6)} className={styles.floatingEl}>
          <svg width="42" height="38" viewBox="0 0 42 38" fill="none" aria-hidden="true">
            <polygon points="21,2 40,36 2,36" fill="#1e3a5f" />
          </svg>
        </div>

        {/* 7: Large purple squiggle — weaves across right side */}
        <div ref={setElRef(7)} className={styles.floatingEl}>
          <svg width="320" height="280" viewBox="0 0 320 280" fill="none" aria-hidden="true">
            <path ref={squiggle1Ref} d="M20 240 C40 180, 80 260, 100 200 S140 100, 160 140 C180 180, 200 80, 240 120 S280 40, 300 80 C310 100, 290 140, 260 120 C230 100, 260 60, 300 40" stroke="#7F77DD" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* 8: Teal squiggle curl — left area */}
        <div ref={setElRef(8)} className={styles.floatingEl}>
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden="true">
            <path ref={squiggle2Ref} d="M10 50 C20 10, 50 10, 45 50 C40 90, 80 90, 75 50 C70 20, 110 20, 110 50" stroke="#1D9E75" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* 9: Dot purple */}
        <div ref={setElRef(9)} className={styles.floatingEl}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#7F77DD" /></svg>
        </div>

        {/* 10: Dot amber */}
        <div ref={setElRef(10)} className={styles.floatingEl}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#EF9F27" /></svg>
        </div>

        {/* 11: Dot coral */}
        <div ref={setElRef(11)} className={styles.floatingEl}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="#E24B4A" /></svg>
        </div>

        {/* ── 5 NEW ELEMENTS ── */}

        {/* 12: Checkmark badge — green circle with white check */}
        <div ref={setElRef(12)} className={styles.floatingEl}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" aria-hidden="true">
            <circle cx="25" cy="25" r="22" fill="#1D9E75" />
            <path d="M15 25l7 7 13-14" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* 13: Bar chart icon */}
        <div ref={setElRef(13)} className={styles.floatingEl}>
          <svg width="56" height="50" viewBox="0 0 56 50" fill="none" aria-hidden="true">
            <rect x="2" y="28" width="12" height="20" rx="2" fill="#3B8BD4" opacity="0.5" />
            <rect x="18" y="16" width="12" height="32" rx="2" fill="#3B8BD4" opacity="0.7" />
            <rect x="34" y="6" width="12" height="42" rx="2" fill="#3B8BD4" />
          </svg>
        </div>

        {/* 14: Lightning bolt */}
        <div ref={setElRef(14)} className={styles.floatingEl}>
          <svg width="36" height="56" viewBox="0 0 36 56" fill="none" aria-hidden="true">
            <polygon points="22,0 6,26 16,26 10,56 30,22 18,22" fill="#EF9F27" />
          </svg>
        </div>

        {/* 15: Purple loop squiggle — bottom, behind phone */}
        <div ref={setElRef(15)} className={styles.floatingEl}>
          <svg width="180" height="140" viewBox="0 0 180 140" fill="none" aria-hidden="true">
            <path ref={squiggle3Ref} d="M10 70 C30 10, 70 10, 70 60 C70 110, 30 120, 50 80 C70 40, 120 40, 110 80 C100 120, 150 130, 170 80" stroke="#7F77DD" strokeWidth="5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* 16: Dot teal */}
        <div ref={setElRef(16)} className={styles.floatingEl}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7.5" fill="#1D9E75" /></svg>
        </div>

        {/* ══════ iPhone — real image ══════ */}
        <div className={`${styles.phoneContainer} hero-phone`}>
          <img
            src="/iphone.png"
            alt="iPhone showing resume score of 8.5 out of 10"
            className={styles.phoneImage}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
