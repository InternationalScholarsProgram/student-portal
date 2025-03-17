import Select from "../../../../../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import { fundingOptions } from "../../../../../../utils/constants";
import { InputsWithLabel } from "../../../../../../components/inputs/InputField";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ContentComponent from "../../../../../../components/ContentComponent";

function FundingOptions() {
  const [fundingOption, setFundingOption] = useState<any>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit.mutate();
  };
  const handleSubmit = useMutation({});
  return (
    <>
      <ContentComponent header="Meeting Attended">
        <div className="col gap-4">
          <div className="alert m-2">
            <span>
              Please note that the source of funding that you will be using to
              request the I-20 from the school will be the same that you will
              use to process your VISA at the embassy.
            </span>
          </div>
          <p>
            Apart from a student loan, do you wish to use other sources of
            funding to request your I-20 from the school and also support your
            VISA process at the embassy?
          </p>
          <div className="form-group">
            <Select
              placeholder="Select an option"
              onChange={(e) => setFundingOption(e.target.value)}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </div>
        </div>

        <form onSubmit={onSubmit} className="col gap-2 p-3">
          {fundingOption === "yes" && (
            <>
              <div className="form-group">
                <label>Select Funding Source</label>
                <Select variant="outlined">
                  {fundingOptions
                    .filter((option) => option.value !== "Loan")
                    .map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </Select>
              </div>
              <InputsWithLabel
                inputLabel="Upload bank statement for approval"
                type="file"
                name="statement"
              />

              <div className="form-group">
                <label>
                  Do you wish to use a student loan later to fund your studies
                  or will you be using personal funds
                </label>
                <Select variant="outlined" placeholder="">
                  <MenuItem value="Yes">Loan Later</MenuItem>
                  <MenuItem value="No">Personal Funds</MenuItem>
                </Select>
              </div>
            </>
          )}
          <PrimaryBtn
            disabled={!fundingOption}
            className="self-end"
            type="submit"
          >
            {handleSubmit.isPending ? "Processing..." : "Proceed"}
          </PrimaryBtn>
        </form>
      </ContentComponent>
    </>
  );
}

export default FundingOptions;
