import React from 'react'
import Profile from './Profile'
import UsersideNav from './UsersideNav'
import Clinicdetails from './Clinicdetails';
import { useLocation } from 'react-router';
function UserSetting() {
    let url = useLocation();
    url  =url.pathname.split('/')[1]
    console.log(url);
  return (
   <div style={{display:'flex'}}>
   <UsersideNav/>
  {url =='profile' && <Profile/>}
   {url =='clinic' && <Clinicdetails/>}
   </div>
  )
}

export default UserSetting