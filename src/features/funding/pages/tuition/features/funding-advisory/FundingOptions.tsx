import Select from "../../../../../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import { fundingOptions } from "../../../../../../utils/constants";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ContentComponent from "../../../../../../components/ContentComponent";
import PickFileButton from "../../../../../../components/buttons/PickFileButton";
import RadioBtns from "../../../../../../components/inputs/RadioBtns";

function FundingOptions() {
  const [fundingOption, setFundingOption] = useState<any>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit.mutate();
  };
  const handleSubmit = useMutation({});
  return (
    <div className="col gap-2">
      <p>
        Meeting attended successfully. The next step is to confirm your sources
        of your funding
      </p>
      {/* <div className="alert m-2">
        <span>
          Please note that the source of funding that you will be using to
          request the I-20 from the school will be the same that you will use to
          process your VISA at the embassy.
        </span>
      </div> */}
      <h3 className="title-sm pt-3">Confirm source of funding</h3>

      <form onSubmit={onSubmit} className="col card gap-2 p-3">
        <div className="form-group px-2">
          <em className="mb-3">
            Apart from a student loan, do you wish to use other sources of
            funding to request your I-20 from the school and also support your
            VISA process at the embassy?
          </em>
          <RadioBtns
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            title="Do you have any other funding sources?"
            onChange={(e) => setFundingOption(e.target.value)}
            row
          />
        </div>

        {fundingOption === "yes" && (
          <div className="col py-3">
            <p className="text-primary-light">
              Please provide details of your funding source
            </p>
            <div className="col gap-3 p-2">
              <div className="form-group">
                <label>Select Funding Source</label>
                <Select variant="standard">
                  {fundingOptions
                    .filter((option) => option.value !== "Loan")
                    .map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </Select>
              </div>

              <div className="form-group">
                <label htmlFor="">Upload bank statement for approval</label>
                <PickFileButton name="statement" required />
              </div>

              <div className="form-group">
                <label>
                  Do you wish to use a student loan later to fund your studies
                  or will you be using personal funds
                </label>
                <Select variant="standard" placeholder="">
                  <MenuItem value="Yes">Loan Later</MenuItem>
                  <MenuItem value="No">Personal Funds</MenuItem>
                </Select>
              </div>
            </div>
          </div>
        )}
        <PrimaryBtn
          disabled={!fundingOption}
          className="self-end"
          type="submit"
        >
          {handleSubmit.isPending ? "Processing..." : "Proceed"}
        </PrimaryBtn>
      </form>
    </div>
  );
}

export default FundingOptions;
