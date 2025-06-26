import React, { useState } from "react";
import Userscred from "./Userscred";

import api from "../utils/api";
import { notification } from "antd";
import { useNavigate } from "react-router";
import Api from "../utils/apiconnect";
function Forgetpass() {
  const navigate = useNavigate();
  let fields = {
    email: "",
    otp: "",
  };
  const [otpsend, setotpsend] = useState(false);
  let element = [
    {
      type: "text",
      name: "email",
      required: true,
      value: "",
      placeholder: "Email",
    },

    otpsend && {
      type: "text",
      name: "otp",
      required: true,
      value: "",
      placeholder: "Otp",
    },
  ];

  let Extra = () => {
    return (
      <div className="footer">
        <a href="#" className="create">
          Resend now
        </a>
        {/* <span className=' create forgetpass' >Forget Password</span> */}
      </div>
    );
  };

  function otpvalidation(data) {
    


    if (data.otp === "") {
      
      const promise = Api.Post("auth/generateotp",{email:data.email});
      Api.HandleRequest(promise, function (response, error) {
       
        if (response != null) {
          const { data } = response;

          if ("message" in data && data.status===200) {
            notification.error({
              message: data.message,
            });
          }

          if (data.status === 200) {
            notification.success({
              message: data.message,
            });
            setotpsend(true);
          }
        }
      }
    );
    } else {
      const response = Api.Post("auth/verifyotp",{otp:data.otp,email:data.email});
     
     const {email}=data
      Api.HandleRequest(response, function (response, error) {
        if (response != null) {
          const { data } = response;
      
          if (data.url) {
            const { url } = data;
           
            localStorage.setItem('email',email);
            
            navigate(`/resetpassword/${Number(url)}`);
          } else {
            notification.error({
              message: "invalid otp",
            });
          }
        }
      });
    }
  }

  return (
    <div>
      <Userscred
        element={element}
        fields={fields}
        Extratext={Extra}
        otpsend={otpsend}
        buttontext={otpsend ? "Verify" : "Send"}
        validation={otpvalidation}
        
      />
    </div>
  );
}

export default Forgetpass;
