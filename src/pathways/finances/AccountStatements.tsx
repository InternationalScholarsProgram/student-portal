import { ispLogo } from "../../assets/imageLinks";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import PrimaryBorderBtn from "../../components/buttons/PrimaryBorderBtn";
import useAccountStatement from "../../services/hooks/useAccountStatement";
import { formatCurrency } from "../../utils/utils";
import useFinancesStore from "./components/useFinancesStore";
import GridTable from "../../components/tables/GridTable";
import Loader, { InlineLoader } from "../../components/loaders/Loader";
import ReceiptModal from "./components/ReceiptModal";

function AccountStatements({ hideBalance }: any) {
  const { accountStatements, isLoading, user } = useAccountStatement();
  const { setSelectedTransaction, toggleModal } = useFinancesStore(
    (state) => state
  );
  const onActionClick = (params: any) => {
    toggleModal();
    setSelectedTransaction({
      ...params.row,
      email: user?.email,
      country: user?.country?.toLowerCase(),
      names: user?.fullnames,
    });
  };
  const cols = contributionsCols(onActionClick);

  if (isLoading || !accountStatements) return <InlineLoader />;

  return (
    <main className="">
      <header className="col">
        {/* <h1 className="header-title mb-4 font-semibold w-full text-center">
          Account Statements
        </h1> */}
        <div className="self-center w-full col-center text-center text-sm text-nowrap truncate">
          <img className="h-24 sm:h-40" src={ispLogo} alt="logo" />
          <div className="col-center text-center text-wrap">
            <h4 className="whitespace-nowrap mt-4 font-semibold text-lg sm:text-xl">
              The International Scholars Program
            </h4>
            <span className="text-nowrap truncate">
              Email:
              <a
                href="mailto:scholars@theinternationalscholarsprogram.com"
                className="ml-1 truncate"
              >
                scholars@theinternationalscholarsprogram.com
              </a>
            </span>
            <span>
              Address: 100 S. Ashley Drive, Suite 600, Tampa, FL, 33602
            </span>
          </div>
        </div>
      </header>
      <section className="col w-full gap-4">
        <div className="w-full p-4 overflow-x-auto">
          <p className="font-semibold text-xl">Contribution to the Program</p>
          <GridTable
            rows={accountStatements?.payments || []}
            columns={cols}
            name="contributions"
          />
          <p className="self-end">
            Total Contributions :{" "}
            {formatCurrency(accountStatements?.total_payment)}
          </p>
        </div>
        <div className="w-full  p-4 overflow-x-auto">
          <p className="font-bold text-xl">Expenditure</p>
          <GridTable
            rows={accountStatements?.expenditures || []}
            columns={expendituresColumns}
            name="Expenditures"
          />
          <p className="self-end">
            Total Expenditure :{" "}
            {formatCurrency(accountStatements?.total_expenditure)}
          </p>
        </div>
        {!hideBalance && (
          <div className="w-full p-4">
            <p className="font-bold text-xl">Account Balance</p>
            <p className="my-4 px-2">
              {accountStatements?.balance >= 0
                ? "Your Balance is: "
                : "Your owe us: "}
              {formatCurrency(Math.abs(accountStatements?.balance))}
            </p>
          </div>
        )}
      </section>
      <ReceiptModal />
    </main>
  );
}

export default AccountStatements;
const expendituresColumns: GridColDef[] = [
  { field: "reference_id", headerName: "ID", minWidth: 90 },
  { field: "purporse", headerName: "Expense", flex: 1, minWidth: 200 },
  {
    field: "date",
    headerName: "Date",
    valueFormatter: (params) => new Date(params).toDateString(),
    type: "date",
    minWidth: 150,
  },
  {
    field: "amount",
    headerName: "Amount(USD)",
    type: "number",
    minWidth: 150,
  },
];
type ContributionsColsProps = (
  onActionClick: (params: GridRenderCellParams) => void
) => GridColDef[];

const contributionsCols: ContributionsColsProps = (onActionClick) => [
  { field: "payment_intent_id", headerName: "ID", minWidth: 150 },
  { field: "purpose", headerName: "Purpose", flex: 1, minWidth: 150 },
  {
    field: "payment_method",
    headerName: "Payment Method",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "date_completed",
    headerName: "Date",
    minWidth: 150,
    flex: 1,
    valueFormatter: (params) => new Date(params).toDateString(),
    type: "date",
  },
  {
    field: "amount",
    headerName: "Amount(USD)",
    type: "number",
    minWidth: 100,
  },
  {
    field: "",
    headerName: "Action",
    renderCell: (params) => (
      <div className="col-center w-full h-full py-1 leading-none">
        <PrimaryBorderBtn onClick={() => onActionClick(params)}>
          Receipt
        </PrimaryBorderBtn>
      </div>
    ),
  },
];
