import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsncErrors.js";
import ErrorHandler from "./errorMiddleWare.js";
import jwt from "jsonwebtoken";



//Authentication and Autherization for Admin--->

//Authentication--:
export const isAdminAuthenticated = catchAsyncErrors(async(req,res,next)=>{
  const token = req.cookies.adminToken;
  if(!token){
    return next(new ErrorHandler("Admin Not Authenticated!",400));
  }
  //when we found token
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  // Authorization-->
  if(req.user.role !== "Admin"){
    return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`,403));
    
  }
  next();
});



//Authentication and Autherization for Patient--->

//Authentication--:
export const isPatientAuthenticated = catchAsyncErrors(async(req,res,next)=>{
  const token = req.cookies.patientToken;
  if(!token){
    return next(new ErrorHandler("Patient Not Authenticated!",400));
  }
  //when we found token
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  // Authorization-->
  if(req.user.role !== "Patient"){
    return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`,403));
    
  }
  next();
});