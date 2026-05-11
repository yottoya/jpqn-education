"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BusinessInfo } from "@/data/constants";
import zelleQr from "@/assets/zelle-qr-code.jpg";

interface ServiceWithRates {
  id: string;
  label: string;
  weekly_rates: Record<string, number>;
}

interface EnrollmentData {
  parent_name: string;
  parent_email: string;
  phone_number: string | null;
  student_name: string;
  grade_level: string;
  selected_services: ServiceWithRates[];
}

interface EnrollmentFormProps {
  data: EnrollmentData;
}

const hourOptions = [1, 2, 3, 4, 5] as const;

function formatE164ToUS(e164: string): string {
  const cleaned = e164.replace(/[^\d+]/g, "");
  if (!cleaned.startsWith("+1")) return e164;
  const digits = cleaned.slice(2);
  if (digits.length !== 10 || !/^\d{10}$/.test(digits)) return e164;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export default function EnrollmentForm({ data }: EnrollmentFormProps) {
  const [hoursPerService, setHoursPerService] = useState<
    Record<string, number>
  >({});

  const setHours = (serviceId: string, hours: number) => {
    setHoursPerService((prev) => ({ ...prev, [serviceId]: hours }));
  };

  const totalRate = useMemo(() => {
    return data.selected_services.reduce((sum, svc) => {
      const hours = hoursPerService[svc.id] || 4;
      const rate =
        svc.weekly_rates[String(hours) as keyof typeof svc.weekly_rates] || 0;
      return sum + rate;
    }, 0);
  }, [data.selected_services, hoursPerService]);

  const weeklyTotal = useMemo(() => {
    const lines = data.selected_services.map((svc) => {
      const hours = hoursPerService[svc.id] || 4;
      const rate =
        svc.weekly_rates[String(hours) as keyof typeof svc.weekly_rates] || 0;
      return { label: svc.label, hours, rate };
    });
    return lines;
  }, [data.selected_services, hoursPerService]);

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          Enrollment Form
        </h1>
        <p className="text-muted-foreground">JPQN Education</p>
      </div>

      <div className="space-y-10">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Parent Information</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Parent Name</Label>
              <Input value={data.parent_name} disabled className="opacity-60" />
            </div>
            <div className="grid gap-2">
              <Label>Parent Email</Label>
              <Input
                value={data.parent_email}
                disabled
                className="opacity-60"
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone Number</Label>
              <Input
                value={
                  data.phone_number ? formatE164ToUS(data.phone_number) : "N/A"
                }
                disabled
                className="opacity-60"
              />
            </div>
          </div>
        </div>
        <Separator className="opacity-40" />

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Student Information</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Student Name</Label>
              <Input
                value={data.student_name}
                disabled
                className="opacity-60"
              />
            </div>
            <div className="grid gap-2">
              <Label>Grade Level</Label>
              <Input value={data.grade_level} disabled className="opacity-60" />
            </div>
          </div>
        </div>
        <Separator className="opacity-40" />

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Package Details</h2>

          {data.selected_services.map((svc) => (
            <div key={svc.id} className="rounded-lg border p-4 space-y-3">
              <div>
                <p className="font-medium text-sm">{svc.label}</p>
              </div>
              <div className="grid gap-2">
                <Label>Weekly Hours</Label>
                <Select
                  value={String(hoursPerService[svc.id] || 4)}
                  onValueChange={(v) => setHours(svc.id, Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hourOptions.map((h) => (
                      <SelectItem key={h} value={String(h)}>
                        {h} {h === 1 ? "Hour" : "Hours"} per Week
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Weekly Rate Summary</p>
            {weeklyTotal.map((line, i) => (
              <div
                key={i}
                className="flex justify-between text-sm text-muted-foreground"
              >
                <span>
                  {line.label} ({line.hours} hr
                  {line.hours > 1 ? "s" : ""})
                </span>
                <span>${line.rate}</span>
              </div>
            ))}
            <Separator className="opacity-40" />
            <div className="flex justify-between text-base font-bold">
              <span>Total per Week</span>
              <span>${totalRate}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6 space-y-4 text-center">
          <h2 className="text-lg font-semibold">Pay with Zelle</h2>
          <p className="text-sm text-muted-foreground">
            Send <strong>${totalRate} per week</strong> via Zelle to:
          </p>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Phone:</strong> {formatE164ToUS(BusinessInfo.phoneNumber)}
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src={zelleQr}
              alt="Zelle QR Code"
              width={256}
              height={256}
              className="rounded-lg border"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Scan the QR code with your banking app or use the phone/email above
            to complete your Zelle payment.
          </p>
        </div>
      </div>
    </div>
  );
}
