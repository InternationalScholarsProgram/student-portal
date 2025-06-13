import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import HistoryIcon from "@mui/icons-material/History";

import useFlightHook from "../../travel/flights/services/useFlightHook";
import useTickets from "../../tickets/hooks/useTickets";
import useAccountStatement from "../../../services/hooks/useAccountStatement";
import { formatDate, formatDateAndTime } from "../../../utils/utils";
import GridTable from "../../../components/tables/GridTable";

type Rows = {
  module: string;
  description: string;
  link: string;
};

function Activities() {
  const isWithinLast30Days = (date: string) => {
    const diffInDays = dayjs().diff(dayjs(date), "day");
    return diffInDays >= 0 && diffInDays <= 30;
  };
  const [rows, setRows] = useState<Rows[]>([]);
  const { orderHistory, isLoading: flightLoading } = useFlightHook();
  const { openTickets, isLoading: ticketLoading } = useTickets();
  const { accountStatements } = useAccountStatement();

  const getRecentFinances = () => {
    const expenditures =
      accountStatements?.expenditures
        ?.filter((expenditure) => isWithinLast30Days(expenditure.date))
        ?.map((expenditure) => ({
          module: "Expenditure",
          description: `Account debited on ${formatDate(
            expenditure.date
          )} for ${expenditure.purporse}.`,
          link: `/account-statements`,
        }))
        ?.slice(0, 2) ?? [];

    const payments =
      accountStatements?.payments
        ?.filter((payment) => isWithinLast30Days(payment.date_completed))
        ?.map((payment) => ({
          module: "Payment",
          description: `Payment was made on ${formatDate(
            payment.date_completed
          )} for ${payment.purpose}.`,
          link: `/account-statements`,
        })) ?? [];

    return [...expenditures, ...payments];
  };

  const getTickets = () => {
    const tickets = openTickets?.map((ticket) => ({
      module: "Ticket",
      description: ` ${ticket?.category}. ${
        ticket.issue
      }. Opened at ${formatDateAndTime(ticket?.ticket_date)}`,
      link: `/view-tickets`,
    }));

    return tickets && tickets?.length > 0 ? tickets : [];
  };

  const getUpcomingFlight = (): Rows[] => {
    return (
      orderHistory
        ?.filter((order) => {
          const date = order.departure_time?.replace("TANYT", "");
          return dayjs().diff(dayjs(date), "day") < 0;
        })
        .map((order) => {
          const date = order.departure_time?.replace("TANYT", "");
          return {
            module: "Flight",
            description: `You have an upcoming flight on ${formatDate(date)}`,
            link: `/flights`,
          };
        }) ?? []
    );
  };

  const getRows = () => {
    const rows = getUpcomingFlight();
    const tickets = getTickets();
    const finances = getRecentFinances();
    const data = [...rows, ...tickets, ...finances].filter(Boolean);
    setRows(data.map((row, index) => ({ ...row, id: index })));
  };

  useEffect(() => {
    getRows();
  }, [flightLoading, ticketLoading]);
  return (
    <div>
      <b className="text-primary-light">
        <HistoryIcon /> Upcoming and recent activities
      </b>
      <div className="w-full min-h-[20vh]">
        <GridTable
          name="dashboard"
          columns={[
            { field: "module", headerName: "Module" },
            {
              field: "description",
              headerName: "Description",
              flex: 1,
              renderCell: (params) => (
                <span className="w-full py-2">{params.row.description}</span>
              ),
            },
            {
              field: "link",
              headerName: "Action",
              renderCell: (params) => (
                <Link className="text-primary-main" to={params.row.link}>
                  View
                </Link>
              ),
            },
          ]}
          rows={rows}
          getCellClassName={(_params) => "row-center py-5"}
          getRowHeight={(_params) => "auto"}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}

export default Activities;
