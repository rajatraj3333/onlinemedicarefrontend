import React, { useEffect, useState,useReducer } from 'react'
import './css/login.css'
import api from '../utils/api'
import Password from 'antd/es/input/Password'
import setauth from '../utils/setauth'
import { notification } from 'antd'
import { useContext } from 'react'
import userContext from './context/usercontext'
import {Link, useNavigate } from 'react-router'
import Userscred from './Userscred'
import AuthContext from './context/Authcontext'
import { useAuth } from './Userprovider'
function Login() {

  const {login} = useAuth();
  const nav = useNavigate();




  let fields= {
    email:'',
    password:''
  }

  let elem= [
   
    {
      type:'email',
      value:'',
      placeholder:'Email',
      required:true,
      name:'email'
    },
    {
      type:'password',
      value:'',
      placeholder:'Password',
      required:true,
      name:'password'
    },
   
  ]

  async function validatelogin (data){
    
   let result = await api.post('/auth/login',data)
   const {token,roles} = result.data
   if(token){

  await  login(data.email);
    setauth(token);
    localStorage.setItem('roles',roles);
    // val.setuserdetails({...val.userdetails,useremail:data.email,token:token})
  
   
   
   
    nav('/admin');

   }
   else{
    notification.error({
      message:'invalid credential'
    })
   }
  }
  

  let Extra = ()=>{
    return (
      <div className='footer'>

      <span >Don't have Account?</span><a href='/register' className='create'>Create now</a>
      <span className=' create forgetpass' >
        <Link to={'/forgetpassword'}>
        Forget Password
        </Link>
        </span>
      </div>
    )
  }
  


  return (
    
    <>

   <Userscred element={elem} buttontext={'Login'} fields={fields}  validation={validatelogin} Extratext={Extra}/>
  
</>
  )
}

export default Login