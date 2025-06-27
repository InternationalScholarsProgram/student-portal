import { toast } from "react-toastify";
import api, { baseDirectory, multipart } from "../../../services/api/base";
import {
  convertImageToBase64,
  html2pdf,
  json2formData,
} from "../../../utils/utils";
import axios from "axios";

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
  applicationDocs = async (schoolId?: string, courseId?: string) => {
    const response = await api.get(
      `${url}/fetch_school_app_docs_requirements.php?school_id=${schoolId}&program_id=${courseId}`
    );
    return response?.data?.data?.filter(
      (item: any) => item.acronym !== "extra document" && item.id !== "14"
    );
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
  getGPA = async () => {
    const response = await api.post(`${admissionsUrl}`, {
      action: "fetch_GPA",
    });
    return response.data?.message;
  };
  transcripts = async (app_id: string) => {
    const response = await api.post(`${admissionsUrl}?app_id=${app_id}`, {
      action: "check_transcript_verification",
    });
    return response;
  };
  transcriptsToPdf = async (element: HTMLElement, fileName: string) => {
    const pdf = await html2pdf()
      .set({
        margin: [45, 10, 50, 10],
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      })
      .from(element)
      .toPdf()
      .get("pdf");
    const totalPages = pdf.internal.getNumberOfPages();
    const header = await convertImageToBase64("/src/assets/isp.png");
    const footer = await convertImageToBase64(
      "/src/assets/Footer_Letterhead.png"
    );

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.addImage(header, "PNG", 5, 0, 40, 40);
      pdf.addImage(
        footer,
        "PNG",
        0,
        pdf.internal.pageSize.getHeight() - 40,
        pdf.internal.pageSize.getWidth(),
        40
      );
    }
    return {
      blob: pdf.output("blob"),
      download: () => pdf.save(fileName),
    };
  };
  updateTranscripts = async (
    proposed_course_id: string[] | number[],
    element: HTMLElement,
    fileName: string
  ) => {
    const docs = await this.transcriptsToPdf(element, fileName);
    const file = new File([docs.blob], fileName, {
      type: "application/pdf",
    });
    console.log(file);

    const data = json2formData({
      proposed_course_id,
      letter: file,
      action: "save_transcript_request",
    });

    const endpoint = `${baseDirectory}/others/request_transcript_verification.php`;
    const response = await api.post(endpoint, data, multipart);
    if (response?.status === 200) docs.download();
    return response;
    // docs.download();
    // return api.get("https://ipapi.co/json/");
  };
  submitSchoolApplication = (payload: any) =>
    api.post(`${url}/school_application.php`, payload);

  uploadFile = (data: any) =>
    api.post(`${url}/school_app_docs_upload.php`, axios.toFormData(data));

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
  sendSchoolFeedback = async (payload: FormData) => {
    try {
      const response = await api.post(
        `${url}/school_app_feedback.php`,
        payload
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
  consents = async (schoolId?: string, courseId?: string) => {
    const url = `${baseDirectory}/others/sign_consent.php?action=fetch_consent`;
    return await Promise.all([
      await api.get(url, {
        params: {
          action: "fetch_consent",
          consent_type: "2",
          extra_column: "school_id",
          extra_value: schoolId,
        },
      }),

      await api.get(url, {
        params: {
          action: "fetch_consent",
          consent_type: "5",
          extra_column: "program_id",
          extra_value: courseId,
        },
      }),
    ]);
  };
}
const admissionAPIs = new AdmissionAPIs();
export { admissionAPIs };
