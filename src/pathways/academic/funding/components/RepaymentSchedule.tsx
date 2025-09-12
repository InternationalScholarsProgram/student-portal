import { GridColDef } from "@mui/x-data-grid";
import GridTable from "../../../../components/tables/GridTable";
import { formatCurrency, formatDate, splitDate } from "../../../../utils/utils";
import StatusChip from "../../../../components/StatusChip";
import Accordion from "../../../../components/Accordion";
import ContentComponent from "../../../../components/ContentComponent";
import { RepaymentSchedule as RepaymentType } from "../types/fundingTypes";
import { InlineLoader } from "../../../../components/loaders/Loader";

type Props = {
  schedulePayments?: RepaymentType[];
};

const RepaymentSchedule = ({ schedulePayments = [] }: Props) => {
  if (!schedulePayments?.length) return <InlineLoader />;

  return (
    <ContentComponent header="Repayment Schedule">
      <p>
        Your next payment of{" "}
        <strong>
          {formatCurrency(schedulePayments?.[0]?.scheduled_payment)}
        </strong>{" "}
        is due on{" "}
        <strong>
          {formatDate(splitDate(schedulePayments?.[0]?.maturity_date || ""))}
        </strong>
        . You can make a payment now — your repayment schedule will update
        automatically.
      </p>
      <div className="col gap-2 py-2 pb-4">
        <p>You can view you repayment schedule below</p>
        <Accordion title="Repayment Schedule" list={false} label>
          <GridTable
            name="Repayment Schedule"
            rows={schedulePayments || []}
            columns={columns}
          />
        </Accordion>
      </div>
    </ContentComponent>
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
  {
    field: "scheduled_payment",
    flex: 1,
    headerName: "To Pay",
    type: "number",
  },
  {
    field: "interest_rate",
    type: "number",
    flex: 1,
    headerName: "Interest",
  },
  {
    field: "new_balance",
    flex: 1,
    headerName: "New Balance",
    type: "number",
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => (
      <div className="row-center flex-1 h-full w-full">
        <p className="w-fit">
          <StatusChip type={params?.value} />
        </p>
      </div>
    ),
  },
];
