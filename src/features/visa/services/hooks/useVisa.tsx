import { useQuery, useQueryClient } from "@tanstack/react-query";
import visaEndpoints from "../visaEndpoints";
import useFetchUser from "../../../../services/hooks/useFetchUser";
import {
  DS160Req,
  Ds160Review,
  FeedBack,
  MockQuestion,
  SevisFeePayment,
  VisaObject,
} from "../../types/visaTypes";
import { splitDate } from "../../../../utils/utils";
import useSchools from "../../../school-admission/services/useSchools";

function useVisa() {
  const { user } = useFetchUser();
  const { schoolsWithFeedback } = useSchools(true);
  const queryClient = useQueryClient();

  const queryKeys = {
    statusCheck: [user?.email, "visa", "status-check"],
    mockQuestions: [user?.email, "visa", "mock-questions"],
  };

  const inValidate = (queryKey: any) =>
    queryClient.invalidateQueries({ queryKey: queryKey });

  const { data: status, isLoading } = useQuery({
    queryKey: queryKeys.statusCheck,
    queryFn: visaEndpoints.status,
    select: (data) => {
      const _visa = data?.value?.visa;

      const interview_date = splitDate(_visa?.interview_date);
      const interviewTimes = _visa?.interview_time?.split(":");
      const interviewDateAndTime = new Date(
        splitDate(_visa?.interview_date)?.setHours(
          interviewTimes?.[0],
          interviewTimes?.[1]
        )
      );
      const mockDateAndTime = () => {
        if (!_visa?.mock_date) return null;
        const date = splitDate(_visa?.mock_date);
        const mockTimes = _visa?.mock_time?.split(":");
        date.setHours(mockTimes?.[0], mockTimes?.[1]);
        return date;
      };

      return {
        ...data,
        value: {
          ...data?.value,
          visa: {
            ..._visa,
            interview_date,
            interviewDateAndTime,
            hasInterviewDatePassed: interviewDateAndTime < new Date(),
            mockDateAndTime: mockDateAndTime(),
          },
        },
      };
    },
  });
  const visa: VisaObject = status?.value?.visa;

  const { data: mockQuestions = [] } = useQuery<MockQuestion[]>({
    queryKey: queryKeys.mockQuestions,
    queryFn: () => visaEndpoints.getMockQuestions(visa?.stu_id),
    enabled: Boolean(visa?.mockDateAndTime && visa?.status >= 6),
  });

  const mockTotalMarks = mockQuestions?.reduce(
    (acc, item) => acc + item.marks,
    0
  );
  const requiredMockMarks = 70;
  const isMockMarksQualified = mockTotalMarks >= requiredMockMarks;
  const ds160Req = status?.value?.ds160req as DS160Req;
  const ds160Review = status?.value?.ds160review as Ds160Review;
  const visaPayments = status?.value?.payments.visa;
  const sevisPayments = status?.value?.payments.sevis as SevisFeePayment;
  const feedback = status?.value?.feedback as FeedBack;
  const pastFeedbacks = status?.value?.pastFeedbacks as FeedBack[];
  const visaBookingLink =
    status?.value?.countries.find(
      (country: any) => country?.name === ds160Review?.current_country
    )?.embassy_link || "";
  // console.log(proposedSchools, "schools");

  return {
    user,
    schools: schoolsWithFeedback,
    status,
    isLoading,
    inValidate,
    inValidateStatus: () => inValidate(queryKeys.statusCheck),
    stage: status?.stage || 0,
    visa,
    ds160Req,
    ds160Review,
    visaPayments,
    sevisPayments,
    mockQuestions,
    mockTotalMarks,
    requiredMockMarks,
    isMockMarksQualified,
    feedback,
    pastFeedbacks: pastFeedbacks?.length > 0 ? pastFeedbacks : null,
    visaBookingLink,
  };
}

export default useVisa;
