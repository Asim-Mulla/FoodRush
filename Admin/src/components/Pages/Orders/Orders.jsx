import { useState } from "react";
import "./Orders.css";
import {
  getAllUsersOrders,
  updateOrderStatus,
} from "../../../services/services";
import { useEffect } from "react";
import { assets } from "../../../assets/assets.js";
import { toast } from "react-toastify";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const res = await getAllUsersOrders();
    if (res.data.success) {
      setOrders(res.data.data);
    } else {
      toast.error(res.data.message);
    }
  };

  const handleStatusChange = async (status, orderId) => {
    const res = await updateOrderStatus(status, orderId);
    if (res.data.success) {
      fetchAllOrders();
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>All Orders</h3>
      <div className="order-list">
        {orders.toReversed().map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                <IoPerson /> <span className="me-1">: </span>
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>
                  <FaHouse /> : {order.address.street}
                </p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.pincode}
                </p>
              </div>
              <p className="order-item-phone">
                <FaPhoneAlt /> : {order.address.phone}
              </p>
            </div>
            <p>
              <b>Items: {order.items.length}</b>
            </p>
            <p>
              <b>₹{order.amount}</b>
            </p>
            <select
              name=""
              onChange={(e) => handleStatusChange(e.target.value, order._id)}
              value={order.status}
              id=""
            >
              <option value="Food Processing">Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
