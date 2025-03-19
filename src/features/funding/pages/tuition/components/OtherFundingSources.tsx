import Select from "../../../../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import PrimaryBtn from "../../../../../components/buttons/PrimaryBtn";
import { fundingOptions } from "../../../../../utils/constants";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import PickFileButton from "../../../../../components/buttons/PickFileButton";
import RadioBtns from "../../../../../components/inputs/RadioBtns";
import tuitionEndpoints from "../services/tuitionEndpoints";
import axios from "axios";

function OtherFundingSources() {
  const [anyOther, setAnyOther] = useState<"" | "yes" | "no">("");
  const [fundingSource, setFundingSource] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (anyOther === "no") formData.append("visa_support", "loan");
    console.log(axios.formToJSON(formData));
    // handleSubmit.mutate(formData);
  };
  const handleSubmit = useMutation({
    mutationFn: tuitionEndpoints.uploadFundingOptions,
  });
  return (
    <div className="col gap-2">
      <p>
        Meeting attended successfully. The next step is to confirm sources of
        your funding
      </p>

      <h3 className="title-sm pt-3">Confirm source of funding</h3>

      <form onSubmit={onSubmit} className="col card gap-2 p-3">
        <div className="form-group px-2">
          <em className="mb-3">
            Apart from student loan, do you wish to use other sources of funding
            to request your I-20 from the school and also support your VISA
            process at the embassy?
          </em>
          <RadioBtns
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            title="Do you have any other funding sources?"
            onChange={(e) => {
              if (e.target.value === "no") setAnyOther("no");
              if (e.target.value === "yes") setAnyOther("yes");
            }}
            row
          />
        </div>

        {anyOther === "yes" && (
          <div className="col py-3">
            <p className="text-primary-light">
              Please provide details of your funding source
            </p>
            <div className="col gap-3 p-2">
              <div className="form-group">
                <label>Select Funding Source</label>
                <Select
                  variant="standard"
                  onChange={(e) => setFundingSource(e.target.value)}
                  required
                >
                  {fundingOptions
                    .filter((option) => option.value !== "loan")
                    .map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </Select>
              </div>
              {fundingSource && (
                <>
                  <div className="form-group">
                    <label htmlFor="support_doc">
                      Upload{" "}
                      {fundingSource === "statement"
                        ? "bank statement"
                        : "scholarship letter"}{" "}
                      for approval
                    </label>
                    <PickFileButton
                      setFiles={setFile}
                      name="support_doc"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Do you wish to use a student loan later to fund your
                      studies or will you be using personal funds
                    </label>
                    <Select
                      variant="standard"
                      placeholder=""
                      name="loan_later"
                      required
                    >
                      <MenuItem value="Yes">Loan Later</MenuItem>
                      <MenuItem value="No">Personal Funds</MenuItem>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <PrimaryBtn
          disabled={!anyOther || (anyOther === "yes" && !file)}
          className="self-end"
          type="submit"
        >
          {handleSubmit.isPending ? "Processing..." : "Proceed"}
        </PrimaryBtn>
      </form>
    </div>
  );
}

export default OtherFundingSources;
