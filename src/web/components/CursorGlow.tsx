/**
 * A soft red glow that follows the mouse across the whole screen.
 *
 * It sits behind all content (fixed, pointer-events: none) and moves smoothly
 * toward the cursor using a short animation loop. On touch devices with no
 * mouse, it simply stays centered and still.
 */

import { useEffect, useRef } from "react";

// Minimal ambient typing (the shim has no full DOM lib).
declare const window: {
  innerWidth: number;
  innerHeight: number;
  matchMedia?: (q: string) => { matches: boolean };
  addEventListener: (t: string, cb: (e: { clientX: number; clientY: number }) => void) => void;
  removeEventListener: (t: string, cb: (e: { clientX: number; clientY: number }) => void) => void;
  requestAnimationFrame: (cb: () => void) => number;
  cancelAnimationFrame: (id: number) => void;
};

export const CursorGlow = () => {
  const ref = useRef<{ style: { transform: string } } | null>(null);

  useEffect(() => {
    // Respect users who prefer reduced motion: keep the glow static.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Start centered.
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;

    const onMove = (e: { clientX: number; clientY: number }) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const apply = () => {
      const el = ref.current;
      if (el) el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    };

    if (reduced) {
      apply();
      return;
    }

    const tick = () => {
      // Ease toward the cursor for a smooth trailing feel.
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      apply();
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
};
