import { StoreContext } from "../../components/context/StoreContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { url, cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  let cartTotal = getTotalCartAmount();

  return (
    <div className="cart">
      <div className="cart-items">
        <h2>My Cart</h2>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Price</p>
          <p>Qty.</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <div className="cart-item-img-container">
                    <img src={url + "/images/" + item.image} />
                    <p>{item.name}</p>
                  </div>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="remove-icon"
                  >
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <h2>Summary</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{cartTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Shipping</p>
              <p>₹{cartTotal === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{cartTotal === 0 ? 0 : cartTotal + 2}</b>
            </div>
            <hr />
          </div>
          <div className="checkout-btn-container">
            <button onClick={() => navigate("/order")} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
        <div className="cart-promocode">
          <h2>Promo Code</h2>
          <div>
            <p>If you have a promo code, enter it here.</p>
            <div>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promo Code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
