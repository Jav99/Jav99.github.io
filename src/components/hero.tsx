'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ────────────────────────────────────────────
       * ENTRANCE — headline + scroll indicator fade in
       * ──────────────────────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.hero-headline',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        0.3
      );

      tl.fromTo(
        '.hero-scroll-indicator',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.9
      );

      /* ────────────────────────────────────────────
       * SCROLL-DRIVEN CINEMATIC SEQUENCE
       *
       * Section is 300vh. Inner sticky wrapper stays
       * pinned via CSS `position: sticky`. All GSAP
       * tweens are scrubbed against the section.
       * ──────────────────────────────────────────── */
      const base = {
        trigger: sectionRef.current,
        scrub: true,
      };

      /* Headline fades up and out (0% → 25%) */
      gsap.to('.hero-headline', {
        y: -100,
        opacity: 0,
        immediateRender: false,
        scrollTrigger: { ...base, start: 'top top', end: '25% top' },
      });

      /* Scroll indicator vanishes fast (0% → 12%) */
      gsap.to('.hero-scroll-indicator', {
        opacity: 0,
        y: -20,
        immediateRender: false,
        scrollTrigger: { ...base, start: 'top top', end: '12% top' },
      });

      /* Dark overlay fades out → white bg (15% → 50%) */
      gsap.to('.hero-dark-overlay', {
        opacity: 0,
        immediateRender: false,
        scrollTrigger: { ...base, start: '15% top', end: '50% top' },
      });

      /* Phone rises from below into center (10% → 60%) */
      gsap.fromTo(
        '.hero-phone',
        { yPercent: 120, scale: 1.1, opacity: 0 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          immediateRender: false,
          scrollTrigger: { ...base, start: '10% top', end: '60% top' },
        }
      );

      /* Floating cards stagger in (55% → 80%) */
      gsap.fromTo(
        '.hero-card',
        { y: 40, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.02,
          immediateRender: false,
          scrollTrigger: { ...base, start: '55% top', end: '80% top' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.stickyFrame}>
        {/* ── Dark cinematic overlay ── */}
        <div className={`${styles.darkOverlay} hero-dark-overlay`} />

        {/* ── Opening: headline + scroll indicator ── */}
        <div className={styles.opening}>
          <h1 className={`${styles.headline} hero-headline`}>
            Rate your resume today.
          </h1>
          <div className={`${styles.scrollIndicator} hero-scroll-indicator`}>
            <span className={styles.scrollText}>Scroll</span>
            <div className={styles.scrollDots}>
              <span /><span /><span /><span />
              <span /><span /><span /><span />
              <span /><span /><span /><span />
              <span /><span /><span /><span />
            </div>
          </div>
        </div>

        {/* ── Phone + floating cards ── */}
        <div className={styles.showcase}>
          <div className={styles.phoneArea}>
            {/* ATS Score — top left */}
            <div className={`${styles.floatingCard} ${styles.atsCard} hero-card`}>
              <div className={styles.cardIconCircle}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M5 9l3 3 5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className={styles.cardLabel}>ATS SCORE</span>
              <span className={styles.cardValue}>95%</span>
            </div>

            {/* Engagement — bottom left */}
            <div className={`${styles.floatingCard} ${styles.engagementCard} hero-card`}>
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
            <div className={`${styles.phoneFrame} hero-phone`}>
              <img
                src="/iphone.png"
                alt="iPhone showing resume score of 8.5 out of 10"
                className={styles.phoneImage}
                draggable={false}
              />
            </div>

            {/* Expert Rating — top right */}
            <div className={`${styles.floatingCard} ${styles.expertCard} hero-card`}>
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
            <div className={`${styles.floatingCard} ${styles.interviewCard} hero-card`}>
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
      </div>
    </section>
  );
}
