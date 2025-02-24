import { Link } from "react-router-dom";
import "./ShowEmptyCart.css";
import { FaBagShopping } from "react-icons/fa6";

const ShowEmptyCart = () => {
  return (
    <div className="empty-cart-container">
      <div className="empty-cart-content">
        <FaBagShopping className="empty-cart-icon" />
        <h2 className="empty-cart-title">Your cart is empty</h2>
        <p className="empty-cart-message">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/#explore-menu" className="start-shopping-button">
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default ShowEmptyCart;
