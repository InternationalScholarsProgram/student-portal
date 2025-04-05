import React, { useState } from "react";
import Modal from "../../../../../../components/Modal";
import { CalendlyFundingAdvisory } from "../../../../../../components/Calendly";

const RescheduleMeeting: React.FC<{ url: string }> = ({ url }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <>
      <button onClick={toggleModal} className="text-btn border">
        Reschedule
      </button>
      <Modal open={open} setOpen={toggleModal} title="Reschedule Meeting">
        <div className="p-3 w-[80vw] md:w-[55vw] xl:w-[45vw] col gap-2">
          <p>
            Kindly note: Please reschedule your meeting if you can't attend the
            current one. Failing to attend a meeting and not rescheduling in
            advance will lead to you <strong>NOT</strong> being able to book
            another advisory meeting for <strong>1 day</strong>.
          </p>
          <div className="row justify-end gap-2">
            <button className="text-btn" onClick={toggleModal}>
              Close
            </button>
            <CalendlyFundingAdvisory url={url} text="Reschedule" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RescheduleMeeting;
