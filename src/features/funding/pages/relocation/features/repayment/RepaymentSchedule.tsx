import { GridColDef } from "@mui/x-data-grid";
import GridTable from "../../../../../../components/tables/GridTable";
import useRelocation from "../../services/useRelocation";
import { formatDate } from "../../../../../../utils/utils";
import StatusChip from "../../../../../../components/StatusChip";

const RepaymentSchedule = () => {
  const { schedulePayments } = useRelocation();
  return (
    <GridTable
      name="Repayment Schedule"
      rows={schedulePayments || []}
      columns={columns}
    />
  );
};

export default RepaymentSchedule;
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "No",
    width: 50,
    valueGetter: (params) => params - 1,
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
    renderCell: (params) => (
      <div className="row-center flex-1 h-full w-full">
        <p className="w-fit">
          <StatusChip type={params?.value} />
        </p>
      </div>
    ),
  },
];
