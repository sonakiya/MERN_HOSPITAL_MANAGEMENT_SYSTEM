import React, { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { Context } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios';
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => {
  const[show,setShow]=useState(false);
  const {isAuthenticated,setIsAuthenticated} =useContext(Context);

  const navigateTo=useNavigate();

  const handleLogout=async()=>{ //async:This lets you wait for the server response without blocking other code.
      
      //This below function makes a GET request to the API endpoint http://localhost:4000/api/v1/user/patient/logout using axios.
     // The request includes the cookie (withCredentials: true) to ensure the user is properly identified. If the server responds successfully, the then() block runs
    //  If something goes wrong (e.g., the server fails to log out), the catch() block runs.   ------->>>>>>
     await axios.get("http://localhost:4000/api/v1/user/patient/logout", {withCredentials:true,}).then((res)=>{
      toast.success(res.data.message);
      setIsAuthenticated(false)
     }).catch((err)=>{
      toast.error(err.response.data.message)//It shows an error message to the user, again using react-toastify, based on the error response from the server.

     });
  
  }
  const gotoLogin=()=>{
    navigateTo("/login")
  }
  return (
    <nav className='container'>
      <div className="logo">   <img src="/logo (1).png" alt="logo" className='logo-img' /></div>
      <div className={show?"navLinks showmenu": "navLinks"}>
        <div className="links">
          <Link to={"/"}>HOME</Link>
          <Link to={"/appointment"}>APPOINTMENT</Link>
          <Link to={"/about"}>ABOUT US</Link>
        </div>
        {isAuthenticated ? (<button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>):(<button className='loginBtn btn' onClick={gotoLogin}>LOGIN</button>)}
      </div>   
      <div className='hamburger' onClick={()=>setShow(!show)}><GiHamburgerMenu/></div>
    </nav>
  )
}

export default Navbar