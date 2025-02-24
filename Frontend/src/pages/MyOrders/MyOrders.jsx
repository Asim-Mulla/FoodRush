import { StoreContext } from "../../components/context/StoreContext";
import { useContext, useEffect, useState } from "react";
import { getUserOrders } from "../../services/services";
import ShowEmptyOrders from "./ShowEmptyOrders.jsx";
import { useNavigate } from "react-router-dom";
import ShowOrders from "./ShowOrders.jsx";
import "./MyOrders.css";

const MyOrders = () => {
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
    <div className="my-orders">
      <h2>My Orders</h2>
      {userOrders.length !== 0 ? <ShowOrders /> : <ShowEmptyOrders />}
    </div>
  );
};

export default MyOrders;
