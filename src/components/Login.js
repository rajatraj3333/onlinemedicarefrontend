import React, { useEffect, useState,useReducer } from 'react'
import './css/login.css'

import setauth from '../utils/setauth'
import { notification } from 'antd'

import {Link, useNavigate } from 'react-router'
import Userscred from './Userscred'
import { setloginDetails } from '../redux/slice/userSlice'
import Api from '../utils/apiconnect'
import { useDispatch, useSelector } from 'react-redux'

function Login() {

  const dispatch = useDispatch();

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

  function validatelogin (data){
    
    const {email}=data
    let promise =  Api.Post('/auth/login',data)
   
    

    Api.HandleRequest(promise,function(response,error){
           if(response!=null){
            const {data}=response;
            if("message" in data){
              console.log(data.message);
              return;
            }

            const {token,roles} = data
            if(token){
              
              setauth(token);
            dispatch(
              setloginDetails({email,token,roles})
            )
               nav('/admin');
         
            }
            else{
             notification.error({
               message:'invalid credential'
             })
            }
           }
    })

   
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