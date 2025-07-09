import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

import UploadModal from "./compenents/UploadModal";
import useAdmissions from "../../services/useAdmissions";
import api from "../../../../services/api/base";
import GridTable from "../../../../components/tables/GridTable";
import PrimaryBorderBtn from "../../../../components/buttons/PrimaryBorderBtn";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import useApplicationDocs from "../../services/useApplicationDocs";
import StatusChip from "../../../../components/StatusChip";
import { formatDate } from "../../../../utils/utils";
import { Skeleton, Stack } from "@mui/material";
import useGlobalStore from "../../../../services/global.store";
import { admissionAPIs } from "../../services/admissionAPIs";
import { toast } from "react-toastify";
import { errorMsg } from "../../../../components/errors/errorMsg";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ViewSchool(): JSX.Element {
  const { state } = useLocation();
  const { schoolId, courseId } = state || {};
  const [disabled, setDisabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
  const { currentIntake, proposedSchools, schoolAppId } = useAdmissions();
  const { requirementDocs, invalidateQuery, isLoading } = useApplicationDocs(
    schoolId,
    courseId
  );
  const { setBreadCrumbsLabel } = useGlobalStore();

  const openModal = (doc: any | null) => {
    console.log(doc, "doc");
    setSelectedDoc(doc);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDoc(null);
  };
  const navigate = useNavigate();
  const schoolData = proposedSchools?.find((s) => s?.school_id === schoolId);
  const submitAppMutation = useMutation({
    mutationFn: () =>
      admissionAPIs.submitSchoolApplication({
        proposed_course_id: schoolData?.id,
        intake: currentIntake?.id,
      }),
    onSuccess: () => toast.success("Application submitted successfully"),
    onError: (err) => toast.error(errorMsg(err)),
  });

  useEffect(() => {
    setBreadCrumbsLabel("Application Requirements");
    setDisabled(schoolData?.application_status === "applied");
  }, [schoolId, schoolData?.application_status]);

  if (!schoolId || !courseId) {
    // Handle fallback (e.g., redirect or show error)
  }
  if (!schoolData) return <p>School not found</p>;
  if (isLoading)
    return (
      <Stack spacing={1} direction="column" className="w-full h-[80dvh]">
        <Skeleton variant="text" height={200} />
        <Skeleton variant="rounded" className="w-full flex-1" />
      </Stack>
    );

  const closed = Boolean(
    schoolData?.id && new Date() > new Date(schoolData.intake_end)
  );

  console.log("schoolData:", schoolData);
  console.log("schoolData.application_status:", schoolData?.application_status);
  console.log("requirementDocs status:", requirementDocs?.map((d) => d.docs?.status));
  console.log("intake_end:", schoolData?.intake_end);
  console.log("new Date(schoolData.intake_end):", new Date(schoolData.intake_end));
  console.log("closed:", closed);
  return (
    <main>
      <div className="">
        <button
          onClick={() => navigate(-1)}
          className="row-center gap-2 rounded-full p-2 shadow transition hover:text-primary-light"
        >
          <ArrowBackIcon fontSize="small" />
          <span className="text-sm font-medium">Back&nbsp;</span>
        </button>
        <div className="border-b my-4">
          <h2>
            {schoolData?.school_name} — ({schoolData?.program_name})
          </h2>
          <p className="mt-1">
            Intake Dates: <b>{formatDate(schoolData?.intake_start)}</b> to{" "}
            <b>{formatDate(schoolData?.intake_end)}</b>
          </p>
        </div>

        <div className="py-2">
          <h3 className="title-sm mb-2 text-primary-main">
            Make school application
          </h3>
          <div className="col card sm:p-3 p-1">
            {schoolData?.application_status === "applied" ? (
              <p className="py-3">
                You have already submitted an application request for this
                school. <br />
                <Link
                  className="text-primary-main"
                  to={`/school-admission/application`}
                >
                  View Application Status
                </Link>
              </p>
            ) : closed ? (
              <>
                <p className="p-3">
                  The intake period for this application {" "}
                  <StatusChip type="rejected" label="closed" /> on <b>{formatDate(schoolData?.intake_end)}</b>. You can no longer submit an application.
                </p>
              </>
            ) : requirementDocs?.every((d) => d.docs?.status === 2) ? (
              <>
                <p className="">
                  Your documents have been approved. You are now ready to submit
                  your school application request. Please note, you can only
                  submit an application request for each school at a time.
                  Please use the button below to submit your school application
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
              </>
            ) : (
              <p className="">
                You are currently{" "}
                <StatusChip type="rejected" label="not eligible" /> to submit an
                application.
                <br />
                To become eligible, please upload all the required documents
                listed below and wait for their approval.
              </p>
            )}
          </div>
        </div>
      </div>

      {closed ? null : (
        <div className="my-2">
          <div className="row justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">Required Documents</h3>
            {disabled ? null : (
              <PrimaryBorderBtn onClick={() => openModal(null)}>
                Add Extra Document
              </PrimaryBorderBtn>
            )}
          </div>
          <GridTable
            name="requirements"
            rows={requirementDocs}
            loading={isLoading}
            columns={columns(openModal)}
            pageSizeOptions={[20, -1]}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            getRowId={(row) => row.uniqueId}
          />
        </div>
      )}

      <UploadModal
        open={modalOpen}
        onClose={closeModal}
        disabled={disabled}
        payload={{
          intakeId: currentIntake?.id,
          invalidateQuery,
          applicationId: schoolAppId,
          proposed_course_id: schoolData.id,
        }}
        row={selectedDoc}
      />
    </main>
  );
}

const columns: (openModal: any) => GridColDef[] = (openModal) => [
  { field: "uniqueId", headerName: "No", width: 60 },
  {
    field: "item_name",
    headerName: "Item",
    minWidth: 200,
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
    field: "",
    headerName: "Action",
    width: 70,
    sortable: false,
    cellClassName: "row-center",
    renderCell: (params) => (
      <button onClick={() => openModal(params.row)} className="p-1">
        <VisibilityIcon className="h-5 w-5 text-blue-600" />
      </button>
    ),
  },
];
