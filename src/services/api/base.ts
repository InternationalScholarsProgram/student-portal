import axios from "axios";
import Cookies from "js-cookie";

const baseDirectory = "/login/member/dashboard/APIs/";
const BASE_URL = "https://finsapdev.qhtestingserver.com";
const multipart = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const url =
  process.env.NODE_ENV === "production" ? BASE_URL : "https://finsapdev.qhtestingserver.com";

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(
  (config) => {
    if (!config.params) config.params = {};
    const activeStudentId = Cookies.get("activeStudentId");
    config.params.student_id = activeStudentId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
export { BASE_URL, multipart, baseDirectory };
