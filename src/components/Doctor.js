import React, { useEffect, useState } from "react";
import "./css/doctor.css";
import { useNavigate, useSearchParams } from "react-router";
import Editmodal from "./Editmodal";
import { DatePicker, message, Modal, notification, Select } from "antd";
import axios from "axios";
import moment from "moment";
import api from "../utils/api";
import Api from "../utils/apiconnect";
import { useSelector } from "react-redux";
function Edit({ isopen, setopen, data, updatesave }) {
  const Option = { Select };

  const [toupdatedata, settoupdatedata] = useState({ ...data });
  const [lastdate, setlastdate] = useState("");
  const [notavailable, setnotavailable] = useState();

  function disabledDate(date) {
    return moment() <= date;
  }

  function save() {
    if (
      !toupdatedata.name ||
      !toupdatedata.fullname ||
      !toupdatedata.department
    ) {
      notification.error({
        message: `name,fullname department can't  be empty`,
      });
      return;
    }
    let upadted_data = {
      ...toupdatedata,
      lastdate: lastdate !== "" ? lastdate : "-",
      notavailable:
        notavailable != undefined ? notavailable : data.notavailable,
    };

    updatesave(upadted_data);
  }

  return (
    <>
      {/* {notavailablemodel && <NotModal isopen={notavailablemodel} onclose={setnotavailablemodel}
    setafter={setafterdateselect} afterselecteddate={afterdateselect}
    />} */}
      <Modal
        open={isopen}
        onOk={save}
        width={"600px"}
        onCancel={() => setopen(false)}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="modalinput"
          value={toupdatedata.name}
          onChange={(e) =>
            settoupdatedata({
              ...toupdatedata,
              [e.target.name]: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          onChange={(e) =>
            settoupdatedata({
              ...toupdatedata,
              [e.target.name]: e.target.value,
            })
          }
          className="modalinput"
          value={toupdatedata.fullname}
        />
        <fieldset style={{ padding: "10px", marginTop: "30px" }}>
          <legend>Date and fees</legend>

          <div className="selectanddate">
            <Select
              defaultValue={toupdatedata.department}
              onChange={(value) =>
                settoupdatedata({
                  ...toupdatedata,
                  department: value,
                })
              }
              style={{ width: "200px" }}
              disabled
            >
              <Option value={toupdatedata.department}>
                {toupdatedata.department}
              </Option>
            </Select>
            <DatePicker
              placeholder="last date"
              disabledDate={disabledDate}
              onChange={(date) =>
                setlastdate(moment(new Date(date)).format("DD-MM-YYYY"))
              }
              format={"DD-MM-YYYY"}
              style={{ maxHeight: "40px", width: "200px" }}
            />

            {/* <button onClick={()=>setnotavailablemodel(true)}>Select not available time</button> */}
          </div>

          <div
            className={
              toupdatedata.roles === "Doctor" ||
              toupdatedata.roles === "Associate Doctor"
                ? "selectanddate"
                : "selectanddatewithoutdoc"
            }
            style={{ justifyContent: "space-around" }}
          >
            {(toupdatedata.roles === "Doctor" ||
              toupdatedata.roles === "Associate Doctor") && (
              <input
                type="text"
                name="fees"
                placeholder={toupdatedata.fees}
                onChange={(e) =>
                  settoupdatedata({
                    ...toupdatedata,
                    [e.target.name]: e.target.value,
                  })
                }
                className="modalinput"
                style={{
                  width: "200px",
                  display: "flex",
                  border: "1px solid #E0E0E0",
                }}
                value={toupdatedata.fees}
              />
            )}
            <DatePicker
              placeholder="not available"
              multiple
              // defaultPickerValue={moment().days('2').format('DD-MM-YYYY')}
              maxTagCount="responsive"
              disabledDate={(date) => moment() >= date}
              onChange={(date) =>
                setnotavailable(
                  date.map((element) =>
                    moment(new Date(element)).format("DD-MM-YYYY")
                  )
                )
              }
              // format={"DD-MM-YYYY"}
              style={{ maxHeight: "40px", width: "200px", marginTop: "20px" }}
            />
          </div>
        </fieldset>
      </Modal>
    </>
  );
}

function Doctor() {
  const [editModal, seteditModal] = useState(false);
  const [editmodal, seteditmodal] = useState(false);

  const [doctorlist, setDoctorList] = useState();
  const [modeldata, setmodeldata] = useState("");
  const [doctordata, setdoctordata] = useState("");
  const nav = useNavigate();
  const {roles} = useSelector(state=>state.user);

  const edit = (id, type = "edit", e = null) => {
    const findDoctorIndex = doctorlist.findIndex((item) => item.id === id);
    let copyOfDoctorList = [...doctorlist];
    let changeItemData = doctorlist[findDoctorIndex];
    if (type === "edit") changeItemData = { ...changeItemData, editable: true };
    else if (type === "change" && e !== null) {
      changeItemData = { ...changeItemData, [e.target.name]: e.target.value };
    } else {
      delete changeItemData.editable;
    }

    copyOfDoctorList.splice(findDoctorIndex, 1, changeItemData);

    setDoctorList(copyOfDoctorList);
  };
  const cancel = (id) => {
    edit(id, "cancel");
  };

  const change = (id, e) => {
    // edit(id,'change',e)

    let copyOfDoctorList = [...doctorlist];
    let data = copyOfDoctorList.find((item) => item.id === id);
    const findDoctorIndex = doctorlist.findIndex((item) => item.id === id);

    //   console.log(data)
    //   console.log({...data})
    data = { ...data, [e.target.name]: e.target.value };
    //   console.log(data)

    copyOfDoctorList.splice(findDoctorIndex, 1, data);

    setDoctorList(copyOfDoctorList);
  };

  const saves = (data) => {
    let updateddata = {
      name: data.names,
      fullname: data.firstlastname,
      email: data.email,
      password: data.password,
      roles: data.roles,
      department: data.department,
      joiningdate: data.joiningdate,
      lastdate: "-",
      fees: 1500,
    };

    // api.get('/health').then(res=>console.log(res))

    api.post("/auth/addemployee", updateddata).then((res) => {
      if (res.data.hasOwnProperty("message")) {
        notification.error({
          message: "user alredy exists",
          className: "notify",
        });
      } else if (res.data.hasOwnProperty("error")) {
        notification.error({
          message: "something went wrong",
          className: "notify",
        });
      } else {
        notification.success({
          message: "user added successfully",
          className: "successmessage",
        });
        setTimeout(() => {
          seteditModal(false);
        }, 2000);
      }
    });
  };

  const cancelModel = () => seteditModal(false);

  function getdoctorlist() {
    const promise = Api.Get("/doctor/getdoctorlist");

    Api.HandleRequest(promise, function (response, error) {
      console.log(response);
      if (response != null && Array.isArray(response.data.response)) {
        const { data } = response;
        setdoctordata(
          data.response.find((item) => item.doctor_id === item.user_id)
        );
        setDoctorList(data.response);
        return;
      } else {
        notification.error({
          message: error.error,
        });
      }
    });
  }
  useEffect(() => {
    getdoctorlist();
    // setDoctorList([]);
  }, []);

  function openmodel(id) {
    const data = doctorlist.find((ele) => ele.user_id === id);
    seteditmodal(true);
    doctorlist && setmodeldata(data);
  }

  function updatesave(data) {
    seteditmodal(false);
    const promise = Api.Post("/doctor/updatedoctordetails", data);

    Api.HandleRequest(promise, function (response, error) {
      if (response != null) {
        const { status } = response.data;

        if (status === 200) {
          getdoctorlist();
          notification.success({
            message: "successfull updated!",
          });
        } else {
          notification.error({
            message: error || "session expired!",
          });
          setTimeout(() => {
            nav("/login");
          }, 2000);
        }
      }
    });
  }

  const delayfn = (callback) => {
    let uid;
    return function (args) {
      clearTimeout(uid);
      uid = setTimeout(() => {
        callback(args.target.value);
      }, 1500);
    };
  };

  const handlesearch = delayfn((value) => {
    if (value === "") {
      setDoctorList(getdoctorlist());
    } else {
      let findItem = doctorlist.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.fullname.toLowerCase().includes(value.toLowerCase())
      );
      findItem && setDoctorList([...findItem]);
    }
  });

  function eligibletoedit(item) {
    if (item.roles === roles) {
      return true;
    } else if (roles === "Doctor") {
      return true;
    } else if (item.roles === "Associate" && roles === "Associate Doctor") {
      return true;
    }
  }

  return (
    <>
      {editModal && (
        <Editmodal
          isModalOpen={editModal}
          handleCancel={cancelModel}
          saves={saves}
          data={doctordata}
        />
      )}
      {editmodal && (
        <Edit
          isopen={editmodal}
          setopen={seteditmodal}
          data={modeldata}
          updatesave={updatesave}
        />
      )}
      <div className="searchBox">
        <input type="text" className="searchinputbox" onChange={handlesearch} placeholder="" />
        <button className="sebtn"  style={{height:'40px'}}>Search</button>

        {roles !== "Associate" && (
          <button className="addbtn" style={{height:'40px'}} onClick={() => seteditModal(true)}>
            Add
          </button>
        )}
      </div>

      <div className="dashboardWrapper">
        <div className="doctorTable">
          <table className="dctable">
            <thead>
              <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Full Name</td>
                <td>Department</td>
                <td colSpan={2}>Role</td>
                <td>Joining Date</td>
                <td>Last Date</td>
                <td>Total patient</td>
                <td>Fees</td>
                <td style={{ textAlign: "center" }}>Action</td>
              </tr>
            </thead>
            <tbody>
              {doctorlist &&
                doctorlist.map((item) => (
                  <tr>
                    <td>{item.user_id}</td>

                    <td name="name">{item.name}</td>

                    <td name="name">{item.fullname}</td>

                    <td name="name" colSpan={2}>
                      {item.department}
                    </td>

                    <td name="name" style={{ fontSize: "11px" }}>
                      <div className="rolesbtn">{item.roles}</div>
                    </td>

                    <td name="name">{item.joiningdate}</td>

                    <td name="name">{item.lastdate}</td>

                    <td name="name">{item.totalappointment}</td>
                    <td name="name">
                      {" "}
                      {(item.roles === "Doctor" ||
                        item.roles === "Associate Doctor") &&
                        item.fees}
                    </td>
                    <td>
                      {eligibletoedit(item) && (
                        <button
                          onClick={() => openmodel(item.user_id)}
                          className="editbtn"
                        >
                          Edit
                        </button>
                      )}
                      {/* <button>Save</button> */}
                    </td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Doctor;
