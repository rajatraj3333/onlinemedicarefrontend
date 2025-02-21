import React, { useEffect, useState } from 'react'
import {Popconfirm, message, notification} from 'antd';
import { RiCheckFill,RiCloseFill } from '@remixicon/react';
import './css/dashboard.css'
import userContext from './context/usercontext';
import { useContext } from 'react';
import { useNavigate,redirect } from 'react-router';
import { useAuth } from './Userprovider';
import api from '../utils/api';
import moment from 'moment/moment';




function Userdetails({data}){


  function cancelappointment(id,date){
   
    let currentdate = moment().format('DD-MM-YYYY')
    let bookingdate = moment(date).format('DD-MM-YYYY')

    if(currentdate<bookingdate){
         try {
          let data = {booking_id:id}
          api.post('/doctor/cancelappointment',data).then(res=>{
            if(res.status===200){
                   notification.success({
                    message:res.data.response
                   })
            }
            else {
              notification.error({
                message:res.data.error
              })
            }
          })
         } catch (error) {
          notification.error({
            message:error
          })
         }
    }
    else {
      notification.error({
        message:'booking can not cancelled kindly contact '
      })
    }

  }


  return (
    <> 
    {data !=''  && data.map(item=>(
      <div className='userwrapper'>
<div className='col-1'>
  <div className='col-row'>

  <span>  <strong className='detailstitle'>DoctorId </strong> {item.doctor_id}</span>
  </div>

  <span><strong className='detailstitle'>Doctorname</strong>  {item.fullname}</span>
  <span><strong className='detailstitle'>Department</strong> {item.department}</span> 
  </div>
<div className='col-2'>
<span><strong className='detailstitle'>BookingId</strong>   {item.booking_id}</span>
  <span><strong className='detailstitle'>Bookingstatus</strong>  {item.booking_status}</span>
  <span> <strong className='detailstitle'>Slottime</strong> {item.slottime}</span> 
</div>
<div className='col-3'>

<span><strong className='detailstitle'>PaymentStatus</strong>   {item.payment_status}</span>
<span><strong className='detailstitle'>Bookingdate</strong>   {moment(item.booking_date).format('DD-MM-YYYY') }</span>
 {item.booking_status==='approved' || item.booking_status==null  &&
 <>
<span><a style={{textDecoration:'underline', color:'blue',cursor:'pointer'}} onClick={()=>cancelappointment(item.booking_id,item.booking_date)}>Cancel</a></span>
<span style={{color:'red',fontSize:'11px',marginTop:'-8px'}}>*[ booking only cancelled prior to date/not same day]</span>
 </>
}

</div>
</div>
    ))}
    </>

  )
}

function Dashboard() {
   const navigate = useNavigate();
   const [patientDetails,setpatientdetails]=useState('')

   const {userdetails} =useAuth();
   
  function confirm(booking_id,status) {
    updateStatus(booking_id,status);
   
  }
  

  const roles =localStorage.getItem('roles')
  useEffect(()=>{


    if(roles!=='Patient'){
      api.get('/doctor/bookingdetails').then(res=>
        {
    
          if(res.data.status===200){
            setpatientdetails(res.data.response)
          }
        }
        ).catch(err=>console.log(err))
    }
    else {
      api.get('/doctor/getpatientdetails').then(res=>
        {
          if(res.data.status===200){
            setpatientdetails(res.data.response)
          }
        }
        ).catch(err=>console.log(err))
    }
 
  },[])



  function updateStatus(booking_id,status){
    let data = {
      booking_id,
      status
    }
   api.post('/doctor/bookingstatus',data).then(res=>{
   
    if(res.data.status===200){
      notification.success({
        message:'booking status updated successfully'
      })
    }
    else{
      notification.error({
        message:'can not update status right now'
      })
    }
   })
   .catch(err=>{
    notification.success({
      message:err
    })
   })
  }

   return (
    <div className='dashboardWrappers'>
  {  roles!=='Patient' && <div  className='dashboard'>
      <div className='detailsCard'>Total patient 1555
   
        <span style={{display:'block' ,fontSize:'12px',
          marginTop:'30px',fontWeight:'bold',padding:'5px'}}>*No patient book  online appointment</span>
      </div>
      <div className='detailsCard'>Today Appointment 109
      <span style={{display:'block' ,fontSize:'12px',
          marginTop:'50px',fontWeight:'bold',padding:'5px'}}></span>
      </div>
      <div className='detailsCard'>Total Cancel
      <span style={{display:'block' ,fontSize:'12px',
          marginTop:'10px',fontWeight:'bold',padding:'15px'}}>*Number of appointment cancel by doctor/patient</span>
      </div>
    </div>}
    {roles==='Patient' ?  <Userdetails data={patientDetails}/> :
    <table className='dashboardtable'>
      <thead>
      <tr>
      <th>patient Name</th>
      <th>Mode</th>
      <th>Status</th>
      <th>Timing</th>
      <th>Booking Date</th>
      
      <th>Report Download</th>

     {roles!='Patient' && <th>Action </th> }
    </tr>
      </thead>
<tbody>


{patientDetails!='' && patientDetails.map(item=>(
  

<tr>
<td>{item.fullname}</td>
  <td>{item.mode}</td>
  <td>{item.booking_status}</td>
  <td>{item.slottime}</td>
  <td> {moment(item.booking_date).format('DD-MM-YYYY')}</td>
  <td><a>Download</a></td>
  {roles!='Patient' && item.booking_status==null &&
  <td style={{display:'flex',justifyContent:'space-evenly'}}>
   
  <Popconfirm
    title="Are you sure confirm appointment"
    onConfirm={()=>confirm(item.booking_id,'approved')}
   
    okText="Yes"
    cancelText="No"
  >

<div className='checkandrejectbox checksuccess'>

<RiCheckFill color='#fff' />
</div>
      {/* <button>Approve</button> */}
  </Popconfirm>
 
  <Popconfirm
    title="cancelling appointment"
    onConfirm={()=>confirm(item.booking_id,'rejected')}
 
    okText="Yes"
    cancelText="No"
  >
  <div className='checkandrejectbox closereject'>
  
  <RiCloseFill color='#fff' />
  </div>
  </Popconfirm>

   
  </td>
}
</tr>
))
}

  
</tbody>

    </table>
}
    </div>
  )

}

export default Dashboard