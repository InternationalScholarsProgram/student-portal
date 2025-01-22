import { Link } from "react-router-dom";
import { formatCurrency } from "../../../../utils/utils";
import Swal from "sweetalert2";
import { useEffect } from "react";

type Props = {
  programOption: string;
  balance: number;
  requiredPay: number;
  handleSwitch: any;
};

const ProgramConditions = ({
  programOption,
  balance,
  requiredPay,
  handleSwitch,
}: Props) => {
  const confirmSwitch = () => {
    Swal.fire({
      title: "Do you wish to convert?",
      text: "This action will change your current program option.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.isConfirmed) handleSwitch.mutate();
    });
  };

  if (programOption?.toLowerCase() === "regular") {
    if (balance >= 500) {
      return (
        <>
          <p>
            Having enrolled as a <b>Regular</b> option student, $500.00 will be
            deducted from your account to cover the{" "}
            <b>Prime option contribution.</b>
            Please note, your current total balance as of today is{" "}
            <b>{formatCurrency(balance)}</b>. This amount will be used to take
            care of some of the expenses that you will later incur throughout
            this whole process such as Visa fees, SEVIS fees, among others.
          </p>
          <button className="primary-btn self-end" onClick={confirmSwitch}>
            {handleSwitch.isPending ? "Loading..." : "Accept"}
          </button>
        </>
      );
    } else {
      return (
        <>
          <h4>Shifting to Prime</h4>
          <p className="mt-4">
            Having been enrolled as a <b>regular</b> option student, you are
            hereby required to immediately contribute a further{" "}
            <b className="px-1">
              {formatCurrency(requiredPay)}
            </b>
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
  } else if (programOption === "Prime") {
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
