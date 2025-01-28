import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import User from "./User";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useThemeStore from "../../styles/theme.store";
import InputField from "../inputs/InputField";

interface NavbarProps {
  toogleSideBar: () => void;
}

const Navbar = ({ toogleSideBar }: NavbarProps) => {
  const { themeMode, toggleTheme } = useThemeStore();

  return (
    <nav className="row justify-between flex-1 px-3 h-[9vh]">
      <button className="lg:hidden" onClick={toogleSideBar}>
        <MenuIcon className="text-primary" fontSize="large" />
      </button>
      <div className="row items-center justify-end space-x-3 flex-1">
        {/* <div className=" min-w-[35vw] px-3">
          <InputField
            placeholder="Search..."
            // variant="outlined"
            fullWidth={true}
            onChange={() => {}}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div> */}
        <button onClick={toggleTheme}>
          {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
        <button className="relative">
          <div className="absolute top-0 right-0 pulsate-fwd bg-primary rounded-full w-2 aspect-square" />
          <NotificationsNoneOutlinedIcon />
        </button>

        <User />
      </div>
    </nav>
  );
};

export default Navbar;
