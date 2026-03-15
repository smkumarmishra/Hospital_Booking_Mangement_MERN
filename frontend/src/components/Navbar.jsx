import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const { pathname } = useLocation();

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("https://hospital-backend-tpva.onrender.com/api/v1/user/patient/logout", {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        setShow(false);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ?? "Logout failed. Please try again.",
        );
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    setShow(false);
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(false)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(false)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <button
          type="button"
          className="hamburger"
          aria-label={show ? "Close menu" : "Open menu"}
          aria-expanded={show}
          onClick={() => setShow((prev) => !prev)}
        >
          <GiHamburgerMenu aria-hidden="true" />
        </button>
      </nav>
      <div
        className={show ? "navBackdrop navBackdrop--show" : "navBackdrop"}
        onClick={() => setShow(false)}
      />
    </>
  );
};

export default Navbar;
