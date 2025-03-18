import React from "react";
import { useMutation } from "@tanstack/react-query";
import mpowerFormFields from "./mpowerFormFields";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import MapFormFields from "../../../../../../components/inputs/MapFormFields";
import tuitionEndpoints from "../../services/tuitionEndpoints";
import useFunding from "../../../../services/useFunding";
import useTuition from "../../services/useTuition";
import { toast } from "react-toastify";

const MpowerLoanForm = () => {
  const { schoolAppId, selectedSchool } = useFunding();
  const { inValidateMpowerStatus } = useTuition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("mpower_school", selectedSchool?.school_name);
    formData.append("mpower_program", selectedSchool?.program_name);
    formData.append("app_id", schoolAppId);
    uploadMpower.mutate(formData);
  };

  const uploadMpower = useMutation({
    mutationFn: tuitionEndpoints.makeMpowerApplication,
    onSuccess: () => {
      toast.success("Application submitted successfully");
      inValidateMpowerStatus();
    },
  });

  return (
    <form onSubmit={handleSubmit} className="col gap-2">
      {Object.entries(mpowerFormFields).map(([key, field]) => (
        <React.Fragment key={key}>
          <p className="font-bold py-2">{field.label}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-10">
            <MapFormFields fields={field.fields} />
          </div>
        </React.Fragment>
      ))}
      <PrimaryBtn className="self-end px-5" type="submit">
        {uploadMpower.isPending ? "Uploading..." : "Submit"}
      </PrimaryBtn>
    </form>
  );
};

export default MpowerLoanForm;
