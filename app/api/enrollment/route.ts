import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { waiverInquiries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import services from "@/data/services.json";

const SERVICE_MAP = new Map(services.map((s) => [s.id, s]));

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 },
      );
    }

    const db = getDb();

    const results = await db
      .select()
      .from(waiverInquiries)
      .where(eq(waiverInquiries.parentEmail, email))
      .orderBy(waiverInquiries.createdAt)
      .limit(1);

    if (results.length === 0) {
      return NextResponse.json(
        { error: "No waiver inquiry found for this email" },
        { status: 404 },
      );
    }

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

    return NextResponse.json({
      parent_name: inquiry.parentName,
      parent_email: inquiry.parentEmail,
      phone_number: inquiry.phoneNumber,
      student_name: inquiry.studentName,
      grade_level: inquiry.gradeLevel,
      selected_services: selectedServices,
    });
  } catch (err) {
    console.error("Enrollment fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
