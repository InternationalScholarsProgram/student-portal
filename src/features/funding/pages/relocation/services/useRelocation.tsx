import { useQuery, useQueryClient } from "@tanstack/react-query";
import relocationApis from "./relocationApis";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import { useMemo } from "react";
import { Status } from "../types/relocationTypes";
import { splitDate } from "../../../../../utils/utils";
import fundingEndpoints from "../../../services/fundingEndpoints";
import { RepaymentSchedule } from "../../../types/fundingTypes";

const _queryKeys = (email: any) => ({
  status: [email, "relocation-loans"] as const,
});

const useRelocation = () => {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  const {
    data: relocationStatus,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys?.status,
    queryFn: relocationApis.status,
    enabled: !!user?.email,
    select: (response) => response?.data?.data as Status,
  });

  const loan = {
    ...relocationStatus?.loan,
    maturity_date: splitDate(relocationStatus?.loan?.maturity_date || ""),
  };
  const application = relocationStatus?.application;
  const extraLoan = relocationStatus?.extra_loan;

  const invalidate = (key: "status") =>
    queryClient.invalidateQueries({ queryKey: queryKeys[key] || key });

  const { data: schedulePayments } = useQuery({
    queryKey: [user?.email, "repayment-schedule", loan?.loan_id],
    queryFn: () => fundingEndpoints.repaymentSchedule(loan),
    select: (response) => response?.data?.data.slice(1) as RepaymentSchedule[],
    enabled: relocationStatus?.status === 2 && !!loan?.loan_id,
  });

  return {
    user,
    relocationStatus,
    loan,
    extraLoan,
    application,
    isLoading,
    error,
    invalidate,
    schedulePayments,
  };
};

export default useRelocation;
