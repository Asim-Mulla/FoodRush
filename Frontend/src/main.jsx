import { createRoot } from "react-dom/client";
import StoreContextProvider from "./components/context/StoreContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StoreContextProvider>
);
