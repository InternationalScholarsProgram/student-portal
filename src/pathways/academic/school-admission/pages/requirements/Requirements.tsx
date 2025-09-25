import Guides from "../../components/Guides";
import { SkeletonLoader } from "../../../../../components/loaders/Loader";
import BookMeeting from "../../components/BookMeeting";
import Meeting from "../../components/Meeting";
import useAdmissions from "../../services/useAdmissions";
import NoOpenIntakes from "../../components/NoOpenIntakes";
import EligibilityStatusCheck from "../../components/EligibilityStatusCheck";
import Transcripts from "./compenents/transcripts/Transcripts";
import ProposedSchools from "../../components/ProposedSchools";
import IntakeStatus from "../../components/IntakeStatus";

import { useQuery } from "@tanstack/react-query";
import contractService from "../../../../user/contracts/services/apis";
import CheckApplicationContract from "./compenents/CheckApplicationContract";
import { admissionAPIs } from "../../services/admissionAPIs";

// ---------- Types ----------
type ApiResponse<T> = { code: number; status: string; message: T };
type MeetingPayload = {
  date?: string;
  time?: string;
  zoom_link?: string;
  reschedule_url?: string;
  cancel_url?: string;
  end_time?: string;
  advisor?: string;
  remark?: string;
  status?: string | number;
  meeting_status?: string | number;
  end_of_ban?: string | { date?: string };
} | null;

// ---------- Component ----------
export default function Requirements() {
  const {
    eligibility,
    isLoadingEligibility,
    status,          // status_check response (has .code)
    isLoading,
    currentIntake,
    transcripts,
    user,            // ensure useAdmissions returns user with .email
  } = useAdmissions();

  const email = user?.email ?? "";

  // Gate contract only when user is at booking stage (status.code === 2)
  const { data: unsignedContract, isLoading: isLoadingContract } = useQuery<
    ApiResponse<any> | null
  >({
    queryKey: ["school-app-contract", "consent_type=1"],
    queryFn: async () => {
      // Always return something (null if nothing) so React Query never receives undefined
      const res = await contractService.checkSchoolApplication();
      return (res ?? null) as any;
    },
    enabled: status?.code === 2,
  });

  // Fetch meeting status (check_meeting_status) — needs student email
  const {
    data: meetingResp,
    isLoading: isLoadingMeeting,
  } = useQuery<ApiResponse<MeetingPayload> | null>({
    queryKey: ["meeting-status", email],
    queryFn: async ({ queryKey }) => {
      const [, e] = queryKey as [string, string];
      if (!e) return null;
      // admissionAPIs.checkMeetingStatus must accept (email: string)
      const res = await admissionAPIs.checkMeetingStatus(e);
      return (res ?? null) as ApiResponse<MeetingPayload> | null;
    },
    enabled: Boolean(email),      // don’t call until we have an email
    staleTime: 30_000,
    retry: 1,
  });

  if (isLoadingEligibility || isLoading) return <SkeletonLoader />;

  // Not eligible → show gate
  if (eligibility?.code !== 200) {
    return <EligibilityStatusCheck eligibility={eligibility} />;
  }

  // No open intakes
  if (status?.code === 1) return <NoOpenIntakes />;

  // Extract meeting payload (if present) from check_meeting_status
  const meeting =
    meetingResp?.message && typeof meetingResp.message === "object"
      ? (meetingResp.message as MeetingPayload)
      : null;

  const hasMeetingInfo = !!meeting?.date && !!meeting?.time;

  // If we have a meeting payload, always render Meeting with the context it needs
  if (hasMeetingInfo) {
    return (
      <Meeting
        meeting={meeting}
        statusCode={status?.code}
        meetingCode={meetingResp?.code}
      />
    );
  }

  // Booking stage (status.code === 2): respect contract + meeting checks
  if (status?.code === 2) {
    if (isLoadingContract || isLoadingMeeting) return <SkeletonLoader />;

    // If the contract API returns a consent record, ask user to sign first
    if (unsignedContract) return <CheckApplicationContract />;

    // Otherwise allow booking
    return <BookMeeting />;
  }

  // Fallback to generic Meeting section if pipeline says "meeting" but we had no payload
  if (status?.code === 3) return <Meeting />;

  // Requirements area: Guides, transcripts upload, and proposed schools (when verified docs exist)
  if (status?.code === 4 || status?.code === 5) {
    return (
      <div className="col gap-3">
        <IntakeStatus currentIntake={currentIntake} />
        <div>
          <Guides />
        </div>
        <Transcripts />
        {transcripts?.hasAnyVerified && <ProposedSchools />}
      </div>
    );
  }

  // Safe default
  return <SkeletonLoader />;
}
