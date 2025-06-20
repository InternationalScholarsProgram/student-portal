import { useLocation } from "react-router";
import { TestTypes } from "../types/examTypes";

const useGetTestType = () => {
  const { pathname } = useLocation();

  const testType = pathname.split("/")?.[1] as TestTypes;
  return testType;
};

export default useGetTestType;
