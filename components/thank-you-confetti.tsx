"use client";

import { useRef } from "react";

import { Confetti, type ConfettiRef } from "./ui/confetti";

export function ConfettiDemo({ children }: { children: React.ReactNode }) {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <>
      <span className="pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
        {children}
      </span>

      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    </>
  );
}
