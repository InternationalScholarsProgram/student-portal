import { useQuery } from "@tanstack/react-query";
import financeService from "../api/finances";

function useProgramFees(program?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["program-fees"],
    queryFn: () => financeService.programFees(),
  });

  const { data: programFee } = useQuery({
    queryKey: ["program-fee", JSON.stringify(program)],
    queryFn: () => financeService.programFees(program),
    enabled: !!program,
  });
  return {
    programFee,
    programFees: data,
    isLoading,
  };
}

export default useProgramFees;
