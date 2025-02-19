import { useState } from "react";
import ExpediteRequestModal from "./ExpediteRequestModal";
import Accordion from "../../../../components/Accordion";
import Guide from "./Guide";

function Expedite() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <section className="card p-3 my-5">
      <h3 className="title-sm">Expediting visa interview appointment</h3>
      <p>
        You can expedite your visa interview appointment using the link below.
      </p>
      <div className="col gap-2 p-4">
        <p>
          PLEASE NOTE, that you need to submit the expedite request to the
          embassy within any date falling between the earliest admission date as
          per your I-20 up to seven (7) days before the start of classes as per
          your I-20. PLEASE NOTE, submitting your request outside of these
          timelines may lead to expedite request denial by the embassy.{" "}
        </p>
        <Accordion label title="Expedite Request Instructions">
          <Guide />
        </Accordion>
      </div>
      <div className="row justify-end gap-2">
        <button className="primary-btn " onClick={toggleModal} type="button">
          Request Visa Expedite Letter
        </button>
      </div>
      <ExpediteRequestModal open={open} toggleModal={toggleModal} />
    </section>
  );
}

export default Expedite;
