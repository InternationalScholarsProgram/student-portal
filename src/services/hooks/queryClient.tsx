import { useQueryClient } from "@tanstack/react-query";
import React from "react";

function queryClient() {
  const queryClient = useQueryClient();
  return {queryClient};
}

export default queryClient;
