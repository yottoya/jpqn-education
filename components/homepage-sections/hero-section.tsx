import localFont from "next/font/local";
import { FiveStarShine } from "../five-star-shiny-text";
import { ShinyButton } from "../ui/shiny-button";
import React from "react";
import { cn } from "@/lib/utils";
import { RainbowButton } from "../ui/rainbow-button";

const myFont = localFont({
  src: "../../fonts/EraserRegular.ttf",
  display: "swap",
});

const pageData = {
  headline: "1-on-1 Tutoring For Pre-K - 8",
  tagline: "Personalized tutoring for your children ",
};

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {}

const handleNavigate = (id: string) => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.assign(`/#${id}`);
  }
};

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      // min-h-screen ensures it fills the viewport vertically
      className={cn(
        `bg-red-400 relative min-h-screen w-full flex items-center justify-center overflow-hidden`,
        className,
      )}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/chalkboard-four.jpg"
          alt="Chalkboard background"
          // w-full h-full + object-cover is the magic combo to remove whitespace
          className="h-full w-full object-cover"
        />
        {/* Optional: Add a subtle dark overlay to make text more readable */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Text Content */}
      <div
        id="hero-headline"
        className="relative z-10 max-w-4xl px-6 transform -translate-y-24 translate-x-4"
      >
        <FiveStarShine />

        <h1
          className={`${myFont.className} text-white text-center text-[64px] font-bold tracking-wide drop-shadow-md sm:text-6xl md:text-8xl`}
        >
          {pageData.headline}
        </h1>
        <p
          className={`${myFont.className} text-white text-center mx-auto mt-6 max-w-2xl font-mono text-lg opacity-90 sm:text-xl md:text-2xl`}
        >
          {pageData.tagline}
        </p>
        <RainbowButton size={"lg"} variant={"outline"}>
          Get Enrolled!
        </RainbowButton>
      </div>
    </section>
  );
}
