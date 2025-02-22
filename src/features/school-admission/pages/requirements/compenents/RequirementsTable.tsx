import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { columns } from "./TableData";
import useAdmissions from "../../../services/useAdmissions";
import Loader from "../../../../../components/loaders/Loader";
import GridTable from "../../../../../components/tables/GridTable";

function RequirementsTable() {
  const { appDocs, uploadedDocs, proposedSchools, consentsWithSchool } =
    useAdmissions();

  if (!appDocs || !uploadedDocs) return <Loader />;

  const filterUploadedDocs = (docType: string) => {
    if (uploadedDocs.length === 0) return [];
    return uploadedDocs
      .filter((doc) => doc.doc_id?.toString() === docType)
      .map(({ id: _id, ...other }) => other);
  };

  const rowData = appDocs
    ?.filter((item) => !(item.id === "3" && proposedSchools?.length === 0))
    ?.map((item) => ({
      ...item,
      uploaded_documents: filterUploadedDocs(item.id) || [],
      schools: proposedSchools,
      consents: consentsWithSchool,
    }));

  return (
    <GridTable
      columns={columns}
      rows={rowData}
      getRowId={(row) => row.id}
      name="School Admission"
      getRowHeight={(params) => {
        if (params.id === "3" && params.model.schools.length > 0) return "auto";
        if (params.id === "14" && params.model.consents) return "auto";
        return null;
      }}
    />
  );
}

const RequirementsAccordion = () => (
  <div className="col mx-2 my-5 gap-3">
    <Accordion>
      <AccordionSummary
        sx={{
          boxShadow: 2,
          filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))",
          borderRadius: "5px",
        }}
        expandIcon={<GridExpandMoreIcon />}
      >
        <h3 className="opacity-70 font-semibold flex items-center gap-2">
          <EventAvailableOutlinedIcon /> Schools Application Requirements
          Checklist
        </h3>
      </AccordionSummary>
      <AccordionDetails>
        <RequirementsTable />
      </AccordionDetails>
    </Accordion>
  </div>
);
export { RequirementsAccordion };
export default RequirementsTable;
