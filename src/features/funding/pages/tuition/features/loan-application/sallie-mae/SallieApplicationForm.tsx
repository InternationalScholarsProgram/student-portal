import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useTuition from "../../../services/useTuition";
import tuitionEndpoints from "../../../services/tuitionEndpoints";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import MapFormFields from "../../../../../../../components/inputs/MapFormFields";
import sallieFormFields from "./formFields";
import { wordCounter } from "../../../../../../../utils/utils";

const SallieApplicationForm: React.FC = () => {
  const { schoolAppId, invalidate, activeLoanApplication } = useTuition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("app_id", schoolAppId);
    sallieFormFields.security.fields.forEach((field, index) => {
      formData.append(`quiz_${wordCounter(index + 1)}`, field.label);
    });

    const fileDesc = formData.get("file_description");
    const extraFile = formData.get("extra_file");
    if (!fileDesc) {
      formData.delete("file_description");
      formData.delete("extra_file");
    } else if (!extraFile) {
      alert("Please upload a file");
      return;
    }
    submitApplication.mutate(formData);
  };

  const submitApplication = useMutation({
    mutationFn: tuitionEndpoints.sallieMaeApplication,
    onSuccess: () => {
      toast.success("Application submitted successfully");
      invalidate("tuitionStatus");
    },
  });

  return (
    <form onSubmit={handleSubmit} className="col gap-2">
      {Object.entries(sallieFormFields).map(([key, field]) => {
        const fields = convert(
          field.fields,
          activeLoanApplication.application_details
        );
        return (
          <React.Fragment key={key}>
            <p className="font-bold py-2">{field.label}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-10">
              <MapFormFields fields={fields} />
            </div>
          </React.Fragment>
        );
      })}
      <PrimaryBtn className="self-end px-5" type="submit">
        {submitApplication.isPending ? "Uploading..." : "Submit"}
      </PrimaryBtn>
    </form>
  );
};

export default SallieApplicationForm;
const convert = (fields: any, values: any) => {
  return fields.map((field: any) => ({
    ...field,
    value: values?.[field.name],
  }));
};
