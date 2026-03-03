'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { PaintBloom } from './PaintBloom';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './Hero.module.css';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const phoneScrollRef = useRef<HTMLDivElement>(null);
  const [hasLanded, setHasLanded] = useState(false);
  const scrollProgressRef = useScrollProgress(containerRef);

  /* Flip to floating animation after the drop sequence completes */
  const handleDropEnd = useCallback(() => {
    setHasLanded(true);
  }, []);

  /* Scroll-driven transforms: subtle rotation + parallax on phone wrapper */
  useEffect(() => {
    let rafId = 0;

    function applyScroll() {
      if (!phoneScrollRef.current) return;
      const p = scrollProgressRef.current;
      const rotation = p * 2;    // max 2deg
      const translateY = p * -20; // max -20px
      phoneScrollRef.current.style.transform =
        `translateY(${translateY}px) rotate(${rotation}deg)`;
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
  }, [scrollProgressRef]);

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Soft radial background glow */}
      <div className={styles.backgroundGlow} />

      {/* Canvas: liquid ink bloom behind phone */}
      <div className={styles.canvasWrap}>
        <PaintBloom scrollProgressRef={scrollProgressRef} />
      </div>

      {/* iPhone with scroll-driven wrapper */}
      <div ref={phoneScrollRef} className={styles.phoneAnchor}>
        <div
          className={hasLanded ? styles.phoneFloat : styles.phoneDrop}
          onAnimationEnd={!hasLanded ? handleDropEnd : undefined}
        >
          {/* Replace /iphone.png with your transparent-background iPhone PNG */}
          <img
            src="/iphone.png"
            alt="iPhone"
            className={styles.phoneImage}
            draggable={false}
          />
        </div>

        {/* Ground shadow — fades in after landing */}
        <div
          className={`${styles.groundShadow} ${
            hasLanded ? styles.groundShadowVisible : ''
          }`}
        />
      </div>
    </section>
  );
}
