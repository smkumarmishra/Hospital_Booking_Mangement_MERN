import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:5000/api/v1/user/login",
          { email, password, confirmPassword, role: "Admin" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Login failed"
      );
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="container form-component admin-auth">
        <div className="admin-auth-card">
          <div className="admin-auth-left" aria-hidden="true">
            <div className="admin-auth-brand">
              <img src="/logo.png" alt="ZeeCare" className="admin-auth-logo" />
              <div className="admin-auth-brandText">
                <h1>Admin Console</h1>
                <p>Only admins are allowed to access these resources.</p>
              </div>
            </div>
            <img className="admin-auth-art" src="/doc.png" alt="" />
          </div>

          <div className="admin-auth-right">
            <h2 className="admin-auth-title">Sign In</h2>
            <p className="admin-auth-subtitle">
              Enter your credentials to continue
            </p>

            <form className="admin-auth-form" onSubmit={handleLogin}>
              <div className="admin-auth-field">
                <label htmlFor="admin-email">Email</label>
                <input
                  id="admin-email"
                  type="text"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="admin-auth-field">
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="admin-auth-field">
                <label htmlFor="admin-confirm-password">Confirm Password</label>
                <input
                  id="admin-confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button className="admin-auth-btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
