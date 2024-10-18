import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response=await axios.post("http://localhost:4000/api/v1/user/login",
        {email,password,confirmPassword,role:"Patient"},
        {
           withCredentials:true, 
           headers:{"Content-Type":"application/json"}
          }
        );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");

    }catch(error){
      toast.error(error.response.data.message)
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className='login-form-container'>
      <div className='login-form'>
        <h2>Sign In</h2>
        <p>Please Login to Continue</p>
       
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className='login-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <input
            type="password"
            className='login-input'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className='login-input'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className='login-link-container'>
            <p>Not Registered?</p>
            <Link to={"/register"} className='login-link'>Register Now</Link>
          </div>
          <div className='login-btn-container'>
            <button className='login-btn' type='submit'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
