import React from "react";
import { useParams, useNavigate } from "react-router";
import Userscred from "./Userscred";
import api from "../utils/api";
import { notification } from "antd";
function Resetpassword() {
  const params = useParams();
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
   

    if (data.password.length < 10 || data.repassword.length < 10) {
      notification.error({
        message: "password must be greater than 10 digit",
      });
      return;
    } else if (data.password === data.repassword) {
      const email = localStorage.getItem("usercredemail");
      let senddata = {
        password: data.password,
        url: params.url,
        email: email,
      };
      if (email) {
        api
          .post("/auth/resetpassword", senddata)
          .then((res) => {
           
            if (res.data.status === 200) {
              notification.success({
                message: "successfully password changed",
              });
              setTimeout(() => {
                navigate("/login");
              }, 5000);
            } else {
              throw "some thing went wrong";
            }
          })
          .catch((err) => {
            notification.error({
              message: "can not reset right now try again to reset",
            });
            setTimeout(() => {
              navigate("/forgetpassword");
            }, 3000);
           
          });
      }
    } else {
      notification.error({
        message: "password and re-password must match ",
      });
      return;
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
