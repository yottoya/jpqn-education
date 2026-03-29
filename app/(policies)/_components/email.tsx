import { BusinessInfo } from "@/data/constants";

export default function EmailOnPolicies() {
  return (
    <>
      <a href={`mailto:${BusinessInfo.email}`}>
        <span className="text-blue-400 hover:underline">
          {BusinessInfo.email}.
        </span>
      </a>
    </>
  );
}
