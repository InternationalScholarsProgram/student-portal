import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import VisibilityIcon from "@mui/icons-material/Visibility";

import UploadModal from "./compenents/UploadModal";
import useAdmissions from "../../services/useAdmissions";
import api from "../../../../services/api/base";
import GridTable from "../../../../components/tables/GridTable";
import ContentComponent from "../../../../components/ContentComponent";
import PrimaryBorderBtn from "../../../../components/buttons/PrimaryBorderBtn";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import useApplicationDocs from "../../services/useApplicationDocs";

export default function ViewSchool(): JSX.Element {
  const { schoolId, courseId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  const openModal = (doc: any | null) => {
    setSelectedDoc(doc);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDoc(null);
  };

  const {
    status: statusData,
    currentIntake: intake,
    schoolAppId,
    proposedSchools,
  } = useAdmissions();
  const { requirementDocs } = useApplicationDocs(schoolId, courseId);

  const schoolData = proposedSchools?.find((s) => s?.school_id === schoolId);
  const closed = Boolean(
    schoolData?.id && new Date() > new Date(schoolData.intake_end)
  );

  /** --- MUTATIONS --- */
  const uploadMutation = useMutation<void, Error, FormData>({
    mutationFn: (formData: any) =>
      api.post(
        `/school_app_docs_upload.php?school_app_id=${schoolAppId}&intake_id=${intake?.id}`,
        formData
      ),
    onSuccess: () => {
      // qc.invalidateQueries(["uploadedDocs", "appDocs", "statusCheck"]);
    },
  });

  const submitAppMutation = useMutation<void, Error>({
    mutationFn: () =>
      api.post("/school_application.php", {
        proposed_course_id: statusData?.proposed_courses?.find(
          (s: any) => s.school_id === Number(schoolId)
        )?.id,
        intake: intake?.id,
      }),
    onSuccess: () => alert("Application submitted successfully"),
    onError: (err) =>
      alert(
        (err as any).response?.data?.message || "Application submission failed"
      ),
  });

  const columns: GridColDef[] = [
    { field: "uniqueId", headerName: "No", width: 60 },
    {
      field: "item_name",
      headerName: "Item",
      flex: 1,
      renderCell: (params) => (
        <a
          href={params.row.sample_link}
          target="_blank"
          rel="noreferrer"
          className="underline text-blue-600"
        >
          {params.value}
        </a>
      ),
    },
    { field: "description", headerName: "Instructions", flex: 1 },
    {
      field: "docs",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const s = params.value?.status as number;
        const map: Record<number, string> = {
          1: "bg-yellow-100 text-yellow-800",
          2: "bg-green-100 text-green-800",
          3: "bg-red-100 text-red-800",
        };
        const label = { 1: "Pending", 2: "Approved", 3: "Rejected" }[s];
        return (
          <span className={`${map[s] || ""} px-2 py-1 rounded text-sm`}>
            {label || "Not Uploaded"}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <button onClick={() => openModal(params.row)} className="p-1">
          <VisibilityIcon className="h-5 w-5 text-blue-600" />
        </button>
      ),
    },
  ];

  return (
    <main className="">
      {/* Header */}
      <div className=" shadow rounded mb-6">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-semibold">
            {schoolData?.school_name} — ({schoolData?.program_name})
          </h2>
          <p className="mt-1 text-gray-600">
            Intake Dates:{" "}
            <span className="font-medium">
              {dayjs(schoolData?.intake_start).format("MMM D, YYYY")}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {dayjs(schoolData?.intake_end).format("MMM D, YYYY")}
            </span>
          </p>
        </div>

        {/* Application */}
        <ContentComponent header="School Application">
          {closed ? (
            <p className="text-red-600">
              School intake has <strong>closed</strong>.
            </p>
          ) : requirementDocs?.every((d) => d.docs?.status === 2) ? (
            <div className="col">
              <p className="">
                Your documents are approved. You may now submit your application
                request.
              </p>
              <p>
                School application cost:{" "}
                <strong>
                  {schoolData?.application_cost === "Waived"
                    ? "Waived"
                    : `$${schoolData?.application_cost}`}
                </strong>
              </p>
              <PrimaryBtn
                className="self-end"
                onClick={() => submitAppMutation.mutate()}
              >
                {submitAppMutation.isPending
                  ? "Submitting..."
                  : "Request Application"}
              </PrimaryBtn>
            </div>
          ) : (
            <p className="text-red-600">
              You are not yet eligible. Please upload all required documents.
            </p>
          )}
        </ContentComponent>
      </div>

      {/* Requirements */}
      <div className="">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">Required Documents</h3>
          <PrimaryBorderBtn onClick={() => openModal(null)}>
            Add Extra Document
          </PrimaryBorderBtn>
        </div>
        <div style={{ width: "100%" }}>
          <GridTable
            name="requirements"
            rows={requirementDocs || []}
            columns={columns}
            pageSizeOptions={[20, -1]}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            getRowId={(row) => row.uniqueId}
          />
        </div>
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <UploadModal
          open={modalOpen}
          onClose={closeModal}
          doc={selectedDoc}
          intakeId={intake?.id}
          appId={schoolAppId || ""}
          onSubmit={(formData) => uploadMutation.mutate(formData)}
        />
      )}
    </main>
  );
}
