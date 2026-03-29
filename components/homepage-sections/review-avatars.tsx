import { type Avatar, AvatarCircles } from "../ui/avatar-circles";

const avatars: Avatar[] = [
  {
    who: "Duc Minh",
    profileUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjUbL_DsTpsH0Y57G0ieb92U98CkPS4G2ypl0DZ_3hppa7-YBcdS=w144-h144-p-rp-mo-ba3-br100",
    reviewUrl: "https://maps.app.goo.gl/7obRnh38NNUQ239VA",
  },
  {
    who: "Leslie Ra4",
    profileUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjX0A7ApkxdpFSAaxaK8xhCx1Dl9byTgHwskAjBXHY7AHRMH5T5o=w72-h72-p-rp-mo-br100",
    reviewUrl: "https://maps.app.goo.gl/swTHrpWijq3GF9AL6",
  },
  {
    who: "Tracey Nguyen",
    profileUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjWq7lv8L_syaF0_X29qrKNWFF-9Snb47mQstbGxzHKfjSRDt9YzcQ=w72-h72-p-rp-mo-ba2-br100",
    reviewUrl: "https://maps.app.goo.gl/sby8YCnYdqmcug3k9",
  },
  {
    who: "Imma Gene Santos",
    profileUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjW1VOYscNxo_-4lGHUZoxb2Tj_esYryetEAbIRBTYVPjUhjxsqS=w144-h144-p-rp-mo-br100",
    reviewUrl: "https://maps.app.goo.gl/XyWjqzHH4WdCZD2B7",
  },
  {
    profileUrl: "",
    reviewUrl: "",
  },
  {
    profileUrl: "",
    reviewUrl: "",
  },
];

export function ReviewAvatarCircles() {
  return (
    <div className="flex flex-col items-center mt-8">
      <AvatarCircles numPeople={8} avatarUrls={avatars} />;
      <p className="text-white italic">Over 35 Happy Parents!</p>
    </div>
  );
}
