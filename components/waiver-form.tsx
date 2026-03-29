"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
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

import waiverData from "@/data/waiver-form-questions.json";

export default function WaiverForm() {
  const form = useForm({
    defaultValues: {
      date: new Date(), // Defaults to Now
      parent_name: "",
      student_name: "",
      grade_level: "",
      academic_tutoring: false,
      risk_acknowledgment: false,
      liability_waiver: false,
      medical_authorization: false,
      media_permission: "No" as "Yes" | "No",
      fee_agreement: false,
      third_party_tools: false,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      console.log("Form Submitted:", value);
    },
  });

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          Waiver Form
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
        {waiverData.map((section) => (
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
                  name={fieldData.id as any}
                  validators={{
                    onChange: fieldData.required
                      ? fieldData.type === "checkbox"
                        ? z.literal(true, {
                            errorMap: () => ({ message: "Required" }),
                          })
                        : fieldData.type === "date"
                          ? z.date()
                          : z.string().min(1, "Required")
                      : undefined,
                  }}
                  children={(field) => (
                    <div className="space-y-4">
                      {/* --- DATE SELECTOR (SHADCN STYLE) --- */}
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
                                onSelect={(date) =>
                                  field.handleChange(date ?? new Date())
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}

                      {/* --- TEXT INPUTS --- */}
                      {fieldData.type === "text" && (
                        <div className="grid gap-2">
                          <Label htmlFor={fieldData.id}>
                            {fieldData.label}
                          </Label>
                          <Input
                            id={fieldData.id}
                            placeholder={fieldData.placeholder}
                            value={field.state.value as string}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </div>
                      )}

                      {/* --- CHECKBOX (PLAIN STYLE WITH DIVIDER) --- */}
                      {fieldData.type === "checkbox" && (
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed">
                            {fieldData.label}
                          </p>
                          <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
                            <Checkbox
                              id={fieldData.id}
                              checked={field.state.value as boolean}
                              onCheckedChange={(checked) =>
                                field.handleChange(!!checked)
                              }
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

                      {/* --- RADIO (WITH DIVIDER) --- */}
                      {fieldData.type === "radio" && (
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed">
                            {fieldData.label}
                          </p>
                          <div className="pt-4 border-t border-slate-100">
                            <RadioGroup
                              value={field.state.value as string}
                              onValueChange={(val) =>
                                field.handleChange(val as any)
                              }
                              className="flex gap-6"
                            >
                              {fieldData.options?.map((opt) => (
                                <div
                                  key={opt}
                                  className="flex items-center space-x-2"
                                >
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
                  )}
                />
              ))}
            </div>
            <Separator className="opacity-40" />
          </div>
        ))}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Waiver"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
