import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { BsBoxSeam } from "react-icons/bs";
import { MdRestaurantMenu } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          {/* <img src={assets.add_icon} alt="" /> */}
          <MdAddCircleOutline className="icon" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          {/* <img src={assets.order_icon} alt="" /> */}
          <MdRestaurantMenu className="icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          {/* <img src={assets.order_icon} alt="" /> */}
          <BsBoxSeam className="icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
