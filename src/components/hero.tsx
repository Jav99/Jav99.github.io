'use client';

import { useRef, useEffect } from 'react';
import styles from './Hero.module.css';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const gradientLeftRef = useRef<HTMLDivElement>(null);
  const gradientRightRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const atsRef = useRef<HTMLDivElement>(null);
  const engagementRef = useRef<HTMLDivElement>(null);
  const expertRef = useRef<HTMLDivElement>(null);
  const interviewRef = useRef<HTMLDivElement>(null);

  /* Smooth scroll-driven parallax with lerp for buttery interpolation */
  useEffect(() => {
    let rafId = 0;
    let current = 0; // smoothed progress value
    let running = true;

    /* Ease-out cubic for extra smoothness */
    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick() {
      if (!running || !sectionRef.current) {
        if (running) rafId = requestAnimationFrame(tick);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const raw = Math.min(Math.max(-rect.top / (rect.height * 0.5), 0), 1);

      /* Lerp for smooth interpolation — no jank */
      current += (raw - current) * 0.08;
      const p = easeOut(current);

      /* Gradient blobs drift downward into the next section */
      if (gradientLeftRef.current) {
        gradientLeftRef.current.style.transform =
          `translate(${p * -90}px, ${p * 180}px) scale(${1 + p * 0.35})`;
      }
      if (gradientRightRef.current) {
        gradientRightRef.current.style.transform =
          `translate(${p * 110}px, ${p * 200}px) scale(${1 + p * 0.3})`;
      }

      /* Phone: starts at 2x scale, settles to 1x as user scrolls */
      const phoneScale = 2 - p * 1; // 2 → 1
      if (phoneRef.current) {
        phoneRef.current.style.transform =
          `translateY(${p * -80}px) scale(${phoneScale})`;
        phoneRef.current.style.opacity = `${1 - p * 0.2}`;
      }

      /* Cards drift outward + fade */
      if (atsRef.current) {
        atsRef.current.style.transform =
          `translate(${p * -55}px, ${p * -40}px)`;
        atsRef.current.style.opacity = `${1 - p * 0.7}`;
      }
      if (engagementRef.current) {
        engagementRef.current.style.transform =
          `translate(${p * -65}px, ${p * 30}px)`;
        engagementRef.current.style.opacity = `${1 - p * 0.7}`;
      }
      if (expertRef.current) {
        expertRef.current.style.transform =
          `translate(${p * 55}px, ${p * -45}px)`;
        expertRef.current.style.opacity = `${1 - p * 0.7}`;
      }
      if (interviewRef.current) {
        interviewRef.current.style.transform =
          `translate(${p * 65}px, ${p * 35}px)`;
        interviewRef.current.style.opacity = `${1 - p * 0.7}`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* ── Headline area ──────────────────────────── */}
      <div className={styles.content}>
        <h1 className={styles.headline}>
          Expert-Led Resume Growth
        </h1>
        <p className={styles.subtitle}>
          From career gaps to dream offers — manage your professional
          narrative with human-led strategic audits.
        </p>
        <div className={styles.ctas}>
          <a href="#audit" className={styles.ctaPrimary}>
            Rate for Free
          </a>
          <a href="#services" className={styles.ctaSecondary}>
            Learn More
          </a>
        </div>
      </div>

      {/* ── Showcase: gradient background + phone + cards ── */}
      <div className={styles.showcase}>
        <div ref={gradientLeftRef} className={styles.gradientLeft} />
        <div ref={gradientRightRef} className={styles.gradientRight} />

        <div className={styles.phoneArea}>
          {/* ATS Score — top left */}
          <div ref={atsRef} className={`${styles.floatingCard} ${styles.atsCard}`}>
            <div className={styles.cardIconCircle}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M5 9l3 3 5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className={styles.cardLabel}>ATS SCORE</span>
            <span className={styles.cardValue}>95%</span>
          </div>

          {/* Engagement — bottom left */}
          <div ref={engagementRef} className={`${styles.floatingCard} ${styles.engagementCard}`}>
            <div className={styles.cardLabelRow}>
              <span className={styles.cardLabel}>ENGAGEMENT</span>
              <span className={styles.cardBadgeGreen}>+12%</span>
            </div>
            <div className={styles.barChart}>
              <div className={styles.bar} data-h="45" />
              <div className={styles.bar} data-h="65" />
              <div className={styles.bar} data-h="50" />
              <div className={`${styles.bar} ${styles.barGreen}`} data-h="85" />
            </div>
            <span className={styles.cardValue}>40%</span>
          </div>

          {/* iPhone */}
          <div ref={phoneRef} className={styles.phoneFrame}>
            <img
              src="/iphone.png"
              alt="iPhone showing resume score of 8.5 out of 10"
              className={styles.phoneImage}
              draggable={false}
            />
          </div>

          {/* Expert Rating — top right */}
          <div ref={expertRef} className={`${styles.floatingCard} ${styles.expertCard}`}>
            <div className={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={styles.starGreen} aria-hidden="true">★</span>
              ))}
            </div>
            <span className={styles.cardLabel}>EXPERT RATING</span>
            <p className={styles.cardQuote}>
              &ldquo;Strategic impact is exceptionally high.&rdquo;
            </p>
          </div>

          {/* Interview Ready — bottom right */}
          <div ref={interviewRef} className={`${styles.floatingCard} ${styles.interviewCard}`}>
            <div className={styles.interviewIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M6.5 10.5l2.5 2.5 5-5.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="1.5" y="1.5" width="17" height="17" rx="4" stroke="#10B981" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <span className={styles.cardTextBold}>Interview</span>
              <span className={styles.cardTextBold}>Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
