import { useQuery } from "@tanstack/react-query";
import tuitionEndpoints from "../../services/tuitionEndpoints";

function AppliedLoanStatus() {
  const { data } = useQuery({
    queryKey: ["applied-loan-status"],
    queryFn: tuitionEndpoints.trackMpowerLead,
  });
  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
}

export default AppliedLoanStatus;
