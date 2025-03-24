import React from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useFunding from "../../../../../services/useFunding";
import useTuition from "../../../services/useTuition";
import tuitionEndpoints from "../../../services/tuitionEndpoints";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import MapFormFields from "../../../../../../../components/inputs/MapFormFields";
import sallieFormFields from "./formFields";

const SallieApplicationForm = () => {
  const {schoolAppId, invalidate, activeLoanApplication } = useTuition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("mpower_school", activeLoanApplication?.school);
    formData.append("mpower_program", activeLoanApplication?.program);
    formData.append("app_id", schoolAppId);
    submitApplication.mutate(formData);
  };

  const submitApplication = useMutation({
    mutationFn: tuitionEndpoints.sallieMaeApplication,
    onSuccess: () => {
      toast.success("Application submitted successfully");
      invalidate("sallieMae");
    },
  });

  return (
    <form onSubmit={handleSubmit} className="col gap-2">
      {Object.entries(sallieFormFields).map(([key, field]) => (
        <React.Fragment key={key}>
          <p className="font-bold py-2">{field.label}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-10">
            <MapFormFields fields={field.fields} />
          </div>
        </React.Fragment>
      ))}
      <PrimaryBtn className="self-end px-5" type="submit">
        {submitApplication.isPending ? "Uploading..." : "Submit"}
      </PrimaryBtn>
    </form>
  );
};

export default SallieApplicationForm;
