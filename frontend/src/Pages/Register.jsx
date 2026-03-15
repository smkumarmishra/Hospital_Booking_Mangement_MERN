import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://hospital-backend-tpva.onrender.com/api/v1/user/patient/register",
          { firstName, lastName, email, phone, nic, dob, gender, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
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
        <div className="auth-card auth-card--register">
          <div className="auth-hero" aria-hidden="true">
            <div className="auth-heroBadge">New Patient</div>
            <div className="auth-heroCopy">
              <h2>Create your account</h2>
              <p>Join KituCare to book appointments and receive updates.</p>
            </div>
            <img className="auth-heroArt" src="/signupheader.png" alt="" />
          </div>

          <div className="auth-main">
            <div className="auth-header">
              <img className="auth-logo" src="/logo.png" alt="ZeeCare" />
              <h1 className="auth-title">Sign Up</h1>
              <p className="auth-subtitle">Please sign up to continue</p>
            </div>

            <form className="auth-form" onSubmit={handleRegistration}>
              <div className="auth-grid2">
                <div className="auth-field">
                  <label htmlFor="patient-first-name">First Name</label>
                  <input
                    id="patient-first-name"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="auth-field">
                  <label htmlFor="patient-last-name">Last Name</label>
                  <input
                    id="patient-last-name"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-grid2">
                <div className="auth-field">
                  <label htmlFor="patient-register-email">Email</label>
                  <input
                    id="patient-register-email"
                    type="text"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="auth-field">
                  <label htmlFor="patient-phone">Mobile Number</label>
                  <input
                    id="patient-phone"
                    type="number"
                    placeholder="Mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-grid2">
                <div className="auth-field">
                  <label htmlFor="patient-nic">NIC</label>
                  <input
                    id="patient-nic"
                    type="number"
                    placeholder="NIC"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                  />
                </div>
                <div className="auth-field">
                  <label htmlFor="patient-dob">Date of Birth</label>
                  <input
                    id="patient-dob"
                    type={"date"}
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-grid2">
                <div className="auth-field">
                  <label htmlFor="patient-gender">Gender</label>
                  <select
                    id="patient-gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="auth-field">
                  <label htmlFor="patient-register-password">Password</label>
                  <input
                    id="patient-register-password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-linkRow">
                <span>Already registered?</span>
                <Link to={"/signin"}>Login now</Link>
              </div>

              <button className="auth-btn" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
