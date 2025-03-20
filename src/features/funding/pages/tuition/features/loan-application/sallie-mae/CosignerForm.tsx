import { InputsWithLabel } from "../../../../../../../components/inputs/InputField";
import Select from "../../../../../../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import ContentComponent from "../../../../../../../components/ContentComponent";
import { useMutation } from "@tanstack/react-query";
import tuitionEndpoints from "../../../services/tuitionEndpoints";
import { toast } from "react-toastify";

function CosignerForm() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    submitCosigner.mutate(formData);
  };
  const submitCosigner = useMutation({
    mutationFn: tuitionEndpoints.uploadCosigner,
    onSuccess: () => {
      toast.success("Cosigner details uploaded successfully.");
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
            name="cosigner_name"
            placeholder="John"
            required
          />
          <InputsWithLabel
            inputLabel="Email Address"
            type="email"
            name="cosigner_email"
            placeholder="Johnsmith@gmail.com"
            required
          />
          <div className="form-group">
            <label>
              US Citizenship status <span className="text-danger">*</span>
            </label>
            <Select name="cosigner_citizenship" required>
              <MenuItem value="1">US Permanent Resident</MenuItem>
              <MenuItem value="2">US Citizen</MenuItem>
            </Select>
          </div>
          <PrimaryBtn className="self-end" type="submit">
            {submitCosigner.isPending ? "Submitting..." : "Submit"}
          </PrimaryBtn>
        </form>
      </ContentComponent>
    </div>
  );
}

export default CosignerForm;
