import { Metadata } from "next";
import { BusinessInfo } from "@/data/constants";
import { ConfettiDemo } from "@/components/thank-you-confetti";
import { ShinyButton } from "@/components/ui/shiny-button";
import { MarqueeDemo } from "@/components/review-marquee";
import { ReviewAvatarCircles } from "@/components/homepage-sections/review-avatars";
import Link from "next/link";
import { AuroraTextDemo } from "@/components/homepage-sections/my-aurora-text";

const pageData = {
  title: "Thank You!",
  description: `Your appointment has been scheduled! Please be on the watch for a call from ${formatE164ToUS(BusinessInfo.phoneNumber)} and an email from ${BusinessInfo.email} (check the spam folder!)`,
};

export const metadata: Metadata = {
  title: `Appointment Booked - ${pageData.title}`,
  description: "Appointment booked",
};

export function formatE164ToUS(e164: string): string | null {
  const cleaned = e164.replace(/[^\d+]/g, ""); // Fixed regex escape
  if (!cleaned.startsWith("+1")) return null;
  const digits = cleaned.slice(2);
  if (digits.length !== 10 || !/^\d{10}$/.test(digits)) return null;
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6, 10);
  return `+1 (${area}) ${prefix}-${line}`;
}

export default function Page() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Checkmark */}
        <div className="mt-16 mx-auto mb-8 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 shadow-lg backdrop-blur-sm">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">✓</span>
          </div>
        </div>

        {/* Title */}
        <ConfettiDemo>
          <h1 className="sm:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent leading-tight">
            {pageData.title.slice(0, 5)}
            <AuroraTextDemo className="">
              {pageData.title.slice(6, 10)}
            </AuroraTextDemo>
          </h1>
        </ConfettiDemo>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl px-4 text-lg leading-relaxed text-slate-600 sm:text-xl lg:text-2xl">
          {pageData.description}
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link href={"/"}>
            <ShinyButton>Return Home</ShinyButton>
          </Link>
        </div>

        {/* Reviews Section - Fixed spacing */}
        <div className="mt-12 lg:mt-16 px-4 sm:px-0">
          <ReviewAvatarCircles />
        </div>

        {/* Marquee */}
        <div className="mt-12 lg:mt-16 px-4 sm:px-0">
          <MarqueeDemo orientation="horizontal" />
        </div>
      </div>
    </div>
  );
}
