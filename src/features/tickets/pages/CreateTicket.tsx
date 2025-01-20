import { useState } from "react";
import SelectDropDown from "../../../components/autocomplete/SelectDropDown";
import PrimaryBtn from "../../../components/buttons/PrimaryBtn";
import Instructions from "../components/Instructions";
import InputField from "../../../components/InputField";

function CreateTicket() {
  const [formData, setFormData] = useState({});
  const [showInstructions, setShowInstructions] = useState(true);
  const toggleInstructions = () => setShowInstructions(!showInstructions);
  const handleChange = (key: string, value: any) =>
    setFormData({ ...formData, [key]: value });

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <main>
      {showInstructions ? (
        <Instructions toogleInstructions={toggleInstructions} />
      ) : (
        <div className="w-full px-2 col-center">
          <p className=" my-2 opacity-65">Enter Tickers Details</p>
          <form className="w-[95%] lg:w-[85%] col gap-4" onSubmit={onSubmit}>
            <div className="my-2">
              <label>Select the category of your issue?</label>
              <SelectDropDown
                options={issueOptions}
                display={(option) => (
                  <p className="px-2 py-1 cursor-pointer">{option.label}</p>
                )}
                onChange={(value) => handleChange("t_category", value.value)}
                placeholder="Select the category of your issue"
              />
            </div>
            <div className="col">
              <label>
                What is the urgency of your issue?
                <span className="text-danger">*</span>
              </label>
              <SelectDropDown
                options={priorityOptions}
                display={(option) => (
                  <p className="px-2 cursor-pointer">{option.label}</p>
                )}
                onChange={(value) => handleChange("t_urgency", value.value)}
                placeholder="Select the urgency of your issue"
              />
            </div>
            <div className="col">
              <label>
                Describe the issue you are facing{" "}
                <span className="text-danger">*</span>
              </label>
              <InputField
                className="form-control"
                onChange={(e) => handleChange("t_issue", e.target.value)}
                type="textarea"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Describe the issue you are facing....."
                required
              />
            </div>
            <div className="col">
              <label>Enter your phone number *</label>
              <InputField
                type="text"
                name="t_phone"
                onChange={(e) => handleChange("t_phone", e.target.value)}
                className="form-control"
                placeholder="(country-code)712345678"
                helperText="Use this format: (country-code)703123789"
                required
              />
            </div>
            <div className="col">
              <label>Attach a screenshot if necessary</label>
              <InputField
                type="file"
                onChange={(e) => handleChange("t_screenshot", e.target.value)}
                id="myfile"
                name="file"
                className="form-control"
                data-max-file-size="5MB"
                data-max-files="5"
              />
            </div>
            <div className="w-full my-3 row justify-end gap-3">
              <button className="text-primary-light" onClick={toggleInstructions}>Cancel</button>
              <PrimaryBtn btnstyles="self-end">Submit ticket</PrimaryBtn>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

export default CreateTicket;

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
