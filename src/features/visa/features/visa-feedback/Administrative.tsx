import { useState } from "react";
import ContentComponent from "../../../../components/ContentComponent";
import RadioBtns from "../../../../components/inputs/RadioBtns";
import Select from "../../../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import useVisa from "../../services/hooks/useVisa";
import { errorMsg } from "../../../../components/errors/errorMsg";

const minLength = 100;

function Administrative() {
  const { visa, inValidateStatus } = useVisa();
  const [processed, setProcessed] = useState(false);
  const [comment, setComment] = useState("");
  const [outcome, setOutcome] = useState<any>();

  const handleSubmit = useMutation({
    mutationFn: visaEndpoints.postFeedbackComments,
    onSuccess: (response) => {
      if (response.status !== 200) return;
      toast.success(response.data.message);
      inValidateStatus();
    },
    onError: (error: any) => toast.error(errorMsg(error)),
  });

  return (
    <ContentComponent header="Visa Feedback">
      <p>
        After your visa interview, please share your feedback with us. Your
        insights help us improve the process and guide future applicants.
      </p>
      <div className="h-2"></div>
      <RadioBtns
        className="px-4"
        title="Has your visa application been processed by the embassy?"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        onChange={(e) => setProcessed(e.target.value === "yes")}
        row
      />
      {processed && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            formData.append("visa_id", visa?.stu_id.toString());
            handleSubmit.mutate(formData);
          }}
          className="col gap-2"
        >
          <div className="col">
            <label htmlFor="outcome">
              What was the result of your visa application?
            </label>
            <Select
              name="outcome"
              variant="outlined"
              onChange={(e) => setOutcome(e.target.value)}
              required
            >
              <MenuItem value={1}>Approved (Got Visa)</MenuItem>
              <MenuItem value={2}>Denied (Visa Rejected)</MenuItem>
            </Select>
          </div>

          {outcome === 1 && (
            <InputsWithLabel
              inputLabel="Upload your visa"
              type="file"
              name="visa_doc"
            />
          )}

          <InputsWithLabel
            inputLabel="Enter any comments or reasons provided by the embassy regarding your visa decision."
            name="comments"
            multiline
            rows={5}
            required
            onChange={(e) => setComment(e.target.value)}
            error={comment.length > 0 && comment.length < minLength}
            helperText={
              comment.length < minLength
                ? `Must be at least ${minLength} characters`
                : ""
            }
          />
          <PrimaryBtn className="self-end">
            {handleSubmit.isPending ? "Submitting..." : "Submit Feedback"}
          </PrimaryBtn>
        </form>
      )}
    </ContentComponent>
  );
}

export default Administrative;
