// Reusable portfolio hooks — extracted to keep components small and dependencies explicit.
import { useEffect, useRef, useState, useCallback } from "react";

/**
 * 3D mouse-parallax tilt for any element.
 * Returns a ref to attach to the element you want to tilt.
 */
export const useTilt = (intensity = 14) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const handleMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1100px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(0)`;
    };
    const handleLeave = () => {
      el.style.transform = "perspective(1100px) rotateY(0) rotateX(0)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [intensity]);

  return ref;
};

/**
 * Animates a number from 0 -> target when the element first scrolls into view.
 * Returns [currentValue, refToObserve].
 */
export const useCounter = (target, duration = 1800) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const startTs = performance.now();
            const tick = (t) => {
              const progress = Math.min((t - startTs) / duration, 1);
              setVal(Math.floor(progress * target));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [val, ref];
};

/**
 * Adds the `in` class to every `.reveal` descendant once it enters the viewport.
 * Re-scans on every render-key change so dynamically added elements are picked up.
 */
export const useReveal = (rootSelector = ".reveal") => {
  const scan = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(rootSelector).forEach((el) => observer.observe(el));
    return observer;
  }, [rootSelector]);

  useEffect(() => {
    const observer = scan();
    return () => observer.disconnect();
  }, [scan]);
};

/**
 * Sets a flag once window.scrollY exceeds threshold. Used by the sticky header.
 */
export const useScrolled = (threshold = 30) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
};
