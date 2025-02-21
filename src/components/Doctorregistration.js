import React, { useState } from 'react'
import Userscred from './Userscred'
import { notification } from 'antd'
import Loader from './Loader'
import api from '../utils/api'
import { not } from 'joi'
import { useNavigate } from 'react-router'



function Doctorregistration() {

  const [dataload,setdataload]=useState(true);
  const navigate = useNavigate();
  let fields= {
    name:'',
    fullname:'',
    email:'',
    password:'',
    roles:'Doctor',
    department:''

   }

  let element = [
    {
        type:'text',
        name:'name',
        required:true,
        value:'',
        placeholder:'What Should we call you?'
    },
    {
        type:'text',
        name:'fullname',
        required:true,
        value:'',
        placeholder:'Full name'
    },

    {
        type:'email',
        name:'email',
        required:true,
        value:'',
        placeholder:'Email'
    },
    {
        type:'password',
        name:'password',
        required:true,
        value:'',
        placeholder:'Password'
    },

]

let Extra = ()=>{
  return (
    <>
    </>
  )
}
function validate(data){

if(data.name===''|| data.fullname===''|| data.department ==='' || data.email===''|| data.password==='')
  {
 notification.error({
  message:'form can  not be empty'
 })
 return;
 }
 else{
   api.post('auth/adddoctor',data).then(res=>{

    if(res.data.error){
      notification.error({
        message:res.data.error
      })
      return;
    }

         if(res.data.status===200 && res.data.token){
        
          notification.success({
            message:res.data.message +"Please login!"
          })
          setTimeout(()=>{
            navigate('/login')
          },2000)
          setdataload(false);
         }
   }).catch(err=>console.log(err))
 }
}

  return (
    <Loader data={dataload}>
      <Userscred fields={fields} Extratext={Extra} element={element} validation={validate} selectype={true} buttontext={'Signup'}/>
    </Loader>
  )
}

export default Doctorregistration