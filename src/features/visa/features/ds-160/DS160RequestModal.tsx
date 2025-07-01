import { FormEvent } from "react";
import InputField from "../../../../components/inputs/InputField";
import Modal from "../../../../components/Modal";
import { ModalProps } from "../../../../types";
import useVisa from "../../services/hooks/useVisa";
import Select from "../../../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { errorMsg } from "../../../../components/errors/errorMsg";
import SelectCountry from "../../../../components/inputs/SelectCountry";
import axios from "axios";

function DS160RequestModal({ open, toggleModal }: ModalProps) {
  const { status, schools, user, inValidateStatus } = useVisa();
  // console.log(status, "status");
  const countries = status?.value?.countries?.sort((a: any, b: any) => {
    if (a?.name < b?.name) return -1;
    if (a?.name > b?.name) return 1;
    return 0;
  });

  const requestReview = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const schoolName = formData.get("school-name");
    const surname = formData.get("surname");
    const course = schools?.find(
      (item: any) => item?.school_name === schoolName
    )?.program_name;

    if (course) formData.set("course", course);
    formData.append("fullnames", user?.fullnames || "");
    if (typeof surname !== "string" || surname.length > 5)
      return toast.error("Surname must be less than 5 characters");

    ds160RequestReview.mutate(formData);
  };

  const ds160RequestReview = useMutation({
    mutationFn: async (data: any) => visaEndpoints.ds160RequestReview(data),
    onSuccess: (response) => {
      toast.success(response?.data.message);
      inValidateStatus();
      toggleModal();
    },
    onError: (error) => toast.error(errorMsg(error)),
  });
  return (
    <Modal open={open} setOpen={toggleModal} title="DS-160 Request for Review">
      <form
        onSubmit={requestReview}
        className="w-[98vw] md:w-[80vw] xl:w-[70vw] overflow-y-auto h-[80vh] sm:p-3 p-1 col gap-3"
      >
        <p>
          The following information is required to request your DS-160
          application review
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
          {formInputs?.map((input) => {
            if (input?.type === "select") {
              return (
                <Select
                  key={input?.name}
                  placeholder={input?.inputLabel}
                  title={input?.inputLabel}
                  {...input}
                >
                  {input?.name === "visa_interview_country"
                    ? countries?.map((country: any) => (
                        <MenuItem key={country?.name} value={country?.name}>
                          {country?.name}
                        </MenuItem>
                      ))
                    : input?.name === "school-name"
                    ? schools?.map((school: any) => (
                        <MenuItem
                          key={school?.school_name}
                          value={school?.school_name}
                        >
                          {school?.school_name + " - " + school?.program_name}
                        </MenuItem>
                      ))
                    : input?.options?.map((option) => (
                        <MenuItem key={option?.value} value={option?.value}>
                          {option?.label}
                        </MenuItem>
                      ))}
                </Select>
              );
            }
            if (input?.type === "country") {
              return (
                <SelectCountry
                  key={input?.name}
                  placeholder={input?.inputLabel}
                  title={input?.inputLabel}
                  {...input}
                />
              );
            }
            return (
              <InputField
                label={input.inputLabel}
                key={input?.name}
                {...input}
              />
            );
          })}
        </div>
        <FormFooterBtns
          onClose={toggleModal}
          btnText={ds160RequestReview.isPending ? "Submiting..." : "Submit"}
        />
      </form>
    </Modal>
  );
}

export default DS160RequestModal;

// const testData = {
//   "application-id": "ssss",
//   "birth-year": "21323",
//   current_country: "Australia",
//   surname: "John",
//   "security-answer": "12ewads",
//   "school-name": "Grand Valley State University (GVSU)",
//   "reporting-date": "2025-07-16",
//   "denied-before": "no",
//   "approved-before": "yes",
//   intake: "fall",
//   year: "2025",
//   "with-family": "Single",
//   financial: "Loan",
//   visa_attempt: "Subsequent",
//   visa_interview_country: "Gambia",
//   course: "MS Applied Statistics",
//   fullnames: "Test Four",
// };

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
    type: "country",
    name: "current_country",
    inputLabel: "Which country are you based currently",
    required: true,
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
    options: [],
  },
  {
    type: "date",
    name: "reporting-date",
    inputLabel: "Earliest School Reporting Date (As per I-20)",
    required: true,
  },
  // {
  //   type: "text",
  //   name: "course",
  //   inputLabel: "Select a Course",
  //   placeholder: "Enter Course Name",
  //   required: true,
  // },
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
    name: "financial",
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
  {
    type: "select",
    name: "visa_interview_country",
    inputLabel: "Select country for the visa interview",
    required: true,
    options: [],
  },
];
