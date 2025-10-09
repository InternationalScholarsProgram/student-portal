const loans = [
  { label: "Tuition & Living Expenses", to: "tuition", name: "tuition" },
  { label: "Relocation", to: "relocation", name: "relocation" },
  { label: "Alternative Study", to: "alternative", name: "alternative" },
  { label: "Personal", to: "personal", name: "personal" },
];

const loanType = [
  { type: 1, label: "Tuition & Living Expenses", name: "relocation" },
  { type: 2, label: "Tuition & Living Expenses", name: "personal" },
  { type: 3, label: "Tuition & Living Expenses", name: "study" },
];

const getLoanType = (type: number | string) =>
  loanType.find((loan) => loan.type === Number(type))?.name;

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
    name: "dob", // changed from "dob"
    label: "Date of Birth",
    max: "calculated from PHP date",
  },
  {
    required: true,
    type: "text",
    name: "pob", // changed from "pob"
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
    name: "permanent_kenyan_address", // changed from "permanent_kenyan_address"
    label: "Physical Address (Do not put P.O. Box)",
    placeholder: "Permanent Address",
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
    name: "phone_number",
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
    name: "next_of_kin_fname",
    label: "First Name",
    placeholder: "John",
  },
  {
    required: false,
    type: "text",
    name: "next_of_kin_mname",
    label: "Middle Name (optional)",
    placeholder: "Middle Name",
  },
  {
    required: true,
    type: "text",
    name: "next_of_kin_lname",
    label: "Last Name",
    placeholder: "Doe",
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
    name: "next_of_kin_permanent_address",
    label: "Next of Kin Permanent Address",
    placeholder: "Next of Kin Permanent Address",
  },
  {
    required: true,
    type: "select",
    name: "next_of_kin_relationship",
    label: "Relationship",
    options: [
      { value: "parent", label: "Parent" },
      { value: "sibling", label: "Sibling" },
      { value: "spouse", label: "Spouse" },
      { value: "guardian", label: "Guardian" },
      { value: "other", label: "Other" },
    ],
  },
];

const employmentDetails = [
  {
    required: true,
    type: "number",
    name: "gross_income",
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
    name: "current_job_title", // changed from "current_job_title"
    label: "Current Job Title",
    placeholder: "Current Job Title",
  },
  {
    required: true,
    type: "text",
    name: "current_employer_name", // changed from "current_employer_name"
    label: "Current Employer Name",
    placeholder: "Current Employer Name",
  },
  {
    required: true,
    type: "text",
    name: "current_employer_address", // changed from "current_employer_address"
    label: "Current Employer Address",
    placeholder: "Current Employer Address",
  },
];

const formFields = {
  personalDetails: personalDetails,
  addressDetails: addressDetails,
  employmentDetails: employmentDetails,
  employedFields: employedFields,
  nextOfKin: nextOfKin,
};

export {
  loans,
  formFields,
  termsAndConditions,
  splitAddress,
  loanType,
  getLoanType,
};
