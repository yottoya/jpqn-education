"use client";
import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";
import { Avatar } from "./ui/avatar-circles";
import reviews from "@/data/reviews.json";

const firstRow = reviews.slice(0, 2);
const secondRow = reviews.slice(3, 4);

interface MyMarqueeProps {
  orientation: "vertical" | "horizontal";
}

const ReviewCard = ({ review }: { review: Avatar }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <>
        <a href={`${review.reviewUrl}`} target="_blank">
          <div className="flex flex-row items-center gap-2">
            <img
              className="rounded-full"
              width="32"
              height="32"
              alt=""
              src={review.profileUrl}
            />
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white">
                {review.who}
              </figcaption>
            </div>
          </div>
          <blockquote className="mt-2 text-sm">
            {review.body?.slice(0, 120)}...
          </blockquote>
        </a>
      </>
    </figure>
  );
};

export function MarqueeDemo({ orientation }: MyMarqueeProps) {
  if (orientation === "vertical") {
    return (
      <div className="relative flex h-125 w-full flex-row items-center justify-center overflow-hidden">
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard review={review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard review={review} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b"></div>
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
      </div>
    );
  } else if (orientation === "horizontal") {
    return (
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard review={review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard review={review} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    );
  }
}
