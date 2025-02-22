import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  addItemToCart,
  getCartData,
  getFoodList,
  removeItemFromCart,
} from "../../services/services";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const shippingCharge = 2;
  const url = "https://foodrush-backend-gdyy";

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // adding item in the db cart
    if (token) {
      await addItemToCart(itemId, token);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    // removing the item from the db cart
    if (token) {
      await removeItemFromCart(itemId, token);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemTotal = food_list.find((currFood) => currFood._id === item);
        totalAmount += itemTotal.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await getFoodList();
      setFoodList(response.data.data);
    } catch (error) {
      console.log(error);
      console.log("Error occurred while fetching the food data from the db");
    }
  };

  const loadCartData = async (token) => {
    const res = await getCartData(token);
    setCartItems(res.data.cartData);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    shippingCharge,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
