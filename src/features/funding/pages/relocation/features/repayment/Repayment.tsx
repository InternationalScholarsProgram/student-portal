import { formatDate, splitDate } from "../../../../../../utils/utils";
import useRelocation from "../../services/useRelocation";
import RepaymentSchedule from "./RepaymentSchedule";

const Repayment = () => {
  const { schedulePayments } = useRelocation();
  return (
    <div>
      <p>
        Your next payment of ${schedulePayments?.[0].scheduled_payment} is due
        on ${formatDate(splitDate(schedulePayments?.[0].first_date))}. You may
        make a payment now, and your repayment schedule will update
        automatically.
      </p>
      <RepaymentSchedule />
    </div>
  );
};

export default Repayment;
