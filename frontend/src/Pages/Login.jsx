import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://hospital-backend-tpva.onrender.com/api/v1/user/patient/login",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
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
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="auth-page">
        <div className="auth-card auth-card--login">
          <div className="auth-hero" aria-hidden="true">
            <div className="auth-heroBadge">Patient Portal</div>
            <div className="auth-heroCopy">
              <h2>Secure, quick access</h2>
              <p>
                Book appointments, view departments, and manage your profile.
              </p>
            </div>
            <img className="auth-heroArt" src="/signin.png" alt="" />
          </div>

          <div className="auth-main">
            <div className="auth-header">
              <img className="auth-logo" src="/logo.png" alt="ZeeCare" />
              <h1 className="auth-title">Sign In</h1>
              <p className="auth-subtitle">Please login to continue</p>
            </div>

            <form className="auth-form" onSubmit={handleLogin}>
              <div className="auth-field">
                <label htmlFor="patient-email">Email</label>
                <input
                  id="patient-email"
                  type="text"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="patient-password">Password</label>
                <input
                  id="patient-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="patient-confirm-password">
                  Confirm Password
                </label>
                <input
                  id="patient-confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="auth-linkRow">
                <span>Not registered?</span>
                <Link to={"/register"}>Create account</Link>
              </div>

              <button className="auth-btn" type="submit">
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
