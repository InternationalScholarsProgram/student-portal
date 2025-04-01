import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import tuitionEndpoints from "../../services/tuitionEndpoints";
import useTuition from "../../services/useTuition";

export const useSubsequentMeeting = () => {
  const { user, queryClient } = useTuition();
  const queryKey = ["subsequent-meeting", user?.email];
  
  const { data: subsequentMeeting } = useQuery<any>({
    queryKey: queryKey,
    queryFn: tuitionEndpoints.getSubsequentMeeting,
    enabled: !!user?.email,
    select: (response) => response?.data?.data,
  });

  const isMoreThan24Hours =
    dayjs(new Date()).diff(subsequentMeeting?.dateAndTime, "hour") > 24;

  const bookSubsequentMeeting = useMutation({
    mutationFn: tuitionEndpoints.bookSubsequentMeeting,
    onSuccess: () => {
      toast.success("Request sent successfully.");
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    bookSubsequentMeeting,
    subsequentMeeting,
    isMoreThan24Hours,
  };
};
