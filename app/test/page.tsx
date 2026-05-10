import EnrollmentForm from "@/components/forms/enrollment-form";
import WaiverInquiryForm from "@/components/forms/waiver-inquiry-form";

export default function Page() {
  return (
    <div className="mt-32">
      <WaiverInquiryForm />
      <div className="mt-24 mb-24 border border-t-gray" />
      <EnrollmentForm />
    </div>
  );
}
