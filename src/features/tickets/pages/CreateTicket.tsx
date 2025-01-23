import { useState } from "react";
import PrimaryBtn from "../../../components/buttons/PrimaryBtn";
import Instructions from "../components/Instructions";
import { MenuItem, Select } from "@mui/material";
import { InputsWithLabel } from "../../../components/inputs/InputField";

interface FormData {
  category: string;
  urgency: string;
  issue: string;
  phone: string;
  screenshot: File | null;
}

const issueOptions = [
  { value: "Onboarding", label: "Onboarding" },
  { value: "Account Statement", label: "Account Statement" },
  { value: "withdraw", label: "Withdrawals" },
  { value: "payment", label: "Payments" },
  { value: "Entrance Exams", label: "Entrance Exams" },
  { value: "Regular-Parallel Change", label: "Program Option Change" },
  { value: "School Application", label: "School Admissions" },
  { value: "Student Loan", label: "Funding" },
  { value: "Webmail", label: "Webmail" },
  { value: "Visa", label: "Visa processing" },
  { value: "travel", label: "Travel and Logistics" },
  { value: "Other", label: "Other" },
];

const priorityOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];
const defaultFormData: FormData = {
  category: "",
  urgency: "",
  issue: "",
  phone: "",
  screenshot: null,
};

function CreateTicket() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleChange = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, screenshot: file }));
  };

  const resetForm = () => setFormData(defaultFormData);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main>
      <Instructions />
      <section className="card m-2 my-3 col-center">
        <p className="my-2 opacity-65">Enter Ticket Details</p>
        <form className="w-full lg:w-3/4 col gap-6" onSubmit={onSubmit}>
          <FormSelect
            label="Select the category of your issue? *"
            value={formData.category}
            options={issueOptions}
            onChange={(e) => handleChange("category", e.target.value)}
          />
          <FormSelect
            label="What is the urgency of your issue? *"
            value={formData.urgency}
            options={priorityOptions}
            onChange={(e) => handleChange("urgency", e.target.value)}
          />

          <InputsWithLabel
            inputLabel="Describe the issue you are facing *"
            type="text"
            value={formData.issue}
            placeholder="Describe the issue..."
            onChange={(e) => handleChange("issue", e.target.value)}
            required
          />
          <InputsWithLabel
            type="text"
            value={formData.phone}
            inputLabel="Enter your phone number"
            placeholder="(country-code) 712345678"
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
          <InputsWithLabel
            inputLabel="Attach a screenshot if necessary"
            type="file"
            onChange={handleFileChange}
            helperText="Less than 5MB"
          />
          <div className="w-full row justify-end gap-3 mb-3">
            <button
              type="button"
              className="text-primary-light"
              onClick={resetForm}
            >
              Cancel
            </button>
            <PrimaryBtn btnstyles="w-1/3" type="submit">Create Ticket</PrimaryBtn>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateTicket;

const FormSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: any) => void;
}) => (
  <div className="col my-2">
    <label>{label}</label>
    <Select
      value={value}
      onChange={onChange}
      aria-label={`Select ${label}`}
      required
    >
      <MenuItem value="">Select Option</MenuItem>
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </div>
);
