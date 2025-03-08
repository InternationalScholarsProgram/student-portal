import { MenuItem, Select } from "@mui/material";
import SampleTranscript from "../../components/SampleTranscript";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import { useMutation, useQuery } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import { counties, getCountries } from "../../../../utils/constants";
import { useState } from "react";
import useVisa from "../../services/hooks/useVisa";
import AutoComplete from "../../../../components/inputs/AutoComplete";
import ContentComponent from "../../../../components/ContentComponent";

function ProvideVisaFeedback() {
  const { ds160Review, visa, user } = useVisa();
  const [isKenyan, setIsKenyan] = useState<any>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("school", ds160Review?.school_name);
    formData.append("course", ds160Review?.course);
    formData.append("name", user?.fullnames);
    formData.append("visa_id", visa?.stu_id.toString());

    handleSendFeedback.mutate(formData);
  };
  const handleSendFeedback = useMutation({
    mutationFn: visaEndpoints.postFeedback,
    onSuccess: () => {
      toast.success("Feedback sent successfully.");
    },
  });
  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  return (
    <div>
      <h3 className="title-sm">VISA interview outcome</h3>
      <section className="col gap-3 p-1 sm:p-3">
        <p>
          According to our records, you had a visa interview on 2025-03-05.
          Please provide your Visa interview feedback below so as to proceed to
          the next steps.
        </p>

        <SampleTranscript />

        <ContentComponent header="Provide your VISA outcome details">
          <form onSubmit={onSubmit} className="col gap-3">
            <div className="col">
              <label htmlFor="outcome">What was your VISA outcome</label>
              <Select name="outcome" variant="outlined" required>
                <MenuItem selected>Select Visa Outcome</MenuItem>
                <MenuItem value={1}>Got VISA</MenuItem>
                <MenuItem value={2}>Denied VISA</MenuItem>
                <MenuItem value={3}>Under Administrative Processing</MenuItem>
              </Select>
            </div>

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
                <AutoComplete
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  name="country"
                  variant="outlined"
                />
              </div>
            ) : null}

            <InputsWithLabel
              inputLabel="Please type your visa interview transcript below"
              multiline
              rows={5}
              name="feedback"
              required
            />
            <button type="submit" className="primary-btn self-end">
              {handleSendFeedback.isPending ? "Submitting..." : "Submit"}
            </button>
          </form>
        </ContentComponent>
      </section>
    </div>
  );
}

export default ProvideVisaFeedback;
