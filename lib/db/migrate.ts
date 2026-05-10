import { neon } from "@neondatabase/serverless";

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    CREATE TABLE IF NOT EXISTS waiver_inquiries (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
      date TIMESTAMP NOT NULL,
      parent_name VARCHAR(255) NOT NULL,
      parent_email VARCHAR(255) NOT NULL,
      student_name VARCHAR(255) NOT NULL,
      grade_level VARCHAR(50) NOT NULL,
      selected_service VARCHAR(255),
      weekly_hours INTEGER,
      weekly_rate INTEGER,
      academic_tutoring BOOLEAN DEFAULT FALSE NOT NULL,
      risk_acknowledgment BOOLEAN DEFAULT FALSE NOT NULL,
      liability_waiver BOOLEAN DEFAULT FALSE NOT NULL,
      medical_authorization BOOLEAN DEFAULT FALSE NOT NULL,
      media_permission VARCHAR(3) NOT NULL,
      fee_agreement BOOLEAN DEFAULT FALSE NOT NULL,
      third_party_tools BOOLEAN DEFAULT FALSE NOT NULL,
      academic_responsibility_disclaimer BOOLEAN DEFAULT FALSE NOT NULL,
      speech_and_communication_waiver BOOLEAN DEFAULT FALSE NOT NULL,
      payment_terms BOOLEAN DEFAULT FALSE NOT NULL,
      signature_data_url TEXT
    );
  `;

  console.log("Migration complete: waiver_inquiries table created.");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
