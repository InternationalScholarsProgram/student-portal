import { useQueryClient } from "@tanstack/react-query";
import { TestTypes } from "../../../types/examTypes";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import { useMemo } from "react";
import useGetStatus from "../../../services/useGetStatus";

const useGMAT = () => {
  const { user } = useFetchUser();
  const { error, invalidateStatus, isLoading, status } = useGetStatus(testType);
  const queryClient = useQueryClient();
  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  const invalidate = (key: "status") => {
    if (key === "status") return invalidateStatus();
    queryClient.invalidateQueries({ queryKey: queryKeys[key] });
  };

  return { status, isLoading, error, invalidate, testType };
};

export default useGMAT;

const testType: TestTypes = "GMAT";
const _queryKeys = (email?: string) => ({
  status: [email, testType, "status"],
});
