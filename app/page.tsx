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

export const metadata: Metadata = {
  title: BusinessInfo.siteTitle,
  description: BusinessInfo.siteDescription,
};

export default function Home() {
  return (
    <GsapSectionWrapper>
      <HeroSection className="text-red-500" />
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
      </section>
    </GsapSectionWrapper>
  );
}
