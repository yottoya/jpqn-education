import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "./ui/animated-gradient-text";

export function FiveStarShine() {
  return (
    <div
      className="hover:grow group relative mx-auto flex items-center justify-center rounded-full 
                    bg-white/20 px-5 py-2 
                    shadow-[inset_0_-8px_10px_#ffffff35] 
                    transition-shadow duration-500 ease-out 
                    hover:shadow-[inset_0_-5px_10px_#ffffff55]"
    >
      {/* Animated gradient border shine — kept fully intact */}
      <span
        className={cn(
          "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/75 via-[#9c40ff]/75 to-[#ffaa40]/75 bg-[length:300%_100%] p-[1px]",
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      🌟
      <hr className="mx-2 h-4 w-px shrink-0 bg-white/70" />
      {/* Text animation restored — do NOT add text-white here */}
      <AnimatedGradientText className="text-sm font-medium">
        5 Star Rated Educator!
      </AnimatedGradientText>
      <ChevronRight className="ml-1 size-4 stroke-white/80 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </div>
  );
}
