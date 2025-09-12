import ContentComponent from "../../../../components/ContentComponent";
import useGetStatus from "../services/useGetStatus";
import { formatDate } from "../../../../utils/utils";
import ContactSupport from "../../../../components/ContactSupport";
import StatusChip from "../../../../components/StatusChip";
import RequestExtraTimeModal from "./RequestExtraTimeModal";

const ExamTime = () => {
  const { invalidateStatus, status, testType } = useGetStatus();
  const examStatus = status?.extra_time_request?.status;

  if (examStatus === 1)
    return (
      <ContentComponent header="Request Exam Time" className="pb-5">
        <p>
          Your request has been successfully submitted. Please wait while it is
          being <StatusChip type="pending" label="reviewed" />.
        </p>
        <ContactSupport />
      </ContentComponent>
    );

  if (examStatus === 3)
    return (
      <ContentComponent header="Request Exam Time" className="pb-5">
        <p>
          Your request for extra time has been <StatusChip type="rejected" />
        </p>
        {/* <p>Please review the reason provided below:</p> */}
        <p>Please review the reason provided below and submit a new request:</p>
        <p className="px-3">
          <strong>Reason:</strong>{" "}
          <em>{status?.extra_time_request?.admin_comment}</em>
        </p>
        <RequestExtraTimeModal
          invalidateStatus={invalidateStatus}
          enrollmentId={status?.enrollment_id.toString() || ""}
        />
      </ContentComponent>
    );

  if (status?.status === 5)
    return (
      <ContentComponent header="Request Extra Time" className="pb-5">
        <p className="first-letter:uppercase">
          {testType} resources deadline was on{" "}
          <strong>{formatDate(status?.deadline)}</strong>, and has now passed.
          To request an extension, please click the button below.
        </p>

        <RequestExtraTimeModal
          invalidateStatus={invalidateStatus}
          enrollmentId={status.enrollment_id.toString()}
        />
      </ContentComponent>
    );
};

export default ExamTime;
