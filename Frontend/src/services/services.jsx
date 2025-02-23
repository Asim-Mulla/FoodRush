import axios from "axios";

const api = axios.create({
  baseURL: "https://foodsrush-backend.onrender.com",
});

export const loginOrSignup = (mainUrl, data) => {
  return api.post(`${mainUrl}`, data);
};

export const getFoodList = () => {
  return api.get("/api/food/list");
};

export const addItemToCart = (itemId, token) => {
  return api.post("/api/cart/add", { itemId }, { headers: { token } });
};

export const removeItemFromCart = (itemId, token) => {
  return api.post("/api/cart/remove", { itemId }, { headers: { token } });
};

export const getCartData = (token) => {
  return api.post("/api/cart/get", {}, { headers: { token } });
};

export const handlePlaceOrder = (amount, token) => {
  return api.post("/api/order/place", { amount }, { headers: { token } });
};

export const handlePaymentVerification = (razorpayData, orderData, token) => {
  return api.post(
    "/api/order/verify",
    { razorpayData, orderData },
    { headers: { token } }
  );
};

export const getUserOrders = (token) => {
  return api.post("/api/order/orders", {}, { headers: { token } });
};
