import axios from "axios";
import Cookies from "js-cookie";

const studentId = Cookies.get("studentId");

const testStudents = [
  "wesochogo7@gmail.com",
  "test_one@gmail.com",
  "test_two@gmail.com",
  "test_three@gmail.com",
  "test_four@gmail.com",
];

const activeStudentId = testStudents[4] || studentId;

export const baseDirectory = "/login/member/dashboard/APIs/";
const BASE_URL = "https://finkapinternational.qhtestingserver.com";

const api = axios.create({
  baseURL: `/`,
});

api.interceptors.request.use(
  (config) => {
    // Initialize params if it doesn't exist
    if (!config.params) {
      config.params = {};
    }
    // Append the student_id to the params
    config.params.student_id = activeStudentId;

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;
export { activeStudentId, BASE_URL };
