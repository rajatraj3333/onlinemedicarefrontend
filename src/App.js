import { Navbar } from "./components/Navbar";
import Hero from "./components/Herosection";
import "./App.css";
import { Routes, Route, useSearchParams, useNavigate } from "react-router";
import Home from "./components/Home";
import { Outlet } from "react-router";
import Authlayout from "./components/Authlayout";
import Booking from "./components/Booking";
import Confirm from "./components/Confirm";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Doctor from "./components/Doctor";
import Login from "./components/Login";
import PaymentComponent from "./components/Payment";

import {
  useContext,
  useDebugValue,
  useEffect,
  useReducer,
  useState,
} from "react";
import UserContext from "./components/context/usercontext";
import setauth from "./utils/setauth";
import api from "./utils/api";
import { notification } from "antd";
import Registration from "./components/Registration";
import Forgetpass from "./components/Forgetpass";
import Resetpassword from "./components/Resetpassword";
import userContext from "./components/context/usercontext";
import Doctorregistration from "./components/Doctorregistration";
import Management from "./components/Management";
import Table from "./components/Table";

function App() {
  useEffect(() => {
    let token = localStorage.getItem("token");

    setauth(token);
  }, []);

  return (
    <div className="App">
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
        rel="stylesheet"
      />

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
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="forgetpassword" element={<Forgetpass />} />
        <Route path="resetpassword/:url" element={<Resetpassword />} />
        <Route path="doctorregistration" element={<Doctorregistration />} />
        <Route path="table" element={<Table />} />
      
      </Routes>
    </div>
  );
}

export default App;
