import { AxiosError } from "axios";

interface APIErrorResponse {
  code: number;
  message: string;
  data?: any;
}

const checkType = (data: any): string => {
  if (!data || (Array.isArray(data) && data.length === 0)) return "";
  return typeof data === "object" ? JSON.stringify(data) : String(data);
};

const errorMsg = (error: AxiosError<APIErrorResponse> | any): string => {
  if (error.isAxiosError && error.response) {
    const res = error.response.data;
    const dataStr = checkType(res.data);
    const extraInfo = dataStr ? `: ${dataStr}` : "";

    if (!res.message && error.response.status === 500)
      return "Internal server error.";
    if (!res.message)
      return res.code ? `Error ${res.code}${extraInfo}` : "An unexpected error occurred.";

    return res.message + extraInfo;
  }

  return error?.message || "An unexpected error occurred.";
};

export { errorMsg };
