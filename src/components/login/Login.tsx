import React, { useEffect, useState, useReducer } from "react";
import "../css/login.css";
import { fields, element, Fields } from "./constatnt";
import { notification } from "antd";
import TextComponent from "./TextComponent";
import { useNavigate } from "react-router";
import { useHooks } from "../../utils/hooks";
import Userscred from "../Userscred";

import { fetchUserdetails } from "../../redux/slice/userSlice";
import { useErrorHooks } from "./hooks/useErrorHooks";
import { registerDatatype, storeData } from "../registration/types";

function Login() {

  useErrorHooks();
  const { dispatch, navigate } = useHooks();
  function validatelogin(data: storeData | Fields) {
    // Only proceed if data is of type storeData (has required properties)
    if (  "password" in data && "email" in data ) {
      let response = dispatch(fetchUserdetails(data as storeData));
      response.then((res) => {
        if (res.payload?.token && res.payload?.token.length > 1) {
          localStorage.setItem("token", res.payload.token);
          localStorage.setItem("email", res.payload.email);
          localStorage.setItem("roles", res.payload.roles);
          navigate("/admin");
        }
      });
    } else {
      // Optionally handle case where data is not storeData
      notification.error({ message: "Invalid login data" });
    }
  }

  return (
    <>
      <Userscred
        element={element}
        buttontext={"Login"}
        fields={fields}
        validation={validatelogin}
        Extratext={TextComponent}
        containerHeight={"550px"}
        isLoginPage={false}
      />
    </>
  );
}

export default Login;
