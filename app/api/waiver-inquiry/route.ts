import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { waiverInquiries } from "@/lib/db/schema";
import { Resend } from "resend";
import services from "@/data/services.json";

const mainFromEmail = process.env.MAIN_FROM_EMAIL_ADDRESS || "julia@jpqnedu.org";
const businessEmail = "julia@jpqnedu.org";

const SERVICE_LABEL_MAP = Object.fromEntries(
  services.map((s) => [s.id, s.label]),
);

const inquirySchema = z.object({
  date: z.string().or(z.date()).transform((v) => new Date(v)),
  parent_name: z.string().min(1, "Parent name is required"),
  parent_email: z.string().email("Valid email is required"),
  phone_number: z.string().optional(),
  student_name: z.string().min(1, "Student name is required"),
  grade_level: z.string().min(1, "Grade level is required"),

  selected_service_ids: z.array(z.string()).optional(),

  academic_tutoring: z.boolean(),
  risk_acknowledgment: z.boolean(),
  liability_waiver: z.boolean(),
  medical_authorization: z.boolean(),
  media_permission: z.enum(["Yes", "No"]),
  fee_agreement: z.boolean(),
  third_party_tools: z.boolean(),
  academic_responsibility_disclaimer: z.boolean(),
  speech_and_communication_waiver: z.boolean(),
  payment_terms: z.boolean(),
});

const BUSINESS_ADDRESS =
  "9801 Westheimer Rd, Suite 429, Houston, TX 77042";

