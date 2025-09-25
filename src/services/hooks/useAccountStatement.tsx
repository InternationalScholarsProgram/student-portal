import { useQuery } from "@tanstack/react-query";
import api, { baseDirectory } from "../api/base";
import useFetchUser from "./useFetchUser";
const url = `${baseDirectory}fetch_statement.php`;

function useAccountStatement() {
  const { user, isLoading: userLoading } = useFetchUser();

  const {
    data: accountStatements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["account-statement", user?.email],
    queryFn: () => api.post(url, { email: user?.email }),
    enabled: !!user?.email,
    select: (response) => {
      const data = response?.data;

      // ⬇️ normalize to numbers so balance is always a number
      const total_payment = Number(data?.total_payment ?? 0);
      const total_expenditure = Number(data?.total_expenditure ?? 0);

      return {
        ...data,
        total_payment,
        total_expenditure,
        balance: total_payment - total_expenditure,
      } as Statements;
    },
  });

  return {
    user,
    accountStatements,
    isLoading,
    userLoading,
    error,
  };
}

export default useAccountStatement;

type Statements = {
  balance: number;
  message: string;
  status: string;
  total_expenditure: number;
  total_payment: number;
  expenditures: {
    amount: string;
    date: string;
    email: string;
    id: string;
    purporse: string;
    reference_id: string;
    serial_id: any;
  }[];
  payments: {
    added_by: string;
    amount: string;
    category: string;
    checkout_id: string;
    customer_email: string;
    customer_id: string;
    date_completed: string;
    id: string;
    invoice_id: string;
    payment_intent_id: string;
    payment_method: string;
    purpose: string;
    status: string;
  }[];
};
