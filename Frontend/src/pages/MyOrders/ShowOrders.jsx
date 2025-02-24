import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../components/context/StoreContext";
import { getUserOrders } from "../../services/services";
import { assets } from "../../../../Admin/src/assets/assets";

const ShowOrders = () => {
  const { token } = useContext(StoreContext);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();

  const fetchUserOrders = async () => {
    const res = await getUserOrders(token);
    setUserOrders(res.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchUserOrders();
    } else {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="orders-container">
      {userOrders.toReversed().map((order, index) => {
        return (
          <div key={index} className="order-card">
            <div className="order-info">
              <div className="order-icon">
                <img src={assets.parcel_icon} alt="" />
              </div>
              <div className="order-details">
                <p>
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index !== order.items.length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <p className="order-date">
                  Ordered on:{" "}
                  {new Date(order.date)
                    .toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    .split(" ")
                    .join("  / ")}
                </p>
              </div>
            </div>

            <div className="order-status">
              <div className="price-info">
                <p className="price">₹{order.amount}.00</p>
                <p className="items-count">Items: {order.items.length}</p>
              </div>

              <div className="status-info">
                <div className="status">
                  <span className="status-dot"></span>
                  <span>{order.status}</span>
                </div>
                <button className="track-button" onClick={fetchUserOrders}>
                  Track Order
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowOrders;
