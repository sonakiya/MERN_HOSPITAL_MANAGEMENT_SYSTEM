import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewDoctor = () => {
  const { isAuthenticated} = useContext(Context); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [doctorDepartment, setDoctorDepartment] = useState('');
  const [docAvatar, setDocAvatar] = useState('');
  const [docAvatarPreview, setDocAvatarPreview] = useState('');


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

 //handle Avatar : The handleAvatar function leverages the FileReader API to read the file selected by the user, converting it into a Base64 string for real-time preview, while also storing the original file in state for later upload.--------->>>>>>>

 const handleAvatar=(e)=>{
  const file =e.target.files[0];//accesses the first file selected by the user in the file input.
  const reader = new FileReader();//built-in JavaScript object that allows to read contents of files stored on the user’s computer
  reader.readAsDataURL(file);// This method reads the file as a Base64 encoded string (Data URL format).
  // Base64: It's a way to encode binary data, such as images, into text that can be safely embedded in web pages or sent across the network. It's useful here because React can display the image preview directly from this string without needing to upload it to the server first.
  reader.onload=()=>{//This is an event listener for the FileReader. Once the file is successfully read and the Base64 string is created, this event gets triggered.
    setDocAvatarPreview(reader.result);//This React state function updates the state variable (docAvatarPreview) with the Base64 string, so the component can immediately show a preview of the image on the page.
    setDocAvatar(file);//This stores the original file (the binary object) in a state variable (docAvatar). You'll typically need this to upload the actual file to a server later (not the Base64 string).
  };
 }

//handle New Doctor
  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); //data text or file dono format m bhej skte hai
      formData.append("firstName",firstName);
      formData.append("lastName",lastName);
      formData.append("email",email);
      formData.append("phone",phone);
     
      formData.append("nic",nic);
      formData.append("gender",gender);
      formData.append("password",password);
      formData.append("doctorDepartment",doctorDepartment);
      formData.append("docAvatar",docAvatar);
      formData.append("dob",dob);
      
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/doctor/addnew',
       formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      toast.success(response.data.message);
     
      navigateTo('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  if (!isAuthenticated) { 
    return <Navigate to={'/login'} />;
  }

  return (
    <section className="page">
      <div className="container add-doctor-form">
        <img src="/logo (1).png" alt="logo" className='logo'  />
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor}>
         
           <div className="first-wrapper">
            <div>
              <img src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"} alt="Doctor Avatar" />
               <input type="file" onChange={handleAvatar} />
            </div>
            <div>
             
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
            <select value={doctorDepartment}
            onChange={(e)=>setDoctorDepartment(e.target.value)}
            >
           <option value="">Select Department</option>
           {
            departmentsArray.map((element,index)=>{
              return(
                <option value={element} key={index}>{element}</option>
              )
            })
           }


            </select>
            <button className="submit-btn" type="submit" style={{cursor:"pointer"}}>
              Register New Admin
            </button>
            </div>
           </div>
           
          
         
          
       
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;
