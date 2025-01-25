import { toast } from "react-toastify";
import api, { baseDirectory } from "../../../services/api/base";
import { json2formData } from "../../../utils/utils";

const admissionsUrl =
  "/login/member/dashboard/APIs/school_application/school_admission.php";
const url = `${baseDirectory}/school_application/`;

class AdmissionAPIs {
  eligibilityCheck = async () => {
    try {
      const response = await api.post(admissionsUrl, {
        action: "check_eligibility",
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      throw new Error(error.response.data);
    }
  };
  statusCheck = async () => {
    try {
      const response = await api.post(admissionsUrl, {
        action: "status_check",
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      throw new Error(error.response.data);
    }
  };
  checkMeetingStatus = async () => {
    try {
      const response = await api.post(admissionsUrl, {
        action: "check_meeting_status",
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      throw new Error(error.response.data);
    }
  };
  applicationDocs = async () => {
    const response = await api.get(
      `${url}/fetch_school_app_docs_requirements.php`
    );
    return response.data;
  };
  getUploadedDocs = async () => {
    const response = await api.get(`${url}/uploaded_docs.php`);
    return response?.data?.message || [];
  };
  getCurrentIntake = async () => {
    const response = await api.post(`${url}/school_admission.php`, {
      action: "get_current_intake",
    });
    const data = response?.data;
    if (data.code === 200) return data?.message;
    if (data.code === 204) return null;
    return null;
  };
  submitSchoolApplication = async (payload: any) => {
    try {
      const response = await api.post(`${url}/school_application.php`, payload);
      if (response.status === 201)
        toast.success("Application submitted successfully");
      return response?.data;
    } catch (error: any) {
      const data = error?.response?.data;
      if (data?.code === 400) toast.error(data.message);
      if (!data || data?.code !== 400)
        toast.error("Application submission failed");
    }
  };
  uploadFile = async (data: any) => {
    try {
      const formData = json2formData(data);
      const response = await api.post(
        `${url}/school_app_docs_upload.php`,
        formData
      );
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  };
  sendSchoolFeedback = async (payload: any) => {
    try {
      const formData = json2formData(payload);
      const response = await api.post(
        `${url}/school_app_feedback.php`,
        formData
      );
      const data = response.data;
      if (data.code === 200) toast.success(data?.message);
      return data;
    } catch (error: any) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data?.message);
      return error.response.data;
    }
  };
}
const admissionAPIs = new AdmissionAPIs();
export { admissionAPIs };
