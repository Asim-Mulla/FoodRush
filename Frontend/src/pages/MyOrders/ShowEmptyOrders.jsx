import "./ShowEmptyOrders.css";
import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

const ShowEmptyOrders = () => {
  return (
    <div className="empty-order-container">
      <div className="empty-order-content">
        <FaBoxOpen className="empty-order-icon" />
        <h2 className="empty-order-title">Nothing ordered yet</h2>
        <p className="empty-order-message">
          Looks like you haven't placed any orders yet.
        </p>
        <Link to="/cart" className="start-shopping-button">
          Start Ordering
        </Link>
      </div>
    </div>
  );
};

export default ShowEmptyOrders;
