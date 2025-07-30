import React, { useContext, useEffect, useState } from "react";
import "../css/booking.css";
// import im from '../../public/image/ashkan-forouzani-DPEPYPBZpB8-unsplash.jpg'
import { Select, DatePicker, Tooltip, Collapse, notification } from "antd";
import moment from "moment";
import { Link } from "react-router";
import { RiInfoCardFill } from '@remixicon/react'

import api from "../../utils/api";
import { DoctorLists, Filtersection } from "./Filter";
import { Detailscard } from "./Card";





function Booking() {
  const doctorDepartment = [''];
  const [list, setList] = useState<any>('');
  const [doctorlist, setdoctorlist] = useState('')

  useEffect(() => {
    api.get('/doctor/getalldoctor').then(res => {

      setdoctorlist(res.data.response)
    }).catch(err => console.log(err))
  }, [])



  const doctorList = [
    {
      id: 1,
      name: "Ashkan-forouzani",
      department: "general Physican",
      notAvailable: ["13-12-2024"],
      review: [
        { id: 1, label: 'doctor prescibe well', children: 'doctor prescibe very well and very humble listen carefully' },
        { id: 1, label: 'satisifed with counselling', children: 'doctor prescibe very well and very humble listen carefully' }
      ]
    },
    {
      id: 2,
      name: "XYZABC",
      department: "dermatologists",
      notAvailable: ["19-12-2024"],
      review: [
        { id: 1, label: 'satisifed with counselling', children: 'doctor prescibe very well and very humble listen carefully' }
      ]
    },
    {
      id: 3,
      name: "ABCVS",
      department: "general Physican",
      notAvailable: ["27-12-2024"],
    },
    {
      id: 3,
      name: "ABCPO",
      department: "neurologist",
      notAvailable: ["17-12-2024"],
    },
    {
      id: 3,
      name: "ABCIO",
      department: "general Physican",
      notAvailable: ["13-12-2024"],
    },
    {
      id: 3,
      name: "ABCUY",
      department: "dentist",
      notAvailable: ["10-01-2025"],
    },
    {
      id: 3,
      name: "ABCQWeS",
      department: "Pediatricians",
      notAvailable: ["11-01-2025"],
    },
  ];
  Array.isArray(doctorlist) && doctorlist?.forEach(
    (item) =>
      !doctorDepartment.includes(item.department) &&
      doctorDepartment.push(item.department)
  );

  function Filter(data: DoctorLists) {

    setList(data);
  }

  return (
    <>
      {doctorlist &&
        <Filtersection doctorList={doctorlist} doctorDepartment={doctorDepartment}
          Filter={Filter}
        />}
      <div className="flex" style={{ flexWrap: 'wrap' }}>

        {doctorlist && <Detailscard data={list} />}
      </div>


    </>
  );
}

export default Booking;
