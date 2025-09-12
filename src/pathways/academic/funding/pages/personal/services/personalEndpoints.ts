import api, {
  baseDirectory,
  multipart,
} from "../../../../../../services/api/base";

const url = `${baseDirectory}funding/personal/`;

class PersonalEndpoints {
  status = () => api.get(`${url}status.php`);
  signContract = () => api.get(`${url}status.php`);
  appluSupplementary = (payload: FormData) =>
    api.post(`${url}suplementary.php`, payload, multipart);
  decision = (payload: FormData) =>
    api.post(`${url}decision.php`, payload, multipart);
  recallDecision = (payload: FormData) =>
    api.post(`${url}recall_decision.php`, payload, multipart);
}

const personalEndpoints = new PersonalEndpoints();
export default personalEndpoints;
