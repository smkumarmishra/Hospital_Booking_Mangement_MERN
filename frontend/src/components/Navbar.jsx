import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const { menuOpen, setMenuOpen, isAuthenticated, setIsAuthenticated } =
    useContext(Context);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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

  const navigateTo = useNavigate();

  const goToLogin = () => {
    setMenuOpen(false);
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className="navLinksDesktop">
          <div className="links">
            <Link to={"/"}>
              Home
            </Link>
            <Link to={"/appointment"}>
              Appointment
            </Link>
            <Link to={"/about"}>
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
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <GiHamburgerMenu aria-hidden="true" />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
