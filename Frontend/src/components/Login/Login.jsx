import { googleAuth, loginOrSignup } from "../../services/services";
import { StoreContext } from "../context/StoreContext";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "./Login.css";

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign up");
  const { token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let url = currState === "Login" ? "/api/user/login" : "/api/user/signup";

    const response = await loginOrSignup(url, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      const code = authResult["code"];

      if (code) {
        const res = await googleAuth(code);

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          setShowLogin(false);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error("Error while requesting google code : ", error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

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
        <div className="login-popup-privacy-check">
          <label htmlFor="privacy-check">
            By continuing, You agree to terms of use and privacy policy.
          </label>
        </div>
        <button type="submit" className="submitBtn">
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>
        <p className="text-center m-0">or</p>
        <button class="googleBtn" onClick={handleGoogleLogin}>
          <FcGoogle className="fs-4" />
          Continue with Google
        </button>
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
