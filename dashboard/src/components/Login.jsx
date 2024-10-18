import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        {email,password,confirmPassword,role:"Admin"},
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
    <>
    <div className='container form-component'>
      <img src="/logo (1).png" alt="logo" className='logo' />
       <h1 className='form-title'>WELCOME TO ZEECARE</h1>
        <p>Only Admins Are Allowed To Access These Resources! </p>
       
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
       
          <div style={{justifyContent:"center", alignItems:"center"}}>
            <button  type='submit' style={{cursor:"pointer"}}>Login</button>
          </div>
        </form>
      </div>
 
    </>
  )
}

export default Login