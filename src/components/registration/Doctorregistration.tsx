import React, { useState } from "react";
import Userscred from "../Userscred";
import { notification } from "antd";
import Loader from "../Loader";

import { Datatypes, registerDatatype, storeData } from "./types";
import { useNavigate } from "react-router";
import Api from "../../utils/apiconnect";
import { responseDataype } from "./types";
import { fields, element } from "./constant";
import TextComponent from "./TextComponent";
import { Fields } from "../login/constatnt";
function Doctorregistration() {
  const [dataload, setdataload] = useState(true);
  const navigate = useNavigate();





  function validate(data: Datatypes ) {
    if (
      data.name === "" ||
      data.fullname === "" ||
      data.department === "" ||
      data.email === "" ||
      data.password === ""
    ) {
      notification.error({
        message: "form can  not be empty",
      });
      return;
    } else {
      const promise = Api.Post("auth/adddoctor", data);

      Api.HandleRequest(promise, function (response: responseDataype, error: string | null) {
        if (response != null) {
          const { data } = response;
          if (data.error) {
            notification.error({
              message: data.error,
            });
            return;
          }
          if (data.status === 200 && data.token) {
            notification.success({
              message: data.message + "Please login!",
            });
            setTimeout(() => {
              navigate("/login");
            }, 2000);
            setdataload(false);
          } else {
            notification.error({
              message: error,
            });
            return;
          }
        }
      });
    }
  }

  return (
    <Loader data={dataload}>
      <Userscred
        fields={fields}
        Extratext={TextComponent}
        element={element}
        validation={validate}
        selectype={true}
        buttontext={"Signup"}
        containerHeight={"550px"}
        isLoginPage={true}
      />
    </Loader>
  );
}

export default Doctorregistration;
