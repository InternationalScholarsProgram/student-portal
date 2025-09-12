import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BalanceIcon from "@mui/icons-material/Balance";
import { formatCurrency } from "../../../utils/utils";

function Finances({ accountStatements }: any) {
  return (
    <div>
      <h3 className="title-sm text-primary-main">Your Finances</h3>
      <div className="grid grid-cols-3 items-center justify-center gap-4 ">
        {finance(
          accountStatements?.total_payment,
          accountStatements?.total_expenditure,
          accountStatements?.balance
        ).map((item, index) => (
          <div key={index} className="card col-center p-4">
            {item.icon}
            <p>{formatCurrency(item.amount)}</p>
            <b className="text-center text-nowrap truncate text-ellipsis">
              {item.title}
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Finances;
const finance = (contributions = 0, expenditures = 0, balance = 0) => [
  {
    icon: <AccountBalanceWalletIcon fontSize="large" color="info" />,
    title: "Contributions",
    amount: contributions,
  },
  {
    icon: <AccountBalanceIcon fontSize="large" color="primary" />,
    title: "Expenditure",
    amount: expenditures,
  },
  {
    icon: <BalanceIcon fontSize="large" color="action" />,
    title: "Balance",
    amount: balance,
  },
];
