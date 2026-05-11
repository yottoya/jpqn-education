import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enrollment — JPQN Education",
  description: "Review and finalize your enrollment with JPQN Education.",
};

export default function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
