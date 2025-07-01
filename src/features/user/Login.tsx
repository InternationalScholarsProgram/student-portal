import Select from "../../components/inputs/Select";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { testStudents } from "../../utils/constants";
import Cookies from "js-cookie";

const Login = () => {
  return (
    <div className="col-center flex-1">
      <div className="w-1/2 h-[50vh] col-center gap-3">
        <Select
          onChange={(e) => {
            Cookies.set("activeStudentId", e.target.value as string, {
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
          }}
          placeholder="Select student"
          fullWidth={true}
          defaultValue={Cookies.get("activeStudentId")}
        >
          {testStudents.map((student) => (
            <MenuItem key={student} value={student}>
              {student}
            </MenuItem>
          ))}
        </Select>
        <Link className="primary-btn" to="/dashboard">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Login;
