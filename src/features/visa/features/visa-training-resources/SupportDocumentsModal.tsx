import { ModalProps } from "../../../../types";
import Modal from "../../../../components/Modal";
import { useEffect, useState } from "react";
import PickFileButton from "../../../../components/buttons/PickFileButton";
import useVisa from "../../services/hooks/useVisa";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import visaEndpoints from "../../services/visaEndpoints";

function SupportDocumentsModal({ open, toggleModal }: ModalProps) {
  const { ds160Review, inValidateStatus } = useVisa();
  const [fundingOption, setFundingOption] = useState(ds160Review.financial);
  const [response, setResponse] = useState("");
  const [newFunding, setNewFunding] = useState("");
  const [supportLetter, setSupportLetter] = useState<File | null>(null);

  useEffect(() => {
    setFundingOption(ds160Review.financial);
    setResponse("")
    setNewFunding("")
  }, [open]);

  // Toggle Continue Button
  const isContinueDisabled = () => {
    if (response === "yes" && supportLetter) return false;
    if (response === "no" && newFunding && supportLetter) return false;
    return true;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    uploadSupportLetter.mutate(formData);
  };
  const uploadSupportLetter = useMutation({
    mutationFn: visaEndpoints.uploadSupportLetter,
    onSuccess: (response) => {
      toast.success(response.data.message);
      toggleModal();
      inValidateStatus();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    }
  });
  return (
    <Modal
      title="Upload Visa Interview Support Document"
      open={open}
      setOpen={toggleModal}
    >
      <form onSubmit={onSubmit} className="modal">
        <div className="col gap-2">
          <p className="text-sm italic">
            To request a mock visa interview, please upload the financial
            support document that you will use during your actual visa
            interview.
          </p>
          {/* Alert */}
          <p className="border-l-4 border-primary-light p-3 mt-3">
            Please ensure you have gone through all the visa training resources
            before making this request.
          </p>
          {/* Funding Confirmation */}
          <div className="">
            <p>
              From our records, you will be using a{" "}
              {fundingOption === "Statement"
                ? "bank statement"
                : fundingOption === "Loan"
                ? "loan"
                : "scholarship"}{" "}
              for your visa processing.
            </p>
            {fundingOption === "Statement" && (
              <span className="italic font-semibold">
                Please upload the latest 3 months of your statement.
              </span>
            )}
          </div>
          <div className="form-group p-2">
            {/* Response Selection */}
            <FormControl>
              <FormLabel id="response">Is this still the case?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="response"
                name="response"
                onChange={(e) => setResponse(e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/* If user selects "No" */}
            {response === "no" && (
              <div className="col gap-1">
                <label className="block font-medium">
                  Select New Funding Option:
                </label>
                <Select
                  variant="standard"
                  name="newFundingOption"
                  value={newFunding}
                  onChange={(e) => setNewFunding(e.target.value)}
                >
                  {/* <MenuItem value="">Select an option</MenuItem> */}
                  {["Loan", "Statement", "Scholarship"].map(
                    (option) =>
                      fundingOption !== option && (
                        <MenuItem key={option} value={option}>
                          {option === "Statement"
                            ? "Bank Statement"
                            : option === "Scholarship"
                            ? "Scholarship/GA"
                            : option}
                        </MenuItem>
                      )
                  )}
                </Select>
              </div>
            )}
            {(response === "yes" || newFunding) && (
              <div className="">
                <label>Upload Support Letter:</label>
                <PickFileButton
                  type="file"
                  name="supportLetter"
                  accept=".pdf, .png, .jpg, .jpeg"
                  max={1}
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    const file = e.target.files;
                    if (file) setSupportLetter(file[0]);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
        <FormFooterBtns
          onClose={toggleModal}
          btnText={uploadSupportLetter.isPending ? "Uploading..." : "Upload"}
          disabled={isContinueDisabled()}
        />
      </form>
    </Modal>
  );
}

export default SupportDocumentsModal;

const Letter = [
  {
    code: 201,
    data: "UPDATE ds160review SET support = '9776Test_Account_(3).pdf' , WHERE stu_email='test_four@gmail.com'",
    message: "Record updated successfully.",
    status: "success",
  },
];
const dsad = [
  {
    code: 201,
    status: "success",
    message: "Record updated successfully.",
    data: "UPDATE ds160review SET support = '2620document_with_letterhead.pdf' ,financial = 'Loan' WHERE stu_email='test_four@gmail.com'",
  },
];
