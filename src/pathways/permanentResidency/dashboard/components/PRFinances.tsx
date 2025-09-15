import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BalanceIcon from "@mui/icons-material/Balance";
import { formatCurrency } from "../../../../utils/utils";

type Props = { accountStatements: any };

const PRFinances: React.FC<Props> = ({ accountStatements }) => {
  const items = finance(
    accountStatements?.total_payment ?? 0,
    accountStatements?.total_expenditure ?? 0,
    accountStatements?.balance ?? 0
  );

  return (
    <section className="card p-4 col gap-3 h-full min-w-0">
      <h3 className="title-sm text-primary-main">Your Finances</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="card col-center p-4 min-h-[110px]">
            {item.icon}
            <p className="text-lg font-semibold">{formatCurrency(item.amount)}</p>
            <b className="text-center text-nowrap truncate">{item.title}</b>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PRFinances;

const finance = (contributions = 0, expenditures = 0, balance = 0) => [
  { icon: <AccountBalanceWalletIcon fontSize="large" color="info" />,    title: "Contributions", amount: contributions },
  { icon: <AccountBalanceIcon fontSize="large" color="primary" />,       title: "Expenditure",   amount: expenditures },
  { icon: <BalanceIcon fontSize="large" color="action" />,               title: "Balance",       amount: balance },
];
