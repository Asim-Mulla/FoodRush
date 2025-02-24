import { useEffect, useState } from "react";
import { getFoodList, removeFoodItem } from "../../../services/services";
import "./List.css";
import { toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";

const List = () => {
  const [foodList, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await getFoodList();
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFood = async (foodId) => {
    const response = await removeFoodItem(foodId);
    await fetchFoodList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <div className="list add flex-col">
      <h2>All Food Items</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Cation</b>
        </div>
        {foodList.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={item.image.url} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                <MdOutlineDelete />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
