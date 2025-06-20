import { useState } from "react";
import FormFooterBtns from "../../../components/buttons/FormFooterBtns";
import CheckBox from "../../../components/inputs/CheckBox";
import PrimaryBtn from "../../../components/buttons/PrimaryBtn";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import MapFormFields from "../../../components/inputs/MapFormFields";
import Modal from "../../../components/Modal";
import fundingEndpoints from "../services/fundingEndpoints";
import axios from "axios";
import { errorMsg } from "../../../components/errors/errorMsg";

type Props = {
  loan: {
    member_no: string;
    fullnames: string;
    phone: string;
    loan_id: string;
    loanType: number;
  };
  onSuccess: () => void;
};

const UpdateBankDetailsModal: React.FC<Props> = ({ loan, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const updateBank = useMutation({
    mutationFn: fundingEndpoints.updateBankDetails,
    onSuccess: () => {
      toast.success("Bank details updated successfully.");
      onSuccess();
      toggleModal();
    },
    onError: (error) => toast.error(errorMsg(error)),
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("member_no", loan?.member_no);
    formData.append("fullnames", loan.fullnames);
    formData.append("phone", loan.phone);
    formData.append("loan_id", loan.loan_id);
    formData.append("loanType", loan.loanType.toString());
    updateBank.mutate(formData);
    // console.log(axios.formToJSON(formData));
  };
  return (
    <>
      <PrimaryBtn className="self-end" onClick={toggleModal}>
        Update Bank Details
      </PrimaryBtn>
      <Modal open={open} setOpen={toggleModal} title="Update bank details">
        <form onSubmit={onSubmit} className="modal">
          <p>Make sure you complete the correct details.</p>
          <div className="col gap-2 p-3">
            <MapFormFields fields={formFields} />
            <CheckBox
              sx={{ alignItems: "flex-start" }}
              title="By providing us with the information, you will be agreeing that your banking details will be used for processing the disbursement and repayment of the loan borrowed from The KENYA Airlift Program via Automated Clearing House (ACH). In case of any questions, please do not hesitate to reach out to our team."
            />
          </div>
          <FormFooterBtns
            onClose={toggleModal}
            disabled={updateBank.isPending}
            btnText={updateBank.isPending ? "Submiting..." : "Submit"}
          />
        </form>
      </Modal>
    </>
  );
};

export default UpdateBankDetailsModal;
const formFields = [
  {
    type: "select",
    name: "bank_account_type",
    id: "bank_account_type",
    label: "Account holder type",
    required: true,
    options: [
      { value: "", label: "Select" },
      { value: "Individual", label: "Individual" },
      { value: "Company", label: "Company" },
    ],
  },
  {
    type: "text",
    name: "bank_account_name",
    id: "bank_account_name",
    label: "Bank name",
    placeholder: "Bank Of America",
    required: true,
  },
  {
    type: "text",
    name: "bank_account_number",
    id: "bank_account_number",
    label: "Bank account number",
    placeholder: "001234567678",
    required: true,
  },
  {
    type: "text",
    name: "account_name",
    id: "account_name",
    label: "Account holder name",
    placeholder: "River view ave",
    required: true,
  },
  // {
  //   type: "text",
  //   name: "routing",
  //   id: "routing",
  //   label: "Routing number",
  //   placeholder: "45878954485",
  //   required: true,
  // },
];
