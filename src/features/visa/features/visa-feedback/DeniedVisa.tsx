import { useState } from "react";
import ContentComponent from "../../../../components/ContentComponent";
import Select from "../../../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import useVisa from "../../services/hooks/useVisa";

const options = [
  { value: "school-application", label: "School application" },
  { value: "i-20", label: "Submit I-20" },
  { value: "ds-160", label: "DS-160" },
  {
    value: "visa-appointment",
    label: "Visa Appointment Booking",
  },
];

const DeniedVisa = () => {
  const { inValidateStatus } = useVisa();
  const [action, setAction] = useState<any>();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
    <ContentComponent
      className="py-2"
      header="Your feedback has been processed."
    >
      <p>
        We regret to note that your visa was denied! You live to fight another
        day. To proceed with the next steps, please follow the below
        instructions.
      </p>
      <ol className="list-decimal my-2 sm:px-5 px-2">
        <li>
          To kickstart a new school application process, please go to the school
          application module by clicking on the relevant button below.
        </li>
        <li>To submit a new I-20, please select the ‘Submit I-20’ option.</li>
        <li> To submit a new DS 160, please select ‘DS 160’ option.</li>
        <li>
          To get instructions about visa appointment booking, please select
          ‘Visa Appointment Booking’ option.
        </li>
      </ol>

      <form onSubmit={onSubmit} className="col gap-2 p-2 pt-4">
        <Select
          placeholder="Select action"
          label="Select action"
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
          {handleSubmit.isPending ? "Submitting..." : "Submit"}
        </PrimaryBtn>
      </form>
    </ContentComponent>
  );
};
export default DeniedVisa;
