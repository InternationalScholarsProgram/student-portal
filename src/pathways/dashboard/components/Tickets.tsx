import { IconButton } from "@mui/material";
import { formatDateAndTime } from "../../../utils/utils";
import useTickets from "../../tickets/hooks/useTickets";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Link } from "react-router-dom";

function Tickets() {
  const { openTickets, allTickets } = useTickets();

  return (
    <div className="col">
      <h3 className="title-sm text-primary-main">
        <IconButton>
          <SupportAgentOutlinedIcon />
        </IconButton>
        Your Open Tickets
      </h3>
      {allTickets?.map((ticket, index) => (
        <div key={index} className="row gap-2 p-4">
          <p>
            {ticket?.category}. {ticket.issue}
          </p>
          <p>Opened at {formatDateAndTime(ticket?.ticket_date)}</p>
          <Link className="text-primary-main" to={`/view-tickets`}>
            View Ticket
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Tickets;
