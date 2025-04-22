import api, { baseDirectory } from "../../../../../services/api/base";

const url = `${baseDirectory}funding/personal/`;

class PersonalEndpoints {
  status = () => api.get(`${url}status.php`);
}

const personalEndpoints = new PersonalEndpoints();
export default personalEndpoints;
