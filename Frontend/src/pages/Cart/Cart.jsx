import { StoreContext } from "../../components/context/StoreContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import ShowCart from "./ShowCart";
import ShowEmptyCart from "./ShowEmptyCart";

const Cart = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  let cartTotal = getTotalCartAmount();

  return (
    <div className="cart">
      <div className="cart-items">
        <h2>My Cart</h2>
        {cartTotal !== 0 ? <ShowCart /> : <ShowEmptyCart />}
      </div>
    </div>
  );
};

export default Cart;
