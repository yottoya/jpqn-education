import { AuroraText } from "../ui/aurora-text";
import { cn } from "@/lib/utils";

interface MyAuroraTextProps {
  className?: string;
  children: string;
}

export function AuroraTextDemo({ children, className }: MyAuroraTextProps) {
  return (
    <h1
      className={cn(
        "font-bold tracking-tighter sm:text-7xl lg:text-7xl",
        className,
      )}
    >
      <AuroraText>{children}</AuroraText>
    </h1>
  );
}
