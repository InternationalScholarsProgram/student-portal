import { AxiosError } from "axios";

const errorMsg = (error: AxiosError | any): string => {
  if (error.response) {
    const res = error.response.data;
    const dataStr = checkType(res.data);
    const extraInfo = dataStr ? `: ${dataStr}` : "";
    return res.message + extraInfo;
  }
  return error.message || "An unexpected error occurred.";
};

const checkType = (data: any): string => {
  if (!data || data?.length === 0) return "";
  return typeof data === "object" ? JSON.stringify(data) : String(data);
};

export { errorMsg };
