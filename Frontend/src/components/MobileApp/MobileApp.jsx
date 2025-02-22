import "./MobileApp.css";
import { assets } from "../../assets/assets";

const MobileApp = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br /> FoodRush App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
};

export default MobileApp;
