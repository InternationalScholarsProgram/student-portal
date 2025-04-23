import React, { useMemo } from "react";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import personalEndpoints from "./personalEndpoints";

const usePersonal = () => {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  const {
    data: status,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys?.status,
    queryFn: personalEndpoints?.status,
    enabled: !!user?.email,
    select: (response) => response?.data?.data,
  });

  const invalidate = (key: "status") =>
    queryClient.invalidateQueries({ queryKey: queryKeys[key] });

  const user_details = status?.user_details;
  const personalLoan = status?.personal_loan;

  return {
    status,
    isLoading,
    error,
    invalidate,
    user_details,
    personalLoan,
    user,
  };
};

export default usePersonal;

const _queryKeys = (email: any) => ({
  status: [email, "personal-loans"] as const,
});
