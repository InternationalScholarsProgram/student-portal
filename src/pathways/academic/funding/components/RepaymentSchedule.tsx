// components/RepaymentSchedule.tsx
import { GridColDef } from "@mui/x-data-grid";
import GridTable from "../../../../components/tables/GridTable";
import Accordion from "../../../../components/Accordion";
import ContentComponent from "../../../../components/ContentComponent";
import StatusChip from "../../../../components/StatusChip";
import { InlineLoader } from "../../../../components/loaders/Loader";

import { formatCurrency, formatDate, splitDate } from "../../../../utils/utils";
import { RepaymentSchedule as RepaymentType } from "../types/fundingTypes";

type ChipType = "approved" | "pending" | "rejected" | "paid" | "not paid";

type Props = {
  schedulePayments?: RepaymentType[];
  pastPayments?: Array<{
    id: string | number;
    date_paid?: string;
    amount?: string | number;
    invoice_id?: string;
    status?: string;
  }>;
};

// Normalize arbitrary backend payment statuses to StatusChip's union
const normalizeStatusChip = (value?: string): ChipType => {
  const v = (value || "").toLowerCase().trim();

  if (["paid", "succeeded", "success", "completed", "complete", "settled"].includes(v)) {
    return "paid";
  }
  if (["pending", "scheduled", "processing", "in progress", "initiated"].includes(v)) {
    return "pending";
  }
  if (["rejected", "declined", "failed", "failure", "error", "canceled", "cancelled"].includes(v)) {
    return "rejected";
  }
  if (["approved", "accepted", "ok"].includes(v)) {
    return "approved";
  }
  if (["unpaid", "not paid", "overdue", "due", "missed"].includes(v)) {
    return "not paid";
  }

  // default: treat unknown statuses as pending
  return "pending";
};

const RepaymentSchedule = ({ schedulePayments = [], pastPayments = [] }: Props) => {
  if (!schedulePayments?.length && !pastPayments?.length) return <InlineLoader />;

  const upcoming = (schedulePayments || []).filter((r: any) => r?.status !== "Paid");
  const paidFromSchedule = (schedulePayments || []).filter((r: any) => r?.status === "Paid");

  // Build history from explicit pastPayments (preferred), or fallback to schedule rows marked Paid
  const history =
    (pastPayments?.length
      ? pastPayments.map((p, i) => ({
          id: i + 1,
          date_paid: p.date_paid || "",
          amount: Number(p.amount ?? 0),
          invoice_id: p.invoice_id ?? "",
          // Normalize to StatusChip union
          status: normalizeStatusChip(p.status),
        }))
      : paidFromSchedule.map((p: any, i: number) => ({
          id: i + 1,
          date_paid: p?.maturity_date ?? "",
          amount: Number(p?.scheduled_payment ?? 0),
          invoice_id: "",
          status: normalizeStatusChip("paid"),
        }))) || [];

  return (
    <ContentComponent header="Repayment Schedule">
      {upcoming?.length > 0 && (
        <p>
          Your next payment of{" "}
          <strong>
            {formatCurrency(Number((upcoming[0] as any)?.scheduled_payment || 0))}
          </strong>{" "}
          is due on{" "}
          <strong>
            {formatDate(
              splitDate(String((upcoming[0] as any)?.maturity_date || "")),
              "MMM D, YYYY"
            )}
          </strong>
          . You can make a payment now — your repayment schedule will update automatically.
        </p>
      )}

      <div className="col gap-2 py-2 pb-4">
        {/* Payment History FIRST */}
        <Accordion title="Payment History" list={false} label>
          <GridTable name="Payment History" rows={history} columns={historyColumns} />
        </Accordion>

        {/* Upcoming AFTER */}
        <Accordion title="Upcoming Payments" list={false} label>
          <GridTable name="Upcoming Payments" rows={upcoming} columns={upcomingColumns} />
        </Accordion>
      </div>
    </ContentComponent>
  );
};

export default RepaymentSchedule;

/* ===== Columns ===== */
const upcomingColumns: GridColDef[] = [
  { field: "id", headerName: "No", width: 70, renderCell: (p) => String(p?.row?.id ?? "") },
  {
    field: "maturity_date",
    headerName: "Maturity Date",
    flex: 1,
    renderCell: (p) => {
      const raw = p?.row?.maturity_date as string;
      return raw ? formatDate(splitDate(raw), "MMM D, YYYY") : "";
    },
  },
  {
    field: "scheduled_payment",
    flex: 1,
    headerName: "To Pay",
    type: "number",
    renderCell: (p) => formatCurrency(Number(p?.row?.scheduled_payment ?? 0)),
  },
  {
    field: "interest_rate",
    type: "number",
    flex: 1,
    headerName: "Interest",
    renderCell: (p) => String(Number(p?.row?.interest_rate ?? 0)),
  },
  {
    field: "new_balance",
    flex: 1,
    headerName: "New Balance",
    type: "number",
    renderCell: (p) => formatCurrency(Number(p?.row?.new_balance ?? 0)),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (p) => (
      <div className="row-center flex-1 h-full w-full">
        <p className="w-fit">
          <StatusChip type={normalizeStatusChip(p?.row?.status as string)} />
        </p>
      </div>
    ),
  },
];

const historyColumns: GridColDef[] = [
  { field: "id", headerName: "No", width: 70, renderCell: (p) => String(p?.row?.id ?? "") },
  {
    field: "date_paid",
    headerName: "Date Paid",
    flex: 1,
    renderCell: (p) => {
      const raw = p?.row?.date_paid as string;
      return raw ? formatDate(splitDate(raw), "MMM D, YYYY") : "";
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    type: "number",
    renderCell: (p) => formatCurrency(Number(p?.row?.amount ?? 0)),
  },
  {
    field: "invoice_id",
    headerName: "Invoice",
    flex: 1,
    renderCell: (p) => String(p?.row?.invoice_id ?? ""),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (p) => (
      <div className="row-center flex-1 h-full w-full">
        <p className="w-fit">
          {/* p.row.status is already normalized in history mapping, but normalize again for safety */}
          <StatusChip type={normalizeStatusChip(p?.row?.status as string)} />
        </p>
      </div>
    ),
  },
];
