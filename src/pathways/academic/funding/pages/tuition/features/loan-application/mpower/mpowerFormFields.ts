const programDetails = [
  {
    name: "degree_type",
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
    name: "grad_date",
    label: "Expected graduation date (estimate is okay) ",
    type: "date",
    required: true,
  },
  {
    name: "start_date",
    label: "Expected program start date",
    type: "date",
    required: true,
  },
  {
    name: "prog_type",
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
    type: "text",
    isCountry: true,
    required: true,
  },
  {
    name: "salutation",
    label: "Salutation",
    type: "select",
    required: true,
    options: ["Mr", "Mrs", "Ms", "Other"],
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "text",
    required: true,
    placeholder: "+254 714129852",
  },
  { name: "dob", label: "Date of birth", type: "date", required: true },
];
const addressDetails = [
  {
    name: "address",
    label: "Building/Apartment/Suite/Land reference number",
    type: "text",
    required: true,
  },
  { name: "city", label: "City/Town", type: "text", required: true },
  {
    name: "country",
    label: "Country",
    type: "country",

    required: true,
  },
  {
    name: "state",
    label: "State/Region/County",
    type: "text",
    required: true,
  },
];
const backgroundDetails = [
  {
    name: "visa_status",
    label: "Do you already have a visa?",
    type: "select",
    required: true,
    options: ["Yes", "No"],
  },
  {
    name: "tests",
    label: "Have you taken any tests (you can type multiple)",
    placeholder: "e.g GRE, GMAT, Duolingo, etc.",
    type: "text",
    required: true,
  },
  {
    name: "studied_in_usa",
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
    name: "employment",
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
    name: "work_years",
    label: "Years of work experience",
    type: "number",
    required: true,
  },
  {
    name: "work_years_usa",
    label: "Years of work experience in the USA",
    type: "number",
    required: true,
  },
];
const employmentDetails = [
  {
    name: "recent_job",
    label: "Recent job occupation",
    type: "text",
    required: true,
  },
  {
    name: "recent_employer",
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
    name: "recent_job_duration",
    label: "Length of employment",
    type: "text",
    required: true,
  },
  {
    name: "recent_job_type",
    label: "Type of employment",
    type: "select",
    required: true,
    options: ["Full-time", "Part-time"],
  },
  {
    name: "future_offer",
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
    name: "annual_income",
    label: "Annual income (USD)",
    type: "number",
    required: true,
  },
  {
    name: "sponsorship",
    label: "Do you have any sponsorship funding? (USD)",
    type: "number",
    required: true,
  },
];

const documents = [
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
