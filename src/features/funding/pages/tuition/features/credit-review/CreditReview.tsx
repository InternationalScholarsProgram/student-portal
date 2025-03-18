import { useQuery } from "@tanstack/react-query";
import ContentComponent from "../../../../../../components/ContentComponent";
import useFunding from "../../../../services/useFunding";
import StatusMessages from "./StatusMessages";
import fundingEndpoints from "../../../../services/fundingEndpoints";

function CreditReview() {
  const { data: creditReview } = useQuery({
    queryKey: ["funding"],
    queryFn: fundingEndpoints.getStatus,
  });
  return (
    <ContentComponent className="col" header="Credit Review">
      <StatusMessages stage={3} remarks={creditReview} />
    </ContentComponent>
  );
}

export default CreditReview;
