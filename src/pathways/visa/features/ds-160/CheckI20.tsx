import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import PickFileButton from "../../../../components/buttons/PickFileButton";
import useVisa from "../../services/hooks/useVisa";
import visaEndpoints from "../../services/visaEndpoints";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CheckI20 = () => {
  const [hasI20, setHasI20] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { inValidateStatus } = useVisa();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setHasI20(event.target.value);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    requestAccess.mutate({ file });
  };
  const requestAccess = useMutation({
    mutationFn: visaEndpoints.requestDs160TrainingResources,
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success("Request sent successfully");
        inValidateStatus();
        return;
      }
      toast.error(response.data?.message);
    },
    onError: (error: any) => {
      toast.error(error.response.message);
    },
  });

  return (
    <div>
      <section className="py-2">
        <p className="">
          You must upload your I-20 to proceed with your visa application.
        </p>

        <FormControl sx={{ margin: 3 }}>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Do you have your I-20?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={hasI20}
            onChange={handleChange}
            className="px-3"
          >
            <FormControlLabel
              value="Yes"
              control={<Radio color="secondary" />}
              label="Yes"
            />
            <FormControlLabel
              value="No"
              control={<Radio color="error" />}
              label="No"
            />
          </RadioGroup>
        </FormControl>

        {/* Conditional Messages Based on Selection */}
        {hasI20 === "Yes" && (
          <div className="card col p-4 rounded-lg">
            <p>
              🎉 Great! You can now request access the
              <strong className="px-2">DS-160 instructions resource</strong>
              to proceed with your visa application.
            </p>
            <form onSubmit={onSubmit} className="col py-3 px-7 gap-2">
              <label className="opacity-75">
                Please upload a copy of your I-20:
              </label>
              <PickFileButton text="Choose file" setFiles={setFile} />
              <button type="submit" className="primary-btn self-end">
                {requestAccess.isPending ? "Uploading..." : "Upload"}
              </button>
            </form>
          </div>
        )}
        {hasI20 === "No" && (
          <div className="mt-4 p-4 border border-error-main/50 bg-error-main/10 rounded-lg opacity-90">
            ⚠️ You must have your <strong>I-20</strong> to continue. Please
            contact your school to obtain it before proceeding.
          </div>
        )}
      </section>
    </div>
  );
};

export default CheckI20;
