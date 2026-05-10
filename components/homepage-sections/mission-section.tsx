import { Target } from "lucide-react";

const pageData = {
  description:
    "At JPQN Education, I empower learners with the freedom to explore, the tools to grow, and the confidence to lead their own path. I specialize in adaptive, student-centered tutoring that nurtures curiosity, builds foundational skills, and honors every learner's individuality.",
};

export function Mission() {
  return (
    <section id="mission" className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Target className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-6">My Mission</h2>
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {pageData.description}
          </p>
        </div>
      </div>
    </section>
  );
}