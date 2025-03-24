import axios from "axios";

const testStudents = [
  "test@gmail.com",
  "test_one@gmail.com",
  "test_two@gmail.com",
  "test_three@gmail.com",
  "test_four@gmail.com",
];

const activeStudentId = testStudents[0];

const baseDirectory = "/login/member/dashboard/APIs/";
const BASE_URL = "https://finkapinternational.qhtestingserver.com";
const multipart = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const api = axios.create({
  // baseURL: BASE_URL,
  baseURL: "/",
});

api.interceptors.request.use(
  (config) => {
    // console.log("Before Request:", config.params);

    if (!config.params) config.params = {}; // Initialize params if it doesn't exist
    config.params.student_id = activeStudentId;

    // console.log("After Request:", config.params);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
export { activeStudentId, BASE_URL, multipart, baseDirectory };
