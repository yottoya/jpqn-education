"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function GsapPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const textElements = gsap.utils.toArray<HTMLElement>("h1, h2, p");

      textElements.forEach((element) => {
        gsap.from(element, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%", // Start animation when element is 85% from the top of the viewport
            toggleActions: "play none none reverse", // Reverses the animation if user scrolls back up
          },
        });
      });
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
}
