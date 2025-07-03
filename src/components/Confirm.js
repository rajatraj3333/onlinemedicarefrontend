import React, { useState, useContext, useEffect } from "react";

import { useNavigate, useParams, useSearchParams } from "react-router";
import "./css/confirm.css";
import { Modal, Checkbox, Radio, notification, DatePicker } from "antd";
import api from "../utils/api";

import moment from "moment";
import Loader from "./Loader";
import { useSelector } from "react-redux";
function Confirm() {
  const [open, setopen] = useState(false);
  const { id } = useParams();
  const [Time, setTime] = useState([]);
  const [mode, setMode] = useState("");
  const [paymentmode, setpaymentmode] = useState("");
  const [date, setdate] = useState("");
  const [bookedslot, setbookslot] = useState("");
 
  const [dataload, setdataload] = useState(false);
  const [doctordetails, setdoctordetails] = useState("");
  const time = [
    "9:30 AM",
    "10:30 AM",
    "11:15 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "2:30 PM",
    "3:14 PM",
    "3:25 PM",
    "3:45 PM",
  ];

  const navigate = useNavigate();
  const {email}  = useSelector(state=>state.user);
   
  const onChanges = (e) => {
    let item = [];
 
    if (!item.length) {
      item.push(e.target.value);
      setTime(item);
      // refTime.current=e.target.value;
   

    }
  };

  function cancel() {
    setopen(false);
  }

  function dates(date) {

let d =new Date(date)

let day = d.getDate();
let month= d.getMonth();
let year = d.getFullYear()
d.setUTCDate(day)
d.setUTCFullYear(year)
d.setUTCMonth(month)

    setdate(d);
  }

  function disabledate(current) {
    return moment() >= current;
  }

  useEffect(() => {
 
    let data = {
      doctor_id: id,
      date:date
    }

    api
      .post("/doctor/getdoctordetails", data)
      .then((res) => {
        if (res.status === 200) {
          setdoctordetails(res.data.response);
        }
      })
      .catch((err) => {
        notification.error({ message: err });
      });

    api.post("/doctor/bookslottime", data).then((res) => {
      setdataload(true);
        setbookslot(res.data.data.map((item) => item.slottime));
    });
  }, [date]);

  function confirm() {
    let data = {
      email: email,
      slottime: Time[0],
      date: date,
      doctor_id: id,
      payment_status: "done",
      mode: mode,
    };


    api
      .post("/doctor/book", data)
      .then((res) => {
        if (res.data.status === 200) {
          setdataload(false);
          notification.success({
            message: "booking successfully completed",
          });
          
         setTimeout(()=>{
         navigate('/admin')
         },2100)
        }
        
        else if (res.data.status === 400) {
          notification.error({
            message: "booking already present on this day",
          });
        } else {
          notification.error({
            message: "booking can not proceed  right now",
          });
        }
      })
      .catch((err) => console.log(err));
  }


  let confirmBtndisabled = mode === "" ?1:0
   confirmBtndisabled += Time.length===0?1:0
   confirmBtndisabled += date===''?1:0
      confirmBtndisabled += date===''?1:0
    confirmBtndisabled += paymentmode===''?1:0
confirmBtndisabled =confirmBtndisabled>0?1:0

  return (
    <div className="wrapper">
      <Loader data={dataload}>
        <div className="confirm">
          <div className="confirmwrapper">
            <span className="confirm-heading">Confirm your Appointment</span>
            <div className="doctor-details">
              {/* <img
              src="/image/ashkan-forouzani-DPEPYPBZpB8-unsplash.jpg"
              style={{ width: "200px", height: "200px" }}
              className="doctorimage"
            /> */}
              <div className="doctor-desc">
                <span>
                  Doctor Name:{" "}
                  {doctordetails != undefined && doctordetails.fullname}{" "}
                </span>
                <span>
                  Department:{" "}
                  {doctordetails != undefined && doctordetails.department}
                </span>
                <span>
                  Date & Time:{" "}
                  {date !== "" ? moment(date).format("DD-MM-YYYY") : "-"}
                </span>
                <span>
                  Doctor Fee: {doctordetails != undefined && doctordetails.fees}
                </span>
              </div>
            </div>
          </div>

          {/* timing */}

          <div className="timing">
            <div className="mode">
              <h3 style={{ marginBottom: "20px", marginLeft: "10px" }}>
                Select Mode
              </h3>

              <Radio.Group
                onChange={(e) => setMode(e.target.value)}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Radio value={"offline"}>Offline(Walk-In)</Radio>
                <Radio value={"online"} style={{ marginTop: "20px" }}>
                  Online
                </Radio>
                <Radio value={"telephonic"} style={{ marginTop: "20px" }}>
                  Telephonic
                </Radio>
              </Radio.Group>
            </div>
            <div className="mode">
              <h3 style={{ marginBottom: "20px", marginLeft: "10px" }}>
                {mode === "" ? "select mode" : " Payment method"}
              </h3>

              <Radio.Group
                onChange={(e) => setpaymentmode(e.target.value)}
                style={{ display: "flex", flexDirection: "column" }}
                disabled={mode === ""}
              >
                {/* <Radio value={"payupiwallet"} disabled>pay online(UPI/Wallet)</Radio>
                */}
                  <>
                    <Radio value={"cash"} style={{ marginTop: "10px" }}>
                      Pay by cash
                    </Radio>
                    {/* <Radio value={"card"} style={{ marginTop: "10px" }} disabled>
                      Card
                    </Radio> */}
                  </>
                
              </Radio.Group>
            </div>
          </div>
          <div className="selectTime">
            <span
              style={{
                display: "block",
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "50px",
              }}
            >
              {" "}
              {Time.length > 0
                ? `You selected ${Time} Slot`
                : date == ""
                  ? "Choose date first"
                  : "select time slot"}
            </span>
            <DatePicker
              onChange={dates}
              disabledDate={disabledate}
              style={{ width: "200px" }}
              className="datePicker"
            />
            <button style={{marginTop:'-10px'}} onClick={(e) => setopen(true)} disabled={date === ""}>
              select time
            </button>

            <Modal
              title=""
              open={open} // onOk={handleOk}
              onOk={(e) => Time.length && cancel()}
              onCancel={cancel}
              // onOk={Time.length && cancel}
              onClose={cancel}
            >
              <div className="checkBoxesContainer">
                {Array.isArray(bookedslot) &&
                  time.map((item) => (
                    <>
                      {bookedslot.length && bookedslot.includes(item) ? (
                        <div className="checkBoxes">
                          {/* <input type='checkbox' onClick={onChanges} value={element}/><p style={{marginLeft:"0px"}}>{element}</p> */}

                          <button disabled>{item}</button>
                        </div>
                      ) : (
                        <div className="checkBoxes">
                          {/* <input type='checkbox' onClick={onChanges} value={element}/><p style={{marginLeft:"0px"}}>{element}</p> */}

                          <button
                            onClick={(e) => onChanges(e)}
                            value={item}
                            className={item === Time[0] ? "buttonActive" : ""}
                          >
                            {item}
                          </button>
                        </div>
                      )}
                    </>
                  ))}
              </div>
              {/* <Checkbox onClick={(e)=>onChanges(e)} value={"test"}>Checkbox</Checkbox> */}
            </Modal>
          </div>
          <div className="confirmbtn">
            <button
              className="cnbtn"
              disabled={confirmBtndisabled}
              onClick={confirm}
            >
              Confirm
            </button>
          </div>
        </div>

        {/* <div className="confirmwrapper">
          <span className="confirm-heading">Confirm your Appointment</span>
          <div className="doctor-details">
            <img
              src="/image/ashkan-forouzani-DPEPYPBZpB8-unsplash.jpg"
              style={{ width: "200px", height: "200px" }}
              className="doctorimage"
            />
            <div className="doctor-desc">
              <span>Doctor Name: Ashkan-forouzani </span>
              <span>Department: Neurologist</span>
              <span>Date & Time: December 15,2024</span>
              <span>Doctor Fee: 1500</span>
            </div>
          </div>
        </div>
         */}
      </Loader>
    </div>
  );
}

export default Confirm;

// RAJ123456789raj@
