import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { formFields, splitAddress, termsAndConditions } from "../utils";
import MapFormFields from "../../../../components/inputs/MapFormFields";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { InlineLoader } from "../../../../components/loaders/Loader";
import { Application } from "../types/fundingTypes";
import { errorMsg } from "../../../../components/errors/errorMsg";

import relocationApis from "../pages/relocation/services/relocationApis";
import useRelocation from "../pages/relocation/services/useRelocation";

import useFetchUser from "../../../../services/hooks/useFetchUser";
import personalEndpoints from "../pages/personal/services/personalEndpoints";
import alternativeEndpoints from "../pages/alternative/services/alternativeEndpoints";

// NEW: type-specific hooks for prefill (replaces useFunding)
import usePersonal from "../pages/personal/services/usePersonal";
import useAlternative from "../pages/alternative/services/useAlternative";

declare global {
  interface Window {
    __loanSubmitLock?: boolean;
  }
}

type Props = {
  max: number;
  /** 1 = Relocation; 2 = Personal; 3 = Alternative (Study) */
  loanType?: number;
  onSuccess?: () => void;
};

const ApplicationForm: React.FC<Props> = ({ max, loanType, onSuccess }) => {
  const { user } = useFetchUser();

  // Relocation source (id & optional prefill)
  const { application: relocationApp, isLoading: isRelocationLoading } = useRelocation();

  // Personal prefill source (user_details), independent of study
  const {
    user_details: personalDetails,
    isLoading: isPersonalLoading,
  } = usePersonal?.() ?? ({ user_details: undefined, isLoading: false } as any);

  // Alternative/Study prefill source (user_details), independent of personal
  const {
    user_details: alternativeDetails,
    isLoading: isAlternativeLoading,
  } = useAlternative?.() ?? ({ user_details: undefined, isLoading: false } as any);

  // Pick the right prefill based on loanType (no shared application_details)
  const prefillRaw =
    loanType === 1
      ? relocationApp
      : loanType === 2
      ? personalDetails
      : loanType === 3
      ? alternativeDetails
      : undefined;

  const [tac, setTac] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [fields, setFields] = useState<any>(null);
  const localSubmitting = useRef(false);

  // Normalize & split address parts for the form fields
  const applicationData: Application | any = {
    ...(prefillRaw || {}),
    ...splitAddress(prefillRaw?.permanent_us_address || ""),
  };

  const convert = (arr: any[]) =>
    arr.map((field: any) => ({ ...field, value: applicationData?.[field.name] }));

  const presetValues = () => {
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

  const buildUSAddress = (data: any) => {
    const parts = [data?.street, data?.apt, data?.city, data?.state, data?.zip_code]
      .map((x) => (x ?? "").toString().trim())
      .filter(Boolean);
    return parts.join(", ");
  };

  const uploadLoan = useMutation({
    mutationFn: (payload: FormData) => {
      if (loanType === 1) {
        // Relocation (unchanged)
        return relocationApis.application(payload);
      }
      if (loanType === 3) {
        // Alternative/Study (type 3): currently needs ?student_id= in GET
        const studentId = user?.email || "";
        return alternativeEndpoints.application(payload, studentId);
      }
      // Personal (type 2): current flow (uses ?student_id= in GET)
      const studentId = user?.email || "";
      return personalEndpoints.application(payload, studentId);
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      // Do NOT invalidate any shared prefill query here.
      // Parent pages should call invalidate("status") after onSuccess.
      onSuccess?.();
    },
    onError(error) {
      toast.error(errorMsg(error));
    },
    onSettled: () => {
      localSubmitting.current = false;
      window.__loanSubmitLock = false;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.__loanSubmitLock || localSubmitting.current) return;
    window.__loanSubmitLock = true;
    localSubmitting.current = true;

    const fd = new FormData(e.currentTarget as HTMLFormElement);

    if (loanType != null) fd.append("loan_type", String(loanType)); // 1, 2, 3

    // Re-application id should be isolated per flow
    if (loanType === 1) {
      if (relocationApp?.id) fd.append("id", String(relocationApp.id));
    } else {
      if (applicationData?.id) fd.append("id", String(applicationData.id));
    }

    const combinedUS = buildUSAddress({
      street: fd.get("street"),
      apt: fd.get("apt"),
      city: fd.get("city"),
      state: fd.get("state"),
      zip_code: fd.get("zip_code"),
    });
    if (combinedUS) fd.set("permanent_us_address", combinedUS);

    uploadLoan.mutate(fd);
  };

  useEffect(() => {
    // wait for the correct prefill to load, then set fields
    if (loanType === 1 && isRelocationLoading) return;
    if (loanType === 2 && isPersonalLoading) return;
    if (loanType === 3 && isAlternativeLoading) return;
    presetValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanType, prefillRaw, isRelocationLoading, isPersonalLoading, isAlternativeLoading]);

  const waiting =
    (loanType === 1 && isRelocationLoading) ||
    (loanType === 2 && isPersonalLoading) ||
    (loanType === 3 && isAlternativeLoading) ||
    !fields;

  if (waiting) return <InlineLoader />;

  const showOthers =
    !formFields.nextOfKin
      .find((item) => item.name === "next_of_kin_relationship")
      ?.options?.some((option) => option.value === formData?.next_of_kin_relationship) ||
    formData?.next_of_kin_relationship === "other";

  return (
    <form onSubmit={handleSubmit} className="col gap-2">
      <React.Fragment>
        <p className="font-bold py-2">Personal Details</p>
        <div className="form-grid">
          <MapFormFields fields={fields?.personalDetails} handleChange={handleChange} />
          <InputsWithLabel
            inputLabel={`Social Security Number ${loanType === 1 ? "(optional)" : ""}`}
            name="ssn_number"
            defaultValue={applicationData?.ssn_number}
            className="p-2 border rounded-md"
            required={loanType !== 1} // required for personal (2) & alternative (3); optional for relocation (1)
          />
        </div>
      </React.Fragment>

      <React.Fragment>
        <p className="font-bold py-2">Address Details</p>
        <div className="form-grid">
          <MapFormFields fields={fields?.addressDetails} handleChange={handleChange} />
          {(formData?.residential_status == 3 || formData?.residential_status == 2) && (
            <MapFormFields
              fields={[
                {
                  name: "rent",
                  label: `Monthly ${formData?.residential_status == 2 ? "mortgage" : "rent"} amount(in USD)`,
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
          <MapFormFields fields={fields?.nextOfKin} handleChange={handleChange} />
          {showOthers && (
            <InputsWithLabel
              inputLabel="Please specify other relationship details"
              name="other_relationship"
              defaultValue={formData?.next_of_kin_relationship !== "other" ? formData?.other_relationship : ""}
              required
            />
          )}
        </div>
      </React.Fragment>

      <React.Fragment>
        <p className="font-bold py-2">Employment Details</p>
        <div className="form-grid">
          <MapFormFields fields={fields?.employmentDetails} handleChange={handleChange} />
          {formData?.employment_status == 1 && <MapFormFields fields={fields?.employedFields} />}
        </div>
      </React.Fragment>

      <React.Fragment>
        <p className="font-bold py-2">Loan Details</p>
        <div className="form-grid">
          <InputsWithLabel
            inputLabel={`Loan Amount you need (in USD, maximum ${max})`}
            type="number"
            name="amount"
            onChange={(e: any) => handleChange("amount", Number(e.target.value))}
            error={formData?.amount > max}
            helperText={formData?.amount > max && `Max amount is ${max}`}
            defaultValue={formData?.amount}
            required
          />
        </div>
      </React.Fragment>

      <div className="row items-start mt-5">
        <Checkbox title={termsAndConditions} checked={tac} onChange={(e) => setTac(e.target.checked)} />
        <p onClick={() => setTac(!tac)} className="text-sm cursor-pointer">
          {termsAndConditions}
        </p>
      </div>

      <FormFooterBtns
        btnText={uploadLoan.isPending ? "Submitting..." : "Apply Now"}
        disabled={!tac || uploadLoan.isPending || formData?.amount > max}
      />
    </form>
  );
};

export default ApplicationForm;
