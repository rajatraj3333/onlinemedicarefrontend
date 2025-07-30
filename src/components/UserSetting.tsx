import React from 'react'
import Profile from './profile/Profile'

import Clinicdetails from './clinic/Clinicdetails';
import { useLocation } from 'react-router';
import UsersideNav from './nav/UsersideNav'
function UserSetting() {
    let location = useLocation();
   let  url  =location.pathname.split('/')[1]
  
  return (
   <div style={{display:'flex'}}>
   <UsersideNav/>
  {url =='profile' && <Profile/>}
   {url =='clinic' && <Clinicdetails/>}
   </div>
  )
}


 
export default UserSetting