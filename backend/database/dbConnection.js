import mongoose from "mongoose";

export const dbConnection=()=>{
mongoose.connect(process.env.MONGO_URI,{
  dbName:"MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM"
}).then(()=>{
  console.log("Connected to DataBase!")
}).catch(err=>{
  console.log(`Some error occured while conecting to database: ${err}`)
})

}