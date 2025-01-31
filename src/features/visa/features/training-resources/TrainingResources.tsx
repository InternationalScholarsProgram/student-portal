import { useState } from "react";
import RequestModal from "./RequestModal";

function TrainingResources() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <section className="card p-3 my-5">
      <h3>Request Visa training resources ?</h3>
      <p>
        Use the link below to request Visa training videos to help you prepare
        for the interview.
      </p>
      <div className="row justify-end gap-2">
        <button className="primary-btn " onClick={toggleModal} type="button">
          Request Interview Visa
        </button>
      </div>
      <RequestModal open={open} toggleModal={toggleModal} />
    </section>
  );
}

export default TrainingResources;
