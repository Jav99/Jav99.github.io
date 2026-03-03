'use client';

import { useRef, useEffect, type MutableRefObject } from 'react';

interface PaintSplashProps {
  scrollProgressRef: MutableRefObject<number>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  decay: number;
}

/* Bold vibrant palette */
const COLORS: [number, number, number][] = [
  [30, 144, 255],  // Blue   #1E90FF
  [50, 205, 50],   // Green  #32CD32
  [255, 215, 0],   // Yellow #FFD700
];

const PARTICLE_COUNT = 300;
const GRAVITY = 0.12;
const DAMPING = 0.993;
const SPLASH_DELAY = 700; // ms — synced with phoneDrop landing keyframe

export function PaintSplash({ scrollProgressRef }: PaintSplashProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    let splashed = false;
    let glowAlpha = 0;
    const t0 = performance.now();

    /* Compute explosion origin: bottom-center of the iPhone image */
    function getOrigin(): { x: number; y: number } {
      const phoneW = w >= 768 ? 320 : 260;
      const phoneH = phoneW * (1200 / 556);
      return {
        x: w / 2,
        y: h / 2 + phoneH * 0.42,
      };
    }

    /* Spawn 300 particles in an upward-biased radial burst */
    function spawn() {
      const { x: ox, y: oy } = getOrigin();

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Fan upward: center at -90° with ±135° spread
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
        const speed = 2 + Math.random() * 14;
        const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)];

        particles.push({
          x: ox + (Math.random() - 0.5) * 30,
          y: oy + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 3,
          radius: 1.5 + Math.random() * 4.5,
          r,
          g,
          b,
          alpha: 0.4 + Math.random() * 0.6, // some translucent
          decay: 0.002 + Math.random() * 0.005,
        });
      }
    }

    function draw(now: number) {
      const elapsed = now - t0;

      /* Trigger splash at 700ms — matches phone landing */
      if (!splashed && elapsed >= SPLASH_DELAY) {
        splashed = true;
        spawn();
      }

      ctx!.clearRect(0, 0, w, h);

      if (!splashed) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const scrollP = scrollProgressRef.current;
      const parallaxY = scrollP * -50;
      const { x: ox, y: oy } = getOrigin();

      /* ── Radial glow behind explosion ──────────────────── */
      const splashAge = (elapsed - SPLASH_DELAY) / 1000;

      if (splashAge < 0.3) {
        glowAlpha = (splashAge / 0.3) * 0.25;
      } else if (splashAge < 2) {
        glowAlpha = 0.25 - (splashAge - 0.3) * 0.12;
      } else {
        glowAlpha = Math.max(glowAlpha - 0.002, 0);
      }

      if (glowAlpha > 0.005) {
        const glowR = 100 + Math.min(splashAge, 1.5) * 300;
        const glow = ctx!.createRadialGradient(
          ox, oy + parallaxY, 0,
          ox, oy + parallaxY, glowR
        );
        glow.addColorStop(0, `rgba(255, 255, 255, ${glowAlpha})`);
        glow.addColorStop(0.25, `rgba(30, 144, 255, ${glowAlpha * 0.5})`);
        glow.addColorStop(0.5, `rgba(50, 205, 50, ${glowAlpha * 0.35})`);
        glow.addColorStop(0.75, `rgba(255, 215, 0, ${glowAlpha * 0.2})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx!.fillStyle = glow;
        ctx!.fillRect(0, 0, w, h);
      }

      /* ── Particles ─────────────────────────────────────── */
      if (particles.length === 0) {
        // All faded — stop loop when glow is also gone
        if (glowAlpha <= 0.005) return;
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx!.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics: gravity + damping
        p.vy += GRAVITY;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        ctx!.globalAlpha = p.alpha;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y + parallaxY, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = 'source-over';

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [scrollProgressRef]);

  return (
    <canvas ref={canvasRef} className="w-full h-full block" />
  );
}
