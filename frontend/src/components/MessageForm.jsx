import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
   

// The function collects form data and sends it to the server.
// If successful, it shows a success notification and clears the form.
// If there's an error, it shows an error notification.
// By breaking down the steps, you’ll be able to easily recall how it works during your interview:
const handleMessage = async(e) => {
    e.preventDefault();    // Prevents the form from reloading.
    try{                   // Sends form data to the server with Axios.
     await axios.post(     //used to send a POST request to the server at the URL
      "http://localhost:4000/api/v1/message/send",
      {firstName,lastName,email,phone,message},
      {
        withCredentials:true,//means that the request will include cookies, if any (e.g., for authentication).
        headers:{
          "Content-type":"application/json",//the data being sent is of type JSON so the server knows how to process the data.
        }
      }
    ).then(res=>{               // Shows a success message and resets the form if successful.
      toast.success(res.data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    })
    }catch(error){            // Shows an error message if something goes wrong.
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='message-form-container'>
      <h2 className='message-form-header'>Send Us A Message</h2>
      <form onSubmit={handleMessage}>
        <div className='message-form-row'>
          <input
            type="text"
            className='message-input'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className='message-input'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className='message-form-row'>
          <input
            type="text"
            className='message-input'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            className='message-input'
            placeholder='Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <textarea
          rows={7}
          className='message-textarea'
          placeholder='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type='submit' className='message-submit-btn'>Send</button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm
