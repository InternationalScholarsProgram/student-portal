const applicantDetails = [
  {
    name: "email",
    label: "Email address",
    type: "text",
    required: true,
    placeholder: "jane.doe@example.com",
  },
  {
    name: "first_name",
    label: "First name",
    type: "text",
    required: true,
  },
  {
    name: "last_name",
    label: "Last name",
    type: "text",
    required: true,
  },
  { name: "dob", label: "Date of birth", type: "date", required: true },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: ["Male", "Female", "Other", "Prefer not to say"],
  },
  {
    name: "home_country",
    label: "Home country",
    type: "country",
    required: true,
  },
  {
    name: "remark",
    label: "Remarks (optional)",
    type: "textarea",
    required: false,
    placeholder: "Anything you'd like us to know…",
  },
];

const academicEmployment = [
  {
    name: "highest_undergrad",
    label: "Highest undergraduate degree (JSON)",
    type: "textarea",
    required: false,
    placeholder:
      `e.g. {"degree":"BSc Computer Science","gpa":3.6,"university":"X University"}`,
    hint: "Must be valid JSON",
  },
  {
    name: "employment_dates",
    label: "Employment dates (JSON)",
    type: "textarea",
    required: false,
    placeholder:
      `e.g. [{"company":"Acme","from":"2021-01-01","to":"2023-06-30"}]`,
    hint: "Must be valid JSON",
  },
];

const testsAndBackground = [
  {
    name: "tests_taken",
    label: "Tests taken (JSON)",
    type: "textarea",
    required: false,
    placeholder: `e.g. {"GRE":{"score":320},"Duolingo":{"score":130}}`,
    hint: "Must be valid JSON",
  },
  {
    name: "post_grad_job_offer",
    label: "Do you have a post-graduation job offer?",
    type: "select",
    required: true,
    options: ["true", "false"], // backend expects boolean-ish
  },
  {
    name: "ever_declared_bankrupt",
    label: "Have you ever been declared bankrupt?",
    type: "select",
    required: true,
    options: ["true", "false"],
  },
  {
    name: "have_criminal_record",
    label: "Do you have a criminal record?",
    type: "select",
    required: true,
    options: ["true", "false"],
  },
  {
    name: "ever_defaulted",
    label: "Have you ever defaulted on a loan?",
    type: "select",
    required: true,
    options: ["true", "false"],
  },
];

const locationAndStudy = [
  {
    name: "countries_lived",
    label: "Countries lived in (JSON)",
    type: "textarea",
    required: false,
    placeholder: `e.g. ["KE","US"]`,
    hint: "Must be valid JSON",
  },
  {
    name: "institution_of_study",
    label: "Institution of study (JSON)",
    type: "textarea",
    required: false,
    placeholder: `e.g. {"name":"University of X","program":"MS CS"}`,
    hint: "Must be valid JSON",
  },
  {
    name: "address",
    label: "Residential address (JSON)",
    type: "textarea",
    required: false,
    placeholder: `e.g. {"line1":"123 Rd","city":"Nairobi","country":"KE"}`,
    hint: "Must be valid JSON",
  },
];

const finances = [
  {
    name: "assets_declaration",
    label: "Assets declaration (JSON)",
    type: "textarea",
    required: false,
    placeholder: `e.g. {"cash":5000,"investments":2500}`,
    hint: "Must be valid JSON",
  },
  {
    name: "outstanding_cc_debt",
    label: "Outstanding credit/loan debts (JSON)",
    type: "textarea",
    required: false,
    placeholder: `e.g. [{"lender":"Bank A","amount":1200}]`,
    hint: "Must be valid JSON",
  },
  {
    name: "other_funding",
    label: "Other funding?",
    type: "select",
    required: true,
    options: ["Yes", "No"], // backend expects 'Yes'|'No'
  },
  {
    name: "other_funding_amount",
    label: "Other funding amount (USD)",
    type: "number",
    required: false,
    placeholder: "Enter amount only if 'Other funding' is Yes",
  },
];

const budgets = [
  {
    name: "first_year_budget",
    label: "First year budget (JSON)",
    type: "textarea",
    required: false,
    placeholder: `e.g. {"tuition":15000,"living":12000}`,
    hint: "Must be valid JSON",
  },
  {
    name: "rest_course_budget",
    label: "Budget for remaining course (JSON)",
    type: "textarea",
    required: false,
    placeholder: `e.g. {"year2":12000,"year3":11000}`,
    hint: "Must be valid JSON",
  },
];

const prodigyFormFields = {
  applicantDetails: { label: "Applicant Details", fields: applicantDetails },
  locationAndStudy: { label: "Location & Study", fields: locationAndStudy },
  academicEmployment: {
    label: "Academic & Employment",
    fields: academicEmployment,
  },
  testsAndBackground: {
    label: "Tests & Background",
    fields: testsAndBackground,
  },
  finances: { label: "Financials & Funding", fields: finances },
  budgets: { label: "Budgets", fields: budgets },
};

export default prodigyFormFields;
