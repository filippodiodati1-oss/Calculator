import { motion, type Transition, type Easing } from "framer-motion"; // Correct Easing import
import { useEffect, useRef, useState, useMemo } from "react";

// Define types for animation snapshots
interface AnimationSnapshot {
  filter: string;
  opacity: number;
  y: number;
  // Add other potential motion values if needed
  [key: string]: any;
}

// Manually define a type for keyframes since it's not exported as `Keyframes`
type FramerKeyframes = {
  [key: string]: (string | number | null)[];
};

// Function with explicit types
const buildKeyframes = (
  from: AnimationSnapshot,
  steps: AnimationSnapshot[]
): FramerKeyframes => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: FramerKeyframes = {};
  keys.forEach((k) => {
    // Ensure all steps have the key or it's handled gracefully
    keyframes[k] = [
      from[k],
      ...steps.map((s) => (s[k] !== undefined ? s[k] : from[k])),
    ];
  });
  return keyframes;
};

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  // Easing can be a string, array of strings, or number array (cubic bezier)
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = [0.42, 0, 0.58, 1], // Default easing (cubic bezier array)
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null); // Explicitly type the ref

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Type guard required for TypeScript
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, rootMargin]);

  const defaultFrom: AnimationSnapshot = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo: AnimationSnapshot[] = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        // Define the transition object correctly for Framer Motion
        const spanTransition: Transition = {
          duration: stepDuration * (toSnapshots.length || 1),
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
