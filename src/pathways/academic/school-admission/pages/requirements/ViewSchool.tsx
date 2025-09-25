import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Skeleton, Stack } from "@mui/material";

import UploadModal from "./compenents/UploadModal";
import useAdmissions from "../../services/useAdmissions";
import GridTable from "../../../../../components/tables/GridTable";
import PrimaryBorderBtn from "../../../../../components/buttons/PrimaryBorderBtn";
import PrimaryBtn from "../../../../../components/buttons/PrimaryBtn";
import useApplicationDocs from "../../services/useApplicationDocs";
import StatusChip from "../../../../../components/StatusChip";
import { formatDate } from "../../../../../utils/utils";
import useGlobalStore from "../../../../../services/global.store";
import { admissionAPIs } from "../../services/admissionAPIs";
import { toast } from "react-toastify";
import { errorMsg } from "../../../../../components/errors/errorMsg";

export default function ViewSchool(): JSX.Element {
  const { state } = useLocation();
  const { schoolId, courseId } = state || {};
  const [disabled, setDisabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  // 🔔 NEW: local “instant UI” switch after submit
  const [justSubmitted, setJustSubmitted] = useState(false);

  const queryClient = useQueryClient();

  const { currentIntake, proposedSchools, schoolAppId } = useAdmissions();
  const { requirementDocs, invalidateQuery, isLoading } = useApplicationDocs(
    schoolId,
    courseId
  );
  const { setBreadCrumbsLabel } = useGlobalStore();
  const navigate = useNavigate();

  const schoolData = proposedSchools?.find((s) => s?.school_id === schoolId);

  // ── Status detection (mirror GetApplicationStatus)
  const rawAppStatus =
    schoolData?.application_details?.app_status ??
    (schoolData as any)?.app_status ??
    null;

  const statusForDecision = rawAppStatus ? String(rawAppStatus) : null;
  const isRejectedByAppStatus = statusForDecision === "11";
  const isRejectedByFlag =
    String(schoolData?.application_status || "").toLowerCase() === "rejected";
  const isRejectedServer = isRejectedByAppStatus || isRejectedByFlag;

  const isAppliedFlag =
    String(schoolData?.application_status || "").toLowerCase() === "applied";

  // After submit, treat as not-rejected and already-submitted immediately
  const isRejected = isRejectedServer && !justSubmitted;

  const hasExistingApplication = Boolean(statusForDecision || isAppliedFlag);
  const showAlreadySubmitted = !isRejected && (hasExistingApplication || justSubmitted);

  useEffect(() => {
    setBreadCrumbsLabel("Application Requirements");
    // Disable if there’s an app and it’s not rejected OR if we just submitted now.
    setDisabled((hasExistingApplication && !isRejectedServer) || justSubmitted);
  }, [schoolId, hasExistingApplication, isRejectedServer, justSubmitted, setBreadCrumbsLabel]);

  const closed = Boolean(
    schoolData?.id && new Date() > new Date(schoolData.intake_end)
  );

  const openModal = (doc: any | null) => {
    setSelectedDoc(doc);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDoc(null);
  };

  const submitAppMutation = useMutation({
    mutationFn: () =>
      admissionAPIs.submitSchoolApplication({
        proposed_course_id: schoolData?.id,
        intake: currentIntake?.id,
      }),
    onSuccess: () => {
      // Instant UI flip
      setJustSubmitted(true);
      setDisabled(true);

      // Refresh server-backed state in the background
      invalidateQuery?.(); // docs table
      queryClient.invalidateQueries({
        predicate: (q) => {
          const k = Array.isArray(q.queryKey) ? q.queryKey.join("|").toLowerCase() : "";
          return (
            k.includes("admissions") ||
            k.includes("proposed") ||
            k.includes("application") ||
            k.includes("school-app") ||
            k.includes("school_admission") ||
            k.includes("requirements")
          );
        },
      });

      toast.success(
        isRejectedServer
          ? "Application resubmitted successfully"
          : "Application submitted successfully"
      );
    },
    onError: (err) => toast.error(errorMsg(err)),
  });

  if (!schoolId || !courseId) return <p>Missing school/course context.</p>;
  if (!schoolData) return <p>School not found</p>;

  if (isLoading)
    return (
      <Stack spacing={1} direction="column" className="w-full h-[80dvh]">
        <Skeleton variant="text" height={200} />
        <Skeleton variant="rounded" className="w-full flex-1" />
      </Stack>
    );

  return (
    <main>
      <div>
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
          <h3 className="title-sm mb-2 text-primary-main">Make school application</h3>

          <div className="col card sm:p-3 p-1">
            {closed ? (
              <p className="p-3">
                The intake period for this application{" "}
                <StatusChip type="rejected" label="closed" /> on{" "}
                <b>{formatDate(schoolData?.intake_end)}</b>. You can no longer submit an
                application.
              </p>
            ) : isRejected ? (
              <>
                <p>
                  Your previous application was{" "}
                  <StatusChip type="rejected" label="rejected" />. You may review your
                  documents below and resubmit your application.
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
                  disabled={submitAppMutation.isPending}
                >
                  {submitAppMutation.isPending ? "Resubmitting..." : "Resubmit Application"}
                </PrimaryBtn>
              </>
            ) : showAlreadySubmitted ? (
              <p className="py-3">
                You have already submitted an application request for this school.
                <br />
                <Link
                  className="text-primary-main"
                  to={`/pathways/academic/school-admission/application`}
                >
                  View Application Status
                </Link>
              </p>
            ) : requirementDocs?.every((d) => d.docs?.status === 2) ? (
              <>
                <p>
                  Your documents have been approved. You are now ready to submit your school
                  application request. Please note, you can only submit an application request
                  for each school at a time.
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
                  disabled={submitAppMutation.isPending}
                >
                  {submitAppMutation.isPending ? "Submitting..." : "Request Application"}
                </PrimaryBtn>
              </>
            ) : (
              <p>
                You are currently{" "}
                <StatusChip type="rejected" label="not eligible" /> to submit an application.
                <br />
                To become eligible, please upload all the required documents listed below and
                wait for their approval.
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
  { field: "item_name", headerName: "Item", minWidth: 200 },
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
