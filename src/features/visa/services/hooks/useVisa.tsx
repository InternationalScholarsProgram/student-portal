import { useQuery, useQueryClient } from "@tanstack/react-query";
import visaEndpoints from "../visaEndpoints";
import useFetchUser from "../../../../services/hooks/useFetchUser";
// import useAdmissions from "../../../school-admission/services/useAdmissions";
import {
  Ds160Review,
  FeedBack,
  MockQuestion,
  SevisFeePayment,
  VisaObject,
} from "../../types/visaTypes";
import { useCallback, useMemo } from "react";
import { splitDate } from "../../../../utils/utils";

function useVisa() {
  // const { appliedSchools } = useAdmissions();
  const appliedSchools: any[] = [];
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const queryKeys = {
    statusCheck: [user?.email, "visa", "status-check"],
  };
  const inValidate = (queryKey: any) =>
    queryClient.invalidateQueries({ queryKey: queryKey });
  const inValidateStatus = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.statusCheck });

  const { data: status, isLoading } = useQuery({
    queryKey: queryKeys.statusCheck,
    queryFn: visaEndpoints.status,
  });

  const { data: applicationVideo } = useQuery({
    queryKey: ["visa", "ds-160-application-video"],
    queryFn: visaEndpoints.ds_160_application_video,
  });
  const schools = appliedSchools?.filter(
    (school) => !school?.application_details?.feedback
  );

  const visa: VisaObject = useMemo(() => {
    const _visa = status?.value?.visa;
    const interview_date = splitDate(_visa?.interview_date);
    const interviewDateAndTime = new Date(
      splitDate(_visa?.interview_date).setHours(
        _visa?.interview_time?.split(":")[0]
      )
    );
    const mockDateAndTime = () => {
      if (!_visa?.mock_date) return null;
      const date = splitDate(_visa?.mock_date);
      date.setHours(
        Number(_visa?.mock_time?.split(":")[0] || 0),
        Number(_visa?.mock_time?.split(":")[1] || 0)
      );
      return date;
    };

    return {
      ..._visa,
      interview_date,
      interviewDateAndTime,
      hasInterviewDatePassed: interviewDateAndTime < new Date(),
      mockDateAndTime: mockDateAndTime(),
    };
  }, [status?.value?.visa]);

  const { data: mockQuestions = [] } = useQuery<MockQuestion[]>({
    queryKey: [user?.email, "mock-interview-questions"],
    queryFn: () => visaEndpoints.getMockQuestions(visa?.stu_id),
    enabled: Boolean(visa?.mockDateAndTime && visa?.status >= 6),
  });

  const mockTotalMarks = mockQuestions?.reduce(
    (acc, item) => acc + item.marks,
    0
  );

  const ds160Req = status?.value?.ds160req;
  const ds160Review = status?.value?.ds160review as Ds160Review;
  const visaPayments = status?.value?.payments.visa;
  const sevisPayments = status?.value?.payments.sevis as SevisFeePayment;
  const feedback = status?.value?.feedback as FeedBack;

  return {
    applicationVideo,
    schools: schools,
    user,
    status,
    isLoading,
    inValidate,
    inValidateStatus,
    stage: status?.stage || 0,
    visa,
    ds160Req,
    ds160Review,
    visaPayments,
    sevisPayments,
    mockQuestions,
    mockTotalMarks,
    feedback,
  };
}

export default useVisa;
