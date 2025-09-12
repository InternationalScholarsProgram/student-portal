import ContentComponent from "../../../../components/ContentComponent";
import useGetStatus from "../services/useGetStatus";
import ContactSupport from "../../../../components/ContactSupport";
import StatusChip from "../../../../components/StatusChip";
import ExamBookingModal from "./ExamBookingModal";

const RequestExamBooking = () => {
  const { invalidateStatus, status } = useGetStatus();
  const examStatus = status?.status;

  if (status?.status !== 6) return null;

  switch (examStatus) {
    case 1:
      return (
        <ContentComponent header="Request Exam Booking" className="pb-5">
          <p>
            Your booking request has been successfully submitted. Please wait
            while it is being <StatusChip type="pending" label="reviewed" />.
          </p>
          <ContactSupport />
        </ContentComponent>
      );
    case 3:
      return (
        <ContentComponent header="Request Exam Booking" className="pb-5">
          <p>
            Your booking request has been{" "}
            <StatusChip type="rejected" label="rejected" />.
          </p>
          <p>
            Please review the reason provided below and submit a new request:
          </p>
          <p className="px-3">
            <strong>Reason:</strong> <em>{status?.admin_comment}</em>
          </p>

          <ExamBookingModal
            invalidateStatus={invalidateStatus}
            enrollmentId={status?.enrollment_id.toString()}
          />
        </ContentComponent>
      );

    default:
      return (
        <ContentComponent header="Request Exam Booking" className="pb-5 ">
          <p>
            You have successfully completed the mocks. You can request for your
            exam booking
          </p>
          <ExamBookingModal
            invalidateStatus={invalidateStatus}
            enrollmentId={status?.enrollment_id.toString()}
          />
        </ContentComponent>
      );
  }
};

export default RequestExamBooking;
