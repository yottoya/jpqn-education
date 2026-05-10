import { Shield } from "lucide-react";

export function PolicySection() {
  return (
    <section id="policy" className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-6">Our Policy</h2>
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <p className="text-base leading-relaxed text-muted-foreground">
            We appreciate a heads-up for cancellations; we understand things
            happen, so it will be up to the tutor&apos;s discretion to apply a
            cancellation fee. Any cancellations made within an hour before the
            scheduled session will incur a $40 cancellation fee. Payments are
            due at the end of each session. Full payments for the week are
            accepted, and any unused amounts will be credited.
          </p>
        </div>
      </div>
    </section>
  );
}