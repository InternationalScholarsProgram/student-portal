import { useQuery, useQueryClient } from "@tanstack/react-query";
import relocationApis from "./relocationApis";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import { useMemo } from "react";
import { Status } from "../types/relocationTypes";

const _queryKeys = (email: any) => ({
  status: [email, "relocation"] as const,
});

const useRelocation = () => {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys?.status,
    queryFn: relocationApis.status,
    enabled: !!user?.email,
    select: (response) => response?.data?.data,
  });

  const invalidate = (key: "status") =>
    queryClient.invalidateQueries({ queryKey: queryKeys[key] || key });

  return {
    user,
    relocationStatus: data as Status,
    isLoading,
    error,
    invalidate,
  };
};

export default useRelocation;
