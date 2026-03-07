import type { Metadata } from "next";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GsapPageWrapper from "@/components/GsapPageWrapper";
import MultiStepForm from "@/components/MultiStepForm";
import { ArrowRightIcon } from "lucide-react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

export const metadata: Metadata = {
  title: "JPQN Education",
  description:
    "Empowering children with adapative tutoring that nurtures curiosity, builds foundational skills, and honors every learner's individuality.",
};

function MyShinyText() {
  return (
    <div className="z-10 p-6 flex items-center justify-center">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-400 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>5 ⭐ 1-On-1 Tutoring!</span>
        </AnimatedShinyText>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <GsapPageWrapper>
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-dvh flex items-center justify-center relative overflow-hidden"
      >
        {/* Background Image Setup */}
        <div className="pt-24 absolute inset-0 z-0 justify-center items-center items-start pl-2 pr-2">
          <MyShinyText />
          <img
            src={"/images/chalkboard.png"}
            alt="Chalkboard background"
            className="object-contain md:object-cover md:h-full opacity-90"
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 md:px-12 py-12 md:py-24">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg text-white font-mono tracking-wide">
            Hello! I am Julia
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 drop-shadow-md font-mono mt-4 md:mt-6">
            and I don&apos;t like talking about myself, so here is what my
            past/current students and parents say about me.
          </p>
          <button className="bg-primary px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition-colors text-white mt-4">
            <a href="#contact">Book a Session</a>
          </button>
        </div>
      </section>
      {/* Problems Section */}
      <section id="problems" className="py-16 px-4">
        <img src={"/images/julia-pt.webp"} className="mt-32" />

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            The Problems Children Face Academically:
          </h2>
          <ul className="space-y-4 text-lg">
            <li>
              • Students often struggle to catch up after homework or remember
              what they learnt during the summer.
            </li>
            <li>
              • Tutors prioritize grades over emotional growth → burnout and
              inconsistent results.
            </li>
            <li>
              • Parents pay for tutoring but don&apos;t always see long-term
              benefits or confidence develop.
            </li>
          </ul>
        </div>
      </section>
      {/* Solution Section */}
      <section id="solution" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            My Solution - The JPQN Model:
          </h2>
          <ul className="space-y-4 text-lg">
            <li>
              • Dual‑season strategy: tailored approaches for the school year
              and summer.
            </li>
            <li>
              • Emphasis on conceptual understanding, confidence building, and
              retention.
            </li>
            <li>• Foundation-first learning: no progress without mastery.</li>
          </ul>
        </div>
      </section>
      {/* Mission Section */}
      <section id="mission" className="py-16 px-4 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">My Mission</h2>
          <p className="text-xl leading-relaxed">
            At JPQN Education, I empower learners with the freedom to explore,
            the tools to grow, and the confidence to lead their own path. I
            specialize in adaptive, student-centered tutoring that nurtures
            curiosity, builds foundational skills, and honors every
            learner&apos;s individuality.
          </p>
        </div>
      </section>
      {/* Vision Section */}
      <section id="vision" className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">My Vision</h2>
          <p className="text-xl leading-relaxed mb-8">
            To create a learning culture where every student, regardless of
            background, is equipped to succeed on their own terms. My vision is
            a world where education inspires not just performance, but purpose.
          </p>
          <p className="text-lg italic">
            &ldquo;It takes a village to raise a child.&rdquo; I would love to
            be part of that village. Not meant to be a temporary relationship,
            but a life long one. Let&apos;s Connect!
          </p>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <p className="text-center text-lg mb-8">
            To provide educational and developmental programs designed to
            support confidence, communication, and academic growth.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Individualized Homeschool Instruction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Ideal for:</p>
                <ul className="space-y-2">
                  <li>• Families homeschooling full or part-time</li>
                  <li>
                    • Children who benefit from smaller learning environments
                  </li>
                  <li>
                    • Students who need flexible pacing and routine-based
                    instruction
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Tutoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  One-on-one and in small groups, designed to support students
                  across a range of abilities and learning styles.
                </p>
                <p className="mb-4">Best supports:</p>
                <ul className="space-y-2">
                  <li>
                    • General education students who need more help outside of
                    school
                  </li>
                  <li>
                    • Students with learning differences who learn differently
                    from the method taught at school
                  </li>
                  <li>• Neurodivergent learners</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Developmental Learning and Communication Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  For children with autism and other learning differences in an
                  educational setting.
                </p>
                <p className="mb-4">Focuses on:</p>
                <ul className="space-y-2">
                  <li>• Learning readiness and engagement</li>
                  <li>• Functional communication support</li>
                  <li>• Social learning through structured activities</li>
                  <li>• Sensory-informed learning strategies</li>
                  <li>• Routine-based instruction</li>
                </ul>
                <p className="text-sm italic mt-4">
                  All services are educational and developmental in nature and
                  are designed to support learning, not replace therapeutic or
                  medical services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Policy Section */}
      <section id="policy" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Policy</h2>
          <p className="text-lg leading-relaxed">
            We appreciate a heads-up for cancellations; we understand things
            happen, so it will be up to the tutor&apos;s discretion to apply a
            cancellation fee. Any cancellations made within an hour before the
            scheduled session will incur a $40 cancellation fee. Payments are
            due at the end of each session. Full payments for the week are
            accepted, and any unused amounts will be credited.
          </p>
        </div>
      </section>
      {/* Become Tutor Section */}
      <section id="contact" className="bg-background py-16 px-2 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Want to learn how to become a tutor with no experience?
          </h2>
          <p className="text-xl mb-8">
            Contact us, get &quot;tutored&quot;, and graduate.
          </p>
          {/* Placeholder for contact form or button */}
          <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Us
          </button>
        </div>
      </section>
      <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-16">
        <Card className="w-full max-w-lg shadow-lg border-gray-200">
          <CardContent className="p-8 md:p-10">
            <MultiStepForm />
          </CardContent>
        </Card>
      </section>
    </GsapPageWrapper>
  );
}
