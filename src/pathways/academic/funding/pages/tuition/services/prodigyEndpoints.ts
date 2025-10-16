// services/tuition/prodigy/prodigyEndpoints.ts
import api, { baseDirectory, multipart } from "../../../../../../services/api/base";

const url = `${baseDirectory}funding/tuition/prodigy`; 
class ProdigyEndpoints {
  makeApplication = async (payload: FormData) => {
    if (!payload.get("action")) payload.set("action", "application_request");
    return api.post(`${url}/prodigy_application.php`, payload, multipart);
  };

  checkStatus = async (student_id: string, app_id: string) => {
    const body = new FormData();
    body.set("student_id", student_id);
    body.set("app_id", app_id);
    return api.post(`${url}/prodigy_loan_app_status.php`, body, multipart);
  };
}

const prodigyEndpoints = new ProdigyEndpoints();
export default prodigyEndpoints;
