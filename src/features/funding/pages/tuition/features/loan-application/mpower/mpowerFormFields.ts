const programDetails = [
  {
    name: "mpower_degreeType",
    label: "Type of degree",
    type: "select",
    required: true,
    options: [
      "Master's",
      "MBA",
      "PhD",
      "JD",
      "Bachelor's",
      "MD",
      "DDS",
      "LL,M",
      "Associate's",
      "Bootcamp",
    ],
  },
  {
    name: "mpower_egd",
    label: "Expected graduation date (estimate is okay) ",
    type: "date",
    required: true,
  },
  {
    name: "mpower_startDate",
    label: "Expected program start date",
    type: "date",
    required: true,
  },
  {
    name: "mpower_progType",
    label: "Program type",
    type: "select",
    required: true,
    options: ["On Campus", "Online", "Hybrid (on campus and online)"],
  },
];
const personalDetails = [
  {
    name: "citizenship",
    label: "Country of citizenship",
    type: "select",
    required: true,
    options: ["Kenya"],
  },
  {
    name: "salutation",
    label: "Salutation",
    type: "select",
    required: true,
    options: ["Mr", "Mrs", "Ms", "Other"],
  },
  {
    name: "mpower_phone",
    label: "Phone Number",
    type: "text",
    required: true,
    placeholder: "+254 714129852",
  },
  { name: "mpower_dob", label: "Date of birth", type: "date", required: true },
];
const addressDetails = [
  {
    name: "mpower_address",
    label: "Building/Apartment/Suite/Land reference number",
    type: "text",
    required: true,
  },
  { name: "mpower_city", label: "City/Town", type: "text", required: true },
  { name: "mpower_country", label: "Country", type: "text", required: true },
  {
    name: "mpower_region",
    label: "State/Region/County",
    type: "text",
    required: true,
  },
];
const backgroundDetails = [
  {
    name: "mpower_visa",
    label: "Do you already have a visa?",
    type: "select",
    required: true,
    options: ["Yes", "No"],
  },
  {
    name: "mpower_tests",
    label: "Have you taken any tests (you can type multiple)",
    placeholder: "e.g GRE, GMAT, Duolingo, etc.",
    type: "text",
    required: true,
  },
  {
    name: "us_school",
    label: "Have you studied or received a degree from another US school",
    type: "select",
    required: true,
    options: ["Yes", "No"],
  },
  {
    name: "about_me",
    label: "About me",
    type: "select",
    required: true,
    options: [
      "I am thinking about studying",
      "I have applied to study or have been conditionally accepted by my school",
      "I have been accepted to study",
      "I am currently enrolled at a school",
      "I am currently enrolled at a school, but I am transferring to another school",
    ],
  },
];
const employmentHistory = [
  {
    name: "mpower_employment",
    label: "Employment history",
    type: "select",
    required: true,
    options: [
      "Currently employed",
      "Not employed but been employed in the past",
      "No employment history",
    ],
  },
  {
    name: "mpower_experience",
    label: "Years of work experience",
    type: "number",
    required: true,
  },
  {
    name: "mpower_usExperience",
    label: "Years of work experience in the USA",
    type: "number",
    required: true,
  },
];
const employmentDetails = [
  {
    name: "mpower_recent",
    label: "Recent job occupation",
    type: "text",
    required: true,
  },
  {
    name: "mpower_employer",
    label: "Name of employer",
    type: "text",
    required: true,
  },
  {
    name: "work_location",
    label: "Work location",
    type: "text",
    required: true,
  },
  {
    name: "mpower_workPeriod",
    label: "Length of employment",
    type: "text",
    required: true,
  },
  {
    name: "employment_type",
    label: "Type of employment",
    type: "select",
    required: true,
    options: ["Full-time", "Part-time"],
  },
  {
    name: "mpower_future",
    label: "Do you have a future job offer",
    type: "select",
    required: true,
    options: [
      "Yes, I have a post-graduation job offer",
      "Yes, I have an internship offer",
      "No, I don't have a future job offer",
    ],
  },
];
const financialDetails = [
  {
    name: "mpower_income",
    label: "Annual income (USD)",
    type: "number",
    required: true,
  },
  {
    name: "mpower_sponsorship",
    label: "Do you have any sponsorship funding? (USD)",
    type: "number",
    required: true,
  },
];

const documents = [
  {
    name: "mpower_admletter",
    label: "Admission Letter",
    type: "file",
    required: true,
  },
  {
    name: "address_proof",
    label: "Proof of home address",
    type: "file",
    required: true,
  },
];
const mpowerFormFields = {
  programDetails: { label: "Program Details", fields: programDetails },
  personalDetails: { label: "Personal Details", fields: personalDetails },
  addressDetails: { label: "Address Details", fields: addressDetails },
  backgroundDetails: { label: "Background Details", fields: backgroundDetails },
  employmentHistory: { label: "Employment History", fields: employmentHistory },
  employmentDetails: {
    label:
      "Relevant job to your major that you have had in the last 3 years (jobs more than 3 months)",
    fields: employmentDetails,
  },
  financialDetails: { label: "Financial Details", fields: financialDetails },
  documents: { label: "Documents", fields: documents },
};
export default mpowerFormFields;
