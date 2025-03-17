import React from "react";
import { useMutation } from "@tanstack/react-query";
import mpowerFormFields from "./mpowerFormFields";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import MapFormFields from "../../../../../../components/inputs/MapFormFields";
import tuitionEndpoints from "../../services/tuitionEndpoints";

const MpowerLoanForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("mpower_school", "mpower_school");
    formData.append("mpower_program", "mpower_program");
    formData.append("app_id", "app_id");
    uploadMpower.mutate(formData);
  };
  const uploadMpower = useMutation({
    mutationFn: tuitionEndpoints.uploadMpower,
  });
  return (
    <form onSubmit={handleSubmit} className="col gap-2">
      {Object.entries(mpowerFormFields).map(([key, field]) => (
        <React.Fragment key={key}>
          <p className="font-bold py-2">{field.label}</p>
          <div className="grid sm:grid-cols-2 gap-x-3 gap-y-10">
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
