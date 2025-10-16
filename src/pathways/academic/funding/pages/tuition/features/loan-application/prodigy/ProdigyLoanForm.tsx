// components/.../ProdigyLoanForm.tsx
import React from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import prodigyFormFields from "./prodigyFormFields";
import useTuition from "../../../services/useTuition"; // still reuse for activeLoanApplication + app_id
import prodigyEndpoints from "../../../services/prodigyEndpoints"; // uses Prodigy endpoint in same area as tuition
import PrimaryBtn from "../../../../../../../../components/buttons/PrimaryBtn";
import MapFormFields from "../../../../../../../../components/inputs/MapFormFields";
import ContentComponent from "../../../../../../../../components/ContentComponent";

const JSON_FIELD_NAMES = [
  "countries_lived",
  "institution_of_study",
  "address",
  "tests_taken",
  "assets_declaration",
  "outstanding_cc_debt",
  "highest_undergrad",
  "employment_dates",
  "first_year_budget",
  "rest_course_budget",
] as const;

function isValidJson(str: string) {
  try {
    if (str === "" || str == null) return true;
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

const ProdigyLoanForm = () => {
  const { invalidate, activeLoanApplication, schoolAppId } = useTuition();

  const uploadProdigy = useMutation({
    mutationFn: prodigyEndpoints.makeApplication, // use Prodigy endpoint
    onSuccess: () => {
      toast.success("Prodigy application submitted successfully");
      invalidate("tuitionStatus"); // the rest of tuition still uses tuition endpoints
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An unexpected error occurred.");
    },
  });

  if (!activeLoanApplication) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    // Validate JSON fields client-side (nicer DX)
    for (const name of JSON_FIELD_NAMES) {
      const raw = (fd.get(name) as string) || "";
      if (!isValidJson(raw)) {
        toast.error(`"${name}" must be valid JSON.`);
        return;
      }
    }

    // Required for backend linkage
    if (schoolAppId) fd.set("app_id", String(schoolAppId));

    // Normalize booleans & other funding
    const of = (fd.get("other_funding") as string) || "No";
    const ofAmt = ((fd.get("other_funding_amount") as string) || "").trim();

    if (of !== "Yes") {
      // Clear amount when 'No'
      fd.set("other_funding_amount", "");
    } else {
      // When 'Yes', require a value and sanitize (e.g., strip commas)
      if (!ofAmt) {
        toast.error("Please enter 'Other funding amount' or choose 'No'.");
        return;
      }
      const cleaned = ofAmt.replace(/,/g, "");
      fd.set("other_funding_amount", cleaned);
    }

    // Fire
    uploadProdigy.mutate(fd);
  };

  const convert = (fields: any[]) =>
    fields.map((field: any) => ({
      ...field,
      value: activeLoanApplication.application_details?.[field.name],
    }));

  return (
    <ContentComponent header={"Prodigy loan application form"}>
      <form onSubmit={handleSubmit} className="col gap-2">
        {Object.entries(prodigyFormFields).map(([key, section]) => (
          <React.Fragment key={key}>
            <p className="font-bold py-2">{section.label}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-10">
              <MapFormFields
                fields={
                  activeLoanApplication.application_details
                    ? convert(section.fields)
                    : section.fields
                }
              />
            </div>
          </React.Fragment>
        ))}
        <PrimaryBtn className="self-end px-5" type="submit">
          {uploadProdigy.isPending ? "Uploading..." : "Submit"}
        </PrimaryBtn>
      </form>
    </ContentComponent>
  );
};

export default ProdigyLoanForm;
