import { Paper } from "@mui/material";
import GetApplicationStatus from "./GetApplicationStatus";

function SchoolApplicationStatus({ appliedSchools }: any) {
  return (
    <section className="py-2">
      <h3 className="border-b-30 p-2 text-lg title-sm text-primary-main">
        School Application Status
      </h3>
      <p>
        The following are the statuses of your school application request.
        Please be patient as our team processes the request. You will receive
        all status updates here
      </p>
      <div className="sm:m-[5%] p-4 gap-5 col">
        {appliedSchools?.map((item: any, index: number) => (
          <Paper
            // onClick={() => console.log(item)}
            elevation={8}
            key={index}
            className="card borders rounded-sm"
          >
            <p className="px-3 py-2 font-semibold opacity-75 rounded-sm flex-1">
              {index + 1}. {item?.school_name} - {item?.program_name}
            </p>
            <div className="col gap-1 pb-1 px-4 rounded-sm flex-1">
              <GetApplicationStatus
                status={item?.application_details?.app_status || "11"}
                school={item}
              />
            </div>
          </Paper>
        ))}
      </div>
    </section>
  );
}
export default SchoolApplicationStatus;
