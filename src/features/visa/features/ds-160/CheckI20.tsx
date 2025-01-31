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
import { Link } from "react-router-dom";
import DS160RequestModal from "./DS160RequestModal";
import visaEndpoints from "../../services/visaEndpoints";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CheckI20 = () => {
  const [open, setOpen] = useState(false);
  const [hasI20, setHasI20] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { applicationVideo, stage, setStage } = useVisa();

  const toggleModal = () => setOpen(!open);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setHasI20(event.target.value);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    requestAccess.mutate({
      file,
    });
  };
  const requestAccess = useMutation({
    mutationFn: async (data: any) => {
      return await visaEndpoints.test();
    },
    onSuccess: (data) => {
      setStage(1);
      toast.success("Request sent successfully", {
        autoClose: 5000,
      });
    },
    onError: (error: any) => {
      toast.error(error.response.message);
    },
  });

  return (
    <div>
      {stage === 0 && (
        <section className="py-9">
          <p className="">
            Before we begin, do you have your{" "}
            <span className="font-bold">I-20</span>? It’s required to proceed
            with your visa application.
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
                  Upload
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
      )}
      {stage === 1 && (
        <section className="col card my-5 gap-4 p-3">
          <p>
            Your request to access the DS-160 instruction resource is pending
            approval. Please allow some time for the review process to be
            completed.
          </p>
          <p>
            If you need urgent assistance or have any questions, feel free to
            reach out to our support team.
          </p>
          <p>Thank you for your patience and understanding.</p>
          <div className="row justify-end">
            <Link
              onClick={() => setStage(2)}
              // to="/create-ticket"
              to="/visa-processing"
              className="primary-btn"
            >
              Create Ticket
            </Link>
          </div>
        </section>
      )}
      {stage === 2 && (
        <section className="col my-5 gap-4">
          <p>
            Your request to access DS-160 instruction resource has been approved
          </p>
          <div className="card col p-4 gap-3">
            <span className="text-sm">
              Please watch the video below to understand how to fill your DS-160
            </span>
            <iframe
              width="100%"
              className="aspect-video"
              src={applicationVideo?.det_link}
              title={applicationVideo?.det_desc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <footer className="row justify-end gap-3">
            <Link
              to="https://ceac.state.gov/genniv/"
              target="_blank"
              className="text-btn"
            >
              Complete your DS-160
            </Link>
            <button onClick={toggleModal} className="primary-btn">
              Request Review
            </button>
            <DS160RequestModal open={open} toggleModal={toggleModal} />
          </footer>
        </section>
      )}
    </div>
  );
};

export default CheckI20;
