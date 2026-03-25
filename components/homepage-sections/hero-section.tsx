import localFont from "next/font/local";
import { FiveStarShine } from "../five-star-shiny-text";
import React from "react";
import { cn } from "@/lib/utils";
import { RainbowButton } from "../ui/rainbow-button";
import { CRainbowButton } from "../c-rainbow-button";
import { TextAnimate } from "../ui/text-animate";
import { ReviewAvatarCircles } from "./review-avatars";

const myFont = localFont({
  src: "../../fonts/EraserRegular.ttf",
  display: "swap",
});

const pageData = {
  headline: "1-on-1 Tutoring For Pre-K - 8th",
  tagline:
    "Helping your children excel beyond what you and they think is possible",
};

const mainHeadlineChunks = {
  part1: pageData.headline.slice(0, 6),
  part2: pageData.headline.slice(7, 19),
  part3: pageData.headline.slice(20, 32),
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
      className={cn(
        // 1. Changed justify-center to justify-start
        // 2. Added pt-24 for mobile and pt-40 for desktop
        "relative min-h-dvh w-full flex flex-col items-center justify-start overflow-hidden pt-36 md:pt-40",
        className,
      )}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/chalkboard-four.jpg"
          alt="Chalkboard background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Shine Badge - Reduced margin to keep it tight */}
        <div className="mb-4 md:mb-8">
          <FiveStarShine />
        </div>

        {/* Headline */}
        <h1
          className={`${myFont.className} pt-6 text-white font-bold tracking-tight drop-shadow-lg 
            text-[50px] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl 
            leading-[1.1] md:leading-none`}
        >
          <TextAnimate animation="blurInUp" by="character" duration={0.5}>
            {mainHeadlineChunks.part1}
          </TextAnimate>
          <TextAnimate
            animation="blurInUp"
            by="character"
            delay={0.5}
            duration={0.5}
          >
            {mainHeadlineChunks.part2}
          </TextAnimate>
          <TextAnimate
            animation="blurInUp"
            by="character"
            delay={1}
            duration={0.5}
          >
            {mainHeadlineChunks.part3}
          </TextAnimate>
        </h1>

        {/* Tagline */}
        <p
          className={`${myFont.className} pt-6 text-white mx-auto mt-4 md:mt-6 
            max-w-70 xs:max-w-md md:max-w-2xl 
            text-base sm:text-lg md:text-2xl 
            opacity-90 leading-relaxed`}
        >
          <TextAnimate animation="slideUp" by="word" delay={2} duration={3}>
            {pageData.tagline}
          </TextAnimate>
        </p>
        <ReviewAvatarCircles />

        {/* Button */}
        <div className="mt-4 w-full lg:w-5 flex justify-center">
          <CRainbowButton />
        </div>
      </div>
    </section>
  );
}
