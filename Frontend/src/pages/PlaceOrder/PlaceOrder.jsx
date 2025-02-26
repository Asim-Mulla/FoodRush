import { StoreContext } from "../../components/context/StoreContext";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import "./PLaceOrder.css";
//
import {
  handlePaymentVerification,
  handlePlaceOrder,
} from "../../services/services";

const PlaceOrder = () => {
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    country: "India",
    phone: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const { getTotalCartAmount, token, food_list, cartItems, shippingCharge } =
    useContext(StoreContext);

  let cartTotal = getTotalCartAmount();

  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      if (token) {
        // Opening razorpay
        const { data } = await handlePlaceOrder(
          cartTotal + shippingCharge,
          token
        );

        // Resetting the shipping form
        setShippingData({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "Maharashtra",
          pincode: "",
          country: "India",
          phone: "",
        });

        // Extracting cart items into 'orderItems'
        let orderItems = [];
        food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            let itemPresent = item;
            itemPresent["quantity"] = cartItems[item._id];
            orderItems.push(itemPresent);
          }
        });

        // Order data to be sent while payment verification
        let orderData = {
          address: shippingData,
          items: orderItems,
          amount: cartTotal + shippingCharge,
        };

        // Load Razorpay script dynamically
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          if (typeof window.Razorpay === "undefined") {
            console.error("Razorpay SDK failed to load.");
            return;
          }
        };

        const options = {
          key: razorpayKey,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "FoodRush",
          description: "FoodRush online payment",
          image: assets.logo_favicon,
          order_id: data.order.id,
          handler: async (response) => {
            const respo = await toast.promise(
              handlePaymentVerification(response, orderData, token),
              {
                pending: "Verifying Payment...",
                success: "Payment Verified and order placed",
                error: "Payment verification failed",
              }
            );
            if (respo.data.success) {
              navigate("/myorders");
            }
          },
          prefill: {
            name: `${shippingData.firstName} ${shippingData.lastName}`,
            email: `${shippingData.email}`,
            contact: shippingData.phone,
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        toast.info("You must me logged in.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      toast.info("You must be logged in.");
    } else if (cartTotal === 0) {
      navigate("/cart");
      toast.info("Your cart is empty.");
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={handlePayment}>
      <div className="place-order-left">
        <h2 className="title">Delivery Information</h2>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            value={shippingData.firstName}
            onChange={handleInputChange}
            placeholder="First name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={shippingData.lastName}
            onChange={handleInputChange}
            placeholder="Last name"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={shippingData.email}
          onChange={handleInputChange}
          placeholder="Email address"
          required
        />
        <input
          type="text"
          name="street"
          value={shippingData.street}
          onChange={handleInputChange}
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            value={shippingData.city}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
          <select
            name="state"
            id="state"
            value={shippingData.state}
            onChange={handleInputChange}
            required
          >
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Delhi">Delhi</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="pincode"
            value={shippingData.pincode}
            onChange={handleInputChange}
            placeholder="Pincode"
            required
          />
          <input
            type="text"
            name="country"
            value={shippingData.country}
            // onChange={handleInputChange}
            placeholder="Country"
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          value={shippingData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
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
              <b>₹{cartTotal === 0 ? 0 : cartTotal + shippingCharge}</b>
            </div>
            <hr />
          </div>
          <div className="checkout-btn-container">
            <button type="submit" className="checkout-btn">
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
