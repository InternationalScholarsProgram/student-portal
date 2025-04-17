import { useState } from "react";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import RadioBtns from "../../../../../../components/inputs/RadioBtns";
import { formatDate, splitDate } from "../../../../../../utils/utils";
import useRelocation from "../../services/useRelocation";
import RepaymentSchedule from "./RepaymentSchedule";
import ContentComponent from "../../../../../../components/ContentComponent";
import Accordion from "../../../../../../components/Accordion";
import { useNavigate } from "react-router";
import ExtraLoan from "./extra-loan/ExtraLoan";
import { BASE_URL } from "../../../../../../services/api/base";

const Repayment = () => {
  const { schedulePayments, loan, extraLoan } = useRelocation();
  const [action, setAction] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();
    const formAction = e.currentTarget?.action.value;
    if (formAction === "make_payment") navigate("/make-payment");
    if (formAction === "view_loan_contract")
      window.open(`${BASE_URL + loan?.loan_contract}`, "_blank");
    if (formAction === "extra_loan") setAction(formAction);
  };

  return (
    <div className="col gap-3">
      <ExtraLoan
        open={action === "extra_loan"}
        toggleModal={() => setAction("")}
      />
      <ContentComponent header="Repayment Schedule">
        <p>
          Your next payment of{" "}
          <strong>${schedulePayments?.[0].scheduled_payment}</strong> is due on{" "}
          <strong>
            {formatDate(splitDate(schedulePayments?.[0].maturity_date || ""))}
          </strong>
          . You can make a payment now — your repayment schedule will update
          automatically.
        </p>
        <div className="col gap-2 py-2 pb-4">
          <p>You can view you repayment schedule below</p>
          <Accordion title="Repayment Schedule" list={false} label>
            <RepaymentSchedule />
          </Accordion>
        </div>
      </ContentComponent>
      <ContentComponent header="Loan Actions" className="my-3">
        <form onSubmit={onSubmit} className="col p-2">
          <RadioBtns
            name="action"
            className="px-5"
            title="What would you like to do?"
            options={options.filter((option) => {
              if (option.value === "extra_loan") {
                if (!extraLoan?.status || extraLoan?.status === 3) return true;
                return false;
              }
              return true;
            })}
          />
          <PrimaryBtn className="self-end">Proceed</PrimaryBtn>
        </form>
      </ContentComponent>
    </div>
  );
};

export default Repayment;
const options = [
  { value: "make_payment", label: "Make a Loan Payment" },
  { value: "extra_loan", label: "Request an Extra Loan" },
  { value: "view_loan_contract", label: "View Loan Contract" },
];
