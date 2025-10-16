import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchUser from "../../../../../../services/hooks/useFetchUser";
import prodigyEndpoints from "./prodigyEndpoints";
import { useMemo } from "react";

type ProdigyStatusKey = "prodigyStatus";

export type ProdigyApplicationStatus =
  | "not_found"
  | "rejected"
  | "ongoing"
  | "completed"
  | "Pending"; 

export interface ProdigyStatusPayload {
  prodigy_started: boolean;
  application?: any;
  status?: ProdigyApplicationStatus | number | null;
  remark?: string | null;
  feedback?: any;
  lead?: any | null;
}

function useProdigy(app_id?: string) {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();

  const email = user?.email || "";
  const enabled = Boolean(email && app_id);

  const queryKeyMap: Record<ProdigyStatusKey, any[]> = {
    prodigyStatus: [email, "tuition", "prodigy-status", app_id],
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchStatus,
  } = useQuery({
    queryKey: queryKeyMap.prodigyStatus,
    enabled,
    queryFn: async () => {
      const res = await prodigyEndpoints.checkStatus(email, String(app_id));
      return res?.data;
    },
    select: (res) => res?.data as ProdigyStatusPayload | undefined,
    retry: 0,
  });

  const invalidate = (key: ProdigyStatusKey = "prodigyStatus") =>
    queryClient.invalidateQueries({ queryKey: queryKeyMap[key] });

  const normalized = useMemo(() => {
    const statusCode = data?.status;
    return {
      started: Boolean(data?.prodigy_started),
      status: statusCode,
      application: data?.application,
      remark: data?.remark ?? null,
      feedback: data?.feedback ?? null,
    };
  }, [data]);

  return {
    ...normalized,
    raw: data,
    isLoading,
    isError,
    error: error as any,
    invalidate,
    refetchStatus,
    queryKeyMap,
    email,
  };
}

export default useProdigy;
