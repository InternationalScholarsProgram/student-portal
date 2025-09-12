import { useState } from "react";
import ExpediteRequestModal from "./ExpediteRequestModal";
import Accordion from "../../../../components/Accordion";
import Guide from "./Guide";
import ContentComponent from "../../../../components/ContentComponent";

function Expedite() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <ContentComponent header="Expediting visa interview appointment?">
      <p>
        You can expedite your visa interview appointment using the link below.
      </p>
      <div className="col p-4">
        <p className="alert">
          PLEASE NOTE, that you need to submit the expedite request to the
          embassy within any date falling between the earliest admission date as
          per your I-20 up to seven (7) days before the start of classes as per
          your I-20. PLEASE NOTE, submitting your request outside of these
          timelines may lead to expedite request denial by the embassy.{" "}
        </p>
      </div>
      <Accordion
        label
        title="Expedite Request Instructions"
        children={<Guide />}
      />
      <button className="primary-btn self-end" onClick={toggleModal}>
        Request Visa Expedite Letter
      </button>
      <ExpediteRequestModal open={open} toggleModal={toggleModal} />
    </ContentComponent>
  );
}

export default Expedite;
