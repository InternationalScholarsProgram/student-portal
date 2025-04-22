import React from "react";
import usePersonal from "./services/usePersonal";
import useFunding from "../../services/useFunding";
import { FullLoader } from "../../../../components/loaders/Loader";
import AxiosError from "../../../../components/errors/AxiosError";
import ApplicationForm from "../../components/ApplicationForm";

function Personal() {
  const { status, isLoading, error } = usePersonal();
  
  if (isLoading) return <FullLoader />;
  if (error) return <AxiosError error={error} />;
  // return <LoanProcessing />;

  switch (status) {
    case 0:
      return <ApplicationForm />;
    // case 1:
    //   // return <LoanProcessing />;
    // case 2:
    // return <Repayment />;
  }
}

export default Personal;
