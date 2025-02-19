import { useState } from "react";
import Modal from "../../../../../components/Modal";
import { ModalProps } from "../../../../../types";
import PickFileButton from "../../../../../components/buttons/PickFileButton";
import Select from "../../../../../components/inputs/Select";

function RequestMockInterviewModal({ open, toggleModal }: ModalProps) {
  const [fundingOption, setFundingOption] = useState("Statement"); // Default from records
  const [response, setResponse] = useState("");
  const [newFunding, setNewFunding] = useState("");
  const [supportLetter, setSupportLetter] = useState<File | null>(null);
  const [uploadLetter, setUploadLetter] = useState<File | null>(null);

  // Toggle Continue Button
  const isContinueDisabled = () => {
    if (response === "yes" && supportLetter) return false;
    if (response === "no" && newFunding && uploadLetter) return false;
    return true;
  };

  return (
    <Modal open={open} setOpen={toggleModal} title="Request mock interview">
      <div className="modal">
        <h5 className="text-lg font-semibold">
          Upload Visa Interview Support Document
        </h5>
        <div className="mt-4">
          <p className="text-sm italic">
            To request a mock visa interview, please upload the financial
            support document that you will use during your actual visa
            interview.
          </p>

          {/* Alert */}
          <div className=" border-l-4 border-red-500 p-3 mt-3">
            <p>
              Please ensure you have gone through all the visa training
              resources before making this request.
            </p>
          </div>

          {/* Funding Confirmation */}
          <div className="mt-4">
            {fundingOption === "Statement" && (
              <p>
                From our records, you will be using a bank statement for your
                visa processing. Is this still the case?{" "}
                <i>
                  <br />
                  <b>Please upload the latest 3 months of your statement.</b>
                </i>
              </p>
            )}
            {fundingOption === "Loan" && (
              <p>
                From our records, you will be using a loan for your visa
                processing. Is this still the case?
              </p>
            )}
            {fundingOption !== "Statement" && fundingOption !== "Loan" && (
              <p>
                From our records, you will be using a <b>{fundingOption}</b> for
                your visa processing. Is this still the case?
              </p>
            )}
          </div>

          {/* Response Selection */}
          <div className="mt-3">
            <label className="block font-medium">Your response:</label>
            <Select
              value={response}
              placeholder="Select an option"
              onChange={(e) => setResponse(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </div>

          {/* If user selects "Yes" */}
          {response === "yes" && (
            <div className="mt-3">
              <label className="block font-medium">
                Upload Support Letter:
              </label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                onChange={(e) => {
                  const file = e.target.files;
                  if (file) setSupportLetter(file[0]);
                }}
              />
            </div>
          )}

          {/* If user selects "No" */}
          {response === "no" && (
            <div className="mt-3">
              <label className="block font-medium">
                Select New Funding Option:
              </label>
              <select
                className="w-full p-2 border rounded"
                value={newFunding}
                onChange={(e) => setNewFunding(e.target.value)}
              >
                <option value="">Select an option</option>
                {fundingOption === "Loan" && (
                  <>
                    <option value="Statement">Bank Statement</option>
                    <option value="Scholarship">Scholarship/GA</option>
                  </>
                )}
                {fundingOption === "Statement" && (
                  <>
                    <option value="Loan">Loan</option>
                    <option value="Scholarship">Scholarship/GA</option>
                  </>
                )}
                {fundingOption === "Scholarship" && (
                  <>
                    <option value="Loan">Loan</option>
                    <option value="Statement">Bank Statement</option>
                  </>
                )}
              </select>
            </div>
          )}

          {/* Upload Document for New Funding */}
          {response === "no" && newFunding && (
            <div className="mt-3">
              <label className="block font-medium">
                Upload Support Document:
              </label>
              <PickFileButton
                type="file"
                className="w-full p-2 border rounded"
                onChange={(e) => {
                  const file = e.target.files;
                  if (file) setUploadLetter(file[0]);
                }}
              />
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={toggleModal} className="px-4 py-2 rounded ">
            Close
          </button>
          <button
            className={`px-4 py-2 text-white rounded ${
              isContinueDisabled()
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isContinueDisabled()}
          >
            Continue
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default RequestMockInterviewModal;
