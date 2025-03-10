import { useState } from "react";
import PrimaryBtn from "../../../components/buttons/PrimaryBtn";
import Instructions from "../components/Instructions";
import { MenuItem, Select } from "@mui/material";
import { InputsWithLabel } from "../../../components/inputs/InputField";
import useTickets from "../hooks/useTickets";

interface FormData {
  category: string;
  issue: string;
  phone: string;
  screenshot: File | null;
}

function CreateTicket() {
  const { createTicket } = useTickets();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [focused, setFocused] = useState(false);
  const minChar = focused && formData?.issue?.length < 10 ? true : false;

  const handleChange = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({
      ...prev,
      screenshot: e.target.files?.[0] || null,
    }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTicket.mutate(formData);
  };
  const resetForm = () => {
    setFocused(false);
    setFormData(defaultFormData);
  };

  return (
    <main>
      <Instructions />
      <p className="my-5 opacity-65">Please fill out the form below </p>
      <section className=" m-2 my-3 col-center">
        <form
          className="card w-full p-4 lg:w-3/4 col gap-6"
          onSubmit={onSubmit}
        >
          <p className="text-center">Ticket Details</p>
          <FormSelect
            label="Select the category of your issue? *"
            value={formData.category}
            options={issueOptions}
            onChange={(e) => handleChange("category", e.target.value)}
          />
          <InputsWithLabel
            inputLabel="Describe the issue you are facing *"
            type="text"
            error={minChar}
            helperText={minChar && "At least 10 characters"}
            value={formData.issue}
            onFocus={() => setFocused(true)}
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
            <button type="button" className="text-btn" onClick={resetForm}>
              Cancel
            </button>
            <PrimaryBtn className="px-5" type="submit">
              Create Ticket
            </PrimaryBtn>
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

const defaultFormData: FormData = {
  category: "",
  issue: "",
  phone: "",
  screenshot: null,
};
