import React from 'react';
import './LoginScreen.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export const FormLogin = ({ history }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history]);

    const loginHandler = async (e) => {
        e.preventDefault();
    
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
  
      if(!username && !password) {
          setTimeout(() => {
            setError("");
          }, 10000);
          return setError("Please fill in the credentials!");
      }
      if(!username.trim()) 
      {
          setUsername("");
          setTimeout(() => {
            setError("");
          }, 10000);
          return setError("Username is required");
      }
      if (!password)
      {
          setPassword("");
          setTimeout(() => {
            setError("");
          }, 10000);
          return setError("Password is Required");
      } 
        try {
          const { data } = await axios.post(
            "http://localhost:8000/users/login",
            {
              username,
              password,
            },
            config
          );
    
          localStorage.setItem("authToken", data.token);
    
          history.push("/");
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 10000);
        }
      };
  


    return (
        <div className='form-container'>
            <span className="close-btn">x</span>
            <div className='form-content-left'>
                <img src='/img/img-2.svg' alt='spaceship' className='form-img'/>
            </div>
        <div className='form-content-right'>
            
            <form className='form' onSubmit={loginHandler}>
                <h1>Login and Explore SurveyMin</h1>  

                <div className='form-inputs'>
                    <label htmlFor='username' className='form-label'>
                        Username 
                    </label>
                    <input required id='username' 
                           type='text' 
                           name='username' 
                           className='form-input' 
                           placeholder='Enter your Username'
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           tabIndex={1}      
                    />
                </div>

                <div className='form-inputs'>
                    <label htmlFor='password' className='form-label'>
                        Password:{" "}
                        <Link 
                        to="/forgotpassword" 
                        className="login-screen__forgotpassword"
                        tabIndex={4}
                        > Forgot Password?</Link>
                    </label>
                    <input
                        required 
                        id='password'
                        type='password'
                        className='form-input' 
                        placeholder='Enter your Password'
                        autoComplete="true"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        tabIndex={1}
                        />
                </div>

                {error && <span className="error-message">{error}</span>}
                <br></br>
                <button className='form-input-btn' type='submit' tabIndex={3}>
                    Login 
                </button>             
                <span className='form-input-login'>
                    Don't have an account? <Link to="/signup">Signup Here</Link>
                </span>
            
            </form>
        </div>
    </div>
    )
}

export default FormLogin;