import axios from "axios";
import api, { baseDirectory, multipart } from "../../../services/api/base";
import { TestTypes } from "../types/examTypes";

const url = baseDirectory + "entrance_exams/";

class ExamsEndpoints {
  status = (type: TestTypes) =>
    api.get(`${url}status_check.php?test_type=${type}`);
  enroll = (payload: Enroll) =>
    api.post(`${url}entrance_exam_enrollment.php`, payload, multipart);

  markResourceComplete = (enrollment_id?: number, section?: number) =>
    api.get(`${url}mark_section_complete.php`, {
      params: {
        enrollment_id: enrollment_id,
        completed_section: section,
      },
    });
  markMockComplete = (mock_id: string, score: string, result: File) =>
    api.post(
      `${url}mark_section_complete.php`,
      axios.toFormData({
        mock_id: mock_id,
        score: score,
        mock_result: result,
      }),
      multipart
    );
  bookExam = (payload: FormData) =>
    api.post(`${url}request_exam_booking.php`, payload, multipart);
  scoreVerification = (
    enrollment_id: string,
    booking_id: string,
    status: string
  ) =>
    api.get(
      `${url}request_score_verification.php?enrollment_id=${enrollment_id}&booking_id=${booking_id}&status=${status}`
    );
}

const examsEndpoints = new ExamsEndpoints();
export default examsEndpoints;

type Enroll = {
  test_type: TestTypes;
  account_username: string;
  account_password: string;
};
