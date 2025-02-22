import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { FaSearch } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ showLogin, setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar mb-2">
      <div className="navbar-logo-container">
        <Link to="/">
          <img src={assets.logo} alt="logo-image" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-menu">
        <ul>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={`nav ${menu === "home" ? "active" : ""}`}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={`nav ${menu === "menu" ? "active" : ""}`}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile")}
            className={`nav ${menu === "mobile" ? "active" : ""}`}
          >
            Mobile App
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact")}
            className={`nav ${menu === "contact" ? "active" : ""}`}
          >
            Contact Us
          </a>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <FaSearch />
        </div>
        <div className="navbar-cart">
          <Link to="/cart">
            <FaBagShopping />
          </Link>
          {getTotalCartAmount() > 0 ? <div className="dot"></div> : <></>}
        </div>
        {!token ? (
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="btn sign-in-btn"
          >
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <div className="profile-image">
              <BsPersonCircle />
            </div>
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <FaBoxOpen className="navbar-orders-image" />
                <p>Orders</p>
              </li>
              <hr className="nav-drop-hr" />
              <li onClick={handleLogout}>
                <IoLogOut className="navbar-logout-image" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
