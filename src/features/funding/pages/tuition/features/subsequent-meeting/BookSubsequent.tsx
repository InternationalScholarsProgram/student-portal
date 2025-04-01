import React, { useState } from "react";
import Modal from "../../../../../../components/Modal";
import { InputsWithLabel } from "../../../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../../../components/buttons/FormFooterBtns";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import { useSubsequentMeeting } from "./useSubsequentMeeting";
type Props = { rejected?: boolean };

const BookSubsequent: React.FC<Props> = ({ rejected }) => {
  const { bookSubsequentMeeting } = useSubsequentMeeting();
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await bookSubsequentMeeting.mutateAsync(reason);
    if (data.status === 200) toggleModal();
  };
  return (
    <>
      {rejected ? (
        <PrimaryBtn className="self-end" onClick={toggleModal}>
          Request Subsequent Meeting
        </PrimaryBtn>
      ) : (
        <span
          className="text-primary-light underline px-2 cursor-pointer"
          onClick={toggleModal}
        >
          Click here
        </span>
      )}

      <Modal
        title="Request for subsequent meeting"
        open={open}
        setOpen={toggleModal}
      >
        <form onSubmit={onSubmit} className="modal">
          <InputsWithLabel
            inputLabel="Enter reason for requesting meeting"
            name="reason"
            type="textarea"
            onChange={(e) => setReason(e.target.value)}
            // required
          />
          <FormFooterBtns
            onClose={toggleModal}
            btnText={
              bookSubsequentMeeting?.isPending ? "Submitting..." : "Submit"
            }
          />
        </form>
      </Modal>
    </>
  );
};

export default BookSubsequent;
