import React,{ useEffect, useState } from "react";
import api from "../../utils/api";
import Api from "../../utils/apiconnect";
import { notification } from "antd";
import styles from  "../css/hospital.module.css";
import { ClinicResponse, responseDataype } from "../registration/types";
function Clinicdetails(){
  const [hospitalDetails, sethospitalDetails] = useState({
    hospitalselectedname: "",
    hospitalname: "",
    hospitaladdress: "",
    hospitalnumber: '0',
    id:"",
    hospitalnoemployee:'0',
  });
  const [details, setdetails] = useState<ClinicResponse[]>();
  const [id,selectid] = useState<number|string>("");
  let fetchList = () => {
    let promise = api.post("/doctor/fetchhospital", {
      id: "",
      type: "allname",
    });

    Api.HandleRequest(promise, function (data:any, error:null|string) {
      setdetails(data.data.response);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);
  const ListSelect = (id:number|string) => {
    console.log("useeffect", id);
    selectid(id);
    if (id) {
      let promise = api.post("/doctor/fetchhospital", {
        id: id,
        type: "byname",
      });

      Api.HandleRequest(promise, function (data:any, error:string|null) {
        let obj =data?.data?.response
       
        sethospitalDetails({
           hospitalselectedname: "",
         hospitalname:obj.clinic_name,
         hospitalnoemployee:""+obj.clinic_employee_no,
         hospitalnumber:""+obj.clinic_phone,
         hospitaladdress:obj.clinic_address,
        id:obj.id  
        })
       
      });
    }
  };
  // console.log(details);
  const saveDetails = (e:any) => {
    if(e.target.name==='hospitalselectedname') ListSelect(e.target.value)
    // console.log(details);
    // console.log(details && details.find(item=>item.clinic_id==e.target.value))
    sethospitalDetails({
      ...hospitalDetails,
      [e.target.name]: details && details.find(item=>item.clinic_id==e.target.value)?.clinic_name || e.target.value
    });
   
  };

  let isDisabled =
    (hospitalDetails.hospitalname || hospitalDetails.hospitalselectedname) &&
    hospitalDetails.hospitaladdress &&
    hospitalDetails.hospitalnumber &&
    hospitalDetails.hospitalnoemployee
      ? 1
      : 0;

  console.log(isDisabled);
  console.log(hospitalDetails);
  const save = () => {
    if (hospitalDetails.hospitalnumber.length !== 12) {
      notification.error({
        message: "mobile number must be 12 number along with country code ",
      });
      return;
    }
    let correct = 0; 

    if ( 
      hospitalDetails.hospitalnumber.match(/[0-9]/) &&
      !hospitalDetails.hospitalnumber.match(/[' ']/)
      && hospitalDetails.hospitalnoemployee.match(/[0-9]/) &&
       !hospitalDetails.hospitalnoemployee.match(/[' ']/)
    ) {
      correct=1;
    } else {
      notification.error({ message: "only numbers are allowed" });
    }

    console.log(correct, isDisabled, hospitalDetails);
    if (correct && isDisabled) {

      let promise;
      if (hospitalDetails.hospitalselectedname!=="") {
         hospitalDetails.id = id;
        console.log("update", hospitalDetails);
        promise = api.put("/doctor/updatehospital", hospitalDetails);
        return ;  
      } else {
        promise = api.post("/doctor/addnewhospital", hospitalDetails);
      }
      console.log(promise);
      Api.HandleRequest(promise, function (data:any, error:string|null) {
        if ("response" in data.data) {
          notification.success({ message: data.data.response });
        } else if ("error" in data.data) {
          notification.error({ message: data.data.error });
        } else {
          notification.error({ message: "something went wrong" });
        }
      });
    }
  };
  console.log(hospitalDetails);
  return (
    <>
    <div
      className={styles.container}
      style={{ marginLeft: "140px", display: "flex", flexDirection: "column" }}
      >
      <form className={styles.form}>
        <div onClick={()=>console.log('testing....')} style={{marginLeft:'30px'}}>

        <select
          defaultValue={details?.length && details[0].clinic_name}
          defaultChecked={details?.length && details[0].clinic_name?false:true}
          name="hospitalselectedname"
          onChange={(e) => saveDetails(e)}
          
          disabled={
            hospitalDetails.hospitalname && hospitalDetails.hospitalname?true:false
          }
          >
          <option>Select</option>
          {details?.length &&
            details.map((item, idx) => <option value={item.clinic_id} onChange={()=>ListSelect(idx)} id={item.clinic_id}>{item.clinic_name}</option>)}
          {/* <option>Apollo (Delhi)</option>
        <option>Apollo (Chennai)</option>
        <option>Apollo (Gurgaon)</option>
        <option>Apollo (Jaipur)</option>
        <option>Baptist(Bangaluru/Banglore)</option>
        <option>Medanta (Gurgaon)</option>
        <option>Medanta Clinic (Gurgaon/DLF CITY)</option>
        <option>AIIMS (Delhi)</option>
        <option>AIIMS (Darbhanga)</option> */}
        </select>
        <button
          onClick={() =>
            sethospitalDetails({
              ...hospitalDetails,
              hospitalselectedname: "Select",
            })
          }
          style={{display:'block'}}
          >
          reset
        </button>
            </div>
        {/* or enter default  */}
        <p>OR</p>
        <div style={{ display: "flex", flexDirection: "row" }}>

        <sup style={{ color: "red" }}>*</sup>
        <input  
          disabled={hospitalDetails.hospitalselectedname?true:false}
          placeholder="Enter Clinic/Hospital Name"
          type="text"
          name="hospitalname"
          onChange={(e) => saveDetails(e)}
          value={hospitalDetails.hospitalname}
          />
          </div>
       
    <div style={{ display: "flex", flexDirection: "row" }}>

        <sup style={{ color: "red" }}>*</sup>
        <input
          placeholder=" Clinic/Hospital Address"
          type="text"
          name="hospitaladdress"
          onChange={(e) => saveDetails(e)}
          value={hospitalDetails.hospitaladdress}
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "row" }}>
        <sup style={{ color: "red" }}>*</sup>
        <input
          placeholder=" Clinic/Hospital Number"
          type="number"
          name="hospitalnumber"
          onChange={(e) => saveDetails(e)}
          value={hospitalDetails.hospitalnumber}
          />
        </div>

       <div style={{ display: "flex", flexDirection: "row" }}>
        <sup style={{ color: "red" }}>*</sup>
        <input
          placeholder=" Clinic/Hospital Employees"
          type="number,"
          name="hospitalnoemployee"
          onChange={(e) => saveDetails(e)}
          value={hospitalDetails.hospitalnoemployee}
          />
        </div>
      </form>
      <button onClick={() => save()} disabled={!isDisabled}>
        Save
      </button>
    </div>
          </>
  );
}

export default Clinicdetails;
