'use client';

import { useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Helpers ────────────────────────────────────────────── */
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
function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/* ── Star types ─────────────────────────────────────────── */
interface Star {
  x: number; y: number;
  radius: number;
  speed: number;
  phase: number;
}
interface ShootingStar {
  x: number; y: number;
  angle: number;
  speed: number;
  length: number;
  born: number;
  lifespan: number;
  direction: number;
}

/* ── Floating element config ────────────────────────────── */
interface FloatConfig {
  startX: number; startY: number;
  finalX: number; finalY: number;
  startRot: number; finalRot: number;
  enter: number;
  wobbleAmp: number; wobbleFreq: number;
}

const FLOAT_CONFIGS: FloatConfig[] = [
  { startX: -60, startY: -55, finalX: -28, finalY: -24, startRot: -25, finalRot: -2, enter: 0.20, wobbleAmp: 3, wobbleFreq: 2.5 },
  { startX: -55, startY: 60, finalX: -14, finalY: 22, startRot: 20, finalRot: 0, enter: 0.24, wobbleAmp: 4, wobbleFreq: 2.0 },
  { startX: -60, startY: 55, finalX: -10, finalY: 16, startRot: -15, finalRot: 3, enter: 0.27, wobbleAmp: 3, wobbleFreq: 3.0 },
  { startX: 60, startY: -45, finalX: 20, finalY: -8, startRot: 30, finalRot: 0, enter: 0.22, wobbleAmp: 4, wobbleFreq: 1.8 },
  { startX: 60, startY: 60, finalX: 24, finalY: 18, startRot: 45, finalRot: 0, enter: 0.25, wobbleAmp: 3, wobbleFreq: 2.2 },
  { startX: 55, startY: 55, finalX: 32, finalY: 10, startRot: -30, finalRot: 5, enter: 0.28, wobbleAmp: 2.5, wobbleFreq: 2.8 },
  { startX: 65, startY: 55, finalX: 36, finalY: 24, startRot: -50, finalRot: -10, enter: 0.30, wobbleAmp: 2, wobbleFreq: 3.2 },
  { startX: 55, startY: -55, finalX: 6, finalY: 2, startRot: 15, finalRot: 0, enter: 0.21, wobbleAmp: 3.5, wobbleFreq: 1.5 },
  { startX: -65, startY: 50, finalX: -24, finalY: 2, startRot: -20, finalRot: 0, enter: 0.26, wobbleAmp: 3, wobbleFreq: 2.0 },
  { startX: -55, startY: -55, finalX: -20, finalY: -34, startRot: 0, finalRot: 0, enter: 0.30, wobbleAmp: 2, wobbleFreq: 4.0 },
  { startX: 55, startY: 50, finalX: 18, finalY: 30, startRot: 0, finalRot: 0, enter: 0.32, wobbleAmp: 2, wobbleFreq: 3.5 },
  { startX: -60, startY: 50, finalX: -34, finalY: 8, startRot: 0, finalRot: 0, enter: 0.35, wobbleAmp: 1.5, wobbleFreq: 3.0 },
  { startX: 55, startY: -60, finalX: 28, finalY: -22, startRot: 35, finalRot: 0, enter: 0.23, wobbleAmp: 3, wobbleFreq: 2.4 },
  { startX: -60, startY: -45, finalX: -32, finalY: -8, startRot: -20, finalRot: 0, enter: 0.25, wobbleAmp: 2.5, wobbleFreq: 2.6 },
  { startX: 30, startY: -60, finalX: 10, finalY: -32, startRot: 25, finalRot: -5, enter: 0.29, wobbleAmp: 3, wobbleFreq: 3.0 },
  { startX: -50, startY: 60, finalX: -4, finalY: 28, startRot: 10, finalRot: 0, enter: 0.24, wobbleAmp: 3.5, wobbleFreq: 1.8 },
  { startX: 60, startY: 60, finalX: 38, finalY: 16, startRot: 0, finalRot: 0, enter: 0.33, wobbleAmp: 1.5, wobbleFreq: 3.8 },
];
const TOTAL_ELEMENTS = FLOAT_CONFIGS.length;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const squiggle1Ref = useRef<SVGPathElement>(null);
  const squiggle2Ref = useRef<SVGPathElement>(null);
  const squiggle3Ref = useRef<SVGPathElement>(null);
  const donutCenterRef = useRef<SVGCircleElement>(null);
  const animatingRef = useRef(true);

  /* ── Canvas star animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? rand(40, 60) : rand(80, 120);

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    /* Init stars */
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      radius: rand(0.5, 2),
      speed: rand(0.003, 0.008),
      phase: rand(0, Math.PI * 2),
    }));

    /* Shooting star state (desktop only) */
    const shootingStars: ShootingStar[] = [];
    let lastSpawn = 0;
    let spawnInterval = isMobile ? rand(3000, 5000) : rand(2000, 4000);

    /* Resize handler */
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        stars.forEach(s => {
          s.x = rand(0, w);
          s.y = rand(0, h);
        });
      }, 150);
    };
    window.addEventListener('resize', onResize);

    /* Animation loop */
    let rafId: number;
    const animate = (timestamp: number) => {
      if (!animatingRef.current) { rafId = requestAnimationFrame(animate); return; }

      ctx2d.clearRect(0, 0, w, h);

      /* Twinkling stars */
      for (const s of stars) {
        const opacity = 0.6 + 0.4 * Math.sin(timestamp * s.speed + s.phase);
        ctx2d.beginPath();
        ctx2d.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx2d.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx2d.fill();
      }

      /* Shooting stars */
      {
        const maxActive = isMobile ? 1 : 2;
        if (timestamp - lastSpawn > spawnInterval && shootingStars.length < maxActive) {
          const dir = Math.random() > 0.5 ? 1 : -1;
          const angle = rand(15, 30) * (Math.PI / 180);
          shootingStars.push({
            x: rand(w * 0.1, w * 0.9),
            y: rand(0, h * 0.3),
            angle,
            speed: rand(600, 900),
            length: rand(80, 150),
            born: timestamp,
            lifespan: rand(600, 1200),
            direction: dir,
          });
          lastSpawn = timestamp;
          spawnInterval = isMobile ? rand(3000, 5000) : rand(2000, 4000);
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const ss = shootingStars[i];
          const age = timestamp - ss.born;
          if (age > ss.lifespan) { shootingStars.splice(i, 1); continue; }

          const progress = age / ss.lifespan;
          const fadeOut = 1 - Math.pow(progress, 2);
          const dt = age / 1000;
          const headX = ss.x + Math.cos(ss.angle) * ss.speed * dt * ss.direction;
          const headY = ss.y + Math.sin(ss.angle) * ss.speed * dt;
          const tailX = headX - Math.cos(ss.angle) * ss.length * ss.direction;
          const tailY = headY - Math.sin(ss.angle) * ss.length;

          const grad = ctx2d.createLinearGradient(tailX, tailY, headX, headY);
          grad.addColorStop(0, `rgba(255,255,255,0)`);
          grad.addColorStop(0.7, `rgba(255,255,255,${0.3 * fadeOut})`);
          grad.addColorStop(1, `rgba(255,255,255,${0.9 * fadeOut})`);

          ctx2d.save();
          ctx2d.shadowColor = 'rgba(255,255,255,0.6)';
          ctx2d.shadowBlur = 6;
          ctx2d.beginPath();
          ctx2d.moveTo(tailX, tailY);
          ctx2d.lineTo(headX, headY);
          ctx2d.strokeStyle = grad;
          ctx2d.lineWidth = 1.5;
          ctx2d.stroke();
          ctx2d.restore();
        }
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  /* ── GSAP scroll animations ── */
  useLayoutEffect(() => {
    const squiggles = [squiggle1Ref.current, squiggle2Ref.current, squiggle3Ref.current];
    const sqLens = squiggles.map(sq => {
      if (!sq) return 0;
      const len = sq.getTotalLength();
      sq.style.strokeDasharray = String(len);
      sq.style.strokeDashoffset = String(len);
      return len;
    });

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let phoneW = 220;
    if (vw >= 1024) phoneW = 310;
    else if (vw >= 768) phoneW = 270;
    const phoneH = phoneW * (1200 / 556);
    const screenW = phoneW * 0.90;
    const screenH = phoneH * 0.93;
    const initialScale = Math.max(vw / screenW, vh / screenH) * 1.08;

    const ctx = gsap.context(() => {
      gsap.set('.hero-phone', { xPercent: -50, yPercent: -50, scale: initialScale, opacity: 0 });
      gsap.set('.hero-dark-overlay', { opacity: 0 });

      const base = { trigger: sectionRef.current, scrub: true };

      /* Headline + scroll indicator fade (reversible) */
      gsap.fromTo('.hero-headline',
        { opacity: 1, y: 0 },
        { opacity: 0, y: -50, immediateRender: false, scrollTrigger: { ...base, start: 'top top', end: '8% top' } }
      );
      gsap.fromTo('.hero-scroll-indicator',
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, immediateRender: false, scrollTrigger: { ...base, start: 'top top', end: '4% top' } }
      );

      /* Cosmic bg + canvas + overlay fade out together */
      gsap.fromTo('.hero-cosmic-bg',
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: { ...base, start: '4% top', end: '18% top' } }
      );
      gsap.fromTo('.hero-star-canvas',
        { opacity: 1 },
        {
          opacity: 0, immediateRender: false,
          scrollTrigger: {
            ...base, start: '4% top', end: '18% top',
            onUpdate: (self) => { animatingRef.current = self.progress < 0.95; },
          },
        }
      );
      gsap.fromTo('.hero-bg-overlay',
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: { ...base, start: '4% top', end: '16% top' } }
      );

      /* iPhone fades in large, shrinks to normal */
      gsap.to('.hero-phone', {
        opacity: 1, immediateRender: false,
        scrollTrigger: { ...base, start: '8% top', end: '16% top' },
      });
      gsap.to('.hero-phone', {
        scale: 1, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { ...base, start: '8% top', end: '40% top' },
      });

      /* Dark overlay dissolves */
      gsap.to('.hero-dark-overlay', {
        opacity: 0, immediateRender: false,
        scrollTrigger: { ...base, start: '22% top', end: '38% top' },
      });

      /* Floating elements (20-70%) + end frame (70-100%) */
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
              el.style.opacity = String(clamp(elP * 4, 0, 1));
              el.style.transform = `translate(calc(-50% + ${x.toFixed(2)}vw), calc(-50% + ${y.toFixed(2)}vh)) rotate(${rot.toFixed(2)}deg)`;
            }
          }
          const sqIndices = [7, 8, 15];
          for (let s = 0; s < 3; s++) {
            const sq = squiggles[s]; const len = sqLens[s];
            if (!sq || !len) continue;
            const sqP = clamp((p - FLOAT_CONFIGS[sqIndices[s]].enter) / 0.30, 0, 1);
            sq.style.strokeDashoffset = String(len * (1 - (1 - Math.pow(1 - sqP, 3))));
          }
          if (donutCenterRef.current) {
            const bgP = clamp((p - 0.70) / 0.30, 0, 1);
            const v = Math.round(lerp(10, 255, 1 - Math.pow(1 - bgP, 3)));
            donutCenterRef.current.setAttribute('fill', `rgb(${v},${v},${v})`);
          }
        },
      });

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

  const setElRef = useCallback((i: number) => (el: HTMLDivElement | null) => { elRefs.current[i] = el; }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={`${styles.stickyFrame} hero-sticky-frame`}>

        {/* Static cosmic background image */}
        <div className={`${styles.cosmicBg} hero-cosmic-bg`} />

        {/* Animated star canvas */}
        <canvas ref={canvasRef} className={`${styles.starCanvas} hero-star-canvas`} />

        {/* Dark overlay for text readability */}
        <div className={`${styles.bgOverlay} hero-bg-overlay`} />

        {/* Dark overlay for scene transition */}
        <div className={`${styles.darkOverlay} hero-dark-overlay`} />

        {/* Headline + scroll indicator */}
        <div className={styles.opening}>
          <h1 className={`${styles.headline} hero-headline`}>
            Your resume is costing you interviews.
            <span className={styles.headlineAccent}>Find out why.</span>
          </h1>
          <div className={`${styles.scrollIndicator} hero-scroll-indicator`}>
            <span className={styles.scrollText}>Scroll</span>
            <div className={styles.scrollArrow} />
          </div>
        </div>

        {/* 17 Floating elements */}
        <div ref={setElRef(0)} className={styles.floatingEl}>
          <svg width="100" height="120" viewBox="0 0 100 120" fill="none" aria-hidden="true">
            <rect x="5" y="5" width="80" height="105" rx="6" fill="#EAF2FB" stroke="#3B8BD4" strokeWidth="3" />
            <path d="M60 5v22h22" stroke="#3B8BD4" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="60,5 82,27 60,27" fill="#d0e3f5" />
            <circle cx="35" cy="42" r="12" fill="#d0e8e0" /><circle cx="35" cy="40" r="5" fill="#1D9E75" />
            <path d="M25 52c0-5 4.5-9 10-9s10 4 10 9" stroke="#1D9E75" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="20" y="62" width="50" height="3" rx="1.5" fill="#3B8BD4" opacity="0.4" />
            <rect x="20" y="72" width="40" height="3" rx="1.5" fill="#3B8BD4" opacity="0.3" />
            <rect x="20" y="82" width="45" height="3" rx="1.5" fill="#3B8BD4" opacity="0.3" />
            <rect x="20" y="92" width="30" height="3" rx="1.5" fill="#3B8BD4" opacity="0.2" />
          </svg>
        </div>
        <div ref={setElRef(1)} className={styles.floatingEl}>
          <svg width="80" height="70" viewBox="0 0 80 70" fill="none" aria-hidden="true">
            <path d="M5 10c0-5.5 4.5-10 10-10h50c5.5 0 10 4.5 10 10v30c0 5.5-4.5 10-10 10H30l-15 15V50H15c-5.5 0-10-4.5-10-10V10z" fill="#E24B4A" />
            <circle cx="28" cy="25" r="4" fill="#fff" /><circle cx="42" cy="25" r="4" fill="#fff" /><circle cx="56" cy="25" r="4" fill="#fff" />
          </svg>
        </div>
        <div ref={setElRef(2)} className={styles.floatingEl}>
          <svg width="70" height="60" viewBox="0 0 70 60" fill="none" aria-hidden="true">
            <path d="M5 8c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v24c0 4.4-3.6 8-8 8H25l-12 12V40H13c-4.4 0-8-3.6-8-8V8z" fill="#F28C50" />
            <rect x="16" y="14" width="30" height="3" rx="1.5" fill="#fff" opacity="0.8" />
            <rect x="16" y="22" width="22" height="3" rx="1.5" fill="#fff" opacity="0.6" />
          </svg>
        </div>
        <div ref={setElRef(3)} className={styles.floatingEl}>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" aria-hidden="true">
            <circle cx="70" cy="70" r="55" stroke="#1D9E75" strokeWidth="24" strokeDasharray="115.2 345.6" strokeDashoffset="0" transform="rotate(-90 70 70)" />
            <circle cx="70" cy="70" r="55" stroke="#3B8BD4" strokeWidth="24" strokeDasharray="86.4 345.6" strokeDashoffset="-115.2" transform="rotate(-90 70 70)" />
            <circle cx="70" cy="70" r="55" stroke="#EF9F27" strokeWidth="24" strokeDasharray="69.12 345.6" strokeDashoffset="-201.6" transform="rotate(-90 70 70)" />
            <circle cx="70" cy="70" r="55" stroke="#E24B4A" strokeWidth="24" strokeDasharray="75.28 345.6" strokeDashoffset="-270.72" transform="rotate(-90 70 70)" />
            <circle ref={donutCenterRef} cx="70" cy="70" r="43" fill="#0a0a0a" />
          </svg>
        </div>
        <div ref={setElRef(4)} className={styles.floatingEl}><svg width="110" height="100" viewBox="0 0 110 100" fill="none" aria-hidden="true"><polygon points="55,5 105,95 5,95" fill="#EF9F27" /></svg></div>
        <div ref={setElRef(5)} className={styles.floatingEl}><svg width="65" height="58" viewBox="0 0 65 58" fill="none" aria-hidden="true"><polygon points="32,3 62,55 2,55" fill="#1D9E75" /></svg></div>
        <div ref={setElRef(6)} className={styles.floatingEl}><svg width="42" height="38" viewBox="0 0 42 38" fill="none" aria-hidden="true"><polygon points="21,2 40,36 2,36" fill="#1e3a5f" /></svg></div>
        <div ref={setElRef(7)} className={styles.floatingEl}>
          <svg width="320" height="280" viewBox="0 0 320 280" fill="none" aria-hidden="true">
            <path ref={squiggle1Ref} d="M20 240 C40 180, 80 260, 100 200 S140 100, 160 140 C180 180, 200 80, 240 120 S280 40, 300 80 C310 100, 290 140, 260 120 C230 100, 260 60, 300 40" stroke="#7F77DD" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div ref={setElRef(8)} className={styles.floatingEl}>
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden="true">
            <path ref={squiggle2Ref} d="M10 50 C20 10, 50 10, 45 50 C40 90, 80 90, 75 50 C70 20, 110 20, 110 50" stroke="#1D9E75" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div ref={setElRef(9)} className={styles.floatingEl}><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#7F77DD" /></svg></div>
        <div ref={setElRef(10)} className={styles.floatingEl}><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#EF9F27" /></svg></div>
        <div ref={setElRef(11)} className={styles.floatingEl}><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="#E24B4A" /></svg></div>
        <div ref={setElRef(12)} className={styles.floatingEl}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" aria-hidden="true">
            <circle cx="25" cy="25" r="22" fill="#1D9E75" /><path d="M15 25l7 7 13-14" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        <div ref={setElRef(13)} className={styles.floatingEl}>
          <svg width="56" height="50" viewBox="0 0 56 50" fill="none" aria-hidden="true">
            <rect x="2" y="28" width="12" height="20" rx="2" fill="#3B8BD4" opacity="0.5" /><rect x="18" y="16" width="12" height="32" rx="2" fill="#3B8BD4" opacity="0.7" /><rect x="34" y="6" width="12" height="42" rx="2" fill="#3B8BD4" />
          </svg>
        </div>
        <div ref={setElRef(14)} className={styles.floatingEl}><svg width="36" height="56" viewBox="0 0 36 56" fill="none" aria-hidden="true"><polygon points="22,0 6,26 16,26 10,56 30,22 18,22" fill="#EF9F27" /></svg></div>
        <div ref={setElRef(15)} className={styles.floatingEl}>
          <svg width="180" height="140" viewBox="0 0 180 140" fill="none" aria-hidden="true">
            <path ref={squiggle3Ref} d="M10 70 C30 10, 70 10, 70 60 C70 110, 30 120, 50 80 C70 40, 120 40, 110 80 C100 120, 150 130, 170 80" stroke="#7F77DD" strokeWidth="5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div ref={setElRef(16)} className={styles.floatingEl}><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7.5" fill="#1D9E75" /></svg></div>

        {/* iPhone */}
        <div className={`${styles.phoneContainer} hero-phone`}>
          <img src="/iphone.png" alt="iPhone showing resume score of 8.5 out of 10" className={styles.phoneImage} draggable={false} />
        </div>
      </div>
    </section>
  );
}
