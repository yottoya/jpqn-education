## LLM Instructions

- We need to install these packages via `pnpm`:
  - zod
  - drizzle-orm
  - resend (for sending emails)

We're installing these so we can do the following:

- We need to make the `waiver-inquiry-form` work, actually submit to the database that I have defined in my `.env` already

First however, we need to add on to it. I have defined some more questions I want added to the waiver form that are not on there yet, but that I have just defined in the `waiver-form-questions.json`, and these are the questions:

```ts
      //
      // TODO: NEED TO IMPLEMENT FULLY
      academic_responsibility_disclaimer:
      speech_and_communication_waiver:
      payment_terms:
      package_details:
      //

```

We need the package details question section to work a little differently, and it MUST come right after the `Upcoming Gradelevel` question:

```text
 2. Package Details
We recommend committing to 4 sessions per week, as this package offers our best value and is competitively priced against other local tutoring centers. If you prefer fewer sessions, the hourly rate will align with the standard market rate in the area.

Selected Serivce: __________________________________________________
Weekly Hours:  __________________     Rate: $________________ per week

Location: JPQN Education Office – 9801 Westheimer Rd, Suite 429, Houston, TX 77042

```

I have defined a set of services that she offers in `data/services.json`, and although those are the package names, people usually know the _service_ that they're looking for, not what _JPQN_ calls them. So, this means on the `waiver-inquiry-form`, when we add the package details questions, we'll essentially use the `type` field for a given package.

So, right now, THIS is what the `services.json` is supposed to be like:

| Package Name                 | Service                                 | 5 hrs | 4 hrs | 3 hrs | 2 hrs | 1 hr |
| ---------------------------- | --------------------------------------- | ----- | ----- | ----- | ----- | ---- |
| **Confidence Builder**       | Academic Support – Elementary           | $175  | $150  | $120  | $85   | $45  |
| **Confidence Builder**       | Academic Support – Middle               | $200  | $170  | $135  | $95   | $50  |
| **Voice & Confidence**       | Speech Support                          | $260  | $220  | $180  | $130  | $60  |
| **Everyday English Builder** | ESL                                     | $200  | $170  | $135  | $95   | $50  |
| **Flexible Online Sessions** | Online                                  | $200  | $170  | $135  | $95   | $50  |
| **Mastery & Growth Journey** | Academic Support – Learning Differences | $280  | $240  | $195  | $140  | $70  |

Basically, for this `package-details` question section in the `waiver-inquiry-form`, we want to dynamically calculate the rate in the `Rate: $_____` section based off the selected services' rate multiplied against the set of hourly options:

- 5 hrs
- 4 hrs
- 3 hrs
- 2 hrs
- 1 hr

At the bottom of the funnel, we want to use a signature pad canvas component I found online:

```bash
pnpm dlx shadcn@latest add @shadix-ui/signature-pad
```

signature pad usage example:

```ts
"use client";
import type React from "react";

import SignaturePad from "@/components/signature-pad";

const SignaturePadDemo: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 p-4">
            <SignaturePad
                variant="default"
                size="md"
                onSave={(val) => console.log(val)}
                onChange={(val) => console.log(val)}
            />
        </div>
    );
};

export default SignaturePadDemo;
```

Once they fill out the form, in order to submit it, they must sign it.

Upon for submitting the form, we need to make sure we send two emails:

1.  To the person submitting the `waiver-inquiry-form`
2.  To the owner of the business, Julia, at `julia@jpqnedu.org`

AND ensure we save the inquiry via the postgres database via the env var `DATABASE_URL`

We're essentially building a funnel.

They will click the "Enroll Your Student Now!" button in the header, and it will take them to a dedicated page called `/waiver-inquiry`

After they fill out the `waiver-inquiry-form` they will be taken to a page called `/inquiry-booking-calendar`, which I will embed this calendar as an iframe there:

```html
<iframe
  src="https://api.leadconnectorhq.com/widget/booking/qN7czb17gwch5c0oqcH4"
  style="width: 100%;border:none;overflow: hidden;"
  scrolling="no"
  id="qN7czb17gwch5c0oqcH4_1778383928168"
></iframe
><br />
<script
  src="https://api.leadconnectorhq.com/js/form_embed.js"
  type="text/javascript"
></script>
```

After they book, my calendar redirects them to the `/thank-you` page I already created, so we're good there.
