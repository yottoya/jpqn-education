import { ShinyButton } from "../ui/shiny-button";

const pageData = {
  description:
    "At JPQN Education, I empower learners with the freedom to explore, the tools to grow, and the confidence to lead their own path. I specialize in adaptive, student-centered tutoring that nurtures curiosity, builds foundational skills, and honors every learner&apos;s individuality.",
};

export function Mission() {
  return (
    <section id="mission" className="min-h-dvh py-16 px-4 ">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">My Mission</h2>
        <p className="text-xl leading-relaxed">{pageData.description}</p>
        <ShinyButton>
          <a href="#contact">Book a Session</a>
        </ShinyButton>
      </div>
    </section>
  );
}
