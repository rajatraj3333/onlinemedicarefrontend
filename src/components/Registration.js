import React from 'react'
import Userscred from './Userscred'
import { notification } from 'antd'
import api from '../utils/api'
import { useNavigate } from 'react-router'
function Registration() {
    const navigate = useNavigate();
      let fields= {
        firstname:'',
        lastname:'',
        email:'',
        password:''
       }
    let element = [
        {
            type:'text',
            name:'firstname',
            required:true,
            value:'',
            placeholder:'Firstname'
        },
        {
            type:'text',
            name:'lastname',
            required:true,
            value:'',
            placeholder:'Lastname'
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

    function validateRegistration(data){
    let d = [data]
  
    if(d.every(item=>item.firstname!=='' && item.lastname!=='' && item.email!=='')){
        if(data.password.length>=8){
     
         let storedata = {
            ...data,
            name:data.firstname,
            fullname:`${data.firstname}-${data.lastname}`,
            roles:'Patient'
         }
         delete storedata.firstname
         delete storedata.lastname
         
        api.post('/auth/register',storedata).then(res=>{
         
            if("message" in res.data){
                notification.error({
                    message:'User Already Exist'
                })
            }
            else if("token" in res.data){
                notification.success({
                    message:'Successfully register'
                })
               }

            else if (res.data.error){
                notification.error({
                    message:res.data.error
                })
            }
            else {
                notification.error({
                    message:'Something went wrong!'
                })
            }
        }).catch(err=>{
            console.log(err)
        })

    }
    else {
        notification.error({
            message: `password at least 8 character long  !`
        })
    }
    }
   else {
    notification.error({
        message:`fill all  the details for sign up !`
    })
   } 
   
    }
  
      const containerHeight='500px'
    const buttontext ='Sign up'

    let Extra = ()=>{
        return (
          <div className='footer'>
    
          <span >Already Account?</span><a href='/login' className='create'>Login now</a>
          <span className=' create forgetpass' ><a href='/doctorregistration'>Are you Doctor</a></span>
       
          </div>
        )
      }

  return (
    <div>
        <Userscred element={element} containerHeight={containerHeight} Extratext={Extra} validation={validateRegistration} buttontext={buttontext} fields={fields}/>
    </div>

  )
}

export default Registration