import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const[department,setDepartment]=useState("");
  const[doctorFirstName,setDoctorFirstName]=useState("");
  const[doctorLastName,setDoctorLastName]=useState("");
  const[address,setAddress]=useState("");
  const[hasVisited,setHasVisited]=useState("");

  const departmentsArray=[
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const navigateTo = useNavigate();
  // jb jb page refresh ho tb tb saare registered doctors get ho
  const[doctors,setDoctors]=useState([]); 
  useEffect(()=>{
   const fetchDoctors= async()=>{
    const{data}=await axios.get("http://localhost:4000/api/v1/user/doctors",
      {withCredentials:true});
      setDoctors(data.doctors);
   }  
   fetchDoctors();
  },[]) //empty array: jb jb page refresh ho tb tb useEffect run ho

  const handleAppointment=async(e)=>{
    e.preventDefault();
    try{
      const hasVisitedBool=Boolean(hasVisited); //converted hasVisited from String to Boolean
      const{data} = await axios.post("http://localhost:4000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json",
          }
        }
      );
      toast.success(data.message);
      navigateTo("/")
    }catch(error){
     toast.error(error.response.data.message)
    }
  }
  return (
    <>
     <div className="register-form-container" style={{height:"auto",maxHeight:"none",padding:"20px",width:"100%",overflowY:"auto"  }}>
      <div className="register-form">
        <h2 style={{marginBottom:"45px", marginTop:"0", color:"GrayText"}}>Appointment</h2>
        
        <form onSubmit={handleAppointment} style={{margin:"0 auto"}}>
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
            <input type="date"
            placeholder='Appointment Date'
            onChange={(e)=>setAppointmentDate(e.target.value)}
            style={{width:"205px"}}  />
         </div>


          <div>
            <select value={department} onChange={(e)=>{
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");

            }}
            style={{marginLeft:"9px", height:"30px", width:"180px"}}>
              {
                departmentsArray.map((depart,index)=>{
                  return(
                    <option value={depart} key={index}>{depart}</option>
                  )
                })
              }
            </select>
            <select value={`${doctorFirstName} ${doctorLastName}`} onChange={(e)=>{
              const[firstName,lastName]=e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            disabled={!department} //agr department select na ho to isko disabled rkhna hai 
            style={{marginLeft:"9px", height:"30px", width:"180px"}}
            >
             <option value="">Select Doctor</option>
             {/* registered doctors k array m se select kro unn doctors ko jinka department...user k diye gye department s match kr jaae ----->>>> */}
             {
              doctors.filter(doctor=>doctor.doctorDepartment === department).map((doctor,index)=>{
                return(
                  <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
                    {doctor.firstName} {doctor.lastName}
                  </option>
                 
                )
              })
             } 
            
            </select>
          </div>

          <textarea rows="5" cols={50}
          value={address} 
          onChange={(e)=>setAddress(e.target.value)} 
          placeholder='Address'
          style={{marginLeft:"15px", marginTop:"10px", maxHeight:"150px",overflowY:"auto"}}
          />


          <div className="link-container" style={{display:"flex"}}>
            <p style={{fontSize:"15px", marginLeft:"200px"}}>Have you visited before?</p>
             <input type="checkbox" 
             checked={hasVisited} 
             onChange={(e)=> setHasVisited(e.target.checked)} 
             style={{marginTop:"-18px", marginLeft:"9px" }}/>
          </div>

          <div className="btn-container">
            <button className="submit-btn" type="submit">GET APPOINTMENT</button>
          </div>
        </form>
      </div>
    </div>
    
    </>
  )
}

export default AppointmentForm