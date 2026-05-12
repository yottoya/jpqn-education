"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SignaturePad from "@/components/signature-pad";
import waiverData from "@/data/waiver-form-questions.json";
import services from "@/data/services.json";

const STORAGE_KEY = "jpqn-waiver-form";

type Field =
  | {
      id: string;
      type: "text";
      label: string;
      placeholder: string;
      required: boolean;
    }
  | {
      id: string;
      type: "checkbox";
      label: string;
      options: string[];
      required: boolean;
    }
  | {
      id: string;
      type: "radio";
      label: string;
      options: string[];
      required: boolean;
    };

type Section = {
  section_id: string;
  description?: string;
  fields: Field[];
};

const data = waiverData as Section[];

const identificationIndex = data.findIndex(
  (s) => s.section_id === "identification",
);
const sectionsBefore = data.slice(0, identificationIndex);
const sectionsAfter =
  identificationIndex >= 0 ? data.slice(identificationIndex + 1) : [];

const identificationSection =
  identificationIndex >= 0 ? data[identificationIndex] : null;

type MediaPermission = "Yes" | "No";

interface SavedFormState {
  date: string;
  parent_name: string;
  parent_email: string;
  phone_number: string;
  student_name: string;
  grade_level: string;
  academic_tutoring: boolean;
  risk_acknowledgment: boolean;
  liability_waiver: boolean;
  medical_authorization: boolean;
  media_permission: string;
  fee_agreement: boolean;
  third_party_tools: boolean;
  academic_responsibility_disclaimer: boolean;
  speech_and_communication_waiver: boolean;
  payment_terms: boolean;
  selectedServiceIds: string[];
  signatureDataUrl: string;
}

function loadSavedState(): SavedFormState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed._timestamp > 30 * 60 * 1000) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function buildInitialDefaults(): SavedFormState {
  const saved = loadSavedState();
  return {
    date: saved?.date || new Date().toISOString(),
    parent_name: saved?.parent_name || "",
    parent_email: saved?.parent_email || "",
    phone_number: saved?.phone_number || "",
    student_name: saved?.student_name || "",
    grade_level: saved?.grade_level || "",
    academic_tutoring: saved?.academic_tutoring || false,
    risk_acknowledgment: saved?.risk_acknowledgment || false,
    liability_waiver: saved?.liability_waiver || false,
    medical_authorization: saved?.medical_authorization || false,
    media_permission: saved?.media_permission || "No",
    fee_agreement: saved?.fee_agreement || false,
    third_party_tools: saved?.third_party_tools || false,
    academic_responsibility_disclaimer:
      saved?.academic_responsibility_disclaimer || false,
    speech_and_communication_waiver:
      saved?.speech_and_communication_waiver || false,
    payment_terms: saved?.payment_terms || false,
    selectedServiceIds: saved?.selectedServiceIds || [],
    signatureDataUrl: saved?.signatureDataUrl || "",
  };
}

