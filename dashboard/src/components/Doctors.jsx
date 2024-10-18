import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Doctors = () => {
  const[doctors,setDoctors] =useState([]);
  const {isAuthenticated} = useContext(Context);


//   Inside useEffect, the fetchDoctors function is called.
// API request is sent to the backend to fetch the list of doctors.
// If the request is successful, the response data (data.doctors) is stored in the doctors state.
// If the request fails, an error toast is displayed with the failure message.
// The doctors state will hold the fetched data, which can later be used to render the list of doctors on the UI.

  useEffect(()=>{
    const fetchDoctors =async()=>{
      try{
       const {data} =await axios.get("http://localhost:4000/api/v1/user/doctors",
        {withCredentials:true}
       );
       setDoctors(data.doctors)
      }catch(error){
        toast.error(error.response.data.message);
      }
    }
    fetchDoctors();
  },[]);

  if(!isAuthenticated){
    <Navigate to={"/login"}/>
  }

  return (
    <>
    <section className='page doctors'>
      <h1>DOCTORS</h1>
      <div className="banner">
        {
          doctors && doctors.length > 0?(
           doctors.map(element=>{
            return(
              <div className='card'>
                <img src={element.docAvatar && element.docAvatar.url} alt="Doctor Avatar" />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>Email: <span>{element.email}</span></p>
                  <p>Phone: <span>{element.phone}</span></p>
                  <p>DOB: <span>{element.dob.substring(0,10)}</span></p>
                  <p>Department: <span>{element.doctorDepartment}</span></p>
                  <p>NIC: <span>{element.nic}</span></p>
                  <p>Gender: <span>{element.gender}</span></p>
                </div>
              </div>
            )
           })


          ):<h1>No Registered Doctors Found!</h1>
        }
      </div>
    </section>
    </>
  )
}

export default Doctors