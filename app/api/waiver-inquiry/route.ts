import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { waiverInquiries } from "@/lib/db/schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const mainFromEmail = process.env.MAIN_FROM_EMAIL_ADDRESS || "julia@jpqnedu.org";
const businessEmail = "julia@jpqnedu.org";

const inquirySchema = z.object({
  date: z.string().or(z.date()).transform((v) => new Date(v)),
  parent_name: z.string().min(1, "Parent name is required"),
  parent_email: z.string().email("Valid email is required"),
  student_name: z.string().min(1, "Student name is required"),
  grade_level: z.string().min(1, "Grade level is required"),

  selected_service_id: z.string().optional(),
  weekly_hours: z.number().int().min(1).max(5).optional(),
  weekly_rate: z.number().int().optional(),

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

  signature_data_url: z.string().optional(),
});

const BUSINESS_ADDRESS =
  "9801 Westheimer Rd, Suite 429, Houston, TX 77042";

const SERVICES: Record<string, string> = {
  "academic-elementary": "Academic Support – Elementary",
  "academic-middle": "Academic Support – Middle",
  "speech-support": "Speech Support",
  esl: "ESL",
  "online-support": "Online Support",
  "academic-learning-differences": "Academic Support – Learning Differences",
};

function buildParentEmailHtml(data: z.infer<typeof inquirySchema>) {
  const serviceLabel = data.selected_service_id
    ? SERVICES[data.selected_service_id] || data.selected_service_id
    : "N/A";
  const weeklyInfo =
    data.weekly_hours && data.weekly_rate
      ? `<p><strong>Weekly Hours:</strong> ${data.weekly_hours} hrs/week</p>
         <p><strong>Weekly Rate:</strong> $${data.weekly_rate}</p>`
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
  <p><strong>Service:</strong> ${serviceLabel}</p>
  ${weeklyInfo}
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <p><strong>Next Step:</strong> Please schedule your first session using our booking calendar.</p>
  <p>We'll review your information and reach out if we have any questions. You can also reach us at ${businessEmail} or visit us at:</p>
  <p style="color:#6b7280;">${BUSINESS_ADDRESS}</p>
  <p style="margin-top:24px;">&mdash; JPQN Education</p>
</body>
</html>`;
}

function buildBusinessEmailHtml(data: z.infer<typeof inquirySchema>) {
  const serviceLabel = data.selected_service_id
    ? SERVICES[data.selected_service_id] || data.selected_service_id
    : "N/A";
  const checkboxLabel = (val: boolean) => (val ? "✓ Agreed" : "✗ Not agreed");
  const weeklyInfo =
    data.weekly_hours && data.weekly_rate
      ? `<p><strong>Weekly Hours:</strong> ${data.weekly_hours} hrs/week | <strong>Rate:</strong> $${data.weekly_rate}/week</p>`
      : "";

  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">
  <h2 style="color:#1a1a2e;">New Waiver Inquiry</h2>
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <h3>Parent/Guardian</h3>
  <p><strong>Name:</strong> ${data.parent_name}</p>
  <p><strong>Email:</strong> ${data.parent_email}</p>
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <h3>Student</h3>
  <p><strong>Name:</strong> ${data.student_name}</p>
  <p><strong>Grade Level:</strong> ${data.grade_level}</p>
  <hr style="border:none;border-top:1px solid #e5e7eb;" />
  <h3>Package</h3>
  <p><strong>Service:</strong> ${serviceLabel}</p>
  ${weeklyInfo}
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

    const serviceLabel = data.selected_service_id
      ? SERVICES[data.selected_service_id] || data.selected_service_id
      : null;

    const db = getDb();

    const [inserted] = await db
      .insert(waiverInquiries)
      .values({
        date: data.date,
        parentName: data.parent_name,
        parentEmail: data.parent_email,
        studentName: data.student_name,
        gradeLevel: data.grade_level,
        selectedService: serviceLabel,
        weeklyHours: data.weekly_hours ?? null,
        weeklyRate: data.weekly_rate ?? null,
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
        signatureDataUrl: data.signature_data_url ?? null,
      })
      .returning();

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

    return NextResponse.json({
      success: true,
      id: inserted.id,
    });
  } catch (err) {
    console.error("Waiver inquiry submission error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
