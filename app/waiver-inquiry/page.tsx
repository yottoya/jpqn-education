import WaiverInquiryForm from "@/components/forms/waiver-inquiry-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waiver & Inquiry — JPQN Education",
  description: "Complete the waiver and inquiry form to enroll your student.",
};

export default function WaiverInquiryPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <WaiverInquiryForm />
    </div>
  );
}
