"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SignaturePad from "@/components/signature-pad";
import waiverData from "@/data/waiver-form-questions.json";
import services from "@/data/services.json";

type Field =
  | { id: string; type: "date"; label: string; required: boolean }
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
  identificationIndex >= 0
    ? data.slice(identificationIndex + 1)
    : data.slice(identificationIndex + 1);

const identificationSection =
  identificationIndex >= 0 ? data[identificationIndex] : null;

type MediaPermission = "Yes" | "No";

interface FormValues {
  date: Date;
  parent_name: string;
  parent_email: string;
  student_name: string;
  grade_level: string;
  academic_tutoring: boolean;
  risk_acknowledgment: boolean;
  liability_waiver: boolean;
  medical_authorization: boolean;
  media_permission: MediaPermission;
  fee_agreement: boolean;
  third_party_tools: boolean;
  academic_responsibility_disclaimer: boolean;
  speech_and_communication_waiver: boolean;
  payment_terms: boolean;
}

export default function WaiverInquiryForm() {
  const router = useRouter();
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [selectedServiceIds, setSelectedServiceIds] = useState<Set<string>>(
    new Set(),
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
      date: new Date(),
      parent_name: "",
      parent_email: "",
      student_name: "",
      grade_level: "",
      academic_tutoring: false,
      risk_acknowledgment: false,
      liability_waiver: false,
      medical_authorization: false,
      media_permission: "No" as MediaPermission,
      fee_agreement: false,
      third_party_tools: false,
      academic_responsibility_disclaimer: false,
      speech_and_communication_waiver: false,
      payment_terms: false,
    },
    onSubmit: async ({ value }) => {
      if (!signatureDataUrl) return;
      setIsSubmitting(true);
      setError(null);

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

        router.push("/inquiry-booking-calendar");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const canSubmit =
    form.state.canSubmit && !!signatureDataUrl && !isSubmitting;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderField = (fieldData: Field, field: any) => (
    <div className="space-y-4">
      {fieldData.type === "date" && (
        <div className="grid gap-2">
          <Label>{fieldData.label}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.state.value && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.state.value ? (
                  format(field.state.value as Date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.state.value as Date}
                onSelect={(date) => field.handleChange(date ?? new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

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
          <p className="text-sm leading-relaxed">{fieldData.label}</p>
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
        {/* Sections before identification (if any) */}
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
                  name={fieldData.id as keyof FormValues}
                  validators={{
                    onChange: fieldData.required
                      ? fieldData.type === "checkbox"
                        ? z.boolean().refine((val) => val === true, "Required")
                        : fieldData.type === "date"
                          ? z.date()
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

        {/* Identification section */}
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
                  name={fieldData.id as keyof FormValues}
                  validators={{
                    onChange: fieldData.required
                      ? fieldData.type === "checkbox"
                        ? z.boolean().refine((val) => val === true, "Required")
                        : fieldData.type === "date"
                          ? z.date()
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

        {/* Package Details section */}
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

        {/* Remaining sections after identification */}
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
                  name={fieldData.id as keyof FormValues}
                  validators={{
                    onChange: fieldData.required
                      ? fieldData.type === "checkbox"
                        ? z.boolean().refine((val) => val === true, "Required")
                        : fieldData.type === "date"
                          ? z.date()
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

        {/* Signature Pad */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Signature
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Please sign above to confirm your agreement to all terms and
            conditions.
          </p>
          <SignaturePad
            variant="default"
            size="md"
            onSave={(dataUrl) => setSignatureDataUrl(dataUrl)}
            onChange={(dataUrl) => setSignatureDataUrl(dataUrl)}
          />
          {!signatureDataUrl && (
            <p className="text-xs text-muted-foreground">
              Signature is required to submit.
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive text-center">
            {error}
          </p>
        )}

        <Button type="submit" disabled={!canSubmit} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </form>
    </div>
  );
}
