import { Lightbulb, Brain, Layers } from "lucide-react";

const solutions = [
  {
    icon: Lightbulb,
    text: "Dual-season strategy: tailored approaches for the school year and summer.",
  },
  {
    icon: Brain,
    text: "Emphasis on conceptual understanding, confidence building, and retention.",
  },
  {
    icon: Layers,
    text: "Foundation-first learning: no progress without mastery.",
  },
];

export function SolutionSection() {
  return (
    <section id="solution" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          My Solution - The JPQN Model:
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}