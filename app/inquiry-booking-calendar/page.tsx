import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Book Your Session — JPQN Education",
  description: "Schedule your first session with JPQN Education.",
};

export default function InquiryBookingCalendarPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Book Your First Session
        </h1>
        <p className="text-muted-foreground mt-2">
          Select a date and time that works for you.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
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
    </div>
  );
}
