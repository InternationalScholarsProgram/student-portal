import { GPAReport } from "../../../types/types";

function GPAstatus({ gpaReport }: { gpaReport: GPAReport }) {
  const gpaStatus = () => {
    switch (gpaReport.gpa_status) {
      case 1:
        return "Waiting Approval";
      case 2:
        return "Pending";
      case 3:
        return (
          <div className="row text-sm gap-2">
            <span className="text-error-main">Rejected </span>
            <span>({gpaReport.gpa_remark})</span>
          </div>
        );

      case 4:
        return (
          <p className="text-sm">
            <span className="text-secondary-main">Approved </span>(
            {gpaReport.gpa} GPA points)
          </p>
        );
    }
  };
  return <div>{gpaReport.gpa_doc ? gpaStatus() : "Not Uploaded"}</div>;
}

export default GPAstatus;
