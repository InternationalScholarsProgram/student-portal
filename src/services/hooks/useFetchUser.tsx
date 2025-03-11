import { useQuery } from "@tanstack/react-query";
import api, { activeStudentId } from "../api/base";
import { UserProfile } from "../../types";

const useFetchUser = () => {
  const userQueryKey = ["user", activeStudentId];

  const { data, isLoading, error } = useQuery({
    queryKey: userQueryKey,
    queryFn: async () => {
      try {
        const response = await api.get(
          `/login/member/dashboard/APIs/functions.php?action=fetch_user`
        );
        return response.data;
      } catch (error: any) {
        console.error("Error fetching user:", error.response.data);
        throw new Error("Failed to fetch user data.");
      }
    },
    enabled: !!activeStudentId, // Only fetch if studentId exists
  });
  const user: UserProfile = {
    ...data?.message,
    country: data?.message?.country?.toLowerCase(),
  };
  return {
    user,
    isLoading,
    error,
    userQueryKey,
  };
};

export default useFetchUser;
