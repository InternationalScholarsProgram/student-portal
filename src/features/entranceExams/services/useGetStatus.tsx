import useFetchUser from "../../../services/hooks/useFetchUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import examsEndpoints from "./examsEndpoints";
import { ExamStatus, TestTypes } from "../types/examTypes";

const useGetStatus = (testType: TestTypes) => {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const queryKey = [user?.email, "status", testType];

  const { data, isLoading, error } = useQuery({
    queryKey: queryKey,
    queryFn: () => examsEndpoints.status(testType),
    select: (response) => response?.data?.data as ExamStatus,
  });

  const invalidateStatus = () =>
    queryClient.invalidateQueries({ queryKey: queryKey });

  return { status: data, isLoading, error, invalidateStatus };
};

export default useGetStatus;
