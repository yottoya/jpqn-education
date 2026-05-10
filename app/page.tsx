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
import Hello from "@/components/homepage-sections/hi-section";

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
    </GsapSectionWrapper>
  );
}
