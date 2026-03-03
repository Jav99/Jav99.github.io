'use client';

import { useRef, useEffect, type MutableRefObject } from 'react';

interface PaintBloomProps {
  scrollProgressRef: MutableRefObject<number>;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function PaintBloom({ scrollProgressRef }: PaintBloomProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const dims = { w: 0, h: 0 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dims.w = rect.width;
      dims.h = rect.height;
      canvas!.width = dims.w * dpr;
      canvas!.height = dims.h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    startRef.current = performance.now();
    let lastScrollVal = -1;
    let settled = false;

    function draw(now: number) {
      const { w, h } = dims;
      const elapsed = now - startRef.current;

      /* ── Bloom radius ─────────────────────────────────── */
      const maxRadius = Math.min(w, h) * 0.38;

      let baseRadius = 0;
      if (elapsed > 600 && elapsed <= 1600) {
        baseRadius = easeOutCubic((elapsed - 600) / 1000) * maxRadius;
      } else if (elapsed > 1600) {
        baseRadius = maxRadius;
      }

      const currentScroll = scrollProgressRef.current;
      const radius = baseRadius + currentScroll * 80;

      /* ── Skip draw when nothing changes ────────────────── */
      if (elapsed > 1800) settled = true;
      if (settled && currentScroll === lastScrollVal) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastScrollVal = currentScroll;

      ctx!.clearRect(0, 0, w, h);

      if (radius <= 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      /* ── Bloom origin: lower-center of iPhone area ─────── */
      const cx = w / 2;
      const cy = h * 0.58;

      /* ── Soft background glow ──────────────────────────── */
      const bg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.6);
      bg.addColorStop(0, 'rgba(100, 140, 200, 0.06)');
      bg.addColorStop(1, 'rgba(100, 140, 200, 0)');
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      /* ── Blue layer — slightly left ────────────────────── */
      const g1 = ctx!.createRadialGradient(
        cx - radius * 0.15, cy, 0,
        cx - radius * 0.15, cy, radius
      );
      g1.addColorStop(0, 'rgba(55, 120, 200, 0.32)');
      g1.addColorStop(0.4, 'rgba(55, 120, 200, 0.12)');
      g1.addColorStop(1, 'rgba(55, 120, 200, 0)');
      ctx!.fillStyle = g1;
      ctx!.fillRect(0, 0, w, h);

      /* ── Green layer — slightly right & up ─────────────── */
      const g2 = ctx!.createRadialGradient(
        cx + radius * 0.12, cy - radius * 0.1, 0,
        cx + radius * 0.12, cy - radius * 0.1, radius * 0.85
      );
      g2.addColorStop(0, 'rgba(70, 165, 85, 0.28)');
      g2.addColorStop(0.45, 'rgba(70, 165, 85, 0.09)');
      g2.addColorStop(1, 'rgba(70, 165, 85, 0)');
      ctx!.fillStyle = g2;
      ctx!.fillRect(0, 0, w, h);

      /* ── Gold layer — slightly down ────────────────────── */
      const g3 = ctx!.createRadialGradient(
        cx, cy + radius * 0.08, 0,
        cx, cy + radius * 0.08, radius * 0.75
      );
      g3.addColorStop(0, 'rgba(195, 170, 55, 0.22)');
      g3.addColorStop(0.5, 'rgba(195, 170, 55, 0.07)');
      g3.addColorStop(1, 'rgba(195, 170, 55, 0)');
      ctx!.fillStyle = g3;
      ctx!.fillRect(0, 0, w, h);

      /* ── Soft-edge fade to match background (#F8FAFC) ──── */
      const edge = ctx!.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 1.2);
      edge.addColorStop(0, 'rgba(248, 250, 252, 0)');
      edge.addColorStop(1, 'rgba(248, 250, 252, 0.55)');
      ctx!.fillStyle = edge;
      ctx!.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [scrollProgressRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
