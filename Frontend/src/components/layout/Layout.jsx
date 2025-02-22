import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useState } from "react";
import Login from "../Login/Login";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <section className="applayout">
        <ToastContainer />
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
        <Outlet />
        <Footer />
      </section>
    </>
  );
};

export default Layout;
