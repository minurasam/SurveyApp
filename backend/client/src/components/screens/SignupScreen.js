import React from 'react';
import './Form.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const RegisterScreen = ({history}) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {
        if(localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history]);

    const registerHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

    if(!name.trim() && !username && !email && !password) {
        setTimeout(() => {
          setError("");
        }, 10000);
        return setError("Please fill all the above information!");
    }
    if(!name.trim()) 
    {
        setName("");
        setTimeout(() => {
          setError("");
        }, 10000);
        return setError("Name is required!");
    }
    if(!username.trim()) 
    {
        setUsername("");
        setTimeout(() => {
          setError("");
        }, 10000);
        return setError("Username is required");
    }
    //Email
    if (!email) 
    {
        setEmail("");
        setTimeout(() => {
          setError("");
        }, 10000);
        return setError("Email is required");
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) 
    {
        setEmail("");
        setTimeout(() => {
          setError("");
        }, 10000);
        return setError("Email address is invalid");
    }
    if (!password)
    {
        setPassword("");
        setTimeout(() => {
          setError("");
        }, 10000);
        return setError("Password is Required");
    } 
    else if (password.length < 8) 
    {
        setPassword("");
        setTimeout(() => {
          setError("");
        }, 10000);
        return setError("Password needs to be of 8 characters or more");
    }
    if (!password2) 
    {
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 10000);
        return setError("Password confirmation is required");
    }
    else if (password !== password2) {
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Passwords do not match");
    }
  
      try {
        const { data } = await axios.post(
          "http://localhost:8000/users/signup",
          {
            name,
            username,
            email,
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
        }, 5000);
      }
    };

    return (
        <div className='form-container'>
            <span className="close-btn">x</span>
            <div className='form-content-left'>
                <img src='/img/img-2.svg' alt='spaceship' className='form-img'/>
            </div>
        <div className='form-content-right'>
            <form className='form' onSubmit={registerHandler}>
                
                <h1>Get started with us today! Create your account
                    by filling out the information below.</h1>   
                
                <div className='form-inputs'>
                  <div className="row">
                    <div className='col-6'>
                  <label htmlFor='name' className='form-label'>
                        First Name 
                    </label>
                    <input id='name' 
                           type='text' 
                           name='name' 
                           className='form-input' 
                           placeholder='Enter your full name'
                           value={name}
                           onChange={(e) => setName(e.target.value)}        
                    />
                    </div>
                    <div className='col-6'>
                    <label htmlFor='username' className='form-label'>
                        Last Name 
                    </label>
                    <input id='username' 
                           type='text' 
                           name='username' 
                           className='form-input' 
                           placeholder='Enter your Username'
        
                    />
                  </div>
                  </div>
                  <div className='form-inputs'>
                    <label htmlFor='username' className='form-label'>
                        Username 
                    </label>
                    <input id='username' 
                           type='text' 
                           name='username' 
                           className='form-input' 
                           placeholder='Enter your Username'
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}        
                    />
</div>
                </div>

                
                  
        

                <div className='form-inputs'>
                    <label htmlFor='email' className='form-label'>
                        Email 
                    </label>
                    <input 
                        id='email' 
                        type='text' 
                        name='email' 
                        className='form-input' 
                        placeholder='Enter your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}                       
                    />
                </div>

                <div className='form-inputs'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input 
                        id='password'
                        type='password' 
                        name='password' 
                        className='form-input' 
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </div>

                <div className='form-inputs'>
                    <label htmlFor='password2' className='form-label'>
                        Confirm Password
                    </label>
                    <input 
                        id='password2' 
                        type='password' 
                        name='password2' 
                        className='form-input' 
                        placeholder='Confirm Password'
                        value={password2}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <span className="error-message">{error}</span>}
                <br></br>
                <button className='form-input-btn' type='submit'>
                    Sign Up 
                </button>             
                <span className='form-input-login'>
                    Already have an account? Login <Link to="/login">Login</Link>
                </span>
                
            
            </form>
        </div>
    </div>
    )
}

export default RegisterScreen;
