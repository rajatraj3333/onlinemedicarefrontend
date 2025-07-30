import { RiInfoCardFill } from "@remixicon/react";
import { notification, Select, DatePicker, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";

export interface DoctorLists {
  id: number,
  doctor_id: number,
  name: string,
  fullname: string,
  department: string,
  notavailable: null,
  joiningdate: null,
  lastdate: string
  fees: number,
  user_id: number,
  clinic_id: null,
  roles: string
}

interface Props {
  doctorList: DoctorLists[] | string
  doctorDepartment:string[] 
  Filter:(data:DoctorLists)=>void
}
export const Filtersection = (props:Props) => {
  const { doctorList, doctorDepartment, Filter } = props
  console.log(props)
  const [doctor, setDoctor] = useState("");
  const [department, setDepartment] = useState("");
  const [dates, setDates] = useState("");
  const [finddata, setFindata] = useState(doctorList)

  function onChange(date:string) {

    setDates(moment(new Date(date)).format("DD-MM-YYYY"));
  }
  function disabledDate(current:any) {
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
  }


  useEffect(() => {
    let finds;

    if (doctor !== '') {
      finds = doctorList.filter(element => element.fullname === doctor)
    }


    else if (department !== '' && dates !== '') {
      finds = doctorList.filter(element => element.department === department && !element.notavailable.includes(dates))
      if (!finds.length) {
        notification.error({
          message: 'no doctor available on this date'
        })
      }
    }

    else if (department !== '') {
      finds = doctorList.filter(element => element.department === department)
    }

    else if (dates !== '') {

      finds = doctorList.filter(element => element.notavailable != undefined ? !element.notavailable.includes(dates) : element)


    }
    else {
      Filter(doctorList)
      return;
    }
    // Array.isArray(finds).length>0 &&  setFindata(finds)

    Filter(finds)
  }, [doctor, department, dates])

  function reset() {
    Filter(doctorList)
    setDates('')
    setDepartment('')
    setDoctor('')
  }
  return (
    <>
      <div className="filtersection">
        <Select
          showSearch
          placeholder="Select  doctor"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={doctorList.map((values) => ({
            value: values.fullname,
            label: values.fullname,
          }))}

          onChange={(e) => setDoctor(e)}
          value={doctor}
          className="filternames"
        />
        <Select

          placeholder="Select a Department"
          options={doctorDepartment.map((department) => ({
            value: department,
            label: department,
          }))}
          onChange={(e) => setDepartment(e)}
          value={department}
          className="filterdepartment"
        />
        <DatePicker
          onChange={onChange}
          allowClear={true}
          disabledDate={disabledDate}
          format={"DD-MM-YYYY"}
          className="filterdates"

        />
        <button onClick={reset} className="resetbtn">Reset</button>
      </div>
      <div className="datetoolTip">
        <span style={{ marginRight: '10px' }}>know</span>
        <Tooltip title="Appointment booking only available current date to next month same date ,ex-April12-May12 ">
          <span><RiInfoCardFill /> </span>
          {/* */}
        </Tooltip>
      </div>
    </>
  );
};