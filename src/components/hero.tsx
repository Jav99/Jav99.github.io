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
       * ENTRANCE TIMELINE — plays once on load
       * ──────────────────────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      /* Staggered headline reveal */
      tl.fromTo(
        '.hero-line',
        { y: 80, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.12 },
        0.2
      );

      /* Subtitle + CTAs fade up */
      tl.fromTo(
        '.hero-fade',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        0.6
      );

      /* Phone fades in at 2x (CSS already sets scale(2) + opacity:0) */
      tl.to(
        '.hero-phone',
        { opacity: 1, duration: 1, ease: 'power2.out' },
        0.4
      );

      /* Floating cards stagger in */
      tl.fromTo(
        '.hero-card',
        { y: 30, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.2)',
        },
        0.9
      );

      /* ────────────────────────────────────────────
       * SCROLL-DRIVEN — scrub animations
       * All use immediateRender:false so they don't
       * conflict with the entrance timeline.
       * ──────────────────────────────────────────── */
      const scrollDefaults = {
        trigger: sectionRef.current,
        scrub: true, /* true = 1:1 with scroll, no lag */
      };

      /* Phone shrinks 2x → 1x and drifts up */
      gsap.fromTo(
        '.hero-phone',
        { scale: 2, y: 0 },
        {
          scale: 1,
          y: -50,
          immediateRender: false,
          scrollTrigger: {
            ...scrollDefaults,
            start: 'top top',
            end: '80% top',
          },
        }
      );

      /* Headline parallax up + fade */
      gsap.to('.hero-content', {
        y: -80,
        opacity: 0,
        immediateRender: false,
        scrollTrigger: {
          ...scrollDefaults,
          start: 'top top',
          end: '45% top',
        },
      });

      /* Cards drift outward + fade — starts slightly later */
      const cardScrollTrigger = {
        ...scrollDefaults,
        start: '15% top',
        end: '70% top',
      };

      gsap.to('.ats-card', {
        x: -60, y: -40, opacity: 0,
        immediateRender: false,
        scrollTrigger: cardScrollTrigger,
      });
      gsap.to('.engagement-card', {
        x: -70, y: 30, opacity: 0,
        immediateRender: false,
        scrollTrigger: { ...cardScrollTrigger },
      });
      gsap.to('.expert-card', {
        x: 60, y: -45, opacity: 0,
        immediateRender: false,
        scrollTrigger: { ...cardScrollTrigger },
      });
      gsap.to('.interview-card', {
        x: 70, y: 35, opacity: 0,
        immediateRender: false,
        scrollTrigger: { ...cardScrollTrigger },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* ── Headline area ── */}
      <div className={`${styles.content} hero-content`}>
        <h1 className={styles.headline}>
          <span className={`${styles.heroLine} hero-line`}>Expert-Led</span>
          <span className={`${styles.heroLine} hero-line`}>Resume Growth</span>
        </h1>
        <p className={`${styles.subtitle} hero-fade`}>
          From career gaps to dream offers — manage your professional
          narrative with human-led strategic audits.
        </p>
        <div className={`${styles.ctas} hero-fade`}>
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
          <div className={`${styles.floatingCard} ${styles.atsCard} hero-card ats-card`}>
            <div className={styles.cardIconCircle}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M5 9l3 3 5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className={styles.cardLabel}>ATS SCORE</span>
            <span className={styles.cardValue}>95%</span>
          </div>

          {/* Engagement — bottom left */}
          <div className={`${styles.floatingCard} ${styles.engagementCard} hero-card engagement-card`}>
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
          <div className={`${styles.floatingCard} ${styles.expertCard} hero-card expert-card`}>
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
          <div className={`${styles.floatingCard} ${styles.interviewCard} hero-card interview-card`}>
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
