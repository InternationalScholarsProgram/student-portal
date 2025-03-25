const generalInformation = [
  {
    type: "text",
    label: "Phone Number",
    name: "phone_number",
  },
  { type: "date", label: "Date of Birth", name: "dob" },
  {
    name: "citizenship",
    type: "select",
    label: "Citizenship Status",
    options: [
      { value: "", label: "Select" },
      { value: "1", label: "US Citizen" },
      { value: "2", label: "US Permanent Resident" },
      { value: "3", label: "Non-US Citizen" },
    ],
  },
  {
    name: "grad_date",
    type: "date",
    label: "Expected graduation date (estimate is okay)  ",
  },
];
const addressDetails = [
  {
    type: "text",
    label: "Street Address",
    name: "address",
  },
  {
    type: "text",
    label: "Apartment, Unit or Suite",
    name: "apartment",
  },
  { type: "text", label: "City, Province", name: "city" },
  { type: "text", label: "Zip Code", name: "zip_code" },
];
const employmentInformation = [
  {
    name: "employment",
    label: "Employment status",
    type: "select",
    options: [
      { value: "", label: "Select" },
      { value: "1", label: "Employed" },
      { value: "2", label: "Retired" },
      { value: "3", label: "Self-Employed" },
      { value: "4", label: "Unemployed" },
    ],
  },
  {
    label: "Occupation",
    type: "text",
    name: "occupation",
  },
];

const financial = [
  {
    label: "Gross annual income (USD)",
    type: "number",
    name: "annual_income",
  },
  {
    label: "Additional income (USD)",
    type: "number",
    name: "additional_income",
  },
];
const residence = [
  {
    name: "housing_status",
    type: "select",
    label: "Residence type",
    options: [
      { value: "", label: "Select" },
      { value: "1", label: "Dormitory" },
      { value: "2", label: "Own" },
      { value: "3", label: "Live with parents" },
      { value: "4", label: "Other" },
    ],
  },
  {
    label: "Housing rent/mortgage, if renting (USD)",
    type: "number",
    name: "house_rent",
  },
];
const security = [
  {
    label: "Name of the city you were born in",
    type: "text",
    name: "answer_one",
  },

  {
    label: "First Company you have worked for",
    type: "text",
    name: "answer_two",
  },

  {
    label: "Name of the last school attended",
    type: "text",
    name: "answer_three",
  },
];

const documents = [
  {
    label: "Any other document description e.g essay",
    type: "text",
    name: "file_description",
  },
  {
    label: "",
    type: "file",
    name: "extra_file",
  },
];

const sallieFormFields = {
  generalInformation: {
    label: "General Information",
    fields: generalInformation,
  },
  addressDetails: { label: "Address Details", fields: addressDetails },
  employmentInformation: {
    label: "Employment Information",
    fields: employmentInformation,
  },
  financial: { label: "Financial Information", fields: financial },
  residence: { label: "Residence Information", fields: residence },
  security: { label: "Security Questions", fields: security },
  documents: { label: "Document Uploads", fields: documents },
};

export default sallieFormFields;
