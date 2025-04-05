import { useQuery } from "@tanstack/react-query";
import api, { activeStudentId } from "../api/base";
import { UserProfile } from "../../types";

const useFetchUser = () => {
  const { data, isLoading, error } = useQuery<UserProfile>({
    queryKey: [activeStudentId, "user"],
    queryFn: async () => {
      try {
        const response = await api.get(
          `/login/member/dashboard/APIs/functions.php?action=fetch_user`
        );
        return response.data.message;
      } catch (error: any) {
        console.error("Error fetching user:", error.response.data);
        throw new Error("Failed to fetch user data.");
      }
    },
    enabled: !!activeStudentId,
    select: (data) => ({
      ...data,
      country: data?.country?.toLowerCase(),
    }),
  });

  return {
    user: data,
    isLoading,
    error,
    userQueryKey: [activeStudentId, "user"],
  };
};

export default useFetchUser;
