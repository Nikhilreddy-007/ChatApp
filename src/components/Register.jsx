import React from 'react'
import { useState } from 'react'
import  { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

const Register = () => {

    const [email,setEmail]=useState('')
     const [pass1,setPass1]=useState('')
     const [pass2,setPass2]=useState('')
     const[name,setName]=useState('')

     const {handleUserRegister} = useAuth()
  return (
    <div className="auth--container">
        <div className="form--wrapper">
            <form onSubmit={(e) => {handleUserRegister(e,email,pass1,pass2,name)}}>
            <div className='field--wrapper'>
                    <label>Name:</label>
                    <input
                    required
                    type='text'
                    name='name'
                    placeholder='Enter your name...'
                    onChange={(e)=>{setName(e.target.value)}}
                    value={name}
                    />
                </div>
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
                    onChange={(e)=>{setPass1(e.target.value)}}
                    value={pass1}
                    />
                </div>
                <div className='field--wrapper'>
                    <label>Confirm Password:</label>
                    <input
                    required
                    type='password'
                    name='password2'
                    placeholder='Re-enter your password...'
                    onChange={(e)=>{setPass2(e.target.value)}}
                    value={pass2}
                    />
                </div>
                 <div className='field--wrapper'>
                <input
                className='btn btn--lg btn--main'
                type='submit'
                value="Register"
                />
                </div> 
                <div>
                    <p>Already have an account? Login <Link to="/login">here</Link></p>
                </div>
            </form>

        </div>

    </div>
  )
}

export default Register