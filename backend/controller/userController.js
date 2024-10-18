import { catchAsyncErrors } from "../middlewares/catchAsncErrors.js"; 
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtTokens.js";  
import cloudinary from "cloudinary"



// Patient register
export const patientRegister= catchAsyncErrors(async(req,res,next)=>{
  const{firstName,lastName,email,phone,password,gender,dob,nic, role}=req.body;

  if(!firstName||!lastName||!email||!phone||!password||!gender||!dob||!nic|| !role){
    return next(new ErrorHandler("Please Fill Full Form",400))
  }
  let user = await User.findOne({email});
  if(user){
    return next(new ErrorHandler("User Already Registered!",400))
  }
  user = await User.create({firstName,lastName,email,phone,password,gender,dob,nic, role});
  generateToken(user,"User Registered!",200,res)
  });


// Login
export const login = catchAsyncErrors(async(req,res,next)=>{
const{email,password,confirmPassword,role}=req.body;
if(!email||!password||!confirmPassword||!role){
    return next(new ErrorHandler("PLease Provide All Details ",400))
}
if(password !== confirmPassword){
  return next(new ErrorHandler("Password and Confirm Password Do Not Matched! ",400))
}
const user = await User.findOne({email}).select("+password");
if(!user){
  return next(new ErrorHandler("Invalid Password or Email! ",400));
}

const isPasswordMatched = await user.comparePassword(password);
if(!isPasswordMatched){
  return next(new ErrorHandler("Invalid Password or Email! ",400))
}

if(role !== user.role){
  return next(new ErrorHandler("User With This Role Is Not Found! ",400))
}
generateToken(user,"User Logged In Successfully!",200,res)
})

// Add New Admin
export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
  const{firstName,lastName,email,phone,password,gender,dob,nic}=req.body;
  if(!firstName||!lastName||!email||!phone||!password||!gender||!dob||!nic){
    return next(new ErrorHandler("Please Fill Full Form",400))
  }
  const isRegistered= await User.findOne({email});
  if(isRegistered){
    return next(new ErrorHandler(`${isRegistered.role} With this Email Already Exists!`))
  } 
  const admin = await User.create({firstName,lastName,email,phone,password,gender,dob,nic,role:"Admin"});
  res.status(200).json({
    success:true,
    message: "New Admin Registered",

  })
});

// get all registered Doctors
export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
  const doctors = await User.find({role:"Doctor"});
  res.status(200).json({
    success:true,
    doctors  
  })
});

// get User Details
export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
  const user = req.user;
  res.status(200).json({
    success:true,
    user
  })
})

// Logout Admin
export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
  res.status(200).cookie("adminToken","",{
    httpOnly:true,
    expires:new Date(Date.now()),
  }).json({
    success:true,
    message:"Admin Logged out Successfully!!"
  })
})


// Logout Patient
export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
  res.status(200).cookie("patientToken","",{
    httpOnly:true,
    expires:new Date(Date.now()),
  }).json({
    success:true,
    message:"Patient Logged out Successfully!!"
  })
});

// Add new Doctor
export const addNewDoctor =catchAsyncErrors(async(req,res,next)=>{
  if(!req.files || Object.keys(req.files).length===0){
    return next(new ErrorHandler("Doctor Avatar Required!",400));
  }
  const {docAvatar}=req.files;
  const allowedFormats = ["image/png","image/jpeg","image/webp"];
  if(!allowedFormats.includes(docAvatar.mimetype)){
    return next(new ErrorHandler("File Format Not Supported!",400));

  }

  const{firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment}=req.body;
  if(!firstName||!lastName||!email||!phone||!password||!gender||!dob||!nic){
    return next(new ErrorHandler("please provide Full Details",400));
  }
  // check user is registered or not
  const isRegistered =await User.findOne({email});
  if(isRegistered){
    return next(new ErrorHandler(`${isRegistered.role} is already registered with this email`,400));
  }

  // upload image on Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
      console.log("Cloudinary Error: ",cloudinaryResponse.error || "Unknown Error" );
    }
    // Create User
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      nic,
      doctorDepartment,
      role:"Doctor",
      docAvatar:  {
        public_id : cloudinaryResponse.public_id,
        url : cloudinaryResponse.secure_url,
      }

    });
    res.status(200).json({
      success:true,
      message:"New Doctor Registered",
      doctor
    })
})