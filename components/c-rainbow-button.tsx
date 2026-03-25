"use client";

import { cn } from "@/lib/utils";
import { RainbowButton } from "./ui/rainbow-button";
import { handleNavigate } from "@/lib/scroll-to-element";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  elementId?: string;
  className?: string;
}

export function CRainbowButton({
  elementId = "booking",
  children = "Get Enrolled!",
  className,
}: ButtonProps) {
  return (
    <RainbowButton
      size={"lg"}
      variant={"outline"}
      className={cn("mt-4 w-full", className)}
      onClick={() => handleNavigate(elementId)}
    >
      {children}
    </RainbowButton>
  );
}
