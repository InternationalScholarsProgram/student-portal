import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/base";
import { UserProfile } from "../../types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const useFetchUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const activeStudentId = Cookies.get("activeStudentId");
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
  const logout = () => {
    Cookies.remove("activeStudentId");
    queryClient.clear();
    navigate("/");
  };

  return {
    user: data,
    isLoading,
    error,
    logout,
    userQueryKey: [activeStudentId, "user"],
  };
};

export default useFetchUser;
