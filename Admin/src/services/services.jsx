import axios from "axios";

const api = axios.create({
  baseURL: "https://foodrush-backend",
});

export const addNewItemDataToDB = (formData) => {
  return api.post("/api/food/add", formData);
};

export const getFoodList = () => {
  return api.get("/api/food/list");
};

export const removeFoodItem = (foodId) => {
  return api.post("/api/food/remove", { id: `${foodId}` });
};

export const getAllUsersOrders = () => {
  return api.get("/api/order/all");
};

export const updateOrderStatus = (newStatus, orderId) => {
  return api.post("/api/order/status", { newStatus, orderId });
};