function buildParentEmailHtml(data: z.infer<typeof inquirySchema>) {
  const serviceLabels = (data.selected_service_ids ?? [])
    .map((id) => SERVICE_LABEL_MAP[id] || id)
    .join(", ");
  const serviceInfo = serviceLabels
    ? `<p><strong>Selected Services:</strong> ${serviceLabels}</p>`
    : "";

  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">
  <h2 style="color:#1a1a2e;">Thank You for Your Inquiry!</h2>
  <p>Hi ${data.parent_name},</p>
  <p>We've received your waiver inquiry for JPQN Education. Here's a summary:</p>
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <p><strong>Date:</strong> ${data.date.toLocaleDateString()}</p>
  <p><strong>Student:</strong> ${data.student_name}</p>
  <p><strong>Grade Level:</strong> ${data.grade_level}</p>
  ${serviceInfo}
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <p><strong>Next Step:</strong> Please schedule your first session using our booking calendar.</p>
  <p>We'll review your information and reach out if we have any questions. You can also reach us at ${businessEmail} or visit us at:</p>
  <p style="color:#6b7280;">${BUSINESS_ADDRESS}</p>
  <p style="margin-top:24px;">&mdash; JPQN Education</p>
</body>
</html>`;
}

function buildBusinessEmailHtml(data: z.infer<typeof inquirySchema>) {
  const serviceLabels = (data.selected_service_ids ?? [])
    .map((id) => SERVICE_LABEL_MAP[id] || id)
    .join(", ");
  const serviceInfo = serviceLabels
    ? `<p><strong>Selected Services:</strong> ${serviceLabels}</p>`
    : "<p><strong>Selected Services:</strong> None</p>";
  const checkboxLabel = (val: boolean) => (val ? "✓ Agreed" : "✗ Not agreed");

  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">
  <h2 style="color:#1a1a2e;">New Waiver Inquiry</h2>
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <h3>Parent/Guardian</h3>
  <p><strong>Name:</strong> ${data.parent_name}</p>
  <p><strong>Email:</strong> ${data.parent_email}</p>
  <p><strong>Phone:</strong> ${data.phone_number || "N/A"}</p>
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <h3>Student</h3>
  <p><strong>Name:</strong> ${data.student_name}</p>
  <p><strong>Grade Level:</strong> ${data.grade_level}</p>
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <h3>Package</h3>
  ${serviceInfo}
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <h3>Waiver Agreements</h3>
  <ul style="list-style:none;padding:0;">
    <li>${checkboxLabel(data.academic_tutoring)} Academic Tutoring</li>
    <li>${checkboxLabel(data.risk_acknowledgment)} Risk Acknowledgment</li>
    <li>${checkboxLabel(data.liability_waiver)} Liability Release</li>
    <li>${checkboxLabel(data.medical_authorization)} Medical Authorization</li>
    <li>Media Permission: <strong>${data.media_permission}</strong></li>
    <li>${checkboxLabel(data.fee_agreement)} Cancellation Policy</li>
    <li>${checkboxLabel(data.third_party_tools)} Online Tools</li>
    <li>${checkboxLabel(data.academic_responsibility_disclaimer)} Academic Responsibility</li>
    <li>${checkboxLabel(data.speech_and_communication_waiver)} Speech & Communication</li>
    <li>${checkboxLabel(data.payment_terms)} Payment Terms</li>
  </ul>
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <p><strong>Date Submitted:</strong> ${new Date().toLocaleString()}</p>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const db = getDb();

    const [inserted] = await db
      .insert(waiverInquiries)
      .values({
        date: data.date,
        parentName: data.parent_name,
        parentEmail: data.parent_email,
        phoneNumber: data.phone_number ?? null,
        studentName: data.student_name,
        gradeLevel: data.grade_level,
        selectedServices: JSON.stringify(data.selected_service_ids ?? []),
        academicTutoring: data.academic_tutoring,
        riskAcknowledgment: data.risk_acknowledgment,
        liabilityWaiver: data.liability_waiver,
        medicalAuthorization: data.medical_authorization,
        mediaPermission: data.media_permission,
        feeAgreement: data.fee_agreement,
        thirdPartyTools: data.third_party_tools,
        academicResponsibilityDisclaimer:
          data.academic_responsibility_disclaimer,
        speechAndCommunicationWaiver: data.speech_and_communication_waiver,
        paymentTerms: data.payment_terms,
      })
      .returning();

    const resend = new Resend(process.env.RESEND_API_KEY!);

    const [parentEmailResult, businessEmailResult] = await Promise.allSettled([
      resend.emails.send({
        from: mainFromEmail,
        to: data.parent_email,
        subject: "Your JPQN Education Waiver Inquiry",
        html: buildParentEmailHtml(data),
      }),
      resend.emails.send({
        from: mainFromEmail,
        to: businessEmail,
        subject: `New Waiver Inquiry — ${data.student_name}`,
        html: buildBusinessEmailHtml(data),
      }),
    ]);

    if (
      parentEmailResult.status === "rejected" ||
      businessEmailResult.status === "rejected"
    ) {
      const errors: string[] = [];
      if (parentEmailResult.status === "rejected")
        errors.push(`Parent email: ${parentEmailResult.reason}`);
      if (businessEmailResult.status === "rejected")
        errors.push(`Business email: ${businessEmailResult.reason}`);
      console.error("Email send failures:", errors);
    }

    const origin = request.headers.get("origin") || "https://jpqnedu.org";

    const stripeRes = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY!}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          mode: "payment",
          "line_items[0][quantity]": "1",
          "line_items[0][price_data][currency]": "usd",
          "line_items[0][price_data][product_data][name]":
            "Waiver Inquiry Processing Fee",
          "line_items[0][price_data][product_data][description]":
            `Inquiry for ${data.student_name}`,
          "line_items[0][price_data][unit_amount]": "500",
          customer_email: data.parent_email,
          "metadata[inquiry_id]": String(inserted.id),
          "metadata[student_name]": data.student_name,
          success_url: `${origin}/thank-you`,
          cancel_url: `${origin}/waiver-inquiry`,
        }),
      },
    );

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      throw new Error(
        `Stripe error: ${session.error?.message || "Unknown"}`,
      );
    }

    return NextResponse.json({
      success: true,
      id: inserted.id,
      url: session.url,
    });
  } catch (err) {
    console.error("Waiver inquiry submission error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
