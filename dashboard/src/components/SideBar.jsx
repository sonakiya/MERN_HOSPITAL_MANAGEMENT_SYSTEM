import React, { useState } from 'react'
import { useContext } from 'react';
import { Context } from '../main';
import {TiHome} from "react-icons/ti";
import {RiLogoutBoxFill} from "react-icons/ri";
import {AiFillMessage} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaUserDoctor} from "react-icons/fa6";
import {MdAddModerator} from "react-icons/md";
import {IoPersonAddSharp} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";


const SideBar = () => {
  const[show,setShow]=useState(false);

  const{isAuthenticated,setIsAuthenticated}=useContext(Context);

  const navigateTo =useNavigate();

  const gotoHome=()=>{
    navigateTo("/");
    setShow(!show);
  }
  const gotoDoctorsPage=()=>{
    navigateTo("/doctors");
    setShow(!show);
  }
  const gotoMessagePage=()=>{
    navigateTo("/messages");
    setShow(!show);
  }
  const gotoAddNewDoctor=()=>{
    navigateTo("/doctor/addnew");
    setShow(!show);
  }
  const gotoAddNewAdmin=()=>{
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  const handleLogout=async()=>{ //async:This lets you wait for the server response without blocking other code.
      
    //This below function makes a GET request to the API endpoint http://localhost:4000/api/v1/user/patient/logout using axios.
   // The request includes the cookie (withCredentials: true) to ensure the user is properly identified. If the server responds successfully, the then() block runs
  //  If something goes wrong (e.g., the server fails to log out), the catch() block runs.   ------->>>>>>
   await axios.get("http://localhost:4000/api/v1/user/admin/logout", {withCredentials:true,}).then((res)=>{
    toast.success(res.data.message);
    setIsAuthenticated(false)
   }).catch((err)=>{
    toast.error(err.response.data.message)//It shows an error message to the user, again using react-toastify, based on the error response from the server.

   });

}

  return (
    <>
    <nav style={!isAuthenticated ? {display:"none"}:{display:"flex"}} 
    className={show?"show sidebar": "sidebar"}
    >
  <div className="links">
    <TiHome onClick={gotoHome}/>
    <FaUserDoctor onClick={gotoDoctorsPage}/>
    <MdAddModerator onClick={gotoAddNewAdmin}/>
    <IoPersonAddSharp onClick={gotoAddNewDoctor}/>
    <AiFillMessage onClick={gotoMessagePage}/>
    <RiLogoutBoxFill onClick={handleLogout}/>
  </div>
</nav>
 <div
 style={!isAuthenticated?{display:"none"}:{display:"flex"}} 
 className="wrapper">
   <GiHamburgerMenu className='hamburger' onClick={()=>setShow(!show)}/>
   </div>    
    </>
  )
}

export default SideBar