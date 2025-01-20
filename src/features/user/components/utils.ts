const personalInfo = (user: any) => [
  { label: "Full Names", value: user?.fullnames },
  {
    label: "Email",
    value: user?.email,
  },

  { label: "Phone Number", value: user?.phone_no },
  {
    label: "Country",
    value: user?.country,
  },
  {
    label: "ID Number",
    value: user?.id_no,
  },
];
const highSchoolDetails = (user: any) => [
  // {
  //   label: "High School",
  //   value: user?.high_school,
  // },
  {
    label: "KCSE Mean Grade",
    value: user?.kcse_grade,
  },
  {
    label: "KCSE Points",
    value: user?.kcse_point,
  },
];
const undegraduatedDetails = (user: any) => [
  {
    label: "Country pursued undergraduate",
    value: user?.country_undergraduate,
  },
  {
    label: "University pursued undergraduate",
    value: user?.u_university,
  },
  {
    label: "Undergraduate Degree/Program",
    value: user?.degree,
  },
  {
    label: "Undergraduate GPA",
    value: user?.gpa,
  },
  {
    label: "University Grade",
    value: user?.u_grade,
  },
  {
    label: "Highest Level of Education",
    value: user?.ac_level,
  },
];
const programDetails = (user: any) => [
  {
    label: "Program Option",
    value: user?.package === "Parallel" ? "Prime" : "Regular",
  },
  {
    label: "Program University",
    value: user?.university,
  },
  // {
  //   label: "University Intake",
  //   value: user?.intake,
  // },
  { label: "Program Email", value: user?.prog_email },
];

export {
  personalInfo,
  highSchoolDetails,
  undegraduatedDetails,
  programDetails,
};
