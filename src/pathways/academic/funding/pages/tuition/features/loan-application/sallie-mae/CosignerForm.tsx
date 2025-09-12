import { InputsWithLabel } from "../../../../../../../../components/inputs/InputField";
import Select from "../../../../../../../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import ContentComponent from "../../../../../../../../components/ContentComponent";
import { useMutation } from "@tanstack/react-query";
import tuitionEndpoints from "../../../services/tuitionEndpoints";
import { toast } from "react-toastify";
import axios from "axios";
import FormFooterBtns from "../../../../../../../../components/buttons/FormFooterBtns";
import useTuition from "../../../services/useTuition";

const CosignerForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { invalidate, activeLoanApplication } = useTuition();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("appId", activeLoanApplication?.app_id);
    submitCosigner.mutate(axios.formToJSON(formData));
  };
  const submitCosigner = useMutation({
    mutationFn: tuitionEndpoints.uploadCosigner,
    onSuccess: () => {
      toast.success("Cosigner details uploaded successfully.");
      invalidate("sallieMaeCosigner");
      if (onClose) onClose();
    },
  });
  return (
    <div className="col gap-3">
      <em>
        A co-signer is a person – such as a parent, family member, or a friend –
        who will add their information, including income and credit record, to
        your loan application and will commit to pay back the loan if you're
        unable to. This person must be a permanent resident of the US or a US
        citizen with a stable income and good credit rating.
      </em>
      <p className="alert">
        Before providing the cosigner details, please talk to them and have them
        agree to support you. You should not proceed with this process if your
        cosigner has not confirmed their support.
      </p>
      <ContentComponent header="Enter cosigner details" className="col gap-3">
        <form onSubmit={onSubmit} className="col gap-3 p-1">
          <InputsWithLabel
            inputLabel="Full Names"
            type="text"
            name="cosignerName"
            placeholder="John"
            required
          />
          <InputsWithLabel
            inputLabel="Email Address"
            type="email"
            name="cosignerEmail"
            placeholder="Johnsmith@gmail.com"
            required
          />
          <div className="form-group">
            <label>
              US Citizenship status <span className="text-danger">*</span>
            </label>
            <Select name="usCitizenshipStatus" required>
              <MenuItem value="1">US Permanent Resident</MenuItem>
              <MenuItem value="2">US Citizen</MenuItem>
            </Select>
          </div>
          <FormFooterBtns
            closeText="Cancel"
            onClose={onClose}
            btnText={submitCosigner.isPending ? "Submitting..." : "Submit"}
          />
        </form>
      </ContentComponent>
    </div>
  );
};

export default CosignerForm;
