import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import MapFormFields from "../../../../../../components/inputs/MapFormFields";
import FormFooterBtns from "../../../../../../components/buttons/FormFooterBtns";
import { InputsWithLabel } from "../../../../../../components/inputs/InputField";
import relocationApis from "../../services/relocationApis";
import useRelocation from "../../services/useRelocation";
import { InlineLoader } from "../../../../../../components/loaders/Loader";
import { formFields, splitAddress, termsAndConditions } from "./utils";
import { Status } from "../../types/relocationTypes";

const LoanForm = () => {
  const { invalidate, relocationStatus, isLoading } = useRelocation();
  const [tac, setTac] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [fields, setFields] = useState<any>(null);

  const applicationData: Status["application"] | any = {
    ...relocationStatus?.application,
    ...splitAddress(relocationStatus?.application?.usa_address || ""),
  };

  const convert = (fields: any) =>
    fields.map((field: any) => ({
      ...field,
      value: applicationData?.[field.name],
    }));

  const presetValues = () => {
    if (!applicationData) return setFields(formFields);

    const values = {
      personalDetails: convert(formFields?.personalDetails),
      addressDetails: convert(formFields?.addressDetails),
      employmentDetails: convert(formFields?.employmentDetails),
      loanDetails: convert(formFields?.loanDetails),
      employedFields: convert(formFields?.employedFields),
      nextOfKin: convert(formFields?.nextOfKin),
    };
    setFields(values);
    setFormData(applicationData);
  };

  const handleChange = (name: string, value: any) =>
    setFormData((prev: any) => ({ ...prev, [name]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (applicationData?.id) formData.append("id", applicationData?.id);
    uploadLoan.mutate(formData);
  };

  const uploadLoan = useMutation({
    mutationFn: relocationApis.application,
    onSuccess: () => {
      toast.success("Application submitted successfully.");
      invalidate("status");
    },
  });

  useEffect(() => {
    if (isLoading) return;
    presetValues();
  }, [relocationStatus, isLoading]);

  if (isLoading || !fields) return <InlineLoader />;

  return (
    <form onSubmit={handleSubmit} className="col gap-2">
      <React.Fragment>
        <p className="font-bold py-2">Personal Details</p>
        <div className="form-grid">
          <MapFormFields
            fields={fields?.personalDetails}
            handleChange={handleChange}
          />

          {formData?.ssn_select === "Yes" && (
            <InputsWithLabel
              inputLabel="Social Security Number"
              name="ssn_number"
              required
              className="p-2 border rounded-md"
            />
          )}
        </div>
      </React.Fragment>

      <React.Fragment>
        <p className="font-bold py-2">Address Details</p>
        <div className="form-grid">
          <MapFormFields
            fields={fields?.addressDetails}
            handleChange={handleChange}
          />

          {(formData?.residential_status == 3 ||
            formData?.residential_status == 2) && (
            <MapFormFields
              fields={[
                {
                  name: "rent",
                  label: `Monthly ${
                    formData?.residential_status == 2 ? "mortgage" : "rent"
                  } amount(in USD)`,
                  required: true,
                  value: formData?.rent,
                },
              ]}
              handleChange={handleChange}
            />
          )}
        </div>
      </React.Fragment>

      <React.Fragment>
        <p className="font-bold py-2">Next of Kin Details</p>
        <div className="form-grid">
          <MapFormFields
            fields={fields?.nextOfKin}
            handleChange={handleChange}
          />
          {formData?.next_of_kin_relationship === "Other" && (
            <InputsWithLabel
              inputLabel="Please specify other relationship details"
              name="other_relationship"
              required
            />
          )}
        </div>
      </React.Fragment>

      <React.Fragment>
        <p className="font-bold py-2">Employment Details</p>
        <div className="form-grid">
          <MapFormFields
            fields={fields?.employmentDetails}
            handleChange={handleChange}
          />
          {formData?.employment_status == 1 && (
            <MapFormFields fields={fields?.employedFields} />
          )}
        </div>
      </React.Fragment>

      <React.Fragment>
        <p className="font-bold py-2">Loan Details</p>
        <div className="form-grid">
          <MapFormFields fields={fields?.loanDetails} />
        </div>
      </React.Fragment>

      <div className="row items-start mt-5">
        <Checkbox
          title={termsAndConditions}
          checked={tac}
          onChange={(e) => setTac(e.target.checked)}
        />
        <p onClick={() => setTac(!tac)} className="text-sm cursor-pointer">
          {termsAndConditions}
        </p>
      </div>
      <FormFooterBtns
        btnText={uploadLoan.isPending ? "Submiting..." : "Apply Now"}
        disabled={!tac}
      />
    </form>
  );
};

export default LoanForm;
