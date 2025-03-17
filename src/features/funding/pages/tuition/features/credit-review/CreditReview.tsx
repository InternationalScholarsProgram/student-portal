import ContentComponent from "../../../../../../components/ContentComponent";
import useFunding from "../../../../services/useFunding";
import StatusMessages from "./StatusMessages";

function CreditReview() {
  const { stage, status } = useFunding();
  return (
    <ContentComponent className="col" header="Credit Review">
      <StatusMessages stage={stage} remarks={status?.remarks} />
    </ContentComponent>
  );
}

export default CreditReview;
