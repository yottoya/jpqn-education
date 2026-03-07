"use client";

import Script from "next/script";

const GHLBookingForm = () => {
  return (
    <>
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/2RAVBvrpaEuzofosozU2"
        style={{
          width: "100%",
          border: "none",
          overflow: "hidden",
          minHeight: "900px",
        }}
        id="2RAVBvrpaEuzofosozU2_1774233923734"
        title="GHL Booking Form"
      />

      <Script
        src="https://api.leadconnectorhq.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
};

export default GHLBookingForm;
