import { Link } from "react-router-dom";
import { finSap } from "../assets/imageLinks";

function Logo() {
  return (
    <Link
      to="/"
      className="m-2 col-center w-[90%] h-[10vh] overflow-hidden"
    >
      <img
        src={finSap}
        alt="logo"
        className="h-[90%] w-full aspect-auto object-contain"
      />
    </Link>
  );
}

export default Logo;
