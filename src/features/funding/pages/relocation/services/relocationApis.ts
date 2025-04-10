import api, {
  baseDirectory,
  multipart,
} from "../../../../../services/api/base";

const url = `${baseDirectory}funding/relocation/`;

class RelocationApis {
  application = (payload: FormData) =>
    api.post(`${url}application.php`, payload, multipart);

  decision = (payload: FormData) =>
    api.post(`${url}desicion.php`, payload, multipart);

  status = () => api.get(`${url}status.php`);
}
const relocationApis = new RelocationApis();
export default relocationApis;
