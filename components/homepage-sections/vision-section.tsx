import { Eye } from "lucide-react";

export function Vision() {
  return (
    <section id="vision" className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Eye className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-6">My Vision</h2>
        <div className="rounded-xl border bg-card p-8 shadow-sm space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            To create a learning culture where every student, regardless of
            background, is equipped to succeed on their own terms. My vision is
            a world where education inspires not just performance, but purpose.
          </p>
          <div className="border-t pt-6">
            <p className="text-base italic text-muted-foreground">
              &ldquo;It takes a village to raise a child.&rdquo; I would love to
              be part of that village. Not meant to be a temporary relationship,
              but a life long one. Let&apos;s Connect!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}