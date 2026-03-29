import { type Avatar, AvatarCircles } from "../ui/avatar-circles";
import reviews from "@/data/reviews.json";

const reviewData: Avatar[] = reviews;

export function ReviewAvatarCircles() {
  return (
    <div className="flex flex-col items-center mt-8">
      <AvatarCircles numPeople={7} avatarUrls={reviewData} />
      <p className="text-gray-500 py-4 italic">Over 11 Happy Parents!</p>
    </div>
  );
}
