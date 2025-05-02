import { useQueryClient } from "@tanstack/react-query";
import { TestTypes } from "../../../types/examTypes";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import { useMemo } from "react";
import useGetStatus from "../../../services/useGetStatus";

const useGRE = () => {
  const { user } = useFetchUser();
  const { error, invalidate, isLoading, status } = useGetStatus(testType);

  const queryClient = useQueryClient();
  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  return { status, isLoading, error, invalidate, testType };
};

export default useGRE;

const testType: TestTypes = "GRE";
const _queryKeys = (email?: string) => ({
  status: [email, testType, "status"],
});
