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

import Doctorregistration from "./Doctorregistration";
import Management from "./Management";
import Table from "./Table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../utils/apiconnect";
import { setloginDetails } from "../redux/slice/userSlice";
import setauth from "../utils/setauth";
import { useLocation } from "react-router";

function Routescomponent({ children }) {
  const { email, roles } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");

    let { pathname } = path;
    pathname = pathname.replace("/", "");
    if (
      pathname != undefined &&
      !token &&
      (pathname !== "doctorregistration" || pathname !== "register")
    ) {
      return;
    }

    if (!token) {
     navigate("/login");
    }

    // setauth(token);

    if (!email && !roles && token) {
      console.log("APi Call");
      const response = Api.Post("/auth/verify", { token });
      Api.HandleRequest(response, function (data, error) {
        if (data != null) {
          dispatch(setloginDetails(data.data.response));
          //  navigate('/admin');
        }
      })
    }
  }, [])
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
        </Route>
        <Route path="payment" element={<PaymentComponent />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Registration />} />
      <Route path="forgetpassword" element={<Forgetpass />} />
      <Route path="resetpassword/:url" element={<Resetpassword />} />
      <Route path="doctorregistration" element={<Doctorregistration />} />
      <Route path="table" element={<Table />} />
      </Routes>
  
)
}

export default Routescomponent