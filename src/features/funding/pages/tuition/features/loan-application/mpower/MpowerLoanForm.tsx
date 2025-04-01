import React from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import mpowerFormFields from "./mpowerFormFields";
import useTuition from "../../../services/useTuition";
import tuitionEndpoints from "../../../services/tuitionEndpoints";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import MapFormFields from "../../../../../../../components/inputs/MapFormFields";
import ContentComponent from "../../../../../../../components/ContentComponent";

const MpowerLoanForm = () => {
  const { invalidate, activeLoanApplication, schoolAppId } = useTuition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("mpower_school", activeLoanApplication?.school);
    formData.append("mpower_program", activeLoanApplication?.program);
    formData.append("app_id", schoolAppId);
    uploadMpower.mutate(formData);
  };

  const uploadMpower = useMutation({
    mutationFn: tuitionEndpoints.makeMpowerApplication,
    onSuccess: () => {
      toast.success("Application submitted successfully");
      invalidate("mpower");
    },
    onError: (error : any) => {
      toast.error(error.response.data.message || "An unexpected error occurred.");
    }
  });

  const convert = (fields: any) =>
    fields.map((field: any) => ({
      ...field,
      value: activeLoanApplication.application_details?.[field.name],
    }));

  return (
    <ContentComponent header={"Mpower loan application form"}>
      <form onSubmit={handleSubmit} className="col gap-2">
        {Object.entries(mpowerFormFields).map(([key, field]) => (
          <React.Fragment key={key}>
            <p className="font-bold py-2">{field.label}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-10">
              <MapFormFields fields={convert(field.fields)} />
            </div>
          </React.Fragment>
        ))}
        <PrimaryBtn className="self-end px-5" type="submit">
          {uploadMpower.isPending ? "Uploading..." : "Submit"}
        </PrimaryBtn>
      </form>
    </ContentComponent>
  );
};

export default MpowerLoanForm;
