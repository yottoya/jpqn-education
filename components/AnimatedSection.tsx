// components/AnimatedSection.tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"; // ← Import here (critical!)
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); // Register once per file (safe to do here)

interface AnimatedSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  pin?: boolean;
}

export default function AnimatedSection({
  id,
  children,
  className = "",
  pin = false,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: pin ? "+=1500" : "bottom 70%", // adjust as needed
          scrub: pin ? 0.5 : false,
          pin: pin,
          pinSpacing: pin ? "margin" : false, // optional: cleaner pinning
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id={id} ref={sectionRef} className={`py-16 px-4 ${className}`}>
      {children}
    </section>
  );
}
