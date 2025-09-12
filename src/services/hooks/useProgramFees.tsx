import { useQuery } from "@tanstack/react-query";
import financeService from "../api/finances";

function useProgramFees(program?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["program-fees"],
    queryFn: () => financeService.programFees(),
    select: (response) => response?.data?.data,
  });

  const { data: programFee } = useQuery({
    queryKey: ["program-fee", program],
    queryFn: () => financeService.programFees(program),
    select: (response) => response?.data?.data,
    enabled: !!program,
  });
  const { data: rates } = useQuery({
    queryKey: ["rates-fees"],
    queryFn: financeService.getRates,
    select: (response) => response?.data?.data?.result,
  });

  return {
    programFee,
    programFees: data,
    isLoading,
    rates,
  };
}

export default useProgramFees;
