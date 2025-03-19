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
  const { schoolAppId, selectedSchool } = useFunding();
  const { inValidateMpowerStatus } = useTuition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("mpower_school", selectedSchool?.school_name);
    formData.append("mpower_program", selectedSchool?.program_name);
    formData.append("app_id", schoolAppId);
    submitApplication.mutate(formData);
  };

  const submitApplication = useMutation({
    mutationFn: tuitionEndpoints.makeMpowerApplication,
    onSuccess: () => {
      toast.success("Application submitted successfully");
      inValidateMpowerStatus();
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
