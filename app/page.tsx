import type { Metadata } from "next";

import GsapSectionWrapper from "@/components/GsapPageWrapper";

import {
  HeroSection,
  ProblemsSection,
  SolutionSection,
  Mission,
  Vision,
  ServicesSection,
  PolicySection,
} from "@/components/homepage-sections";

import { BusinessInfo } from "../data/constants";
import GHLBookingForm from "@/components/homepage-sections/ghl-booking-frame";
import Hello from "@/components/homepage-sections/hi-section";
import WaiverForm from "@/components/waiver-form";

export const metadata: Metadata = {
  title: BusinessInfo.siteTitle,
  description: BusinessInfo.siteDescription,
};

export default function Home() {
  return (
    <GsapSectionWrapper>
      <HeroSection />
      <Hello idName="about" />
      <ProblemsSection />
      <SolutionSection />
      <Mission />
      <Vision />
      <ServicesSection />
      <PolicySection />
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 id="booking" className="text-3xl font-bold text-center mb-8">
            Let's Chat
          </h2>
          <GHLBookingForm />
        </div>
        <div className="mt-16 mb-16">
          <WaiverForm />
        </div>
      </section>
    </GsapSectionWrapper>
  );
}
