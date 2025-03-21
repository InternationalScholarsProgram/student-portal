import ContentComponent from "../../../../../../components/ContentComponent";
import StatusMessages from "./StatusMessages";
import useTuition from "../../services/useTuition";
import ProvideSchoolFeedback from "./ProvideSchoolFeedback";

function CreditReview() {
  const { creditReview } = useTuition();
  // console.log(creditReview?.status);
  

  if (!creditReview) return <ProvideSchoolFeedback />;

  return (
    <ContentComponent className="col" header="Credit Review">
      <StatusMessages
        stage={creditReview?.status}
        remarks={creditReview?.comment}
        // stage={1} remarks={"testing"}  //FOR TESTING
      />
    </ContentComponent>
  );
}

export default CreditReview;
