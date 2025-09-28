import React, { useState, useContext } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Patient"); // Default role

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !role) {
      return toast.error("Please fill all fields!");
    }

    if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password do not match!");
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, confirmPassword, role },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      setUser(response.data.user);

      // Redirect based on role
      if (role === "Admin") {
        window.location.href = "http://localhost:5174"; // Admin dashboard
      } else {
        window.location.href = "http://localhost:5173"; // Patient dashboard
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid Email, Password, or Role!";
      toast.error(errorMessage);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h2>Sign In</h2>
        <p>Please login to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            className="login-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          <div className="role-selection">
            <label>
              <input
                type="radio"
                name="role"
                value="Patient"
                checked={role === "Patient"}
                onChange={(e) => setRole(e.target.value)}
              />
              Patient
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="Admin"
                checked={role === "Admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
          </div>

          <div className="login-btn-container">
            <button className="login-btn" type="submit">
              Login
            </button>
          </div>
        </form>

        <div className="login-link-container">
          <p>Not Registered?</p>
          <a href="/register" className="login-link">
            Register Now as Patient
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
