import useFetchUser from "../../../services/hooks/useFetchUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import examsEndpoints from "./examsEndpoints";
import { ExamStatus } from "../types/examTypes";
import useGetTestType from "./useGetTestType";

const useGetStatus = () => {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const testType = useGetTestType();

  const queryKey = [user?.email, "status", testType];

  const { data, isLoading, error } = useQuery({
    queryKey: queryKey,
    queryFn: () => examsEndpoints.status(testType),
    select: (response) => response?.data?.data as ExamStatus,
    enabled: !!user?.email && !!testType,
  });

  const invalidateStatus = () =>
    queryClient.invalidateQueries({ queryKey: queryKey });

  const mockResources = data?.resources?.phase_2 || [];

  return {
    status: data,
    isLoading,
    error,
    invalidateStatus,
    testType,
    mockResources,
    trainingResources: data?.resources?.phase_1 || [],
  };
};

export default useGetStatus;
