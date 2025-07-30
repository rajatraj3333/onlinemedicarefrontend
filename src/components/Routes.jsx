import Home from "./Home";
import { Outlet, Route, Routes, Router, useNavigate } from "react-router";
import Authlayout from "./layout/Authlayout";
import Booking from "./booking/Booking";
import Confirm from "./confirm/Confirm";
import Dashboard from "./dashboard/Dashboard";
import Settings from "./Settings";
import Profile from "./profile/Profile";
import Doctor from "./Doctor";
import Login from './login/Login'

import Registration from "./registration/Registration";
import Forgetpass from "./Forgetpass";
import Resetpassword from "./Resetpassword";
import UserSetting from "./UserSetting";
// import MonthCard from "./datesComponent/MonthCard";
import Doctorregistration from "./registration/Doctorregistration";
import Management from "./Management";
import Table from "./Table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../utils/apiconnect";
import { setloginDetails } from "../redux/slice/userSlice";
import setauth from "../utils/setauth";
import { useLocation } from "react-router";
// import MainComponent from "./datesComponent";
import Clinicdetails from "./clinic/Clinicdetails";
import ProfileDetails from "./profile/ProfileDetails";
import OAuthPage from "./gmeet/OAuthPage";
import GoogleMeetApp from "./Gmeet";
import NotFound from './notfound/NotFound';
function Routescomponent({ children }) {
  const { email, roles } = useSelector((state) => state.user);

  const path = useLocation();


  const state = useSelector(state=>state.user)
  useEffect(()=>{
    state?.token && setauth(state.token) 
  })
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route element={<Authlayout />}>
        <Route path="bookings">
          <Route index element={<Booking />} />
          <Route path="confirm/:id" element={<Confirm />} />
        </Route>
        <Route path="admin">
       
          <Route index element={<Dashboard />} />
          <Route path="setting" element={<Settings />} />
          <Route path="doctor" element={<Doctor />} />
          <Route path="management" element={<Management />} />
          {/* <Route path="default" element={<MainComponent />} /> */}
          
        </Route>
     
        <Route path="profile" element={<UserSetting />} />
        <Route path="clinic" element={<UserSetting />} />
      </Route>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Registration />} />
      <Route path="forgetpassword" element={<Forgetpass />} />
      <Route path="resetpassword/:url" element={<Resetpassword />} />
      <Route path="doctorregistration" element={<Doctorregistration />} />
      <Route path="table" element={<Table />} />
      <Route path="profiles/:id" element={<ProfileDetails />} />
      <Route path="gmeet" element={<GoogleMeetApp />} />
      <Route path="auth/callback" element={<OAuthPage />} />

      
      </Routes>
  
)
}

export default Routescomponent