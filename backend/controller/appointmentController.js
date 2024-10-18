import { catchAsyncErrors } from "../middlewares/catchAsncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

// Post Appointment
export const postAppointment = catchAsyncErrors(async(req,res,next)=>{
  const{firstName,lastName,email,phone,nic,dob,gender,appointment_date,department,doctor_firstName,doctor_lastName,hasVisited,address}=req.body;

  if(!firstName||!lastName||!email||!phone||!nic||!dob||!gender||!appointment_date||!department||!doctor_firstName||!doctor_lastName||!address){
    return next(new ErrorHandler("Please Fill Full Form",400))
  }

  // check doctor name duplicacy
  const isConflict =await User.find({
    firstName:doctor_firstName,
    lastName:doctor_lastName,
    role:"Doctor",
    doctorDepartment:department
  });
  if(isConflict.length===0){
    return next(new ErrorHandler("Doctor Not Found",404));
  }
  if(isConflict.length>1){
    return next(new ErrorHandler("Doctors Conflict! Please Connect through Email or Phone Number!"))
  }

  const doctorId=isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor:{
      firstName:doctor_firstName,
      lastName:doctor_lastName
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({
    success:true,
    message:"Appointment Sent Successfully!",
    appointment,
  })
});

// Get All Appointments
export const getAllAppointments = catchAsyncErrors(async(req,res,next)=>{
  const appointments = await Appointment.find();
  res.status(200).json({
    success:true,
    appointments,
  })
});

// Update Appointment Status
export const updateAppointmentStatus = catchAsyncErrors(async(req,res,next)=>{
      // The id of the appointment to be updated is extracted from the URL parameters
  const {id} = req.params;         
  let appointment = await Appointment.findById(id);
  if(!appointment){
    return next(new ErrorHandler("Appointment Not Found",404));
  }   
  // if the appointment exists, findByIdAndUpdate is used to update the appointment with the new data from req.body.
  // new: true: Returns the updated appointment after the update (instead of the original document).
// runValidators: true: Ensures that Mongoose will run schema validators on the update.
// useFindAndModify: false: Avoids using MongoDB's deprecated findAndModify() method.
  appointment = await Appointment.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });
  res.status(200).json({
    success:true,
    message:"Appointment Status Updated!",
    appointment,
  })
});

// Delete Appointment
export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
  const {id} = req.params;
  let appointment = await Appointment.findById(id);
  if(!appointment){
    return next(new ErrorHandler("Appointment Not Found",404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success:true,
    message:"Appointment Deleted!"
  })

})