import { useState } from "react";
import ContentComponent from "../../../../components/ContentComponent";
import Select from "../../../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import useVisa from "../../services/hooks/useVisa";
import { useNavigate } from "react-router";

const options = [
  { value: "school-application", label: "School application" },
  { value: "i-20", label: "Submit I-20" },
  { value: "ds-160", label: "DS-160" },
];

const DeniedVisa = () => {
  const { inValidateStatus } = useVisa();
  const [action, setAction] = useState<any>();
  const navigate = useNavigate()

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (action === "school-application") {
      navigate("/school-admission/requirements")
      return;
    }

    handleSubmit.mutate(action);
  };
  const handleSubmit = useMutation({
    mutationFn: visaEndpoints.deniedVisa,
    onSuccess: (response) => {
      if (response.status !== 200) {
        return toast.warning(response.data.message);
      }
      toast.success(response.data.message);
      inValidateStatus();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    },
  });

  return (
    <ContentComponent className="py-2" header="Visa Feedback">
      <p>
        We understand that a visa denial can be discouraging, but this is not
        the end of your journey. Many applicants successfully reapply and
        achieve their dreams. Stay motivated, and let's explore the next steps
        to help you move forward. 💪
      </p>
      <p>Follow the instructions below to continue your process:</p>

      <ol className="list-decimal my-2 sm:px-5 px-2">
        <li>
          To <b>start a new school application</b>, please visit the School
          Application module and request for a new career advisory meeting.
        </li>
        <li>To <b>submit a new I-20</b>, select the ‘Submit I-20’ option.</li>
        <li>To <b>submit a new DS-160 form</b>, select the ‘DS-160’ option.</li>
      </ol>

      <form onSubmit={onSubmit} className="col gap-2 p-2 pt-4">
        <Select
          placeholder="Choose an action"
          label="Choose an action"
          name="action"
          onChange={(e) => setAction(e.target.value)}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <PrimaryBtn disabled={!action} type="submit" className="self-end">
          {handleSubmit.isPending ? "Processing..." : "Proceed"}
        </PrimaryBtn>
      </form>
    </ContentComponent>
  );
};
export default DeniedVisa;
