import api, { baseDirectory } from "../../../services/api/base";

const url = baseDirectory + "dashboard/";

class DashboardEndpoints {
  trackProgress = () => api.get(`${url}track_progress.php`);
}
const dashboardEndpoints = new DashboardEndpoints();
export default dashboardEndpoints;
