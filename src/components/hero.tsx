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
       * ENTRANCE — headline + scroll indicator
       * ──────────────────────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.hero-headline',
        { y: 40, opacity: 0 },
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
       * SCROLL-DRIVEN CINEMATIC SEQUENCE (300vh)
       *
       * Phase 1: Black screen → headline fades out
       * Phase 2: Dark overlay dissolves, phone fades
       *          in at large scale (the reveal)
       * Phase 3: Phone shrinks to normal size,
       *          cards appear
       * ──────────────────────────────────────────── */
      const base = {
        trigger: sectionRef.current,
        scrub: true,
      };

      /* ── Phase 1: Text exits (0% → 18%) ── */

      gsap.to('.hero-headline', {
        opacity: 0,
        y: -60,
        immediateRender: false,
        scrollTrigger: { ...base, start: 'top top', end: '18% top' },
      });

      gsap.to('.hero-scroll-indicator', {
        opacity: 0,
        y: -20,
        immediateRender: false,
        scrollTrigger: { ...base, start: 'top top', end: '10% top' },
      });

      /* ── Phase 2: The reveal (15% → 45%) ── */

      /* Dark overlay dissolves */
      gsap.to('.hero-dark-overlay', {
        opacity: 0,
        immediateRender: false,
        scrollTrigger: { ...base, start: '15% top', end: '45% top' },
      });

      /* Phone fades in behind it (starts invisible at scale 5) */
      gsap.fromTo(
        '.hero-phone',
        { opacity: 0, scale: 5 },
        {
          opacity: 1,
          scale: 5,
          immediateRender: false,
          scrollTrigger: { ...base, start: '12% top', end: '30% top' },
        }
      );

      /* ── Phase 3: Phone shrinks to normal (30% → 72%) ── */

      gsap.fromTo(
        '.hero-phone',
        { scale: 5 },
        {
          scale: 1,
          immediateRender: false,
          scrollTrigger: { ...base, start: '30% top', end: '72% top' },
        }
      );

      /* Background goes dark → white (35% → 65%) */
      gsap.to('.hero-sticky-frame', {
        backgroundColor: '#ffffff',
        immediateRender: false,
        scrollTrigger: { ...base, start: '35% top', end: '65% top' },
      });

      /* Phone shadow fades in at smaller sizes (55% → 72%) */
      gsap.to('.hero-phone-img', {
        filter: 'drop-shadow(0 30px 80px rgba(0, 0, 0, 0.18))',
        immediateRender: false,
        scrollTrigger: { ...base, start: '55% top', end: '72% top' },
      });

      /* ── Phase 4: Cards appear (70% → 88%) ── */

      gsap.fromTo(
        '.hero-card',
        { y: 40, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.02,
          immediateRender: false,
          scrollTrigger: { ...base, start: '70% top', end: '88% top' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={`${styles.stickyFrame} hero-sticky-frame`}>
        {/* ── Black overlay — sits on top, dissolves to reveal phone ── */}
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

        {/* ── Phone + floating cards (behind overlay) ── */}
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
                className={`${styles.phoneImage} hero-phone-img`}
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
