import Home from "./Home";
import { Outlet, Route, Routes, Router, useNavigate } from "react-router";
import Authlayout from "./Authlayout";
import Booking from "./Booking";
import Confirm from "./Confirm";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Profile from "./Profile";
import Doctor from "./Doctor";
import Login from "./Login";
import PaymentComponent from "./Payment";
import Registration from "./Registration";
import Forgetpass from "./Forgetpass";
import Resetpassword from "./Resetpassword";
import UserSetting from "./UserSetting";
// import MonthCard from "./datesComponent/MonthCard";
import Doctorregistration from "./Doctorregistration";
import Management from "./Management";
import Table from "./Table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../utils/apiconnect";
import { setloginDetails } from "../redux/slice/userSlice";
import setauth from "../utils/setauth";
import { useLocation } from "react-router";
// import MainComponent from "./datesComponent";
import Clinicdetails from "./Clinicdetails";
import ProfileDetails from "./ProfileDetails";
import OAuthPage from "./OAuthPage";
import GoogleMeetApp from "./Gmeet";

function Routescomponent({ children }) {
  const { email, roles } = useSelector((state) => state.user);

  const path = useLocation();


  const state = useSelector(state=>state.user)
  useEffect(()=>{
    state?.token && setauth(state.token) 
  })
  return (
    <Routes>
      <Route index element={<Home />} />
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
        <Route path="payment" element={<PaymentComponent />} />
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