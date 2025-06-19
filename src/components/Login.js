import React, { useEffect, useState, useReducer } from "react";
import "./css/login.css";

import setauth from "../utils/setauth";
import { notification } from "antd";

import { Link, useNavigate } from "react-router";
import Userscred from "./Userscred";
import { setloginDetails } from "../redux/slice/userSlice";
import Api from "../utils/apiconnect";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserdetails } from "../redux/slice/userSlice";
function Login() {
  const [isGuest, setguest] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);

  const nav = useNavigate();

  useEffect(() => {
    if (state.error.length > 1) {
      notification.error({ message: state.error });
    }
  }, [state.error]);

  let fields = {
    email: "",
    password: "",
  };

  let elem = [
    {
      type: "email",
      value: "",
      placeholder: "Email",
      required: true,
      name: "email",
    },
    {
      type: "password",
      value: "",
      placeholder: "Password",
      required: true,
      name: "password",
    },
  ];

  function validatelogin(data) {
    if (isGuest) {
      data.email = "RAJATKUMAR108@HOTMAIL.COM";
      data.password = "12345678910";
    }

    let response = dispatch(fetchUserdetails(data));
    response.then((res) => {
      if (res.payload?.token && res.payload?.token.length > 1) {
        localStorage.setItem("token", res.payload.token);
        localStorage.setItem("email", res.payload.email);
        localStorage.setItem("roles", res.payload.roles);
        navigate("/admin");
      }
    });
  }

  let Extra = () => {
    return (
      <div className="footer">
        <span>Don't have Account?</span>
        <a href="/register" className="create">
          Create now
        </a>
        <span className=" create forgetpass">
          <Link to={"/forgetpassword"}>Forget Password</Link>
        </span>
      </div>
    );
  };

  return (
    <>
      <Userscred
        element={elem}
        buttontext={"Login"}
        fields={fields}
        validation={validatelogin}
        Extratext={Extra}
        setguest={setguest}
        isGuest={isGuest}
      />
    </>
  );
}

export default Login;
