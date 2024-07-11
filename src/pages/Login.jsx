import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const {user,handleUserLogin}=useAuth()
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    useEffect(()=>{
        if(user){
            navigate('/') 
        }
    },[])
  return (
    <div className="auth--container">
        <div className="form--wrapper">
            <form onSubmit={(e) => {handleUserLogin(e,email,password)}}>
                <div className='field--wrapper'>
                    <label>Email:</label>
                    <input
                    required
                    type='email'
                    name='email'
                    placeholder='Enter your email...'
                    onChange={(e)=>{setEmail(e.target.value)}}
                    value={email}
                    />
                </div>
                <div className='field--wrapper'>
                    <label>Password:</label>
                    <input
                    required
                    type='password'
                    name='password'
                    placeholder='Enter your password...'
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}
                    />
                </div>
                 <div className='field--wrapper'>
                <input
                className='btn btn--lg btn--main'
                type='submit'
                value="Login"
                />
                </div> 
            </form>

        </div>

    </div>
  )
}

export default Login