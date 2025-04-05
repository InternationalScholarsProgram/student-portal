import React from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useTuition from "../../../services/useTuition";
import tuitionEndpoints from "../../../services/tuitionEndpoints";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import MapFormFields from "../../../../../../../components/inputs/MapFormFields";
import sallieFormFields from "./formFields";
import { wordCounter } from "../../../../../../../utils/utils";
import FileWithDescription from "../../../../../../../components/inputs/FileWithDescription";
import axios from "axios";

const SallieApplicationForm: React.FC = () => {
  const { schoolAppId, invalidate, activeLoanApplication } = useTuition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("app_id", schoolAppId);
    sallieFormFields.security.fields.forEach((field, index) => {
      formData.append(`quiz_${wordCounter(index + 1)}`, field.label);
    });
    if(!formData.get("file_description")) formData.delete("extra_file");
    console.log(axios.formToJSON(formData));
    submitApplication.mutate(formData);
  };

  const submitApplication = useMutation({
    mutationFn: tuitionEndpoints.sallieMaeApplication,
    onSuccess: () => {
      toast.success("Application submitted successfully");
      invalidate("tuitionStatus");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data.message +
          JSON.stringify(error?.response?.data.data) ||
          "An unexpected error occurred."
      );
    },
  });

  const convert = (fields: any) =>
    fields.map((field: any) => ({
      ...field,
      value: activeLoanApplication.application_details?.[field.name],
    }));

  return (
    <form onSubmit={handleSubmit} className="col gap-2">
      {Object.entries(sallieFormFields).map(([key, field]) => (
        <React.Fragment key={key}>
          <p className="font-bold py-2">{field.label}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-10">
            <MapFormFields
              fields={
                activeLoanApplication.application_details
                  ? convert(field.fields)
                  : field.fields
              }
            />
          </div>
        </React.Fragment>
      ))}
      <div>
        <p className="font-bold py-2">Document Uploads</p>
        <FileWithDescription
          document={{ inputLabel: "Attach file", name: "extra_file" }}
          description={{
            inputLabel: "Any other document description e.g essay",
            name: "file_description",
          }}
        />
      </div>

      <PrimaryBtn className="self-end px-5" type="submit">
        {submitApplication.isPending ? "Uploading..." : "Submit"}
      </PrimaryBtn>
    </form>
  );
};

export default SallieApplicationForm;
