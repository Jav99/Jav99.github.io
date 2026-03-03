'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { PaintSplash } from './PaintSplash';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './Hero.module.css';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const phoneScrollRef = useRef<HTMLDivElement>(null);
  const [hasLanded, setHasLanded] = useState(false);
  const scrollProgressRef = useScrollProgress(containerRef);

  /* Flip to idle float animation after the drop sequence completes */
  const handleDropEnd = useCallback(() => {
    setHasLanded(true);
  }, []);

  /* Scroll-driven transforms: rotation + parallax lift on phone wrapper */
  useEffect(() => {
    let rafId = 0;

    function applyScroll() {
      if (!phoneScrollRef.current) return;
      const p = scrollProgressRef.current;
      const rotation = p * 3;     // max 3deg
      const translateY = p * -30; // max -30px lift
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
      {/* Canvas: paint splash particle system behind phone */}
      <div className={styles.canvasWrap}>
        <PaintSplash scrollProgressRef={scrollProgressRef} />
      </div>

      {/* iPhone with scroll-driven wrapper */}
      <div ref={phoneScrollRef} className={styles.phoneAnchor}>
        <div
          className={hasLanded ? styles.phoneFloat : styles.phoneDrop}
          onAnimationEnd={!hasLanded ? handleDropEnd : undefined}
        >
          <img
            src="/iphone.png"
            alt="iPhone showing resume score"
            className={styles.phoneImage}
            draggable={false}
          />
        </div>

        {/* Dynamic ground shadow — expands on impact */}
        <div
          className={`${styles.groundShadow} ${
            hasLanded ? styles.groundShadowVisible : ''
          }`}
        />
      </div>
    </section>
  );
}
