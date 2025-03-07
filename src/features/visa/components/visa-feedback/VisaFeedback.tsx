import Select from "../../../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import SampleTranscript from "../SampleTranscript";
import InputField, {
  InputsWithLabel,
} from "../../../../components/inputs/InputField";
import { useMutation, useQuery } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import RadioBtns from "../../../../components/inputs/RadioBtns";
import { counties, getCountries } from "../../../../utils/constants";
import { useEffect, useState } from "react";
import useVisa from "../../services/hooks/useVisa";
import AutoComplete from "../../../../components/inputs/AutoComplete";

function VisaFeedback() {
  const { ds160Review } = useVisa();
  const [isKenyan, setIsKenyan] = useState<any>(null);
  const [outcome, setOutcome] = useState<any>("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("school", ds160Review?.school_name);
    formData.append("course", ds160Review?.course);
    handleSendFeedback.mutate(formData);
  };
  const handleSendFeedback = useMutation({
    mutationFn: visaEndpoints.postFeedback,
    onSuccess: () => {
      toast.success("Feedback sent successfully.");
    },
  });
  const {data : countries} = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  useEffect(() => {
    console.log(countries);
  }, [outcome]);

  return (
    <div>
      <h3 className="title-sm">VISA interview outcome</h3>
      <section className="card col p-1 sm:p-3">
        <p>
          According to our records, you had a visa interview on 2025-03-05.
          Please provide your Visa interview feedback below so as to proceed to
          the next steps.
        </p>
        <form onSubmit={onSubmit} className="col gap-3 p-3">
          <Select
            name="outcome"
            placeholder="What was your VISA outcome"
            onChange={(e) => setOutcome(e.target.value)}
            required
          >
            <MenuItem value="1">Got VISA</MenuItem>
            <MenuItem value="2">Denied VISA</MenuItem>
            <MenuItem value="3">Under Administrative Processing</MenuItem>
          </Select>

          {outcome && outcome !== "2" && (
            <RadioBtns
              title="Have you paid your SEVIS fee"
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              name="paidSevis"
              row
            />
          )}

          <div className="form-group">
            <SampleTranscript />
            <label htmlFor="">
              Please type your visa interview transcript below
            </label>
            <InputField multiline rows={5} name="transcript" required />
          </div>

          <RadioBtns
            title="Are you from kenya"
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
            name="isKenyan"
            row
            onChange={(e) => setIsKenyan(e.target.value)}
          />

          {isKenyan && (
            <div>
              <label>Select {isKenyan ? "County" : "Country"}</label>
              <AutoComplete
                options={isKenyan ? counties : countries}
                getOptionLabel={(option) => option.label}
                // handleSelect={() => {}}
                isLoading={false}
                name="school"
                // label="Select County"
                variant="outlined"
              />
            </div>
          )}
          <button type="submit" className="primary-btn self-end">
            {handleSendFeedback.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default VisaFeedback;
