import React, { useContext, useEffect } from 'react'
import "./App.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom" 
import Home from './pages/Home.jsx'
import Appointment from './pages/Appointment'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.jsx'
import { Context } from './main.jsx'
import axios from 'axios'
import Footer from './components/Footer.jsx'

const App = () => {

//   useEffect runs when the component loads, and we use it to check if the user is logged in.
// fetchUser tries to get the user data from the server.
// If the user is logged in, we update the app's state to say "Yes, the user is authenticated" and store the user data.
// If something goes wrong (user is not logged in), we set the state to say "No, the user is not authenticated."
  const{isAuthenticated,setIsAuthenticated,setUser}=useContext(Context);
  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me",{ withCredentials:true});
        setIsAuthenticated(true);
        setUser(response.data.user);
      }catch(error){
        setIsAuthenticated(false);
        setUser({});
      }
    }
    fetchUser();
  },[]) //[] is called Dependency Array that ensures the useEffect only runs when the isAuthenticated state changes, making your component more efficient by avoiding unnecessary re-fetching of data.
  return (
    <>
     <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/appointment' element={<Appointment/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
      <ToastContainer position='top-center'/>
     </Router>
    
    </>
  )
}

export default App