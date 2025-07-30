import React, { useEffect, useState } from "react";
import "./css/usercred.css";
import { notification, Select } from "antd";
import { useNavigate } from "react-router";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { Elements, Fields, RegisterFields } from "./login/constatnt";
import { Users } from './login/hooks/useErrorHooks'
import { RootState } from "../redux/store";
import { registerDatatype, storeData,data, Datatypes } from "./registration/types";
type registerelements = Elements[] | RegisterFields[]

interface Props {
  element: registerelements ,
  buttontext: string,
  validation: (data: Datatypes ) => any,
  fields: Fields,
  Extratext: React.FC,
  containerHeight: string
  selectype?: boolean,
  isLoginPage: boolean
}

function Userscred({
  element,
  buttontext,
  validation,
  Extratext,
  fields,
  containerHeight,
  selectype = false,
  isLoginPage

}: Props) {
  const [logindetails, setlogindetails] = useState<Fields>(fields);
  const navigate = useNavigate()
  const userState = useSelector<RootState>(state => state.user as Users)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin');
    }




  }, [])
  const { Option } = Select;

  function onchange<T>(e?:React.ChangeEvent<HTMLInputElement>|null,value?:T|string,type?: string|null) {
     console.log(value);
    if (e != null && (e.target != null || e.target !== undefined)) {
      setlogindetails({
        ...logindetails,
        [e.target.name]: e.target.value,
      });
    }

    else if (type === 'department') {
      setlogindetails({
        ...logindetails,
        ["department"]: value as string,
      });
    }
    else if (type === 'gender') {
      setlogindetails({
        ...logindetails,
        ["gender"]: value as string,
      });
    }
  }

  function save() {
    validation(logindetails);
  }

  return (
    <>
      <Loader>
        <div className="container">
          {/* <!-- Animated background shapes --> */}
          <div className="bg-shape-1"></div>
          <div className="bg-shape-2"></div>
          <div className="bg-shape-3"></div>

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
                    onChange={(value) => onchange(null,value, "department")}

                  >
                    <Option value="pediatrician" className="selectGender">pediatrician</Option>
                    <Option value="neurologist" className="selectGender">neurologist</Option>
                    <Option value="general physcian" className="selectGender">general physcian</Option>
                    <Option value="dentist" className="selectGender">dentist</Option>
                  </Select>
                </div>
              )}
              {element.map((element: any) => (
                <>
                  {element && (
                    <input
                      type={element.type}
                      name={element.name}
                      onChange={(e) => onchange(e,null,null)}
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
                  style={{ width: '80%', height: '45px', margin: '20px' }}
                  placeholder='Gender'
                  onChange={(value) => onchange(null,value, "gender")}
                  id="genders"

                >
                  <Option value="Male" className="selectGender">Male</Option>
                  <Option value="Female" className="selectGender">Female</Option>
                  <Option value="Other" className="selectGender">Other</Option>
                </Select>}

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginTop: '30px', marginRight: '30px' }}>


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
