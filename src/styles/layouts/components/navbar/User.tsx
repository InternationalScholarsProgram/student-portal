import { Link } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar } from "@mui/material";
import DropDown from "../../../../components/DropDown";
import useFetchUser from "../../../../services/hooks/useFetchUser";

function User() {
  const { user, logout } = useFetchUser();
  return (
    <DropDown
      title={
        <div className="row-center mx-3">
          <div className="text-sm flex-1 col items-end">
            <p className="">{user?.fullnames}</p>
            <p className="opacity-50">{""}</p>
          </div>
          <div className="col-center px-1">
            <Avatar src={""} />
          </div>
          <KeyboardArrowDownIcon fontSize="small" />
        </div>
      }
    >
      <div className="col gap-5 border-b border-stroke px-6 py-3">
        <Link
          to="profile"
          className="text-sm row items-center space-x-2 font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <PermIdentityIcon />
          <span>My Profile</span>
        </Link>

        <Link
          to="#"
          className="text-sm row items-center space-x-2 font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <SettingsOutlinedIcon />
          <span>Account Settings</span>
        </Link>

        <button
          onClick={logout}
          className="px-6 py-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <LoginOutlinedIcon />
          Log Out
        </button>
      </div>
    </DropDown>
  );
}

export default User;
