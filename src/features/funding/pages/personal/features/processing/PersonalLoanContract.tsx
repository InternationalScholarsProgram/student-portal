import LoanContract from "../../../../components/LoanContract";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import usePersonal from "../../services/usePersonal";
import personalEndpoints from "../../services/personalEndpoints";

const PersonalLoanContract = () => {
  const { personalLoan, user_details, invalidate } = usePersonal();
  const signContract = useMutation({
    mutationFn: async () => {
      return personalEndpoints.signContract();
    },
    onSuccess: () => {
      toast.success("Contract signed successfully.");
      invalidate("status");
    },
  });

  return (
    <>
      <LoanContract
        signContract={signContract}
        application={user_details}
        loan={personalLoan}
        loanType={2}
      />
    </>
  );
};

export default PersonalLoanContract;
