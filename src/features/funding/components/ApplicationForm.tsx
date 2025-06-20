import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { formFields, splitAddress, termsAndConditions } from "../utils";
import MapFormFields from "../../../components/inputs/MapFormFields";
import { InputsWithLabel } from "../../../components/inputs/InputField";
import FormFooterBtns from "../../../components/buttons/FormFooterBtns";
import fundingEndpoints from "../services/fundingEndpoints";
import { InlineLoader } from "../../../components/loaders/Loader";
import useFunding from "../services/useFunding";
import { Application } from "../types/fundingTypes";
import { errorMsg } from "../../../components/errors/errorMsg";

type Props = {
  max: number;
  loanType?: number;
  onSuccess?: () => void;
};

const ApplicationForm: React.FC<Props> = ({ max, loanType, onSuccess }) => {
  const { applicationDetails, isLoading, invalidate } = useFunding({});

  const [tac, setTac] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [fields, setFields] = useState<any>(null);

  const applicationData: Application | any = {
    ...(applicationDetails || {}),
    ...splitAddress(applicationDetails?.permanent_us_address || ""),
  };

  const convert = (fields: any) =>
    fields.map((field: any) => ({
      ...field,
      value: applicationData?.[field.name],
    }));

  const presetValues = () => {
    if (!applicationData) return setFields([formFields]);

    const values = {
      personalDetails: convert(formFields?.personalDetails),
      addressDetails: convert(formFields?.addressDetails),
      employmentDetails: convert(formFields?.employmentDetails),
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
    mutationFn: fundingEndpoints.loanApplication,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      invalidate("app");
      if (onSuccess) onSuccess();
    },
    onError(error) {
      toast.error(errorMsg(error));
    },
  });

  useEffect(() => {
    if (isLoading) return;
    presetValues();
  }, [applicationDetails, isLoading]);

  if (isLoading || !fields) return <InlineLoader />;

  const showOthers =
    !formFields.nextOfKin
      .find((item) => item.name === "next_of_kin_relationship")
      ?.options?.some(
        (option) => option.value === formData?.next_of_kin_relationship
      ) || formData?.next_of_kin_relationship === "other";

  return (
    <form onSubmit={handleSubmit} className="col gap-2">
      <React.Fragment>
        <p className="font-bold py-2">Personal Details</p>
        <div className="form-grid">
          <MapFormFields
            fields={fields?.personalDetails}
            handleChange={handleChange}
          />

          <InputsWithLabel
            inputLabel={`Social Security Number ${
              loanType === 1 ? "(optional)" : ""
            }`}
            name="ssn_number"
            defaultValue={applicationData?.ssn_number}
            className="p-2 border rounded-md"
            required={loanType !== 1}
          />
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
          {showOthers && (
            <InputsWithLabel
              inputLabel="Please specify other relationship details"
              name="other_relationship"
              defaultValue={
                formData?.next_of_kin_relationship !== "other"
                  ? formData?.other_relationship
                  : ""
              }
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
          <InputsWithLabel
            inputLabel={`Loan Amount you need (in USD, maximum ${max})`}
            type="number"
            name="amount"
            onChange={(e: any) =>
              handleChange("amount", Number(e.target.value))
            }
            error={formData?.amount > max}
            helperText={formData?.amount > max && `Max amount is ${max}`}
            defaultValue={formData?.amount}
            required
          />
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
        disabled={!tac || uploadLoan.isPending || formData?.amount > max}
      />
    </form>
  );
};

export default ApplicationForm;
