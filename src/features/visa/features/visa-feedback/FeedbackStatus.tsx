import useVisa from "../../services/hooks/useVisa";
import ContentComponent from "../../../../components/ContentComponent";
import ProvideVisaFeedback from "./ProvideVisaFeedback";

function FeedbackStatus() {
  const { feedback } = useVisa();
  console.log(feedback, "feedback");
  switch (feedback?.status) {
    case 1:
      return (
        <ContentComponent header="Your feedback is being processed.">
          <p>Kindly be patient as our team reviews your feedback</p>
        </ContentComponent>
      );
    case 2:
      return (
        <ContentComponent header="Your feedback has been processed.">
          <p>Thank you for your feedback.</p>
        </ContentComponent>
      );
    case 3:
      return (
        <ContentComponent header="Your feedback has been processed.">
          <p>Thank you for your feedback.</p>
        </ContentComponent>
      );
    default:
      return <ProvideVisaFeedback />;
  }
}

export default FeedbackStatus;
