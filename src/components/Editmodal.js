import React, { createElement, useRef, useState } from "react";
import { Modal, DatePicker, Select } from "antd";
import moment from "moment";
import permission from "../utils/permission";
const { Option } = Select;
function Editmodal({ isModalOpen, handleOk, handleCancel, saves, data }) {
  const rolesref = useRef(null);
  const [dates, setDates] = useState("");
  const [details, setDetails] = useState({
    names: "",
    firstlastname: "",
    email: "",
    password: "",
    role: "Select",
    department: data.department,
    joiningdate: "",
  });
  const roles = localStorage.getItem('roles');
  function onChange(date) {
    setDates(moment(new Date(date)).format("DD-MM-YYYY"));
    setDetails({
      ...details,
      ["joiningdate"]: moment(new Date(date)).format("DD-MM-YYYY"),
    });
  }
  function disabledDate(current) {
    // console.log(current,moment().add(1, "days"))
    return moment() >= current;
  }

  function change(e, type) {
    if (e.target != null) {
      setDetails({
        ...details,
        [e.target.name]: e.target.value,
      });
    } else if (type === "department") {
      setDetails({
        ...details,
        ["department"]: e,
      });
    } else {
      setDetails({
        ...details,
        ["role"]: e,
      });
    }
  }


  const handlingElement = {
    createelement(elementname, obj) {
      let element = document.createElement(elementname);
      element.style.color = "red";
      element.setAttribute(obj.attrname, obj.attrvalue);
      const text = document.createTextNode(obj.errormessage);
      element.appendChild(text);
      return element;
    },

    addingError() {},
  };

  function invalidatecheck(condition, elementName, containername) {

    if (condition && document.getElementById(elementName) != null) {
      document.getElementById(elementName).remove();
      if (document.getElementsByName(containername)[0] != null || undefined)
        document.getElementsByName(containername)[0].style.border =
          "0.75px solid #DCDEE1";
      return;
    }
  }
  function check() {
    if (
      details.password.length < 10 &&
      document.getElementById("passwordp") === null
    ) {
      let errorpass = handlingElement.createelement("p", {
        attrname: "id",
        attrvalue: "passwordp",
        errormessage: "password must be greter than 10 character",
      });

      let element = document.getElementsByName("password")[0];
      element.style.border = "1px solid red";

      document.getElementById("password").appendChild(errorpass);
    }
    if (
      !details.email.includes("@") &&
      document.getElementById("emailp") === null
    ) {
      let pemail = handlingElement.createelement("p", {
        attrname: "id",
        attrvalue: "emailp",

        errormessage: "email must contain @",
      });

      let element = document.getElementsByName("email")[0];

      element.style.border = "1px solid red";

      document.getElementById("email").appendChild(pemail);
    }

    if (!details.names.length && document.getElementById("namep") === null) {
      let pname = handlingElement.createelement("p", {
        attrname: "id",
        attrvalue: "namep",

        errormessage: "name cannot be empty",
      });

      let element = document.getElementsByName("names")[0];

      element.style.border = "1px solid red";

      document.getElementById("names").appendChild(pname);
    }

    if (
      !details.firstlastname.length &&
      document.getElementById("firstnamelastp") === null
    ) {
      let pname = handlingElement.createelement("p", {
        attrname: "id",
        attrvalue: "firstnamelastp",

        errormessage: "first last name cannot be empty",
      });

      let element = document.getElementsByName("firstlastname")[0];

      element.style.border = "1px solid red";

      document.getElementById("firstlastname").appendChild(pname);
    }
    if (
      details.role == "Select" &&
      document.getElementById("rolesp") === null
    ) {
      let pname = handlingElement.createelement("p", {
        attrname: "id",
        attrvalue: "rolesp",
        errormessage: "role  cannot be empty",
      });


      document.getElementById("selects").appendChild(pname);
    
    }

    if (
      details.role == "Select" &&
      document.getElementById("departmentp") === null
    ) {
      let pname = handlingElement.createelement("p", {
        attrname: "id",
        attrvalue: "departmentp",
        errormessage: "department  cannot be empty",
      });


      document.getElementById("selectsdepartment").appendChild(pname);

    }

    if (
      details.joiningdate == "" &&
      document.getElementById("joinp") === null
    ) {
      let pname = handlingElement.createelement("p", {
        attrname: "id",
        attrvalue: "joinp",

        errormessage: "date  cannot be empty",
      });

      document.getElementById("join").appendChild(pname);
   
    }
  }

  function save() {

    check();
    let checks = [
      details.password.length >= 10,
      details.email.includes("@"),
      details.names.length,
      details.firstlastname.length,
      details.role != "Select",
      details.department != "Select",
      details.joiningdate != "",
    ];
    console.log(checks);
    invalidatecheck(checks[0], "passwordp", "password");
    invalidatecheck(checks[1], "emailp", "email");
    invalidatecheck(checks[2], "namep", "names");
    invalidatecheck(checks[3], "firstnamelastp", "firstlastname");
    invalidatecheck(checks[4], "rolesp", null);
    invalidatecheck(checks[5], "departmentp", null);
    invalidatecheck(checks[6], "joinp", null);

    if (checks.every((ele) => ele != 0)) {
      saves(details);
    }
  }



  return (
    <div>
      <Modal
        title="Add Employee"
        open={isModalOpen}
        style={{ width: "800px" }}
        onOk={save}
        onCancel={handleCancel}
      >
        <fieldset style={{ padding: "10px" }}>
          <legend>New Person</legend>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div id="selects" ref={rolesref}>
              <Select
                defaultValue={"Role"}
                style={{ width: "140px", marginRight: "15px" }}
                onChange={(val) => change(val)}
              >
                <Option value="Select">Select</Option>

      { permission.addassocaitedoctor.includes(roles) &&  
       <>
      <Option value="Associate Doctor">Associate Doctor</Option>
         <Option value="Associate">Associate</Option>
       </>
      }
               {permission.addassociateemployee.includes(roles) && <Option value="Associate">Associate</Option>}
              </Select>
            </div>

            <div id="selectsdepartment" ref={rolesref}>
              <Select
                defaultValue={data.department}
                style={{ width: "140px", marginRight: "15px" }}
                onChange={(val) => change(val, "department")}
                disabled
              >
                <Option value="Dentist">{data.department}</Option>
              </Select>
            </div>

            <div id="join">
              <DatePicker
                placeholder="joining date"
                onChange={onChange}
                allowClear={false}
                disabledDate={disabledDate}
                format={"DD-MM-YYYY"}
              />
            </div>
          </div>
          <div id="names">
            <input
              type="text"
              placeholder="Name"
              name="names"
              style={{
                width: "100%",
                padding: "5px",
                marginTop: "10px",
                height: "40px",
                borderRadius: "3px",
                border: "0.75px solid #DCDEE1",
              }}
              onChange={change}
            />
          </div>
          <div id="firstlastname">
            <input
              type="text"
              placeholder="First | Last Name"
              name="firstlastname"
              style={{
                width: "100%",
                padding: "5px",
                marginTop: "10px",
                height: "40px",
                borderRadius: "3px",
                border: "0.75px solid #DCDEE1",
              }}
              onChange={change}
            />
          </div>
          <div id="email">
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              style={{
                width: "100%",
                padding: "5px",
                marginTop: "10px",
                height: "40px",

                borderRadius: "3px",
                border: "0.75px solid #DCDEE1",
              }}
              onChange={change}
            />
          </div>
          <div id="password">
            <input
              type="password"
              required
              name="password"
              placeholder="Password"
              style={{
                width: "100%",
                padding: "5px",
                marginTop: "10px",
                height: "40px",

                borderRadius: "3px",
                border: "0.75px solid #DCDEE1",
              }}
              onChange={change}
            />
          </div>
        </fieldset>
      </Modal>
    </div>
  );
}

export default Editmodal;
