import { useQuery } from "@tanstack/react-query";
import api, { activeStudentId } from "../api/base";
import { UserProfile } from "../../types";

const useFetchUser = () => {
  const { data, isLoading, error } = useQuery<UserProfile>({
    queryKey: ["user", activeStudentId],
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
    enabled: !!activeStudentId, // Only fetch if studentId exists
    select: (data) => ({
      ...data,
      country: data?.country?.toLowerCase(),
    }), // Ensures reference stability
  });
  
  return {
    user: data,
    isLoading,
    error,
    userQueryKey :  ["user", activeStudentId],
  };
};

export default useFetchUser;
