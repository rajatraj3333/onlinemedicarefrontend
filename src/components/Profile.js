import React, { useEffect, useState } from 'react'
import './css/profile.css'
import {notification } from 'antd'
import api from '../utils/api'
function Profile() {


  const [profiledetails,setprofiledetails]=useState('')
  useEffect(()=>{
     api.get('/auth/getprofile').then(res=>{
      if(res.data.status===200){
        setprofiledetails(res.data.response)
      }
  
     
     }).catch(err=>{
      console.log(err);
     })
  },[])


  function save(){
    if(profiledetails.name!=='' && profiledetails.fullname !==''){
      api.post('/auth/profileupdate',profiledetails).then(res=>{
       
        if(res.data.response){
          notification.success({
            message:res.data.response
          })
        }
        else
        {
          notification.error({
            message:res.data.response
          })
        }
      
      }).catch(err=>console.log(err))
    }
    else{
      notification.error({
        message:'profile can not be empty '
      })
    }
  }

  function onchange(e){
    setprofiledetails({
      ...profiledetails,
      [e.target.name]:e.target.value
    })
    
  }


  return (
    <div className='profile-container'>
      
        <div className='inputContainer'>
          <label >Name</label>
             <input type='text' name='name' value={profiledetails.name} onChange={onchange}/>
            </div>
            <div className='inputContainer'>
             <label >FullName</label>

             <input type='text' name='fullname' value={profiledetails.fullname} onChange={onchange}/>
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