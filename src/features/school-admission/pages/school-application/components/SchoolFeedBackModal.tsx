import { MenuItem, Select } from "@mui/material";
import Modal from "../../../../../components/Modal";
import { useState } from "react";
import useAdmissions from "../../../services/useAdmissions";
import { useMutation } from "@tanstack/react-query";
import { admissionAPIs } from "../../../services/admissionAPIs";
import InputField, {
  InputsWithLabel,
} from "../../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../../components/buttons/FormFooterBtns";

function SchoolFeedBackModal({ open, toggleModal, school }: Props) {
  const [formData, setFormData] = useState<any>({});
  const { invalidateStatus } = useAdmissions();

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("applicationid", school?.application_details.id);
    handleUpdate.mutate(formData);
  };

  const handleUpdate = useMutation({
    mutationFn: admissionAPIs.sendSchoolFeedback,
    onSuccess: invalidateStatus,
  });
  return (
    <Modal
      title="Provide School Decision feedback"
      open={open}
      setOpen={toggleModal}
    >
      <div className="p-3 col gap-3 modal">
        <h3 className="underlin text-primary-light">
          {school?.school_name} - {school?.program_name}
        </h3>
        <div className="alert p-2 mx-3">
          <p>
            Kindly provide admission feedback only if you have received any
            decision from the school. (If you have not received a decision,
            kindly don't submit).
          </p>
        </div>
        <form onSubmit={handleSubmit} className="col gap-3 p-2 w-full">
          <div className="col">
            <label>Select Response You Got</label>
            <Select
              name="response"
              variant="standard"
              value={formData?.reason || reasons[0]}
              onChange={(event) => handleChange("reason", event.target.value)}
              required
            >
              {reasons?.map((item: any) => (
                <MenuItem key={JSON.stringify(item)} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          {formData?.reason && (
            <InputsWithLabel
              inputLabel={`Upload ${
                formData?.reason === 1 ? " Offer Letter " : " Denial Letter "
              }`}
              type="file"
              required
              name="letter"
            />
          )}
          <FormFooterBtns
            onClose={toggleModal}
            disabled={!formData?.reason}
            btnText={handleUpdate.isPending ? "Submitting..." : "Submit"}
          />
        </form>
      </div>
    </Modal>
  );
}

export default SchoolFeedBackModal;
type Props = {
  open: boolean;
  toggleModal: () => void;
  school: any;
};
const reasons = [
  "",
  { label: "Accepted", value: 1 },
  { label: "Denied", value: 2 },
];
