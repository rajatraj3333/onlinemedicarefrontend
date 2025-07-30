import React, { useEffect, useRef, useState } from "react";
import {
  Popconfirm,

  notification,
  DatePicker,
  Radio,
  Modal,
  Space,
  Tooltip,
} from "antd";
import { RiCheckFill, RiCloseFill } from "@remixicon/react";
import "../css/dashboard.css";
import { useNavigate, redirect, useParams } from "react-router";
import moment from "moment/moment";
import Api from "../../utils/apiconnect";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { useLocation } from "react-router";
import axios from "axios";
import api from "../../utils/api";
import { setGmeetDetails } from "../../redux/slice/gmeet";
import { RootState } from "../../redux/store";
import { Modaltypes, responseDataype } from "../registration/types";
import { DatePickerType } from "antd/es/date-picker";
function Userdetails({ data }) {
  const navigate = useNavigate();
  function checkBookingCanCancelled(Boookingdate, status) {
    const currentTime = Date.now();
    const oneDayTimeInMilliSecond = 24 * 60 * 60 * 1000;
    const date = new Date(Boookingdate);
    const MonthDay = date.getDate();
    const currentDate = new Date().getDate();
    const bookingTimeInTimeStamp = Date.parse(Boookingdate);
    const differenceBetwenTime = bookingTimeInTimeStamp - currentTime;
    if (
      (status === "approved" || status == null) &&
      Math.abs(differenceBetwenTime) > oneDayTimeInMilliSecond &&
      currentDate < MonthDay
    ) {
      return true;
    } else {
      return false;
    }
  }

  const msInDay = 1000 * 60 * 60 * 24;

  function cancelappointment(id, Boookingdate) {
    try {
      let data = { booking_id: id, date: new Date().toLocaleDateString() };

      const response = Api.Post("/doctor/cancelappointment", data);

      Api.HandleRequest(response, function (data, error) {
        if ("error" in data.data) {
          notification.error({ message: data.data.error });
          return;
        }
        if ("response" in data.data) {
          notification.success({ message: data.data.response });
          navigate("/admin");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {Array.isArray(data) &&
        data.map((item) => (
          <div className="userwrapper">
            <div className="col-1">
              <div className="col-row">
                <span>
                  {" "}
                  <strong className="detailstitle">DoctorId </strong>{" "}
                  {item.doctor_id}
                </span>
              </div>

              <span>
                <strong className="detailstitle">Doctorname</strong>{" "}
                {item.fullname}
              </span>
              <span>
                <strong className="detailstitle">Department</strong>{" "}
                {item.department}
              </span>
            </div>
            <div className="col-2">
              <span>
                <strong className="detailstitle">BookingId</strong>{" "}
                {item.booking_id}
              </span>
              <span>
                <strong className="detailstitle">Bookingstatus</strong>{" "}
                {item.booking_status}
              </span>
              <span>
                {" "}
                <strong className="detailstitle">Slottime</strong>{" "}
                {item.slottime}
              </span>
            </div>
            <div className="col-3">
              <span>
                <strong className="detailstitle">PaymentStatus</strong>{" "}
                {item.payment_status}
              </span>
              <span>
                <strong className="detailstitle">Bookingdate</strong>{" "}
                {new Date(item.booking_date).toDateString()}
              </span>
              {item.booking_status == null &&
                Math.floor(
                  (new Date(item.booking_date).getTime() - new Date().getTime()) / msInDay
                ) >= 1 && (
                  <>
                    <span>
                      <a
                        style={{
                          textDecoration: "underline",
                          color: "blue",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          cancelappointment(item.booking_id, item.booking_date)
                        }
                      >
                        Cancel
                      </a>
                    </span>
                    <span
                      style={{
                        color: "red",
                        fontSize: "11px",
                        marginTop: "-8px",
                      }}
                    >
                      *[ booking only cancelled prior to date/not same day]
                    </span>
                  </>
                )}
            </div>
            <div className="col-4">
              <span>
                <strong className="detailstitle">conferenceLink</strong>{" "}
                <a href={item.meetinglink} target="_blank">
                  {" "}
                  {item.meetinglink != null
                    ? item.meetinglink
                    : "not available"}{" "}
                </a>
              </span>

              {item.filename != null && item.filename != "" && (
                <span>
                  <strong className="detailstitle">Download Report</strong>{" "}
                  <a
                    href={`https://onlinemedicares.netlify.app/uploads/${item.filename}`}
                    download="prescription.pdf" target="_blank"
                  >
                    {" "}
                    Download
                  </a>
                </span>
              )}
            </div>
          </div>
        ))}
    </>
  );
}

// Filter Section

function Filter({ filterData }) {
  const [filter, setFilter] = useState({
    status: "",
    date: "",
  });
  const onChange = (value) => {
    // console.log(value.target.value)
    setFilter({ ...filter, ["status"]: value.target.value });
    if (filter.date && filter.status) {
      filterData(
        { status: value.target.value, date: filter.date },
        "date/status"
      );
      return;
    }
    filterData(value.target.value, "status");
  };

  const dateSelect = (date) => {
    // console.log(date)
    let formateDate = moment(new Date(date)).format("DD-MM-YYYY");
    // console.log(formateDate);
    setFilter({ ...filter, ["date"]: formateDate });
    if (filter.date && filter.status) {
      filterData({ status: filter.status, date: formateDate }, "date/status");
      return;
    }
    filterData(formateDate, "date");
  };
  function reset() {
    setFilter({ status: "", date: "" });
    filterData(null, "reset");
  }
  return (
    <div className="dbfilter">
      {/* <button className="btn">Approve</button>
     <button className="btn">Cancelled/rejected</button> */}

      <DatePicker
        placeholder="Booking Date"
        style={{
          width: "250px",
          height: "40px",
          display: "flex",
          marginRight: "50px",
        }}
        onChange={dateSelect}
        defaultValue={filter?.date}
      />
      <Radio.Group
        options={[
          { value: "approved", label: "Approve" },
          { value: "other", label: "Cancelled/rejected" },
        ]}
        defaultValue={filter?.status}
        onChange={onChange}
      ></Radio.Group>
      <button onClick={reset}>reset</button>
    </div>
  );
}

function Dashboard() {
  const [patientDetails, setpatientdetails] = useState("");
  const [reload, setreload] = useState(false);
  const patientdetailsRef = useRef<[any]>(null);
  const [fileref, setfileref] = useState(false);
  const bookingIdref = useRef(null);
  const Gmeetref = useRef<string|null|number>(null);
  const { roles } = useSelector((state:RootState) => state.user);

  const [uploadFiles, setUploadFiles] = useState<string|Blob|null>();
  const [openModal, setModal] = useState(false);
  const [datetime, setdateTime] = useState<DatePickerType|undefined>();
  const [verify, setverify] = useState();
  const [timeboundmessage, settimeboundmessage] = useState("");
  const [selectedAction, setselectedAction] = useState("");
  const [modalprops, setModalprops] = useState<Modaltypes>({
    title: "",
    open: "",
    style: "",
    okText: "",
    onCancel: ()=>{},
    onOk: ()=>{},
    okButtonProps: {disabled:false},
  });
  const msInDay = 1000 * 60 * 60 * 24;

  const navigate = useNavigate();
  function confirm(booking_id:string|number, status:string) {
    updateStatus(booking_id, status);
  }


  console.log(datetime);

  const filterData = (value:string, type:string) => {

    if (type === "status") {
      let searchItem =
        value === "approved"
          ? patientdetailsRef.current?.filter(
              (item) => item.booking_status === "approved"
            )
          : patientdetailsRef.current?.filter(
              (item) =>
                item.booking_status === "cancelled" ||
                item.booking_status === "rejected"
            );

      setpatientdetails(searchItem);
    } else if (type === "date") {
      let searchItem = patientdetailsRef.current.filter(
        (item) => moment(item.booking_date).format("DD-MM-YYYY") === value
      );

      setpatientdetails(searchItem);

    } else if (type === "date/status") {
      // console.log(value);
      let searchItem =
        value.status === "approved"
          ? patientdetailsRef.current?.filter(
              (item) =>
                item.booking_status === "approved" &&
                moment(item.booking_date).format("DD-MM-YYYY") === value?.date
            )
          : patientdetailsRef.current?.filter(
              (item) =>
                (item.booking_status === "cancelled" ||
                  item.booking_status === "rejected") &&
                moment(item.booking_date).format("DD-MM-YYYY") === value?.date
            );
      setpatientdetails(searchItem);
    } else if (type === "reset") {
      setpatientdetails(patientdetailsRef.current);
    }
  };

  useEffect(() => {
    if (roles !== "") {
      if (roles !== "Patient") {
        const promise = Api.Get("/doctor/bookingdetails");
        Api.HandleRequest(promise, function (data, error) {
          if (data != null) {
            setpatientdetails(data.data.response);
            patientdetailsRef.current = data.data.response;
            return;
          } else {
            notification.error({
              message: error,
            });
          }
        });
        setreload(false);
      } else {
        const pro = Api.Get("/doctor/getpatientdetails");
        Api.HandleRequest(pro, function (data:any, error:string|null) {
          if (data != null) {
            setpatientdetails(data.data.response);
            patientdetailsRef.current = data.data.response;
            return;
          } else {
            notification.error({
              message: error,
            });
          }
        });
        setreload(false);
      }
    } else {
      navigate("/login");
    }
  }, [roles, reload]);

  function updateStatus(booking_id:number|string, status:string) {
    let data = {
      booking_id,
      status,
    };

    const response = Api.Post("/doctor/bookingstatus", data);
    Api.HandleRequest(response, function (data:any, error:string|number) {
      if (data.data.status === 200) {
        notification.success({
          message: "booking status updated successfully",
        });
        setreload(true);
        return;
      } else {
        notification.error({
          message: error || "can not update status right now",
        });
      }
    });
  }

  const uploadFile = async (e) => {

    setUploadFiles(e.target.files[0]);
  };

  const savefile = (e?:any) => {
    if (!uploadFiles) {
      notification.error({ message: "No file selected for upload." });
      return;
    }
    const formData = new FormData();
    formData.append("file", uploadFiles);

    const response = api
      .post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data.file.filename, bookingIdref.current);
          Api.Post("/file/updatefile", {
            filename: res.data.file.filename,
            booking_id: bookingIdref.current,
          })
            .then((res:any) => {
              console.log(res);
              if (res.status === 200) {
                setUploadFiles("");
                setModal(false);
                document.location.reload("/admin");
                return true;
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const createmeetlink = ( booking_id:number) => {
    if (booking_id) Gmeetref.current = booking_id;
  };

  const gmeetlink = async () => {
    const res = await api.get("gmeet/auth/url");
    const { url } = res.data;

    localStorage.setItem("bid", Gmeetref.current != null ? String(Gmeetref.current) : "");
    localStorage.setItem("bookingtime", datetime ? datetime.toString() : "");
    console.log(url);
    setverify(url); 
  };

  function disabledDate(current: any) {
    // current is a Dayjs object
    if (!current) return false;
    const today = moment();
    const diffInDays = current.startOf('day').diff(today.startOf('day'), 'days');
    return diffInDays <= -2;
  }
  function disabletime(currentTime:Date|DatePickerType) {
    // console.log(new Date(currentTime))
    // Convert Dayjs (DatePickerType) to Date if necessary
    let selectedDate: Date;
    if (currentTime && typeof (currentTime as any).toDate === "function") {
      selectedDate = (currentTime as any).toDate();
    } else {
      selectedDate = new Date(currentTime as Date);
    }
    let diffinms = selectedDate.getTime() - new Date().getTime();
    console.log(Math.floor(diffinms / msInDay) < 0);
    if (Math.floor(diffinms / msInDay) < 0) {
      settimeboundmessage("time must be greater than current hour/date/time");
    } else {
      settimeboundmessage("");
    }
  }
console.log(Gmeetref,timeboundmessage,datetime)
  const modalContent = (type:string) => {
    console.log(type, "CONTENT",Gmeetref);
    if (type === "gmeet") {
      return (
        <>
          <h1>Test</h1>
          <Space direction="vertical" size={12}>
            <DatePicker
              showTime
              onChange={(dateString:DatePickerType) => {
                // console.log('Selected Time: ', value);
                setdateTime(dateString);
                disabletime(dateString);
                // console.log('Formatted Selected Time: ', dateString);
              }}
              disabledDate={disabledDate}

              // onOk={onOk}
            />
            <button
              disabled={
                !(Gmeetref.current && datetime && timeboundmessage === "")?
                true:false              }
              onClick={gmeetlink}
            >
              Generate link
            </button>
            {timeboundmessage && (
              <p style={{ color: "red" }}>{`[${timeboundmessage}]`}</p>
            )}
          </Space>
        </>
      );
    } else if (type === "upload") {
      return (
        <form onSubmit={(e) => savefile(e)} className="uploadfile">
          <input type="file" name="file" onChange={uploadFile} />
        </form>
      );
    }
  };

  const modalOpen = (type:string, data:any) => {
    console.log(type, data);
    let title = "Conference Time";
    let open = { openModal };
    let style = { width: "800px", zIndex: 999999 };

    let okText = "Verify";
    let onCancel = () => {
      bookingIdref.current = null;
      setModal(false);

      if (type === "upload") setUploadFiles(null);
      setfileref(false);
    };
    let onOk;
    let okButtonProps;
    if (type === "gmeet") {
      setselectedAction("gmeet");
      setModal(true);
      createmeetlink(data);
      onOk = () => verify != undefined && document.location.replace(verify);
      okButtonProps = { disabled: verify === undefined };
      setModalprops({
        title: title,
        open: openModal,
        style: style,
        okText: okText,
        onCancel: onCancel,
        onOk: onOk,
        okButtonProps: okButtonProps,
      });
    } else if (type === "upload") {
      setModal(true);
      setselectedAction("upload");
      console.log(data, "BookingId");
      bookingIdref.current = data;
      title = "Upload file";
      okText = "Save";
      okButtonProps = { disabled: uploadFiles === undefined };

      setModalprops({
        title: title,
        open: openModal,
        style: style,
        okText: okText,
        onCancel: onCancel,
        onOk:savefile,

        okButtonProps: okButtonProps,
      });
    }
  };

  return (
    <>
      {openModal && (
        <Modal
          open={openModal}
          title={modalprops.title}
          style={modalprops.style}
          okText={modalprops.okText}
          onCancel={modalprops.onCancel}
          onOk={() =>
            selectedAction === "gmeet"
              ? verify != undefined && document.location.replace(verify)
              : (savefile(), setModal((modalOpen) => !modalOpen))
          }
          okButtonProps={
            selectedAction === "gmeet"
              ? { disabled: verify === undefined }
              : { disabled: !uploadFiles }
          }
        >
          {modalContent(selectedAction)}
        </Modal>
      )}
      <div className="dashboardWrappers">
        <Loader data={roles == undefined ? false : true}>
          <Filter filterData={filterData} />
          {roles === "Patient" ? (
            <>
              <Userdetails data={patientDetails} />
            </>
          ) : (
            <table className="">
              <thead>
                <tr>
                  <th>patient Name</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th>Timing</th>
                  <th>Date</th>

                  <th>Download</th>

                  {roles != "Patient" && (
                    <>
                      <th>upload</th>
                      <th>Gmeet</th>
                      <th>Action </th>
                      <th>conferenceLink</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(patientDetails) &&
                  patientDetails.map((item) => (
                    <tr>
                      <td style={{ width: "25%" }}>{item.fullname}</td>
                      <td style={{ width: "12%" }}>{item.mode}</td>
                      <td style={{ width: "12%" }}>{item.booking_status}</td>
                      <td style={{ width: "12%" }}>{item.slottime}</td>
                      <td style={{ width: "12%" }}>
                        {" "}
                        {moment(item.booking_date).format("DD-MM-YYYY")}
                      </td>
                      <td style={{ width: "14%" }}>
                        {item.filename != null ? (
                          <a
                            href={`https://onlinemedicares.netlify.app/uploads/${item.filename}`}
                            download="prescription.pdf"
                            target="_blank"
                          >
                            Download
                          </a>
                        ) : (
                          "Not Available"
                        )}
                      </td>

                      <td style={{ width: "6%" }}>
                        <Tooltip placement="top" title={"File Upload"}>
                          <img
                            src="./image/icons8-upload-48.png"
                            style={{ width: "32px", height: "32px" }}
                            onClick={() => modalOpen("upload", item.booking_id)}
                          />
                        </Tooltip>
                      </td>
                      <td style={{ width: "6%" }}>
                        {item.booking_status === "approved" &&
                        (item.meetinglink === null || item.meetinglink == "") &&
                        Math.floor(
                          ((new Date(item.booking_date).getTime() - new Date().getTime()) / 1000) *
                            60 *
                            60 *
                            24
                        ) > 0 ? (
                          <Tooltip
                            placement="top"
                            title={"Generate Gmeet link"}
                          >
                            <img
                              onClick={(e) =>
                                modalOpen("gmeet", item.booking_id)
                              }
                              src="./image/icons8-google-meet-32.png"
                            />
                          </Tooltip>
                        ) : (
                          /* <button onClick={(e)=>createmeetlink(e,item.booking_id)}>Gmeet</button>:'Not Available'} */
                          ""
                        )}
                      </td>

                      {roles != "Patient" && item.booking_status == null ?      Math.floor(
                          ((new Date(item.booking_date).getTime() - new Date().getTime()) / 1000) *
                            60 *
                            60 *
                            24
                        ) > -1 && (
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                    
                          
                          <Popconfirm
                            title="Are you sure confirm appointment"
                            onConfirm={() =>
                              confirm(item.booking_id, "approved")
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <div className="checkandrejectbox checksuccess">
                              <RiCheckFill color="#fff" />
                            </div>
                            {/* <button>Approve</button> */}
                          </Popconfirm>

                          <Popconfirm
                            title="cancelling appointment"
                            onConfirm={() =>
                              confirm(item.booking_id, "rejected")
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <div
                              className="checkandrejectbox closereject"
                              style={{ marginLeft: "10px" }}
                            >
                              <RiCloseFill color="#fff" capHeight={"15px"} />
                            </div>
                          </Popconfirm>
                        </td>
                      ) : (
                        <td>No Action</td>
                      )}
                      <td>
                        <a
                          href={item.meetinglink}
                          target="_blank"
                          style={{
                            color: "blue",
                            marginLeft: "30px",
                            display: "block",
                          }}
                        >
                          {item.meetinglink != null ? (
                            <img src="./image/icons8-join-32.png" />
                          ) : (
                            "Not Available"
                          )}
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {!Array.isArray(patientDetails) && (
            <h2 style={{ textAlign: "center" }}>
              No Booking Avaliable Right now{" "}
            </h2>
          )}
        </Loader>
      </div>
    </>
  );
}

export default Dashboard;
