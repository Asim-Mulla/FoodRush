import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ item }) => {
  const { _id, name, price, description, image } = item;
  const { url, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={url + "/images/" + image} alt="" />
        {!cartItems[_id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => addToCart(_id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(_id)}
            />
            <span>{cartItems[_id]}</span>
            <img src={assets.add_icon_green} onClick={() => addToCart(_id)} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="m-0">{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
