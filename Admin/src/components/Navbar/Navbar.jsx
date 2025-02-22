import "./Navbar.css";
import { assets } from "../../assets/assets";
import { IoPersonCircleSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo-container">
          <img src={assets.logo} alt="" className="navbar-logo" />
          <h5>Admin Panal</h5>
        </div>
        <div className="navbar-profile-container">
          <IoPersonCircleSharp className="profile-image" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
