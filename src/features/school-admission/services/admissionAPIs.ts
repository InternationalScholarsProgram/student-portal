import { toast } from "react-toastify";
import api, { baseDirectory } from "../../../services/api/base";
import { json2formData } from "../../../utils/utils";

const url = `${baseDirectory}/school_application/`;
const admissionsUrl = `${url}/school_admission.php`;

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
    return response?.data?.data;
  };
  getUploadedDocs = async () => {
    const response = await api.get(`${url}/uploaded_docs.php`);
    return response?.data?.message || [];
  };
  getCurrentIntake = async () => {
    const response = await api.post(admissionsUrl, {
      action: "get_current_intake",
    });
    const data = response?.data;
    if (data.code === 200) return data?.message;
    if (data.code === 204) return null;
    return null;
  };
  transcripts = async (app_id: string) => {
    const response = await api.post(`${admissionsUrl}?app_id=${app_id}`, {
      action: "check_transcript_verification",
    });
    return response;
  };
  updateTranscripts = async (payload: {
    name: string;
    docs: any;
    proposed_course_id: string[] | number[];
  }) => {
    const file = new File([payload.docs.blob], payload.name, {
      type: "application/pdf",
    });

    const data = json2formData({
      ...payload,
      letter: file,
      action: "save_transcript_request",
    });    
    const endpoint = `${baseDirectory}/others/request_transcript_verification.php`;
    const response = await api.post(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response?.status === 200) {
      payload.docs.download();
    }
    return response;
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
      console.log(data, "data");

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
  uploadConsent = async (data: any) => {
    try {
      const formData = json2formData(data);
      console.log(data, "data");

      const response = await api.post(
        `${baseDirectory}/others/sign_consent.php?action=sign_consent`,
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
  consents = async (school: { id: string; course: string }) => {
    const url =
      "/login/member/dashboard/APIs/others/sign_consent.php?action=fetch_consent";
    const _schoolResponse = await api.get(url, {
      params: {
        consent_type: "2",
        extra_column: "school_id",
        extra_value: school.id,
      },
    });

    const _programResponse = await api.get(url, {
      params: {
        consent_type: "5",
        extra_column: "program_id",
        extra_value: school.course,
      },
    });

    const schoolResponse = _schoolResponse?.data?.message;
    const programResponse = _programResponse?.data?.message;

    const resData =
      schoolResponse && schoolResponse?.length > 0
        ? schoolResponse
        : programResponse;
    if (resData.length > 0) return resData;
    return null;
  };
}
const admissionAPIs = new AdmissionAPIs();
export { admissionAPIs };
