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
    options: [
      { value: 1, label: "Married" },
      { value: 2, label: "Single" },
      { value: 3, label: "Legally Separated" },
      { value: 4, label: "Widowed" },
    ],
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
const splitAddress = (address: string) => {
  if (!address) return null;
  const addressArray = address?.split(",");
  return {
    street: addressArray?.[0],
    apt: addressArray?.[1],
    city: addressArray?.[2],
    state: addressArray?.[3],
    zip_code: Number(String(addressArray?.[4]).replace(/\s+/g, "")),
  };
};
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
    name: "zip_code",
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
      { value: 1, label: "Owned" },
      { value: 2, label: "Mortgaged" },
      { value: 3, label: "Rented" },
      { value: 4, label: "Live with family" },
      { value: 5, label: "Company provided" },
    ],
  },
];

const nextOfKin = [
  {
    required: true,
    type: "text",
    name: "next_of_kin_fullname",
    label: "Full Names",
    placeholder: "Full Names",
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
    name: "next_of_kin_address",
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
    options: [
      { value: 1, label: "Employed" },
      { value: 2, label: "Not employed" },
    ],
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
  personalDetails: personalDetails,
  addressDetails: addressDetails,
  employmentDetails: employmentDetails,
  loanDetails: loanDetails,
  employedFields: employedFields,
  nextOfKin: nextOfKin,
};

export { formFields, termsAndConditions, splitAddress };
