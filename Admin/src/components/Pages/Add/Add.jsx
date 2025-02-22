import "./Add.css";
import { assets } from "../../../assets/assets";
import { useState } from "react";
import { addNewItemDataToDB } from "../../../services/services";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await addNewItemDataToDB(formData);
    if (response.data.success) {
      setImage(false);
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      });
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleFormSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image :</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-item-name flex-col">
          <p>Item Name :</p>
          <input
            onChange={handleInputChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter item name"
            required
          />
        </div>
        <div className="add-item-description flex-col">
          <p>Item Description :</p>
          <textarea
            onChange={handleInputChange}
            value={data.description}
            name="description"
            row="6"
            placeholder="Enter item description"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Item category :</p>
            <select
              name="category"
              onChange={handleInputChange}
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Item price :</p>
            <input
              onChange={handleInputChange}
              value={data.price}
              type="number"
              name="price"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
