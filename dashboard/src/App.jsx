import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import AddNewDoctor from "./components/AddNewDoctor.jsx";
import AddNewAdmin from "./components/AddNewAdmin.jsx";
import Doctors from "./components/Doctors.jsx";
import Messages from "./components/Messages.jsx";
import SideBar  from './components/SideBar.jsx';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main.jsx';
import "./App.css";
import axios from 'axios';

const App = () => {
  const{isAuthenticated,setIsAuthenticated,admin,setAdmin}=useContext(Context);

  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials:true}
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      }catch(error){
        setIsAuthenticated(false);
        setAdmin({});
      }
    }
    fetchUser();
  },[]);
  return (
    <>
    <Router>
      <SideBar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/doctor/addnew' element={<AddNewDoctor/>}/>
        <Route path='/admin/addnew' element={<AddNewAdmin/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/doctors' element={<Doctors/>}/>  
      </Routes>
      <ToastContainer position='top-center'/>
    </Router>
    </>
  )
}

export default App