import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); // Ensure setIsAuthenticated is available
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/patient/register",
        { firstName, lastName, email, phone, nic, dob, gender, password, role:"Patient" }, // Include role
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");

    } catch (error) {
       // Log error for debugging
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="register-form-container">
      <div className="register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              className="input-field"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
             
            />
            <input
              type="text"
              className="input-field"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
             
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             
            />
            <input
              type="tel"
              className="input-field"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="input-field"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
             
            />
            <input
              type="date"
              className="input-field"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
             
            />
          </div>
          <div className="form-group">
            <select
              className="input-field"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
             
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
           
          </div>
          <div className="link-container">
            <p>Already Registered?</p>
            <Link to="/login" className="login-link">Login Now</Link>
          </div>
          <div className="btn-container">
            <button className="submit-btn" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
