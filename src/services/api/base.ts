import axios from "axios";
// axios.formToJSON
const testStudents = [
  "test@gmail.com",
  "test_one@gmail.com",
  "test_two@gmail.com",
  "test_three@gmail.com",
  "test_four@gmail.com",
];

const activeStudentId = testStudents[4];

const baseDirectory = "/login/member/dashboard/APIs/";
const BASE_URL = "https://finsapdev.qhtestingserver.com";
const multipart = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const url =
  process.env.NODE_ENV === "production" ? BASE_URL : "http://localhost:5173";

const api = axios.create({
  // baseURL: BASE_URL,
  baseURL: url,
});

api.interceptors.request.use(
  (config) => {
    if (!config.params) config.params = {}; // Initialize params if it doesn't exist
    config.params.student_id = activeStudentId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
export { activeStudentId, BASE_URL, multipart, baseDirectory };
