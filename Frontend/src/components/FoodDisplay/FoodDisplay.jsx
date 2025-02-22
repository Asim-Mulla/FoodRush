import { StoreContext } from "../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { useContext } from "react";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (item.category === category || category === "All") {
            return <FoodItem key={index} item={item} />;
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
