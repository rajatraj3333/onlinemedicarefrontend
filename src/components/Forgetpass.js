import React, { useState } from 'react'
import Userscred from './Userscred';

import api from '../utils/api'
import { notification } from 'antd';
import { useNavigate } from 'react-router';
function Forgetpass() {
  const navigate = useNavigate();
    let fields= {
        email:'',
        otp:''
       }
       const [otpsend,setotpsend]=useState(false);
    let element = [
        {
            type:'text',
            name:'email',
            required:true,
            value:'',
            placeholder:'Email'
        },

      otpsend &&   {
            type:'text',
            name:'otp',
            required:true,
            value:'',
            placeholder:'Otp'
        }

    ]


    let Extra = ()=>{
        return (
          <div className='footer'>
    
          <a href='#' className='create'>Resend now</a>
          {/* <span className=' create forgetpass' >Forget Password</span> */}
          </div>
        )
      }

      function otpvalidation(data){
      
        if(data.otp===''){
       api.post('auth/generateotp',data).then(res=>{
  
        if("message" in res.data){
          notification.error({
            message:res.data.message
          })
        }
        if(res.data.status===200){
          notification.success({
            message:'otp send successfully'
          }) 
          setotpsend(true)
        }
       })
      }
      else {
        api.post('auth/verifyotp',data).then(res=>{
     
          if(res.data.status===200){
      
          const {url} =res.data
         
          localStorage.setItem('usercredemail',data.email)
          navigate(`/resetpassword/${Number(url)}`);
          }
          else { 
            notification.error({
              message:'invalid otp'
            })
          }
         }).catch(err=>{
          notification.error({
            message:'invalid otp'
          })
         })
      }
      }


  return (
    <div>
        <Userscred 
         element={element}
         fields={fields}
         Extratext={Extra}
         otpsend={otpsend}
         buttontext={otpsend ?'Verify':'Send'}
         validation={otpvalidation}/>

    </div>
  )
}

export default Forgetpass