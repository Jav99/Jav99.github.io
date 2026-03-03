import { useEffect, useRef, type RefObject, type MutableRefObject } from 'react';

/**
 * Tracks scroll progress (0–1) within the first viewport height of a container.
 * Returns a mutable ref to avoid re-renders on every scroll tick.
 */
export function useScrollProgress(
  containerRef: RefObject<HTMLElement | null>
): MutableRefObject<number> {
  const progressRef = useRef(0);

  useEffect(() => {
    function update() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / window.innerHeight, 0), 1);
      progressRef.current = progress;
    }

    window.addEventListener('scroll', update, { passive: true });
    update();

    return () => window.removeEventListener('scroll', update);
  }, [containerRef]);

  return progressRef;
}
