import CareerAdvisory from "../../../../components/career-advisory/CareerAdvisory";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import useAdmissions from "../services/useAdmissions";
import ContentComponent from "../../../../components/ContentComponent";
import GridTable from "../../../../components/tables/GridTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToolTip from "../../../../components/ToolTip";

function ProposedSchools() {
  const { proposedSchools, canMakeSchoolApplication } = useAdmissions();
  return (
    <ContentComponent
      header={
        <>
          <SchoolIcon /> School Application Requirements
        </>
      }
      className="col gap-2"
    >
      <p>
        To complete your application, click the folder icon next to each
        proposed school to open its submission tab. Upload all the required
        documents. Once your documents are approved, proceed to request the
        school application.
      </p>

      <GridTable
        name="School Application Requirements"
        rows={
          proposedSchools?.map((item, index) => ({ ...item, no: index + 1 })) ||
          []
        }
        columns={[
          { field: "no", headerName: "No", width: 10 },
          {
            field: "school_name",
            headerName: "School Name & Program",
            flex: 1,
            valueGetter: (value, row) => `${value} - ${row?.program_name}`,
          },
          {
            field: "",
            headerName: "Action",
            width: 100,
            sortable: false,
            cellClassName: "row-center",
            renderCell: (params) => (
              <ToolTip title="View School">
                <Link
                  className="text-primary-main w-fit"
                  to={`/pathways/academic/school-admission/requirements/view-school`}
                  state={{
                    schoolId: params.row?.school_id,
                    courseId: params.row?.course,
                  }}
                >
                  <VisibilityIcon />
                </Link>
              </ToolTip>
            ),
          },
        ]}
      />

      <p className="py-3">
        Do you wish to apply to a different school or course ? Kindly submit
        another career advisory request.
      </p>
      <div className="self-end row my-2 gap-2">
        <CareerAdvisory
          classes={canMakeSchoolApplication ? "text-btn" : "primary-border-btn"}
          text="Book Career Advisory"
        />
      </div>
    </ContentComponent>
  );
}

export default ProposedSchools;
