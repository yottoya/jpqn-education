"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EnrollmentForm from "@/components/forms/enrollment-form";

interface EnrollmentData {
  parent_name: string;
  parent_email: string;
  phone_number: string | null;
  student_name: string;
  grade_level: string;
  selected_services: {
    id: string;
    label: string;
    weekly_rates: Record<string, number>;
  }[];
}

function EnrollmentContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [data, setData] = useState<EnrollmentData | null>(null);
  const [loading, setLoading] = useState(!!email);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    fetch(`/api/enrollment?email=${encodeURIComponent(email)}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => null);
          throw new Error(err?.error || "Not found");
        }
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Something went wrong",
        );
        setLoading(false);
      });
  }, [email]);

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

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
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

  return <EnrollmentForm data={data} />;
}

export default function EnrollmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <EnrollmentContent />
    </Suspense>
  );
}
