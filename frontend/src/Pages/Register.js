import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from 'react';
import axios from "../axios/axios";

function Register() {
    const navigate = useNavigate();
    const [firstName,setfirstName] = useState();
    const [lastName,setlastName] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setconfirmPassword] = useState();
    const [phone,setPhone] = useState();
    const [email,setEmail] = useState()
    const [error,setError] = useState()
    const handleSubmit= (e) => {
        if(password !== confirmPassword) {
            setError("Bad Confirmations")
        }
        else if(password.length < 8)
        {
            setError("Password must contain 8 characters")
        }
        else if(typeof phone !== "number" && phone.length < 8 )
        {
            setError("Phone must contain 8 characters")
        }
        else {
            const postData = {
                firstName:firstName,
                lastName:lastName,
                phone:phone,
                email:email,
                password:password
            }
            axios.post('users/register',postData,{
                headers:{
                    'Content-Type': 'application/json'
                },
             
            }).then((response) => {
                if(response.data.succes === false)
                {
                    setError(response.data.message)
                }
                else 
                {   
                    navigate('/Login')
                }
            }).catch(error => console.log(error))
        }
    
        e.preventDefault();
      }
  return <div class="box">
	
  <div class="inner-box">
  <div>
      {error ? <div class="alert alert-primary" role="alert">
      {error}
</div> : null }
  </div>
  <form onSubmit={e => { handleSubmit(e) }} >
  <h2>Welcome SignUp Today</h2>
  <input type="text" name="firstname" value={firstName} onChange={e=> setfirstName(e.target.value)} placeholder="Your First Name" autoComplete="on" required/>
  <input type="text" name="lastname" value={lastName} onChange={e=> setlastName(e.target.value)} placeholder="Your Last Name" autoComplete="on" required/>
  <input type="email" name="email" value={email} onChange={e=> setEmail(e.target.value)} placeholder="Your Email" autoComplete="on" required/>
  <input type="number" Pattern="[0-9]{8}" value={phone} onChange={e=> setPhone(e.target.value)}  maxLength={8}  minLenght={8} name="tel" placeholder="Your phone number Ex:08 789 456" autoComplete="on" required/>
  <input type="password" value={password} onChange={e=> setPassword(e.target.value)} name="password" minLenght={8}  placeholder="Password" required/>
  <input type="password" value={confirmPassword} onChange={e=> setconfirmPassword(e.target.value)} name="conformpassword" placeholder="Conform Password"  required/>
  <input type="submit" value="SignUp" />
  
  <p style={{textAlign:"center"}} >
          <Link to="/Login">
          <span>Already Register  Sign In ? </span>
          </Link>
          
  </p>
  
  </form>
  
  </div>
  
</div>;
}

export default Register;