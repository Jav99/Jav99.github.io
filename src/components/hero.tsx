'use client';

import { useRef, useEffect } from 'react';
import styles from './Hero.module.css';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const gradientLeftRef = useRef<HTMLDivElement>(null);
  const gradientRightRef = useRef<HTMLDivElement>(null);

  /* Scroll-driven gradient motion */
  useEffect(() => {
    let rafId = 0;

    function applyScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const p = Math.min(Math.max(-rect.top / (rect.height * 0.5), 0), 1);

      if (gradientLeftRef.current) {
        gradientLeftRef.current.style.transform =
          `translate(${p * -70}px, ${p * -110}px) scale(${1 + p * 0.18})`;
      }
      if (gradientRightRef.current) {
        gradientRightRef.current.style.transform =
          `translate(${p * 70}px, ${p * -90}px) scale(${1 + p * 0.14})`;
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(applyScroll);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
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
          <div className={`${styles.floatingCard} ${styles.atsCard}`}>
            <div className={styles.cardIconCircle}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M5 9l3 3 5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className={styles.cardLabel}>ATS SCORE</span>
            <span className={styles.cardValue}>95%</span>
          </div>

          {/* Engagement — bottom left */}
          <div className={`${styles.floatingCard} ${styles.engagementCard}`}>
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
          <div className={styles.phoneFrame}>
            <img
              src="/iphone.png"
              alt="iPhone showing resume score of 8.5 out of 10"
              className={styles.phoneImage}
              draggable={false}
            />
          </div>

          {/* Expert Rating — top right */}
          <div className={`${styles.floatingCard} ${styles.expertCard}`}>
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
          <div className={`${styles.floatingCard} ${styles.interviewCard}`}>
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
