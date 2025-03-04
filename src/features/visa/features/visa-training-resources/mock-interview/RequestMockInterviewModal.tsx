import Modal from "../../../../../components/Modal";
import { ModalProps } from "../../../../../types";
import { formatDate } from "../../../../../utils/utils";
import dayjs from "dayjs";
import { VisaObject } from "../../../types/visaTypes";

interface Props extends ModalProps {
  visa: VisaObject;
}

function RequestMockInterviewModal({ open, toggleModal, visa }: Props) {
  const is7daysAfter = dayjs(visa?.interview_date)?.isSame(
    dayjs(new Date()).subtract(7, "day"),
    "day"
  );

  return (
    <>
      <div className="col">
        {is7daysAfter ? (
          <button className="primary-border-btn self-end" onClick={toggleModal}>
            Request Mock Visa Interview
          </button>
        ) : (
          <span>
            Your visa interview is currently scheduled for {" "}
            {formatDate(visa.interview_date)}, which is more than 7 days from
            today. At this time, you are not eligible to request a mock
            interview. Once your interview date falls within the 7-day window,
            the option to book a mock interview will become available.
          </span>
        )}
      </div>
      <Modal open={open} setOpen={toggleModal} title="Request mock interview">
        <div className="modal"> </div>
      </Modal>
    </>
  );
}

export default RequestMockInterviewModal;
