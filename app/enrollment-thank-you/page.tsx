import type { Metadata } from "next";
import Script from "next/script";
import { BusinessInfo } from "@/data/constants";
import { ConfettiDemo } from "@/components/thank-you-confetti";
import { ShinyButton } from "@/components/ui/shiny-button";
import { MarqueeDemo } from "@/components/review-marquee";
import { ReviewAvatarCircles } from "@/components/homepage-sections/review-avatars";
import { AuroraTextDemo } from "@/components/homepage-sections/my-aurora-text";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thanks for Enrolling! — JPQN Education",
  description: "Your enrollment has been confirmed.",
};

function formatE164ToUS(e164: string): string | null {
  const cleaned = e164.replace(/[^\d+]/g, "");
  if (!cleaned.startsWith("+1")) return null;
  const digits = cleaned.slice(2);
  if (digits.length !== 10 || !/^\d{10}$/.test(digits)) return null;
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6, 10);
  return `+1 (${area}) ${prefix}-${line}`;
}

export default function EnrollmentThankYouPage() {
  const phone = formatE164ToUS(BusinessInfo.phoneNumber);

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className="mt-16 mx-auto mb-8 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 shadow-lg backdrop-blur-sm">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">✓</span>
          </div>
        </div>

        <ConfettiDemo>
          <h1 className="sm:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent leading-tight">
            Thanks
            <AuroraTextDemo> for Enrolling!</AuroraTextDemo>
          </h1>
        </ConfettiDemo>

        <p className="mx-auto mt-6 max-w-2xl px-4 text-lg leading-relaxed text-slate-600 sm:text-xl lg:text-2xl">
          Welcome to JPQN Education! Book your first session below. Keep an eye
          out for a call from {phone} and an email from{" "}
          {BusinessInfo.email} (check your spam folder!).
        </p>

        <div className="mt-8">
          <Link href={"/"}>
            <ShinyButton>Return Home</ShinyButton>
          </Link>
        </div>

        <div className="mt-12 max-w-3xl mx-auto px-4 sm:px-0">
          <h2 className="text-xl font-semibold mb-4">Book Your First Session</h2>
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/qN7czb17gwch5c0oqcH4"
            style={{ width: "100%", border: "none", overflow: "hidden" }}
            scrolling="no"
            id="qN7czb17gwch5c0oqcH4_1778383928168"
            className="min-h-[700px]"
          />
          <Script
            src="https://api.leadconnectorhq.com/js/form_embed.js"
            strategy="afterInteractive"
          />
        </div>

        <div className="mt-12 lg:mt-16 px-4 sm:px-0">
          <ReviewAvatarCircles />
        </div>

        <div className="mt-12 lg:mt-16 px-4 sm:px-0">
          <MarqueeDemo orientation="horizontal" />
        </div>
      </div>
    </div>
  );
}
