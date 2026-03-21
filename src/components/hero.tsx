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

const FLOAT_CONFIGS: FloatConfig[] = [
  /* 0: Resume icon — top-left */
  { startX: -55, startY: -50, finalX: -30, finalY: -22, startRot: -25, finalRot: -2, enter: 0.20, wobbleAmp: 3, wobbleFreq: 2.5 },
  /* 1: Chat bubble coral — bottom-left */
  { startX: -50, startY: 55, finalX: -12, finalY: 24, startRot: 20, finalRot: 0, enter: 0.24, wobbleAmp: 4, wobbleFreq: 2.0 },
  /* 2: Chat bubble orange — bottom-left offset */
  { startX: -55, startY: 50, finalX: -20, finalY: 18, startRot: -15, finalRot: 3, enter: 0.27, wobbleAmp: 3, wobbleFreq: 3.0 },
  /* 3: Donut chart — top-right */
  { startX: 55, startY: -50, finalX: 22, finalY: -16, startRot: 30, finalRot: 0, enter: 0.22, wobbleAmp: 4, wobbleFreq: 1.8 },
  /* 4: Large triangle amber — bottom-right */
  { startX: 55, startY: 55, finalX: 22, finalY: 20, startRot: 45, finalRot: 0, enter: 0.25, wobbleAmp: 3, wobbleFreq: 2.2 },
  /* 5: Med triangle teal — bottom-right offset */
  { startX: 50, startY: 55, finalX: 30, finalY: 15, startRot: -30, finalRot: 5, enter: 0.28, wobbleAmp: 2.5, wobbleFreq: 2.8 },
  /* 6: Small triangle blue — bottom-right far */
  { startX: 60, startY: 50, finalX: 35, finalY: 25, startRot: -50, finalRot: -10, enter: 0.30, wobbleAmp: 2, wobbleFreq: 3.2 },
  /* 7: Squiggle purple — top-right area */
  { startX: 55, startY: -55, finalX: 14, finalY: -6, startRot: 15, finalRot: 0, enter: 0.23, wobbleAmp: 3.5, wobbleFreq: 1.5 },
  /* 8: Squiggle teal — bottom-left area */
  { startX: -60, startY: 55, finalX: -24, finalY: 6, startRot: -20, finalRot: 0, enter: 0.26, wobbleAmp: 3, wobbleFreq: 2.0 },
  /* 9: Dot purple */
  { startX: -50, startY: -55, finalX: -18, finalY: -32, startRot: 0, finalRot: 0, enter: 0.30, wobbleAmp: 2, wobbleFreq: 4.0 },
  /* 10: Dot amber */
  { startX: 50, startY: 50, finalX: 16, finalY: 30, startRot: 0, finalRot: 0, enter: 0.32, wobbleAmp: 2, wobbleFreq: 3.5 },
  /* 11: Dot coral */
  { startX: -55, startY: 50, finalX: -32, finalY: 10, startRot: 0, finalRot: 0, enter: 0.35, wobbleAmp: 1.5, wobbleFreq: 3.0 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const squiggle1Ref = useRef<SVGPathElement>(null);
  const squiggle2Ref = useRef<SVGPathElement>(null);
  const donutCenterRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    /* ── Squiggle dash setup ── */
    const sq1 = squiggle1Ref.current;
    const sq2 = squiggle2Ref.current;
    let sq1Len = 0, sq2Len = 0;
    if (sq1) { sq1Len = sq1.getTotalLength(); sq1.style.strokeDasharray = String(sq1Len); sq1.style.strokeDashoffset = String(sq1Len); }
    if (sq2) { sq2Len = sq2.getTotalLength(); sq2.style.strokeDasharray = String(sq2Len); sq2.style.strokeDashoffset = String(sq2Len); }

    const ctx = gsap.context(() => {
      /* ── Entrance: headline + scroll indicator ── */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hero-headline', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.3);
      tl.fromTo('.hero-scroll-indicator', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.9);

      const base = { trigger: sectionRef.current, scrub: true };

      /* ══════════════════════════════════════════════
       * PHASE 1 — Cinematic Reveal (0–30%)
       * ══════════════════════════════════════════════ */

      /* Headline exits */
      gsap.to('.hero-headline', {
        opacity: 0, y: -60, immediateRender: false,
        scrollTrigger: { ...base, start: 'top top', end: '18% top' },
      });

      /* Scroll indicator exits */
      gsap.to('.hero-scroll-indicator', {
        opacity: 0, y: -20, immediateRender: false,
        scrollTrigger: { ...base, start: 'top top', end: '5% top' },
      });

      /* Dark overlay dissolves */
      gsap.to('.hero-dark-overlay', {
        opacity: 0, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { ...base, start: 'top top', end: '30% top' },
      });

      /* Phone fades in + scales 0.85 → 1.0 */
      gsap.fromTo('.hero-phone',
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1, scale: 1, ease: 'power3.out', immediateRender: false,
          scrollTrigger: { ...base, start: 'top top', end: '30% top' },
        }
      );

      /* ══════════════════════════════════════════════
       * PHASE 2 — Floating elements enter (20–70%)
       * Custom onUpdate for wobble + easeOutBack
       * ══════════════════════════════════════════════ */

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress; // 0→1

          /* Animate each floating element */
          for (let i = 0; i < 12; i++) {
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

              /* Mid-flight wobble — diminishes near arrival */
              const wobbleFade = 1 - elP;
              x += Math.sin(elP * Math.PI * c.wobbleFreq) * c.wobbleAmp * wobbleFade;
              y += Math.cos(elP * Math.PI * c.wobbleFreq * 0.7) * c.wobbleAmp * 0.6 * wobbleFade;

              const elOpacity = clamp(elP * 4, 0, 1);
              el.style.opacity = String(elOpacity);
              el.style.transform = `translate(calc(-50% + ${x.toFixed(2)}vw), calc(-50% + ${y.toFixed(2)}vh)) rotate(${rot.toFixed(2)}deg)`;
            }
          }

          /* Squiggle stroke-dash "drawing" animation */
          if (sq1 && sq1Len) {
            const sq1P = clamp((p - FLOAT_CONFIGS[7].enter) / 0.30, 0, 1);
            const sq1Eased = 1 - Math.pow(1 - sq1P, 3);
            sq1.style.strokeDashoffset = String(sq1Len * (1 - sq1Eased));
          }
          if (sq2 && sq2Len) {
            const sq2P = clamp((p - FLOAT_CONFIGS[8].enter) / 0.30, 0, 1);
            const sq2Eased = 1 - Math.pow(1 - sq2P, 3);
            sq2.style.strokeDashoffset = String(sq2Len * (1 - sq2Eased));
          }

          /* Donut center fill matches background */
          if (donutCenterRef.current) {
            const bgP = clamp((p - 0.70) / 0.30, 0, 1);
            const bgEased = 1 - Math.pow(1 - bgP, 3);
            const r = Math.round(lerp(10, 255, bgEased));
            const g = Math.round(lerp(10, 255, bgEased));
            const b = Math.round(lerp(10, 255, bgEased));
            donutCenterRef.current.setAttribute('fill', `rgb(${r},${g},${b})`);
          }
        },
      });

      /* ══════════════════════════════════════════════
       * PHASE 3 — Cohesive End Frame (70–100%)
       * ══════════════════════════════════════════════ */

      /* Background: #0a0a0a → #ffffff */
      gsap.to('.hero-sticky-frame', {
        backgroundColor: '#ffffff', ease: 'power3.out', immediateRender: false,
        scrollTrigger: { ...base, start: '70% top', end: '100% top' },
      });

      /* Phone shadow lightens */
      gsap.to('.hero-phone-frame', {
        boxShadow: '0 40px 100px rgba(0,0,0,0.12)', ease: 'power3.out', immediateRender: false,
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

        {/* ══════ 12 Floating elements ══════ */}

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
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
            <circle cx="60" cy="60" r="48" stroke="#1D9E75" strokeWidth="22" strokeDasharray="100.53 301.59" strokeDashoffset="0" transform="rotate(-90 60 60)" />
            <circle cx="60" cy="60" r="48" stroke="#3B8BD4" strokeWidth="22" strokeDasharray="75.4 301.59" strokeDashoffset="-100.53" transform="rotate(-90 60 60)" />
            <circle cx="60" cy="60" r="48" stroke="#EF9F27" strokeWidth="22" strokeDasharray="60.32 301.59" strokeDashoffset="-175.93" transform="rotate(-90 60 60)" />
            <circle cx="60" cy="60" r="48" stroke="#E24B4A" strokeWidth="22" strokeDasharray="65.34 301.59" strokeDashoffset="-236.25" transform="rotate(-90 60 60)" />
            <circle ref={donutCenterRef} cx="60" cy="60" r="37" fill="#0a0a0a" />
          </svg>
        </div>

        {/* 4: Large triangle (amber) */}
        <div ref={setElRef(4)} className={styles.floatingEl}>
          <svg width="100" height="90" viewBox="0 0 100 90" fill="none" aria-hidden="true">
            <polygon points="50,5 95,85 5,85" fill="#EF9F27" />
          </svg>
        </div>

        {/* 5: Medium triangle (teal) */}
        <div ref={setElRef(5)} className={styles.floatingEl}>
          <svg width="60" height="55" viewBox="0 0 60 55" fill="none" aria-hidden="true">
            <polygon points="30,3 57,52 3,52" fill="#1D9E75" />
          </svg>
        </div>

        {/* 6: Small triangle (blue) */}
        <div ref={setElRef(6)} className={styles.floatingEl}>
          <svg width="40" height="36" viewBox="0 0 40 36" fill="none" aria-hidden="true">
            <polygon points="20,2 38,34 2,34" fill="#3B8BD4" />
          </svg>
        </div>

        {/* 7: Squiggle curve (purple) */}
        <div ref={setElRef(7)} className={styles.floatingEl}>
          <svg width="200" height="100" viewBox="0 0 200 100" fill="none" aria-hidden="true">
            <path ref={squiggle1Ref} d="M10 80 C30 10, 60 90, 90 40 S150 10, 190 50" stroke="#7F77DD" strokeWidth="5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* 8: Squiggle curl (teal) */}
        <div ref={setElRef(8)} className={styles.floatingEl}>
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden="true">
            <path ref={squiggle2Ref} d="M10 50 C20 10, 50 10, 45 50 C40 90, 80 90, 75 50 C70 20, 110 20, 110 50" stroke="#1D9E75" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* 9: Dot (purple) */}
        <div ref={setElRef(9)} className={styles.floatingEl}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#7F77DD" /></svg>
        </div>

        {/* 10: Dot (amber) */}
        <div ref={setElRef(10)} className={styles.floatingEl}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#EF9F27" /></svg>
        </div>

        {/* 11: Dot (coral) */}
        <div ref={setElRef(11)} className={styles.floatingEl}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="#E24B4A" /></svg>
        </div>

        {/* ══════ iPhone ══════ */}
        <div className={`${styles.phoneContainer} hero-phone`}>
          <div className={`${styles.phoneFrame} hero-phone-frame`}>
            <div className={styles.phoneScreen}>
              {/* Notch */}
              <div className={styles.notchBar}>
                <div className={styles.notch}>
                  <div className={styles.cameraDot} />
                </div>
              </div>

              <div className={styles.phoneContent}>
                {/* Avatar */}
                <div className={styles.avatar}>JS</div>

                {/* Score heading */}
                <span className={styles.scoreHeading}>YOUR RESUME SCORE</span>

                {/* Gauge */}
                <div className={styles.gaugeContainer}>
                  <svg className={styles.gaugeSvg} viewBox="0 0 130 80">
                    <defs>
                      <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1D9E75" />
                        <stop offset="100%" stopColor="#3B8BD4" />
                      </linearGradient>
                    </defs>
                    <path d="M15 70 A50 50 0 0 1 115 70" stroke="#f1f5f9" strokeWidth="10" fill="none" strokeLinecap="round" />
                    <path d="M15 70 A50 50 0 0 1 115 70" stroke="url(#gaugeGrad)" strokeWidth="10" fill="none" strokeLinecap="round"
                      strokeDasharray="157" strokeDashoffset="23.5" />
                  </svg>
                  <div className={styles.gaugeScore}>
                    <span className={styles.gaugeBig}>8.5</span>
                    <span className={styles.gaugeSmall}>/ 10</span>
                  </div>
                </div>

                {/* Stars */}
                <div className={styles.stars}>
                  {[1, 2, 3, 4].map(i => <span key={i} className={styles.star}>&#9733;</span>)}
                  <span className={`${styles.star} ${styles.starDim}`}>&#9733;</span>
                </div>

                {/* Progress */}
                <div className={styles.progressSection}>
                  <div className={styles.progressLabel}>
                    <span>Profile Completion</span>
                    <span>85%</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} />
                  </div>
                </div>

                {/* Improvement tags */}
                <div className={styles.improveSection}>
                  <div className={styles.improveHeading}>Areas for Improvement</div>
                  <div className={styles.tags}>
                    <span className={`${styles.tag} ${styles.tagAts}`}>ATS</span>
                    <span className={`${styles.tag} ${styles.tagExp}`}>Experience</span>
                    <span className={`${styles.tag} ${styles.tagSkills}`}>Skills</span>
                  </div>
                </div>

                {/* CTA */}
                <button className={styles.ctaBtn} type="button">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
