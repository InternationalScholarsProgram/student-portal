import { useState } from "react";
import ExpediteRequestModal from "./ExpediteRequestModal";

function Expedite() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <section className="card p-3 my-5">
      <h3>Expediting visa interview appointment
      </h3>
      <p>
      You can expedite your visa interview appointment using the link below.
      </p>
      <div className="row justify-end gap-2">
        <button className="primary-btn " onClick={toggleModal} type="button">
          Make Visa Expedite Request
        </button>
      </div>
      <ExpediteRequestModal open={open} toggleModal={toggleModal} />
    </section>
  );
}

export default Expedite;
