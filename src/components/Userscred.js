import React, { useEffect, useState } from "react";
import "./css/usercred.css";
import { Select } from "antd";
import { useNavigate } from "react-router";
function Userscred({
  element,
  buttontext,
  validation,
  Extratext,
  fields,
  containerHeight,
  selectype = false,
  onselect,
}) {
  const [logindetails, setlogindetails] = useState(fields);
  const navigate = useNavigate()
  useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        navigate('/admin');
      }
  },[])
  const { Option } = Select;
  function onchange(e) {
   
    if (e != null && (e.target != null) | undefined) {
      setlogindetails({
        ...logindetails,
        [e.target.name]: e.target.value,
      });
    } else {
      setlogindetails({
        ...logindetails,
        ["department"]: e,
      });
    }
  }
  function save() {
    validation(logindetails);
  }

  return (
    <div className="credwrapper">
    <div
      className="credcontainer"
      style={{
        height: containerHeight ? containerHeight : "400px",
      }}
    >
      <div className="content">
        {selectype && (
          <div
            style={{
              marginTop: "30px",
              display: "block",
              paddingBottom: "10px",
            }}
            className="department"
          >
            <h4>Select department</h4>
            <Select
              style={{ width: "200px", marginTop: "10px" }}
              placeholder={"Select"}
              onChange={(value) => onchange(value)}
            >
              <Option value="pediatrician">pediatrician</Option>
              <Option value="neurologist">neurologist</Option>
              <Option value="general physcian">general physcian</Option>
              <Option value="dentist">dentist</Option>
            </Select>
          </div>
        )}
        {element.map((element) => (
          <>
            {element !== false && (
              <input
                type={element.type}
                name={element.name}
                onChange={onchange}
                required={element.required}
                className="inputlogin"
                placeholder={" " + element.placeholder}
              />
            )}
          </>
        ))}

        <button className="lgnbtn" onClick={save}>
          {buttontext}
        </button>

        {<Extratext />}
      </div>
    </div>
    </div>
  );

}

export default Userscred;
