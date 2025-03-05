import { formatDate } from "../../../../../utils/utils";
import useVisa from "../../../services/hooks/useVisa";
import { VisaObject } from "../../../types/visaTypes";
import MockStatus from "./MockStatus";

function MockInterview() {
  const { visa } = useVisa();
  return (
    <>
      <div className="col">
        <h3 className="title-sm mt-3"> Mock Interview</h3>
        {isWithin7Days(visa?.interview_date) ? (
          <MockStatus visa={visa} />
        ) : (
          <div className="col gap-2 p-3 card">
            <p>
              Your visa interview is currently scheduled for{" "}
              {formatDate(visa.interview_date)}, which is more than 7 days from
              today. At this time, you are not eligible to request a mock
              interview. Once your interview date falls within the 7-day window,
              the option to book a mock interview will become available.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default MockInterview;

interface Props {
  visa: VisaObject;
}
function isWithin7Days(dateStr: Date | string) {
  const dateToCheck = new Date(dateStr);
  const today = new Date();

  // Set time to 00:00:00 for an accurate day comparison
  today.setHours(0, 0, 0, 0);
  dateToCheck.setHours(0, 0, 0, 0);

  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);

  return dateToCheck >= today && dateToCheck <= sevenDaysFromNow;
}
{
  /* <button name="submit" class="btn btn-primary mt-2" type="submit" onclick="openCalendly('<?php echo $name; ?>', '<?php echo $email; ?>','<?php echo $stu_id; ?>')">Request mock visa interview</button> */
}
