import { FormEvent, useEffect, useState } from "react";
import { InputsWithLabel } from "../../../components/inputs/InputField";
import Modal from "../../../components/Modal";
import { ModalProps } from "../../../types";
import useVisa from "../services/hooks/useVisa";
import Select from "../../../components/inputs/Select";
import { MenuItem } from "@mui/material";

function DS160RequestModal({ open, toggleModal }: ModalProps) {
  const { schools } = useVisa();
  const [inputs, setInputs] = useState(formInputs);

  //   useEffect(() => {
  //     if (!schools) return;
  //     const _formInputs = formInputs(schools);
  //     setInputs(_formInputs);
  //   }, []);

  const requestReview = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // Convert formData into an object and log it
    const formDataObj: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
      console.log(key, value);
    });

    console.log(formDataObj);
  };
  return (
    <Modal open={open} setOpen={toggleModal} title="DS-160 Request for Review">
      <div className="p-2">
        <p>
          The following information is required to request your DS-160
          application review
        </p>
        <form
          onSubmit={requestReview}
          className="w-[98vw] md:w-[80vw] xl:w-[70vw] overflow-y-auto h-[80vh] p-3 gap-3 col"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            {formInputs?.map((input) => {
              if (input?.type === "select")
                return (
                  <Select
                    key={input?.name}
                    placeholder={input?.inputLabel}
                    {...input}
                  >
                    {input?.options?.map((option) => (
                      <MenuItem value={option?.value}>{option?.label}</MenuItem>
                    ))}
                  </Select>
                );
              return <InputsWithLabel key={input?.name} {...input} />;
            })}
          </div>
          <div className="row justify-end gap-2">
            <button className="text-btn" onClick={toggleModal}>
              Close
            </button>
            <button className="primary-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default DS160RequestModal;

const formInputs = [
  {
    type: "text",
    name: "application-id",
    inputLabel: "DS-160 Application ID",
    placeholder: "Enter DS-160 Application ID",
    required: true,
  },
  {
    type: "number",
    name: "birth-year",
    inputLabel: "Year of Birth",
    placeholder: "Enter Birth Year",
    required: true,
    min: 1950,
    max: new Date().getFullYear() - 18,
  },
  {
    type: "text",
    name: "surname",
    inputLabel: "First 5 surname letters",
    placeholder: "Enter First 5 Letters of Surname",
    required: true,
    maxLength: 5,
  },
  {
    type: "text",
    name: "security-answer",
    inputLabel: "DS-160 ANSWER to the Security Question",
    placeholder: "Enter Answer",
    required: true,
  },
  {
    type: "select",
    name: "school-name",
    inputLabel: "School Name",
    placeholder: "Select or Enter School Name",
    required: true,
    // options: schoolsList,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    type: "date",
    name: "reporting-date",
    inputLabel: "Earliest School Reporting Date (As per I-20)",
    required: true,
  },
  {
    type: "text",
    name: "course",
    inputLabel: "Select a Course",
    placeholder: "Enter Course Name",
    required: true,
  },
  {
    type: "select",
    name: "denied-before",
    inputLabel: "Have you been denied US visa before?",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    type: "select",
    name: "approved-before",
    inputLabel: "Have you been approved US Visa before?",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    type: "select",
    name: "intake",
    inputLabel: "Select Intake",
    required: true,
    options: [
      { value: "spring", label: "Spring" },
      { value: "fall", label: "Fall" },
    ],
  },
  {
    type: "select",
    name: "year",
    inputLabel: "Select Year",
    required: true,
    options: [
      { value: new Date().getFullYear(), label: new Date().getFullYear() },
      {
        value: new Date().getFullYear() + 1,
        label: new Date().getFullYear() + 1,
      },
    ],
  },
  {
    type: "select",
    name: "with-family",
    inputLabel: "Do you plan to travel with your family?",
    required: true,
    options: [
      { value: "Family", label: "Yes" },
      { value: "Single", label: "No" },
    ],
  },
  {
    type: "select",
    name: "Financial",
    inputLabel: "Proof of Finances",
    required: true,
    options: [
      { value: "Statement", label: "Bank Statement" },
      { value: "Loan", label: "Student Loan" },
      { value: "Scholarship", label: "Scholarship or GA" },
    ],
  },
  {
    type: "select",
    name: "visa_attempt",
    inputLabel: "Select Visa Attempt",
    required: true,
    options: [
      { value: "First", label: "First Time" },
      { value: "Subsequent", label: "Subsequent" },
    ],
  },
];
