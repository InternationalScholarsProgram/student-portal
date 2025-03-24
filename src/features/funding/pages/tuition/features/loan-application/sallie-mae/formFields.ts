const generalInformation = [
  { name: "discover_phone", type: "text", label: "Phone Number" },
  { name: "discover_dob", type: "date", label: "Date of Birth" },
  {
    name: "discover_citizenship",
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
    name: "discover_egd",
    type: "date",
    label: "Expected graduation date (estimate is okay)  ",
  },
];
const addressDetails = [
  { name: "discover_address", type: "text", label: "Street Address" },
  { name: "discover_suite", type: "text", label: "Apartment, Unit or Suite" },
  { name: "discover_city", type: "text", label: "City, Province" },
  { name: "discover_code", type: "text", label: "Zip Code" },
];
const employmentInformation = [
  {
    name: "discover_emp_status",
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
  { name: "discover_occupation", label: "Occupation", type: "text" },
];

const financial = [
  {
    name: "discover_income",
    label: "Gross annual income (USD)",
    type: "number",
  },
  {
    name: "discover_household",
    label: "Additional income (USD)",
    type: "number",
  },
];
const residence = [
  {
    name: "discover_housing",
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
    name: "discover_rent",
    label: "Housing rent/mortgage, if renting (USD)",
    type: "number",
  },
];
const security = [
  {
    name: "discover_answer1",
    label: "Name of the city you were born in",
    type: "text",
  },

  {
    name: "discover_answer2",
    label: "First Company you have worked for",
    type: "text",
  },

  {
    name: "discover_answer3",
    label: "Name of the last school attended",
    type: "text",
  },
];
const documents = [
  {
    name: "discover_admletter",
    label: "School Acceptance Letter",
    type: "file",
  },
  { name: "discover_resume", label: "Resume", type: "file" },
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
