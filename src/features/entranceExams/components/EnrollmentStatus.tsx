import React from "react";
import RequestEnrollment from "./RequestEnrollment";
import ContactSupport from "../../../components/ContactSupport";
import { TestTypes } from "../types/examTypes";
import ContentComponent from "../../../components/ContentComponent";
import StatusChip from "../../../components/StatusChip";

type Props = {
  type: TestTypes;
  status: number | undefined;
  invalidate: () => void;
  reason?: string | null;
};

const EnrollmentStatus: React.FC<Props> = ({
  type,
  status,
  invalidate,
  reason,
}) => {
  switch (status) {
    case 1:
      return (
        <ContentComponent header="Enrollment Request Submitted">
          <p>Your enrollment request has been successfully submitted.</p>
          <p>
            Please wait while it{" "}
            <StatusChip type="pending" label="is being reviewed" /> and approved
            by our team.
          </p>
          <ContactSupport />
        </ContentComponent>
      );

    case 3:
      return (
        <ContentComponent header="Enrollment Request Rejected">
          <p>Unfortunately, your enrollment request was  <StatusChip type="rejected" label="not approved." /></p>
          <p>Please review the reason provided below:</p>
          <p className="px-3">
            <strong>Reason:</strong> <em>{reason}</em>
          </p>
          <p>
            Once addressed, you may resubmit your request for consideration.
          </p>
          <RequestEnrollment invalidate={invalidate} type={type} />
        </ContentComponent>
      );

    default:
      return (
        <ContentComponent header="Request Enrollment">
          <p>
            Upon enrollment, you will gain access to a structured and
            comprehensive training program designed to equip you with the skills
            and strategies needed to succeed on the <b>{type}</b> exam.
          </p>
          <p>
            Our program includes a variety of carefully curated training
            resources, including study guides, practice questions, and video
            tutorials — all aimed at helping you build confidence and improve
            your performance.
          </p>
          <p>
            Once your request is submitted and approved, you’ll receive guidance
            on how to access your materials and get started.
          </p>
          <RequestEnrollment invalidate={invalidate} type={type} />
        </ContentComponent>
      );
  }
};

export default EnrollmentStatus;
