import { Link } from "react-router-dom";
import useVisa from "../../services/hooks/useVisa";
import ContentComponent from "../../../../components/ContentComponent";
import ProvideVisaFeedback from "./ProvideVisaFeedback";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import DeniedVisa from "./DeniedVisa";

function FeedbackStatus() {
  const { feedback, visa } = useVisa();

  function renderStatus() {
    switch (feedback?.status) {
      case 1:
        return (
          <ContentComponent header="Your feedback is being processed.">
            <p>Kindly be patient as our team reviews your feedback</p>
          </ContentComponent>
        );
      case 2:
        return (
          <ContentComponent header="Your feedback has been successfully processed.">
            <p>🎉 Congratulations on your VISA approval! 🎉</p>
            <p>We appreciate your feedback!</p>
            <p>
              Please proceed to the travel & logistics module to book your
              flight
            </p>
            <PrimaryBtn className="self-end">
              <Link to="/flights">Find Flight</Link>
            </PrimaryBtn>
            {/* <p>
              To proceed with the next step, please upload a copy of your VISA
              as soon as you receive it.
            </p>
            <form onSubmit={onSubmit} className="col px-2">
              <div className="form-group">
                <label htmlFor="visa">Upload a copy of your VISA</label>
                <PickFileButton name="visa" />
              </div>
              <PrimaryBtn type="submit" className="self-end">
                Upload Visa
              </PrimaryBtn>
            </form> */}
          </ContentComponent>
        );
      case 3:
        return (
          <>
            <ContentComponent header="Your feedback has been processed.">
              <p>Your feedback was rejected .Please view the reasons below</p>
              <em className="px-2">{feedback?.remarks}</em>
            </ContentComponent>
            <div className="h-8"></div>
            <ProvideVisaFeedback />
          </>
        );
      default:
        return <ProvideVisaFeedback />;
    }
  }
  return (
    <div className="my-2">
      {feedback?.visa_outcome === 1 ? renderStatus() : <DeniedVisa />}
    </div>
  );
}

export default FeedbackStatus;
