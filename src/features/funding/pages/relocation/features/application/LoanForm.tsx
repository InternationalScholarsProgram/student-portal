import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import MapFormFields from "../../../../../../components/inputs/MapFormFields";
import FormFooterBtns from "../../../../../../components/buttons/FormFooterBtns";
import { InputsWithLabel } from "../../../../../../components/inputs/InputField";
import { useMutation } from "@tanstack/react-query";
import relocationApis from "../../services/relocationApis";
import useRelocation from "../../services/useRelocation";
import { toast } from "react-toastify";

const LoanForm = () => {
  const { invalidate, relocationStatus } = useRelocation();
  const applicationData = relocationStatus?.application;
  const [tac, setTac] = useState(false);
  const [formData, setFormData] = useState<any>({});

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
  const convert = (fields: any) =>
    fields.map((field: any) => ({
      ...field,
      value: applicationData?.[field.name],
    }));

  return (
    <form onSubmit={handleSubmit} className="col gap-2">
      <React.Fragment>
        <p className="font-bold py-2">Personal Details</p>
        <div className="form-grid">
          <MapFormFields
            fields={
              applicationData ? convert(personalDetails) : personalDetails
            }
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
            fields={applicationData ? convert(addressDetails) : addressDetails}
            handleChange={handleChange}
          />
          {formData?.residential_status === "Mortgaged" && (
            <InputsWithLabel
              name="mortgage"
              inputLabel="Monthly mortgage amount(in USD)"
              required
            />
          )}
          {formData?.residential_status === "Rented" && (
            <InputsWithLabel
              inputLabel="Monthly rent amount(in USD)"
              name="monthly_rent"
              required
            />
          )}
        </div>
      </React.Fragment>

      <React.Fragment>
        <p className="font-bold py-2">Next of Kin Details</p>
        <div className="form-grid">
          <MapFormFields
            fields={applicationData ? convert(nextOfKin) : nextOfKin}
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
            fields={
              applicationData ? convert(employmentDetails) : employmentDetails
            }
            handleChange={handleChange}
          />
          {formData?.employment_status === "Employed" && (
            <MapFormFields
              fields={
                applicationData ? convert(employedFields) : employedFields
              }
            />
          )}
        </div>
      </React.Fragment>

      <React.Fragment>
        <p className="font-bold py-2">Loan Details</p>
        <div className="form-grid">
          <MapFormFields
            fields={applicationData ? convert(loanDetails) : loanDetails}
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
        disabled={!tac}
      />
    </form>
  );
};

export default LoanForm;
const termsAndConditions =
  "I hereby apply for the loan or credit described in this application. I certify that I made no misrepresentations in this loan application or in any related documents, that all information is true and complete, and that I did not omit any important information. I agree that the lender is authorized to verify with other parties and to make any investigation of my credit, either directly or through any agency employed by the lender for that purpose. The lender may disclose to any other interested parties information as to lender's experiences or transactions with my account. I understand that the lender will retain this application and any other credit information lender receives, even if no credit is granted. These representations and authorizations extend not only to the lender, but also to any insurer of the credit and to any investor to whom the lender may sell all or any part of the credit. I further authorize the lender to provide to any such insurer or investor any information and documentation that they may request with respect to my application for credit";
const personalDetails = [
  {
    type: "select",
    name: "title",
    required: true,
    label: "Title",
    options: ["Select", "Mr", "Mrs", "Miss"],
  },
  {
    required: true,
    type: "country",
    name: "country",
    label: "Country of Citizenship",
  },
  {
    required: true,
    type: "select",
    name: "gender",
    label: "Gender",
    options: ["Select", "Male", "Female", "Other"],
  },
  {
    required: true,
    type: "date",
    name: "date_of_birth", // changed from "dob"
    label: "Date of Birth",
    max: "calculated from PHP date",
  },
  {
    required: true,
    type: "text",
    name: "place_of_birth", // changed from "pob"
    label: "Place of birth (city/town, village)",
    placeholder: "Place of birth",
  },
  {
    required: true,
    type: "select",
    name: "marital_status",
    label: "Marital Status",
    options: ["Select", "Married", "Single", "Legally Separated", "Widowed"],
  },
  {
    required: true,
    type: "text",
    name: "passport_number",
    label: "Passport Number",
    placeholder: "Passport Number",
  },
  {
    required: true,
    type: "text",
    name: "kenyan_address", // changed from "permanent_kenyan_address"
    label: "Physical Address (Do not put P.O. Box)",
    placeholder: "Permanent Address",
  },
  {
    required: true,
    type: "select",
    name: "social_security_number", // changed from "ssn_select" (optional fallback logic needed)
    label: "Do you have a Social Security Number?",
    options: ["Select", "Yes", "No"],
  },
];

