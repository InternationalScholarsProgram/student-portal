import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { columns } from "./TableData";
import useAdmissions from "../../../services/useAdmissions";
import Loader from "../../../../../components/loaders/Loader";
import GridTable from "../../../../../components/tables/GridTable";

function Requirements() {
  const { appDocs, uploadedDocs, proposedSchools } = useAdmissions();
  if (!appDocs?.data || !uploadedDocs) return <Loader />;

  const filterUploadedDocs = (docType: any) => {
    if (uploadedDocs.length === 0) return [];
    const uploadedDocById = uploadedDocs
      ?.filter((uploadedDoc: any) => uploadedDoc.doc_id?.toString() === docType)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ?.map(({ id, item_name, ...other }: any) => other);
    return uploadedDocById;
  };

  const rowData = appDocs.data
    .filter((item: any) => !(item.id === "3" && proposedSchools?.length === 0))
    .map((item: any) => ({
      ...item,
      uploaded_documents: filterUploadedDocs(item.id) || [],
      schools: proposedSchools,
    }));

  return (
    <div className="w-full h-fit">
      <GridTable
        columns={columns}
        rows={rowData}
        getRowId={(row) => row.id}
        name="School Admission"
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        getRowHeight={(params) => {
          if (params.id === "3" && params.model.schools.length > 0)
            return "auto";
          return null;
        }}
      />
    </div>
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
        <Requirements />
      </AccordionDetails>
    </Accordion>
  </div>
);
export { RequirementsAccordion };
export default Requirements;
