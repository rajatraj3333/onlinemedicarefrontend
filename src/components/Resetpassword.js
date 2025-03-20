import React from "react";
import { useParams, useNavigate } from "react-router";
import Userscred from "./Userscred";
import api from "../utils/api";
import { notification } from "antd";
import Api from "../utils/apiconnect";
import { useSelector } from "react-redux";
function Resetpassword() {
  const params = useParams();
  const {email} = useSelector(state=>state.user);
  const navigate = useNavigate();
 
  let fields = {
    password: "",
    repassword: "",
  };

  let element = [
    {
      type: "password",
      name: "password",
      required: true,
      value: "",
      placeholder: "Password",
    },

    {
      type: "password",
      name: "repassword",
      required: true,
      value: "",
      placeholder: "re-enterpassword",
    },
  ];

  function changepassword(data) {
    
    let message;
    function errorMessage (msg) {
          message=msg;
        console.log(message)
        notification.error({message:message})
       
    }
  
    if(data.password.length < 10){  errorMessage("password must be greater than 10 digit")}
     if (data.password.length > 10 && data.password != data.repassword){errorMessage("password and re-password must match")}
    
 
      
   
      let senddata = {
        password: data.password,
        url: params.url,
        email: email,
      };
      if (email && !message) {
        const promise = Api.Post("/auth/resetpassword",senddata)

        Api.HandleRequest(promise,function(response,error){
            if(response!=null){
               const {data}=response;
               if (data.status === 200) {
                notification.success({
                  message: "successfully password changed",
                });
                setTimeout(() => {
                  navigate("/login");
                }, 5000);
              } else {
                throw "some thing went wrong";
              }
            }
            else {
              notification.error({
                message: "can not reset right now try again to reset",
              });
              setTimeout(() => {
                navigate("/forgetpassword");
              }, 3000);
            }
        })
       
      
    }

  }

  let Extra = () => {
    return <></>;
  };

  return (
    <div>
      <Userscred
        element={element}
        fields={fields}
        Extratext={Extra}
        buttontext={"Submit"}
        validation={changepassword}
      />
    </div>
  );
}

export default Resetpassword;
