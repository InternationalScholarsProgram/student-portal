import { Link } from "react-router-dom";
import { formatCurrency } from "../../../../utils/utils";
import { useState } from "react";
import Modal from "../../../../components/Modal";
import useSwitchProgram from "../hook/useSwitchProgram";

const ProgramConditions = () => {
  const [open, setOpen] = useState(false);
  const { handleSwitch, requiredPay, balance, programOption } =
    useSwitchProgram();

  const confirmSwitch = async () => {
    const data = await handleSwitch.mutateAsync("prime");
    if (data.code === 200) setOpen(false);
  };

  if (programOption === "regular") {
    if (requiredPay <= 0) {
      return (
        <>
          <p>
            Having enrolled as a <b>Regular</b> option student, $500.00 will be
            deducted from your account to cover the{" "}
            <b>Prime option contribution.</b> Please note, your current total
            balance as of today is <b>{formatCurrency(balance)}</b>. This amount
            will be used to take care of some of the expenses that you will
            later incur throughout this whole process such as Visa fees, SEVIS
            fees, among others.
          </p>
          <button
            className="primary-btn self-end"
            onClick={() => setOpen(true)}
          >
            {handleSwitch.isPending ? "Loading..." : "Accept & Continue"}
          </button>
          <Modal open={open} setOpen={setOpen} title="Do you wish to convert?">
            <div className="w-[80vw] md:w-[50vw] xl:w-[40vw] p-6 col gap-1">
              <p>
                This action will change your current program option to prime.
              </p>
              <p>Are you sure you want to continue?</p>
              <br />
              <div className="row justify-end gap-2">
                <button className="text-btn" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button
                  className="primary-btn"
                  onClick={() => confirmSwitch()}
                  disabled={handleSwitch.isPending}
                >
                  {handleSwitch.isPending ? "Switching..." : "Continue"}
                </button>
              </div>
            </div>
          </Modal>
        </>
      );
    } else {
      return (
        <>
          <h4>Shifting to Prime</h4>
          <p className="mt-4">
            Having been enrolled as a <b>regular</b> option student, you are
            hereby required to immediately contribute a further{" "}
            <b className="px-1">{formatCurrency(requiredPay)}</b>
            to join the Prime option. To make this payment please{" "}
            <Link
              to="/make-payments"
              state={{
                requiredPay: requiredPay,
                program: "Prime",
                reason: "Program contribution",
              }}
              className="text-primary-light "
            >
              Click here
            </Link>{" "}
            to make a payment and select <b>Program contribution</b> as a reason
            for the payment.
          </p>
          <Link
            to="/make-payments"
            state={{
              requiredPay: requiredPay,
              program: "Prime",
              reason: "Program contribution",
            }}
            className="primary-btn self-end"
          >
            Make Payment
          </Link>
        </>
      );
    }
  } else if (programOption === "prime") {
    return (
      <>
        <h4>Shifting to Regular!</h4>
        <p className="mt-4">
          Having enrolled as a <b>Prime</b> option student, you are hereby
          required to create a ticket for the Prime to Regular switch.{" "}
        </p>
        <Link
          to="/create-ticket"
          state={{
            requiredPay: requiredPay,
            program: "Prime",
            reason: "Program contribution",
          }}
          className="primary-btn self-end"
        >
          Create Ticket
        </Link>
      </>
    );
  }

  return null;
};

export default ProgramConditions;
