import api, {
  baseDirectory,
  multipart,
} from "../../../../../services/api/base";

const url = `${baseDirectory}funding/personal/`;

class PersonalEndpoints {
  status = () => api.get(`${url}status.php`);
  signContract = () => api.get(`${url}status.php`);
  decision = (payload: FormData) =>
    api.post(`${url}decision.php`, payload, multipart);
}

const personalEndpoints = new PersonalEndpoints();
export default personalEndpoints;
