import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - JPQN Education",
  description: "Terms and Conditions for JPQN Education services.",
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen py-24 px-4 md:px-8 max-w-4xl mx-auto mt-16">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="space-y-6 text-lg text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and JPQN Education (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), concerning your access to and use of our educational and tutoring services, as well as our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Description</h2>
          <p>
            JPQN Education provides individualized homeschool instruction, academic tutoring, and developmental learning support. All services are educational and developmental in nature and are designed to support learning. They do not replace therapeutic, psychological, or medical services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Payment and Fees</h2>
          <p className="mb-2">By booking a session with JPQN Education, you agree to the following payment terms:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payments are due at the end of each session.</li>
            <li>Full payments for the week are accepted in advance.</li>
            <li>Any unused prepaid amounts will be credited to future sessions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cancellation Policy</h2>
          <p>
            We appreciate a heads-up for cancellations. We understand things happen, so it will be up to the tutor&apos;s discretion to apply a cancellation fee. Any cancellations made within an hour before the scheduled session will incur a $40 cancellation fee.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Code of Conduct</h2>
          <p>
            Students and parents/guardians are expected to maintain a respectful and cooperative environment. We reserve the right to terminate services if a student or parent/guardian engages in disruptive, disrespectful, or harmful behavior.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Disclaimer</h2>
          <p>
            While we strive to provide the best possible educational support, we do not guarantee specific academic outcomes, grades, or test scores. Success depends on various factors, including the student&apos;s individual effort and commitment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at info@jpqneducation.com.
          </p>
        </section>
      </div>
    </main>
  );
}