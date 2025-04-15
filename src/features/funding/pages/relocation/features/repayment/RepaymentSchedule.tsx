import { GridColDef } from "@mui/x-data-grid";
import GridTable from "../../../../../../components/tables/GridTable";
import useRelocation from "../../services/useRelocation";
import { formatDate } from "../../../../../../utils/utils";
import StatusChip, {
  handleType,
} from "../../../../../../components/StatusChip";

const RepaymentSchedule = () => {
  const { schedulePayments } = useRelocation();
  return (
    <div>
      <p className="title-sm">Your repayment schedule</p>
      <GridTable
        name="Repayment Schedule"
        rows={schedulePayments || []}
        columns={columns}
      />
    </div>
  );
};

export default RepaymentSchedule;
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    colSpan: (value, row) => {
      if (row.id === "transcripts") return 99;
      return undefined;
    },
  },
  {
    field: "maturity_date",
    headerName: "Maturity Date",
    flex: 1,
    valueGetter: (params) => formatDate(new Date(params), "MMM D, YYYY"),
  },
  // {
  //   field: "starting_balance",
  //   flex: 1,
  //   headerName: "Starting Balance",
  //   headerClassName: "p-0 m-0",
  // },
  {
    field: "scheduled_payment",
    flex: 1,
    headerName: "To Pay",
  },
  {
    field: "interest_rate",
    flex: 1,
    headerName: "Interest",
  },
  // {
  //   field: "principal_payment",
  //   flex: 1,
  //   headerName: "Principal",
  // },
  {
    field: "new_balance",
    flex: 1,
    headerName: "New Balance",
  },
  {
    field: "status",
    headerName: "Status",
    valueGetter: () => "not paid",
    // cellClassName: (params) => handleType(params.row.status),
    renderCell: (params) => <StatusChip type={params?.value} />,
  },
];
