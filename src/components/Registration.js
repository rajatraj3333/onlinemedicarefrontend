import React from "react";
import Userscred from "./Userscred";
import { notification } from "antd";
import api from "../utils/api";
import { useNavigate } from "react-router";
import Api from "../utils/apiconnect";
import { useDispatch } from "react-redux";
import { addNewuser } from "../redux/slice/userSlice";
function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let fields = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
  };
  let element = [
    {
      type: "text",
      name: "firstname",
      required: true,
      value: "",
      placeholder: "Firstname",
    },
    {
      type: "text",
      name: "lastname",
      required: true,
      value: "",
      placeholder: "Lastname",
    },

    {
      type: "email",
      name: "email",
      required: true,
      value: "",
      placeholder: "Email",
    },
    {
      type: "password",
      name: "password",
      required: true,
      value: "",
      placeholder: "Password",
    },
   
  ];

  function validateRegistration(data) {
    let d = [data];

    if (
      d.every(
        (item) =>
          item.firstname !== "" && item.lastname !== "" && item.email !== ""
      )
    ) {
      if (data.password.length >= 5) {
        let storedata = {
          ...data,
          name: data.firstname,
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

        // Api.HandleRequest(promise,function(response,error){
        //      if(response!=null){
        //         const {data}=response;
        //         const {token,message}=data;
        //         if(message){
        //             notification.error({
        //                 message:'User Already Exist'
        //             })
        //         }
        //         else if(token){
        //             notification.success({
        //                 message:'Successfully register'
        //             })
        //             navigate('/login')
        //            }
        //            else if (data.error){
        //             notification.error({
        //                 message:data.error
        //             })
        //         }
        //         else {
        //             notification.error({
        //                 message:'Something went wrong!'
        //             })
        //         }
        //      }

        // })
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
        element={element}
        containerHeight={containerHeight}
        Extratext={Extra}
        validation={validateRegistration}
        buttontext={buttontext}
        fields={fields}
        isLoginPage={true}
      />
    </div>
  );
}

export default Registration;
