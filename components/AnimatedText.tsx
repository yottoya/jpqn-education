// components/AnimatedText.tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Make sure GSAP plugins are registered (can be in a top-level file or here)
gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  children: React.ReactNode;
  tag?: React.ElementType; // ← Better: ElementType instead of keyof JSX...
  splitType?: "words" | "chars"; // 'words' → chunkier, 'chars' → typewriter/streaming
  className?: string;
}

export default function AnimatedText({
  children,
  tag: Tag = "p",
  splitType = "words",
  className = "",
}: AnimatedTextProps) {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      // Create the split – note: tagName, not tag
      const split = new SplitType(textRef.current, {
        types: splitType,
        tagName: "span", // ← correct property name from SplitType docs
      });

      // Animate the split elements
      gsap.from(split[splitType as "words" | "chars"], {
        y: "100%",
        opacity: 0,
        duration: 0.5, // base duration per element
        stagger: splitType === "chars" ? 0.02 : 0.1, // finer for chars = streaming feel
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          end: "bottom 60%",
          scrub: 1, // smooth scroll-linked progress
          toggleActions: "play none none reverse", // reverse nicely on scroll up
        },
      });

      // Optional: cleanup split on unmount / revert (good practice)
      return () => {
        split.revert();
      };
    },
    { scope: textRef }, // ← scopes selectors & cleanup
  );

  return (
    <Tag ref={textRef} className={`overflow-hidden ${className}`}>
      {children}
    </Tag>
  );
}
