import api from "./base";

class ApiServices {
  
  bookCareerAdvisory = async (
    appointment_date: string,
    appointment_time: string
  ) => {
    try {
      const payload = {
        action: "schedule_advisory",
        appointment_date,
        appointment_time,
      };
      const response = await api.post(
        "/login/member/dashboard/APIs/school_admission.php",
        payload,
        {
          params: {
            action: "schedule_advisory",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      // Handle errors
      if (error.response) {
        console.error("API error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Axios error:", error.message);
      }
    }
  };
}
const apiServices = new ApiServices();
export default apiServices;
