export function ProblemsSection() {
  return (
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
  );
}
