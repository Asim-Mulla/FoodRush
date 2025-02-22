import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import "./Login.css";
import { StoreContext } from "../context/StoreContext";
import { loginOrSignup } from "../../services/services";
import { toast } from "react-toastify";

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign up");
  const { token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let url = "";

    if (currState === "Login") {
      url += "/api/user/login";
    } else {
      url += "/api/user/signup";
    }

    const response = await loginOrSignup(url, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleFormSubmit} className="login-popup-conteiner">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-privacy-check">
          <input type="checkbox" id="privacy-check" required />
          <label htmlFor="privacy-check">
            By continuing, I agree to terms of use and privacy policy.
          </label>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign up")}>Signup here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
