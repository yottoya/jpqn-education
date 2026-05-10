import EnrollmentForm from "@/components/forms/enrollment-form";
import { getDb } from "@/lib/db";
import { waiverInquiries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import services from "@/data/services.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enrollment — JPQN Education",
  description: "Review and finalize your enrollment with JPQN Education.",
};

const SERVICE_MAP = new Map(services.map((s) => [s.id, s]));

async function getEnrollmentData(email: string) {
  const db = getDb();

  const results = await db
    .select()
    .from(waiverInquiries)
    .where(eq(waiverInquiries.parentEmail, email))
    .orderBy(waiverInquiries.createdAt)
    .limit(1);

  if (results.length === 0) return null;

  const inquiry = results[0];

  let selectedServiceIds: string[] = [];
  try {
    selectedServiceIds = JSON.parse(inquiry.selectedServices || "[]");
  } catch {
    selectedServiceIds = [];
  }

  const selectedServices = selectedServiceIds
    .map((id) => SERVICE_MAP.get(id))
    .filter(Boolean) as typeof services;

  return {
    parent_name: inquiry.parentName,
    parent_email: inquiry.parentEmail,
    phone_number: inquiry.phoneNumber,
    student_name: inquiry.studentName,
    grade_level: inquiry.gradeLevel,
    selected_services: selectedServices,
  };
}

export default async function EnrollmentPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = params.email;

  if (!email) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold">Invalid Link</h1>
          <p className="text-muted-foreground mt-2">
            No email address provided. Please use the link sent to you by
            Julia.
          </p>
        </div>
      </div>
    );
  }

  const data = await getEnrollmentData(email);

  if (!data) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold">Not Found</h1>
          <p className="text-muted-foreground mt-2">
            No enrollment record found for{" "}
            <span className="font-medium">{email}</span>. Please contact Julia
            if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <EnrollmentForm data={data} />
    </div>
  );
}