const addressDetails = [
  {
    required: true,
    type: "text",
    name: "street", // Will be used to build "usa_address"
    label: "Street",
    placeholder: "e.g 100 S. Ashley Drive",
  },
  {
    required: true,
    type: "text",
    name: "apt",
    label: "Apartment",
    placeholder: "e.g Apt 001",
  },
  {
    required: true,
    type: "text",
    name: "city",
    label: "City",
    placeholder: "e.g Tampa",
  },
  {
    required: true,
    type: "text",
    name: "state",
    label: "State",
    placeholder: "e.g FL",
  },
  {
    required: true,
    type: "number",
    name: "zip_code", // Will also be combined into "usa_address"
    label: "Zip Code",
    placeholder: "e.g 33618",
  },
  {
    required: true,
    type: "text",
    name: "phone_no", // changed from "phone_number"
    label: "Personal Phone Number",
    placeholder: "country-code 700000000",
  },
  {
    required: true,
    type: "select",
    name: "residential_status",
    label: "Residential Status",
    options: [
      "Select",
      "Owned",
      "Mortgaged",
      "Rented",
      "Live with family",
      "Company provided",
    ],
  },
];

const nextOfKin = [
  {
    required: true,
    type: "text",
    name: "next_of_kin_lname",
    label: "Last Name",
    placeholder: "Last Name",
  },
  {
    required: true,
    type: "text",
    name: "next_of_kin_fname",
    label: "First Name",
    placeholder: "First Name",
  },
  {
    required: true,
    type: "text",
    name: "next_of_kin_mname",
    label: "Middle Name",
    placeholder: "Middle Name",
  },
  {
    required: true,
    type: "text",
    name: "next_of_kin_phone_number",
    label: "Next of Kin Phone Number",
    placeholder: "country-code 700000000",
  },
  {
    required: true,
    type: "text",
    name: "next_of_kin_address", // changed from "next_of_kin_permanent_address"
    label: "Next of Kin Permanent Address",
    placeholder: "Next of Kin Permanent Address",
  },
  {
    required: true,
    type: "select",
    name: "next_of_kin_relationship",
    label: "Relationship",
    options: ["Select", "Parent", "Sibling", "Spouse", "Guardian", "Other"],
  },
];

const employmentDetails = [
  {
    required: true,
    type: "number",
    name: "income", // changed from "gross_income"
    label: "Gross Monthly Income(in USD)",
    placeholder: "Monthly income",
  },
  {
    required: true,
    type: "select",
    name: "employment_status",
    label: "Employment Status",
    options: ["Select", "Employed", "Not employed"],
  },
];

const employedFields = [
  {
    required: true,
    type: "text",
    name: "job_title", // changed from "current_job_title"
    label: "Current Job Title",
    placeholder: "Current Job Title",
  },
  {
    required: true,
    type: "text",
    name: "current_employee", // changed from "current_employer_name"
    label: "Current Employer Name",
    placeholder: "Current Employer Name",
  },
  {
    required: true,
    type: "text",
    name: "current_employee_address", // changed from "current_employer_address"
    label: "Current Employer Address",
    placeholder: "Current Employer Address",
  },
];

const loanDetails = [
  {
    required: true,
    type: "number",
    name: "amount",
    label: "Loan Amount you need (in USD, maximum 5000)",
    placeholder: "Loan Amount (maximum 5000)",
    max: 5000,
  },
];

const formFields = {
  personalDetails: { label: "Personal Details", fields: personalDetails },
  addressDetails: { label: "Address Details", fields: addressDetails },
  nextOfKin: { label: "Next Of Kin", fields: nextOfKin },
  employmentDetails: {
    label:
      "Relevant job to your major that you have had in the last 3 years (jobs more than 3 months)",
    fields: employmentDetails,
  },
  loanDetails: { label: "Financial Details", fields: loanDetails },
};
