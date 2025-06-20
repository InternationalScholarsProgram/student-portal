import { useQueryClient as useClient } from "@tanstack/react-query";

function useQueryClient() {
  const queryClient = useClient();
  return { queryClient };
}

export default useQueryClient;
