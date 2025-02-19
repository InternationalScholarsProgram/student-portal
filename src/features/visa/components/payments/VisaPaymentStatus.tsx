import { useState } from "react";
import useVisa from "../../services/hooks/useVisa";
import VisaPaymentModal from "./VisaPaymentModal";
import Expedite from "../../features/expedite/Expedite";
import StatusHandler from "../../features/visa-training-resources/StatusHandler";

function VisaPaymentStatus() {
  const [open, setOpen] = useState(false);
  const { hasPaidedForVisa } = useVisa();
  return (
    <div>
      {hasPaidedForVisa ? (
        <section>
          <div>
            <p className="my-2 p-3">
              Your visa fee payment has been approved and disbursed to you. You
              may now submit it to the embassy and schedule a visa interview
              date. You have also been granted access to visa expedite letter
              (if you need it). To access the visa training resources, please
              submit the request using the button below.
            </p>
          </div>
          <StatusHandler />
          <Expedite />
        </section>
      ) : (
        <div className="card col gap-2 p-4 my-5">
          <h3 className="title-sm">Request Visa Fee Payment</h3>
          <p>Please submit a request to have your visa fees paid.</p>
          <button
            className="primary-btn self-end"
            onClick={() => setOpen(!open)}
          >
            Request Visa Payment
          </button>
          <VisaPaymentModal open={open} toggleModal={() => setOpen(!open)} />
        </div>
      )}
    </div>
  );
}

export default VisaPaymentStatus;
