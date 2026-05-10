import { BookOpen, Heart, TrendingUp } from "lucide-react";

const problems = [
  {
    icon: BookOpen,
    text: "Students often struggle to catch up after homework or remember what they learnt during the summer.",
  },
  {
    icon: Heart,
    text: "Tutors prioritize grades over emotional growth → burnout and inconsistent results.",
  },
  {
    icon: TrendingUp,
    text: "Parents pay for tutoring but don't always see long-term benefits or confidence develop.",
  },
];

export function ProblemsSection() {
  return (
    <section id="problems" className="py-16 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          The Problems Children Face Academically:
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <p.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}