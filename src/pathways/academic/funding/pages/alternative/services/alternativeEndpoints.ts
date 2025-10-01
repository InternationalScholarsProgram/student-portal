import api, {
  baseDirectory,
  multipart,
} from "../../../../../../services/api/base";

const url = `${baseDirectory}funding/study/`; 

class AlternativeEndpoints {
  status = () => api.get(`${url}status.php`);
  application = (payload: FormData, studentId?: string) => {
    const suffix = studentId ? `?student_id=${encodeURIComponent(studentId)}` : "";
    return api.post(`${url}application.php${suffix}`, payload, multipart);
  };
  decision = (payload: FormData) =>
    api.post(`${url}decision.php`, payload, multipart);

  signContract = (payload: FormData) =>
    api.post(`${url}contract.php`, payload, multipart);
}

const alternativeEndpoints = new AlternativeEndpoints();
export default alternativeEndpoints;
