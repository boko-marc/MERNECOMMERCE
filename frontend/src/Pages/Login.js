import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from 'react';
import axios from "../axios/axios";
function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [error,setError] =useState()
    const login = {
        email:email,
        password:password
    }
    function  setCookie (cname, cvalue, exdays) {
        const d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        const expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
      }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('users/login',login,{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.data.succes === false)
            {
                setError(response.data.message)
            }
            else {
                
                // eslint-disable-next-line no-cond-assign
                if(response.data.boolean === 0)
                {
                    
                    setCookie("userId",response.data.userId,3)
                    setCookie("token",response.data.token)
                    navigate('/Admin')
                }
                else {
                    setCookie("userId",response.data.userId,3)
                    setCookie("token",response.data.token)
                    navigate('/Home')
                }
            }
        })
    }
  return <div class="box">

  <div class="inner-box">
  <div>
      {error ? <div class="alert alert-primary" role="alert">
      {error}
</div> : null }
  </div>
      <form onSubmit={e => { handleSubmit(e) }} >
      
      <h2>Login Here</h2>
      
      <input type="email" name="email" value={email} onChange={e=> setEmail(e.target.value)} placeholder="Your Email" autoComplete="on" required/>
      <input type="password" password="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Password" required/>
      
      <p>
      
      <input type="checkbox" /><span> Keep me Signed In</span>
      <p style={{textAlign:"center"}}>
          <Link to="/ResetPassword">
          <span class="forgot" >Forgot Password?</span>
              </Link>
      </p>
      
      
      </p>
      
      <input type="submit" value="LogIn" />
      
      <p style={{textAlign:"center"}}>
          <Link to="/Register">
          <span>Not a member? Sign Up </span> 
              </Link>
      </p>
      
      </form>
  
  </div>

</div>
}

export default Login;
