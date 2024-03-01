import React from 'react'
import './LoginSignUp.css'
import Loader from '../layout/Loader/Loader'
import { MdMailOutline } from "react-icons/md";
import { IoLockClosedSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const LoginSignUp = () => {
  return (
    <>
    <div className='LoginSignUpConrainer'>
      <div className='LoginSignUpBox'>
        <div>
          <div className='login_signUp_toggle'>
            <p onClick={(e)=> switchTabs(e , "login")}>LOGIN</p>
            <p onClick={(e)=> switchTabs(e , "register")}>REGISTER</p>
          </div>
          <button ref={switcherTab}></button>
        </div>
        <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
          <div className='loginEmail'>
          <MdMailOutline />
          <input type="email" placeholder='Email'
          required value={loginEmail} 
          onChange={(e)=> setLoginEmail(e.target.value)}/>
          </div>
          <div className="loginPassword">
          <IoLockClosedSharp />
          <input type="password" 
            placeholder='Password'
            required
            value={loginPassword}
            onChange={(e)=> setLoginPassword(e.target.value)}
           />
          </div>
          <Link to="/password/forgot">Forgot Password</Link>
          <input type="submit" value="Login" className='loginBtn' />    
        </form>
      </div>
    </div>
    </>
  )
}

export default LoginSignUp