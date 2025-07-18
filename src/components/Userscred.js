import React, { useEffect, useState } from "react";
import "./css/usercred.css";
import { notification, Select } from "antd";
import { useNavigate } from "react-router";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import Loader from "./Loader";
function Userscred({
  element,
  buttontext,
  validation,
  Extratext,
  fields,
  containerHeight,
  selectype = false,
  isLoginPage

}) {
  const [logindetails, setlogindetails] = useState(fields);
  const navigate = useNavigate()
  const userState = useSelector(state=>state.user) 

  useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        navigate('/admin');
      }

 

      
  },[])
  const { Option } = Select;

  function onchange(e,type) {
   
    if (e != null && (e.target != null) | undefined) {
      setlogindetails({
        ...logindetails,
        [e.target.name]: e.target.value,
      });
    }
    
    else  if(type==='department'){
      setlogindetails({
        ...logindetails,
        ["department"]: e,
      });
    }
     else  if(type==='gender'){
      setlogindetails({
        ...logindetails,
        ["gender"]: e,
      });
    }
  }

  function save() {
    validation(logindetails);
  }

  return (
    <>
    <Loader>
      <div class="container">
        {/* <!-- Animated background shapes --> */}
        <div class="bg-shape-1"></div>
        <div class="bg-shape-2"></div>
        <div class="bg-shape-3"></div>
        
        {/* <!-- Left side - Branding --> */}
  
      
    {/* <div className="credwrapper"> */}
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
              onChange={(value) => onchange(value,"department")}
            
              >
              <Option value="pediatrician"   className="selectGender">pediatrician</Option>
              <Option value="neurologist"  className="selectGender">neurologist</Option>
              <Option value="general physcian"  className="selectGender">general physcian</Option>
              <Option value="dentist"  className="selectGender">dentist</Option>
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
              // value={element.value}
              required={element.required}
              className="inputlogin"
              placeholder={" " + element.placeholder}
              />
            )}
          </>
        ))}
{isLoginPage &&
        <Select 
        style={{width:'80%',height:'45px',margin:'20px'}}
         placeholder='Gender'
           onChange={(value) => onchange(value,"gender")}
           id="genders"
           
         >
          <Option value="Male" className="selectGender">Male</Option>
          <Option value="Female" className="selectGender">Female</Option>
          <Option value="Other" className="selectGender">Other</Option>
        </Select>}

<div style={{display:'flex',alignItems:'center'}}>
<span style={{marginTop:'30px',marginRight:'30px'}}>


</span>
        <button className="lgnbtn" onClick={save}>
          {buttontext}
        </button>
</div>

        {<Extratext />}
      </div>
    </div>
       </div>
    {/* </div> */}
   
    </Loader>
</>
  );

}

export default Userscred;
