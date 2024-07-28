import { ReactComponent as LogoDark } from "../assets/images/logos/adminpro.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/dashboard">
      <LogoDark />
    </Link>
  );
};

export default Logo;
