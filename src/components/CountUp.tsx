// src/components/CountUp.tsx
import { useRef, useEffect, useCallback } from "react";
import { useMotionValue, useSpring, useInView } from "motion/react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number; // seconds
  separator?: string;
  className?: string;
  quick?: boolean; // fast animation
}

export default function CountUp({
  to,
  from = 0,
  duration = 0.5,
  separator = ",",
  className = "",
  quick = true, // default to fast
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);

  // Quick spring parameters for instant feel
  const springValue = useSpring(motionValue, {
    damping: quick ? 15 : 25 + 40 * (1 / duration),
    stiffness: quick ? 500 : 100 * (1 / duration),
  });

  const isInView = useInView(ref, { once: true });

  const formatNumber = useCallback(
    (num: number) => {
      if (!Number.isFinite(num)) return "0";
      const formatted = Math.round(num).toLocaleString("en-GB");
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [separator]
  );

  // Initialize display immediately
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatNumber(from);
    }
  }, [from, formatNumber]);

  // Animate to new number whenever `to` changes
  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [to, motionValue, isInView]);

  // Update DOM on spring change
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest: number) => {
      if (ref.current) {
        ref.current.textContent = formatNumber(latest);
      }
    });
    return () => unsubscribe();
  }, [springValue, formatNumber]);

  return <span className={className} ref={ref} />;
}
