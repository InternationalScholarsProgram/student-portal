import { MenuItem, Select } from "@mui/material";
import SampleTranscript from "../../components/SampleTranscript";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import { counties } from "../../../../utils/constants";
import { useState } from "react";
import useVisa from "../../services/hooks/useVisa";
import AutoComplete from "../../../../components/inputs/AutoComplete";
import ContentComponent from "../../../../components/ContentComponent";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import { formatDateAndTime } from "../../../../utils/utils";
import SelectCountry from "../../../../components/inputs/SelectCountry";
import { errorMsg } from "../../../../components/errors/errorMsg";
const minLength = 200;

function ProvideVisaFeedback() {
  const { ds160Review, visa, user, inValidateStatus } = useVisa();
  const [isKenyan, setIsKenyan] = useState<any>("");
  const [feedback, setFeedback] = useState("");
  const [outcome, setOutcome] = useState<any>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("school", ds160Review?.school_name);
    formData.append("course", ds160Review?.course);
    formData.append("fullnames", user?.fullnames || "");
    formData.append("visa_id", visa?.stu_id.toString());

    handleSendFeedback.mutate(formData);
  };

  const handleSendFeedback = useMutation({
    mutationFn: visaEndpoints.postFeedback,
    onSuccess: (response) => {
      if (response.status !== 200) return;
      toast.success("Feedback sent successfully.");
      inValidateStatus();
    },
    onError: (error: any) => toast.error(errorMsg(error)),
  });

  return (
    <div>
      <h3 className="title-sm">VISA interview feedback</h3>
      <section className="col gap-3 p-1 sm:p-3">
        <p>
          According to our records, you had a visa interview on{" "}
          {formatDateAndTime(visa?.interviewDateAndTime)}. Please provide your
          Visa interview feedback below so as to proceed to the next steps.
        </p>

        <SampleTranscript />

        <ContentComponent header="Provide your VISA outcome details">
          <form onSubmit={onSubmit} className="col gap-3">
            <div className="col">
              <label htmlFor="outcome">What was your VISA outcome</label>
              <Select
                name="outcome"
                variant="outlined"
                required
                onChange={(e) => setOutcome(e.target.value)}
              >
                <MenuItem selected>Select Visa Outcome</MenuItem>
                <MenuItem value={1}>Got VISA</MenuItem>
                <MenuItem value={2}>Denied VISA</MenuItem>
                <MenuItem value={3}>Under Administrative Processing</MenuItem>
              </Select>
            </div>
            {outcome === 1 && (
              <InputsWithLabel
                inputLabel="Upload your visa"
                type="file"
                name="visa_doc"
              />
            )}

            <div className="col">
              <label htmlFor="isKenyan">Are you from kenya</label>
              <Select
                name="isKenyan"
                onChange={(e) => setIsKenyan(e.target.value)}
                required
              >
                <MenuItem selected>Select</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </div>

            {isKenyan === "yes" ? (
              <div>
                <label>Select County</label>
                <AutoComplete
                  options={counties}
                  getOptionLabel={(option) => option.label}
                  name="county"
                  variant="outlined"
                />
              </div>
            ) : null}
            {isKenyan === "no" ? (
              <div>
                <label>Select Country</label>
                <SelectCountry name="country" variant="outlined" required />
              </div>
            ) : null}

            <InputsWithLabel
              name="feedback"
              inputLabel="Please type your visa interview transcript below"
              multiline
              rows={5}
              onChange={(e) => setFeedback(e.target.value)}
              error={feedback.length > 0 && feedback.length < minLength}
              helperText={
                feedback.length < minLength
                  ? `Must be at least ${minLength} characters`
                  : ""
              }
              required
            />

            <PrimaryBtn
              disabled={feedback.length < minLength}
              type="submit"
              className="self-end"
            >
              {handleSendFeedback.isPending ? "Submitting..." : "Submit"}
            </PrimaryBtn>
          </form>
        </ContentComponent>
      </section>
    </div>
  );
}

export default ProvideVisaFeedback;