export default function WaiverInquiryForm() {
  const router = useRouter();
  const initial = useMemo(() => buildInitialDefaults(), []);
  const [selectedServiceIds, setSelectedServiceIds] = useState<Set<string>>(
    () => new Set(initial.selectedServiceIds),
  );
  const [isSigned, setIsSigned] = useState(!!initial.signatureDataUrl);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(
    initial.signatureDataUrl || null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) => {
      const next = new Set(prev);
      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }
      return next;
    });
  };

  const form = useForm({
    defaultValues: {
      date: new Date(initial.date),
      parent_name: initial.parent_name,
      parent_email: initial.parent_email,
      phone_number: initial.phone_number,
      student_name: initial.student_name,
      grade_level: initial.grade_level,
      academic_tutoring: initial.academic_tutoring,
      risk_acknowledgment: initial.risk_acknowledgment,
      liability_waiver: initial.liability_waiver,
      medical_authorization: initial.medical_authorization,
      media_permission: initial.media_permission as MediaPermission,
      fee_agreement: initial.fee_agreement,
      third_party_tools: initial.third_party_tools,
      academic_responsibility_disclaimer:
        initial.academic_responsibility_disclaimer,
      speech_and_communication_waiver:
        initial.speech_and_communication_waiver,
      payment_terms: initial.payment_terms,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setError(null);

      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...value,
          date: value.date instanceof Date ? value.date.toISOString() : value.date,
          selectedServiceIds: Array.from(selectedServiceIds),
          signatureDataUrl: signatureDataUrl || "",
          _timestamp: Date.now(),
        }),
      );

      try {
        const res = await fetch("/api/waiver-inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...value,
            selected_service_ids: Array.from(selectedServiceIds),
            signature_data_url: signatureDataUrl,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.error || "Submission failed");
        }

        const { url } = await res.json();

        if (url) {
          sessionStorage.removeItem(STORAGE_KEY);
          router.push(url);
        } else {
          setError("No checkout URL returned. Please try again.");
          setIsSubmitting(false);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong",
        );
        setIsSubmitting(false);
      }
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderField = (fieldData: Field, field: any) => (
    <div className="space-y-4">
      {fieldData.type === "text" && (
        <div className="grid gap-2">
          <Label htmlFor={fieldData.id}>{fieldData.label}</Label>
          <Input
            id={fieldData.id}
            placeholder={fieldData.placeholder}
            value={field.state.value as string}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        </div>
      )}

      {fieldData.type === "checkbox" && (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {fieldData.label}
          </p>
          <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
            <Checkbox
              id={fieldData.id}
              checked={field.state.value as boolean}
              onCheckedChange={(checked) => field.handleChange(!!checked)}
            />
            <Label
              htmlFor={fieldData.id}
              className="text-sm font-medium cursor-pointer"
            >
              I Agree
            </Label>
          </div>
        </div>
      )}

      {fieldData.type === "radio" && (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">{fieldData.label}</p>
          <div className="pt-4 border-t border-slate-100">
            <RadioGroup
              value={field.state.value as string}
              onValueChange={(val) => field.handleChange(val as MediaPermission)}
              className="flex gap-6"
            >
              {fieldData.options?.map((opt) => (
                <div key={opt} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={opt}
                    id={`${fieldData.id}-${opt}`}
                  />
                  <Label
                    htmlFor={`${fieldData.id}-${opt}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      )}

      {field.state.meta.errors && (
        <p className="text-[0.7rem] font-medium text-destructive">
          {field.state.meta.errors.join(", ")}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          Inquiry Form
        </h1>
        <p className="text-muted-foreground">JPQN Education</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-10"
      >
        {sectionsBefore.map((section) => (
          <div key={section.section_id} className="space-y-6">
            {section.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.description}
              </p>
            )}
            <div className="space-y-8">
              {section.fields.map((fieldData) => (
                <form.Field
                  key={fieldData.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  name={fieldData.id as any}
                  validators={{
                    onChange: fieldData.required
                      ? fieldData.type === "checkbox"
                        ? z.boolean().refine((val) => val === true, "Required")
                        : z.string().min(1, "Required")
                      : undefined,
                  }}
                // eslint-disable-next-line react/no-children-prop
                  children={(field) => renderField(fieldData, field)}
                />
              ))}
            </div>
            <Separator className="opacity-40" />
          </div>
        ))}

        {identificationSection && (
          <div key={identificationSection.section_id} className="space-y-6">
            {identificationSection.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {identificationSection.description}
              </p>
            )}
            <div className="space-y-8">
              {identificationSection.fields.map((fieldData) => (
                <form.Field
                  key={fieldData.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  name={fieldData.id as any}
                  validators={{
                    onChange: fieldData.required
                      ? fieldData.type === "checkbox"
                        ? z.boolean().refine((val) => val === true, "Required")
                        : z.string().min(1, "Required")
                      : undefined,
                  }}
                // eslint-disable-next-line react/no-children-prop
                  children={(field) => renderField(fieldData, field)}
                />
              ))}
            </div>
            <Separator className="opacity-40" />
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">2. Package Details</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We recommend committing to 4 sessions per week, as this package
              offers our best value and is competitively priced against other
              local tutoring centers. If you prefer fewer sessions, the hourly
              rate will align with the standard market rate in the area.
            </p>
          </div>

          <div className="space-y-4">
            <Label>Select Service(s)</Label>
            <div className="grid gap-4">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className={cn(
                    "flex items-start space-x-3 rounded-lg border p-4 transition-colors cursor-pointer",
                    selectedServiceIds.has(svc.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30",
                  )}
                >
                  <Checkbox
                    id={`service-${svc.id}`}
                    checked={selectedServiceIds.has(svc.id)}
                    onCheckedChange={() => toggleService(svc.id)}
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor={`service-${svc.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {svc.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {svc.description.slice(0, 120)}…
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {selectedServiceIds.size > 0 && (
              <p className="text-xs text-muted-foreground">
                {selectedServiceIds.size} service
                {selectedServiceIds.size > 1 ? "s" : ""} selected
              </p>
            )}
          </div>
          <Separator className="opacity-40" />
        </div>

        {sectionsAfter.map((section) => (
          <div key={section.section_id} className="space-y-6">
            {section.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.description}
              </p>
            )}
            <div className="space-y-8">
              {section.fields.map((fieldData) => (
                <form.Field
                  key={fieldData.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  name={fieldData.id as any}
                  validators={{
                    onChange: fieldData.required
                      ? fieldData.type === "checkbox"
                        ? z.boolean().refine((val) => val === true, "Required")
                        : z.string().min(1, "Required")
                      : undefined,
                  }}
                // eslint-disable-next-line react/no-children-prop
                  children={(field) => renderField(fieldData, field)}
                />
              ))}
            </div>
            <Separator className="opacity-40" />
          </div>
        ))}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Signature</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Please sign above to confirm your agreement to all terms and
            conditions.
          </p>
          <SignaturePad
            variant="default"
            size="md"
            onSave={(dataUrl) => setSignatureDataUrl(dataUrl)}
            onChange={(dataUrl) => setSignatureDataUrl(dataUrl)}
            onSignature={setIsSigned}
          />
          {!isSigned && (
            <p className="text-xs text-muted-foreground text-center">
              Signature required to submit. Please sign until the button
              activates.
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive text-center">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !isSigned}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit & Pay $5"}
        </Button>
      </form>
    </div>
  );
}