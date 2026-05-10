import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";

export const waiverInquiries = pgTable("waiver_inquiries", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),

  date: timestamp("date").notNull(),
  parentName: varchar("parent_name", { length: 255 }).notNull(),
  parentEmail: varchar("parent_email", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 30 }),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  gradeLevel: varchar("grade_level", { length: 50 }).notNull(),

  selectedServices: text("selected_services"),

  academicTutoring: boolean("academic_tutoring").default(false).notNull(),
  riskAcknowledgment: boolean("risk_acknowledgment").default(false).notNull(),
  liabilityWaiver: boolean("liability_waiver").default(false).notNull(),
  medicalAuthorization: boolean("medical_authorization").default(false).notNull(),
  mediaPermission: varchar("media_permission", { length: 3 }).notNull(),
  feeAgreement: boolean("fee_agreement").default(false).notNull(),
  thirdPartyTools: boolean("third_party_tools").default(false).notNull(),
  academicResponsibilityDisclaimer: boolean(
    "academic_responsibility_disclaimer",
  )
    .default(false)
    .notNull(),
  speechAndCommunicationWaiver: boolean("speech_and_communication_waiver")
    .default(false)
    .notNull(),
  paymentTerms: boolean("payment_terms").default(false).notNull(),

  signatureDataUrl: text("signature_data_url"),
});
