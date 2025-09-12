import { IconButton } from "@mui/material";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { formatDate } from "../../../../utils/utils";

function IntakeStatus({currentIntake} :{currentIntake: any}) {
  return (
    <>
      {currentIntake && (
        <div className="row items-center gap-2 border-b-30">
          <IconButton>
            <EventAvailableOutlinedIcon fontSize="medium" />
          </IconButton>
          <p>
            Ongoing Intake :
            <span className="px-2 font-bold first-letter:uppercase">
              {currentIntake?.intake_name}
            </span>
            from {formatDate(currentIntake?.start_date, "MMMM D, YYYY")} to{" "}
            {formatDate(currentIntake?.end_date, "MMMM D, YYYY")}
          </p>
        </div>
      )}
    </>
  );
}

export default IntakeStatus;
