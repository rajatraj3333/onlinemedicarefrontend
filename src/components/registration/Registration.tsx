import React from "react";
import Userscred from "../Userscred";
import { notification } from "antd";

import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { addNewuser } from "../../redux/slice/userSlice";
import { registerfields, registerElement } from "../login/constatnt";
import { useHooks } from '../../utils/hooks'
import { RegisterFields, Fields } from "../login/constatnt";
import { storeData,data,Datatypes } from "./types";

function Registration() {
 
  const { dispatch, navigate } = useHooks();
  function validateRegistration(data: Datatypes) {
    let d = [data];

    if (
      d.every(
        (item) =>
          item.firstname !== "" && item.lastname !== "" && item.email !== ""
      )
    ) {
      if (data.password.length >= 5) {
        let storedata: Datatypes = {
          ...data,
          name: data?.firstname,
          fullname: `${data.firstname}-${data.lastname}`,
          roles: "Patient",
        };
        delete storedata.firstname;
        delete storedata.lastname;



        // const promise =  Api.Post('/auth/register',storedata)

        let result = dispatch(addNewuser(storedata));

        result.then((res) => {
          if (res.payload?.token && res.payload?.token.length > 1) {
            navigate("/login");
          }
        });


      } else {
        notification.error({
          message: `password at least 5 character long  !`,
        });
      }
    } else {
      notification.error({
        message: `fill all  the details for sign up !`,
      });
    }
  }

  const containerHeight = "550px";
  const buttontext = "Sign up";

  let Extra = () => {
    return (
      <div className="footer">
        <span>Already Account?</span>
        <a href="/login" className="create">
          Login now
        </a>
        <span className=" create forgetpass">
          <a href="/doctorregistration">Are you Doctor</a>
        </span>
      </div>
    );
  };

  return (
    <div>
      <Userscred
        element={registerElement}
        containerHeight={containerHeight}
        Extratext={Extra} 
        validation={validateRegistration}
        buttontext={buttontext}
        fields={registerfields}
        isLoginPage={true}
      />
    </div>
  );
}

export default Registration;
