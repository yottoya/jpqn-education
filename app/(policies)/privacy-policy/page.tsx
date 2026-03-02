import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - JPQN Education",
  description: "Privacy Policy for JPQN Education services and website.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen py-24 px-4 md:px-8 max-w-4xl mx-auto mt-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-lg text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
          <p>
            Welcome to JPQN Education (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us at info@jpqneducation.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
          <p className="mb-2">We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our services, or otherwise contacting us. The personal information that we collect depends on the context of your interactions with us, the choices you make, and the services you use. The personal information we collect may include the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and Contact Data (such as email address, phone number)</li>
            <li>Student Information (age, grade level, learning needs)</li>
            <li>Billing Information (processed securely through our payment partners)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
          <p className="mb-2">We use personal information collected via our Services for a variety of educational and business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and deliver our educational tutoring services.</li>
            <li>To communicate with parents and students regarding progress, scheduling, and updates.</li>
            <li>To process payments and manage accounts.</li>
            <li>To respond to user inquiries and offer support.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Sharing Your Information</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell, rent, or trade your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Retention</h2>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Security of Your Information</h2>
          <p>
            We aim to protect your personal information through a system of organizational and technical security measures. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you may email us at info@jpqneducation.com.
          </p>
        </section>
      </div>
    </main>
  );
}