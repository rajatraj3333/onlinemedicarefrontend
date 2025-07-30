import React, { useContext, useEffect, useState } from 'react'
import '../css/profile.css'
import {notification } from 'antd'

import Api from '../../utils/apiconnect'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ResponseType } from '../registration/types'
function Profile() {


  const [profiledetails,setprofiledetails]=useState<any>('')
  const {email,roles,token}=useSelector((state:RootState)=>state.user)    
  
  useEffect(()=>{

   const promise = Api.Get('/auth/getprofile')
    console.log(promise);
   Api.HandleRequest(promise,function(response:ResponseType,error:string|null){
    
        const {data}=response;
        if(data.status===200){
          setprofiledetails(data.response)
        }
        else {
          notification.error({
            message:error
          })
        }
   })

  },[])


  function save(){
    if(profiledetails.name!=='' && profiledetails.fullname !==''){


    const promise =  Api.Post('/auth/profileupdate',profiledetails)

    Api.HandleRequest(promise,function(response:ResponseType,error:string|null){
      const {data}=response;
      if(data.status===200){
        notification.success({
          message:data.response
        })
        return;
      }
      else if(data.status===500)
      {
        notification.error({
          message:data.response
        })
      }
      else {
        notification.error({
          message:error
        })
      }
    
    })
    }
    else{
      notification.error({
        message:'profile can not be empty '
      })
    }
  }

  function onchange(e:{value:string,target:HTMLInputElement}){
    setprofiledetails({
      ...profiledetails,
      [e.target.name]:e.target.value
    })
    
  }


  return (
    <div className='profile-container'>
      
        <div className='inputContainer'>
          <label >Name</label>
             <input type='text' name='name' value={profiledetails.name} onChange={(e)=>onchange}/>
            </div>
            <div className='inputContainer'>
             <label >FullName</label>

             <input type='text' name='fullname' value={profiledetails.fullname} onChange={(e)=>onchange}/>
            </div>
            <div className='inputContainer'>
            <label >Email</label>

        <input type='text' name='email' value={profiledetails.email} disabled/>

            </div>
    
     
            <div style={{display:'flex',justifyContent:'center'}}> 
            <button  className='svbtn' onClick={save}>Save</button>

            </div>
            </div>
    
  )
}

export default Profile