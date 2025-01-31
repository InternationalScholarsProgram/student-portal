import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import visaEndpoints from "../visaEndpoints";
import { toast } from "react-toastify";
import useFetchUser from "../../../../services/hooks/useFetchUser";

import { create } from "zustand";

interface visaStoreTypes {
  stage: number;
  setStage: (stage: number) => void;
}

const visaStore = create<visaStoreTypes>()((set) => ({
  stage: localStorage.getItem("stage")
    ? JSON.parse(localStorage.getItem("stage") as string)
    : 0,
  setStage: (stage) => {
    set({ stage });
    localStorage.setItem("stage", JSON.stringify(stage));
  },
}));

function useVisa() {
  const { stage, setStage } = visaStore((state) => state);
  const { user } = useFetchUser();
  const queryClient = useQueryClient();

  const inValidate = (queryKey: any) =>
    queryClient.invalidateQueries({ queryKey: queryKey });

  const { data: applicationVideo } = useQuery({
    queryKey: ["visa", "ds-160-application-video"],
    queryFn: visaEndpoints.ds_160_application_video,
  });
  const { data: schools } = useQuery({
    queryKey: ["visa", "schools"],
    queryFn: visaEndpoints.schools,
  });

  return {
    applicationVideo,
    schools,
    user,
    inValidate,
    stage,
    setStage,
  };
}

export default useVisa;
