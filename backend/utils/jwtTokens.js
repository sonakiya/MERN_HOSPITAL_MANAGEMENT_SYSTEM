export const generateToken =(user,message,statusCode,res)=>{
  const token = user.generateJsonWebToken();
  const cookieName = user.role==="Admin" ? "adminToken" : "patientToken";
  res.status(statusCode).cookie(cookieName,token,{
    expires:new Date(
      Date.now()+ process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),  //day * hour * min * sec * miliSec
      httpOnly:true,
      secure:true,
      sameSite:"None"
  }).json({
    succes:true,
    message,
    user,
    token,
  }) ;
}