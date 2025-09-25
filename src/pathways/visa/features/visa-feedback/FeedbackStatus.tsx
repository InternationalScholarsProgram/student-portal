import { useCallback } from "react";
import useVisa from "../../services/hooks/useVisa";
import ContentComponent from "../../../../components/ContentComponent";
import ProvideVisaFeedback from "./ProvideVisaFeedback";
import DeniedVisa from "./DeniedVisa";
import ContactSupport from "../../../../components/ContactSupport";
import Administrative from "./Administrative";
import GotVisa from "./GotVisa";

function FeedbackStatus() {
  const { feedback } = useVisa();
  const renderStatus = useCallback(
    () => <RenderStatus feedback={feedback} />,
    [feedback]
  );

  return <div className="my-2">{renderStatus()}</div>;
}

export default FeedbackStatus;

function RenderStatus({ feedback }: any) {
  switch (feedback?.status) {
    case 1:
      return (
        <ContentComponent header="Your feedback is under review 🕵️‍♂️">
          <p>
            Thank you for submitting your feedback! Our team is carefully
            reviewing it to ensure everything is in order. We appreciate your
            patience and will notify you here as soon as it's processed. 😊
          </p>
          <ContactSupport />
        </ContentComponent>
      );
    case 2:
      return <VisaOutcome outcome={feedback?.visa_outcome} />;
    case 3:
      return (
        <>
          <ContentComponent header="Your feedback needs your attention ⚠️">
            <p>
              Unfortunately, your feedback submission has been <strong>rejected</strong>. 😞
              Below, you’ll find the specific reason provided by our team.
              Please review it carefully.
            </p>
            <p>
              <strong>Reason for rejection:</strong>
              <em className="px-2">
                {feedback?.remarks || "No details provided."}
              </em>
            </p>
            <p>
              Kindly update and resubmit your feedback to ensure it meets the
              necessary requirements. We’re here to help if you need any
              assistance!
            </p>
          </ContentComponent>
          <div className="h-8"></div>
          <ProvideVisaFeedback />
        </>
      );
    default:
      // No feedback yet → show the form
      return <ProvideVisaFeedback />;
  }
}

function VisaOutcome({ outcome }: { outcome: number }) {
  if (outcome === 1) return <GotVisa />;
  if (outcome === 2) return <DeniedVisa />;
  if (outcome === 3) return <Administrative />;
  return null;
}
