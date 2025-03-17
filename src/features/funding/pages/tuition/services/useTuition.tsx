import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import tuitionEndpoints from "./tuitionEndpoints";

function useTuition() {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();

  const { data: meetingStatus } = useQuery<any>({
    queryKey: ["meeting status"],
    queryFn: tuitionEndpoints.test,
  });

  return {
    queryClient,
    user,
    status: user ? 5 : 3,
    meetingStatus,
    loanType: user ? "mpower" : "sallie mae",
  };
}

export default useTuition;
