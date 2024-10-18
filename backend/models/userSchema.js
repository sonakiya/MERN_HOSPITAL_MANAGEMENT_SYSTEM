import { request } from "express";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    minLength:[3,"First Name Must Contain At Least 3 Characters! "]
  },
  lastName:{
    type:String,
    required:true,
    minLength:[3,"Last Name Must Contain At Least 3 Characters! "]
  },
  email:{
    type:String,
    required:true,
     validate:[validator.isEmail,"Please Provide a valid email"]
  },
  phone:{
    type:String,
    required:true,
    minLength:[10,"Phone Number Must Contain Exact 10 Digits!"],
    maxLength:[10,"Phone Number Must Contain Exact 10 Digits!"],
  },
  nic:{
    type:String,
    required:true,
    minLength:[5,"NIC Must Contain Exact 5 Digits!"],
    maxLength:[5,"NIC Number Must Contain Exact 5 Digits!"],
   
  },
  dob:{
    type:Date,
    required:[true, "DOB is required!"],
  },

  gender:{
    type:String,
    required : true,
    enum : ["Male", "Female"],
  },

  password:{
    type:String,
    minLength: [8," Password Must Contain At Least 8 Characters! "],
    required:true,
    select : false,//jb user ki detail get krenge to passwrd k alaava baaki sari details aa jae
  },

  role:{
    type:String,
    required:true,
    enum:["Admin","Patient","Doctor"],
  },

  doctorDepartment:{
    type: String,
  },

  docAvatar:{
    public_id:String,
    url:String,
  }
});

//Hashing Bcrypt
userSchema.pre("save",async function (next) {
  if(!this.isModified("password")){
    next();
  }
  this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonWebToken=function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRES,
  })
}

export const User= mongoose.model("User",userSchema);