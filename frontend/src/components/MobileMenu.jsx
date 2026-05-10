import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const MobileMenu = () => {
  const { menuOpen, setMenuOpen, isAuthenticated, setIsAuthenticated } =
    useContext(Context);
  const { pathname } = useLocation();
  const navigateTo = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

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
        setMenuOpen(false);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ?? "Logout failed. Please try again.",
        );
      });
  };

  const goToLogin = () => {
    setMenuOpen(false);
    navigateTo("/login");
  };

  return (
    <>
      <div className={menuOpen ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to={"/appointment"} onClick={() => setMenuOpen(false)}>
            Appointment
          </Link>
          <Link to={"/about"} onClick={() => setMenuOpen(false)}>
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
      <div
        className={menuOpen ? "navBackdrop navBackdrop--show" : "navBackdrop"}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
};

export default MobileMenu;

