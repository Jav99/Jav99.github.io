'use client';

import { useRef, useEffect } from 'react';
import styles from './Hero.module.css';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const atsRef = useRef<HTMLDivElement>(null);
  const engagementRef = useRef<HTMLDivElement>(null);
  const expertRef = useRef<HTMLDivElement>(null);
  const interviewRef = useRef<HTMLDivElement>(null);

  /* Smooth scroll-driven parallax with lerp */
  useEffect(() => {
    let rafId = 0;
    let current = 0;
    let running = true;

    function tick() {
      if (!running || !sectionRef.current) {
        if (running) rafId = requestAnimationFrame(tick);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      /* Progress based on how far the showcase (bottom half) has scrolled */
      const raw = Math.min(Math.max(-rect.top / (rect.height * 0.6), 0), 1);

      /* Lerp for buttery interpolation */
      current += (raw - current) * 0.06;
      const p = current;

      /* Smooth ease-out curve */
      const ep = 1 - Math.pow(1 - p, 3);

      /* Phone: 2x → 1x with gentle upward drift */
      const phoneScale = 2 - ep * 1;
      if (phoneRef.current) {
        phoneRef.current.style.transform =
          `translateY(${ep * -50}px) scale(${phoneScale})`;
        phoneRef.current.style.opacity = `${1 - ep * 0.15}`;
      }

      /* Cards drift outward + fade — only starts after phone begins shrinking */
      const cardP = Math.max(0, (ep - 0.15) / 0.85); // delayed start
      if (atsRef.current) {
        atsRef.current.style.transform =
          `translate(${cardP * -50}px, ${cardP * -35}px)`;
        atsRef.current.style.opacity = `${1 - cardP * 0.8}`;
      }
      if (engagementRef.current) {
        engagementRef.current.style.transform =
          `translate(${cardP * -60}px, ${cardP * 25}px)`;
        engagementRef.current.style.opacity = `${1 - cardP * 0.8}`;
      }
      if (expertRef.current) {
        expertRef.current.style.transform =
          `translate(${cardP * 50}px, ${cardP * -40}px)`;
        expertRef.current.style.opacity = `${1 - cardP * 0.8}`;
      }
      if (interviewRef.current) {
        interviewRef.current.style.transform =
          `translate(${cardP * 60}px, ${cardP * 30}px)`;
        interviewRef.current.style.opacity = `${1 - cardP * 0.8}`;
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

      {/* ── Showcase: phone + floating cards ── */}
      <div className={styles.showcase}>
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
