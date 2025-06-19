import React, { useContext, useEffect, useState } from "react";
import "./css/booking.css";
// import im from '../../public/image/ashkan-forouzani-DPEPYPBZpB8-unsplash.jpg'
import { Select, DatePicker, Tooltip,Collapse, notification } from "antd";
import moment from "moment";
import { Link } from "react-router";
import {RiInfoCardFill} from '@remixicon/react'
import Styles from './css/card.module.css'
import api from "../utils/api";

const Filtersection = (props) => {
  const {doctorList,doctorDepartment,Filter}=props

  const [doctor, setDoctor] = useState("");
  const [department,setDepartment]= useState("");
  const [dates,setDates] =useState("");
  const [finddata,setFindata]=useState(doctorList)
   
  function onChange(date) {
   
    setDates(moment(new Date(date)).format("DD-MM-YYYY"));
  }
  function disabledDate(current) {
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
  }


   useEffect(()=>{
    let finds;

    if(doctor!==''){
     finds= doctorList.filter(element=>element.fullname===doctor)
    }
  

    else if(department!==''&& dates!==''){
      finds= doctorList.filter(element=>element.department===department&& !element.notavailable.includes(dates))
       if(!finds.lenght){
        notification.error({
          message:'no doctor available on this date'
        })
       }
    }

    else if(department!==''){
      finds= doctorList.filter(element=>element.department===department)
    }

    else if(dates!==''){
     
      finds= doctorList.filter(element=> element.notavailable!=undefined ? !element.notavailable.includes(dates):element)
   
      
    }
    else {
      Filter(doctorList)
      return;
    }
    // Array.isArray(finds).length>0 &&  setFindata(finds)
    
    Filter(finds)
   },[doctor,department,dates])

   function reset()
{
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
        <span style={{marginRight:'10px'}}>know</span>
        <Tooltip title="Appointment booking only available current date to next month same date ,ex-April12-May12 ">
<span><RiInfoCardFill/> </span>
      {/* */}
        </Tooltip>
      </div>
    </>
  );
};

const Detailscard = (props) => {
  
 const {data}=props


 return (
  <> 
   { Array.isArray(data) && data.map(element=>(
  <div style={{display:'flex',flexWrap:'wrap',marginTop:'10px'}} key={element._id}>
    <div className={`${Styles.cardContainer} `} style={{margin:'40px'}}>
        <div className={` flex ${Styles.classImg}${Styles.circle}`}>
        <img src="/image/ashkan-forouzani-DPEPYPBZpB8-unsplash.jpg" className={`${Styles.avimg} ${Styles.circle}`} alt="Doctor Image"/>
        </div>
        {/* <!-- Doctor Details --> */}
          <div className={`${Styles.doctdetails}`}>

              <div className={ `${Styles.doctorName} ${Styles.flex}`}>
                  <label>Name-</label>
                  <p> {element.fullname}</p>
                </div>
               <div style={{display:'flex',marginTop:'10px'}}>
                <img src="/image/location-icon.png"/>
                <p style={{fontSize: '0.65em', marginTop: '2px'}}>AIIMS(New Delhi)</p>
            </div>
            <div  style={{marginTop: '40px', display:'flex'}}>

                <div className={`${Styles.specialtylabel} ${Styles.labels}`}>{element.department}</div>
                <div className={`${Styles.hospitalnamelabel} ${Styles.labels}`}>Medanta</div>
            </div>
            <div style={{marginTop: '40px', display:'flex'}}>
                 
                <Link  className={`${Styles.booknow} ${Styles.btnset1}`} to={`/bookings/confirm/${element.doctor_id}`}>Book Now</Link>
                <Link className={`${Styles.aboutdoc} ${Styles.btnset1}`} to={`/profiles/${element.doctor_id}`}>About Doctor</Link>
            </div>
        </div>
    </div>
 
        </div>
     
    
    
// {element.review && <Collapse items={element.review} defaultActiveKey={['1']}
// style={{width:'300px',marginLeft: "-40px",backgroundColor:"#f1f1f1"}}
// /> }

   /* <Link to={`/bookings/confirm/${element.doctor_id}`}>
      <button className="bkbtn">Book Appointment</button>
      </Link> */
      /* <h6>see what people say</h6>
      <h3 style={{ marginTop: "20px" }}>Review</h3>
      <div className="reviewSection">
    
      </div> */
    ))}
 

  


</>
  
  );
};

function Booking() {
  const doctorDepartment = [];
  const [list,setList]=useState('');
  const [doctorlist,setdoctorlist]=useState('')

  useEffect(()=>{
    api.get('/doctor/getalldoctor').then(res=>{
      
      setdoctorlist(res.data.response)
    }).catch(err=>console.log(err))
  },[])



  const doctorList = [
    {
      id: 1,
      name: "Ashkan-forouzani",
      department: "general Physican",
      notAvailable: ["13-12-2024"],
      review:[
        {id:1,label:'doctor prescibe well',children:'doctor prescibe very well and very humble listen carefully'},
        {id:1,label:'satisifed with counselling',children:'doctor prescibe very well and very humble listen carefully'}
      ]
    },
    {
      id: 2,
      name: "XYZABC",
      department: "dermatologists",
      notAvailable: ["19-12-2024"],
      review:[
        {id:1,label:'satisifed with counselling',children:'doctor prescibe very well and very humble listen carefully'}
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
 doctorlist && doctorlist.forEach(
    (item) =>
      !doctorDepartment.includes(item.department) &&
      doctorDepartment.push(item.department)
  );

  function Filter(data){
    
    setList(data); 
  }

  return (
    <>
    {doctorlist && 
      <Filtersection  doctorList={doctorlist} doctorDepartment={doctorDepartment}
      Filter={Filter}
      /> }
<div className="flex" style={{flexWrap:'wrap'}}>

     {doctorlist &&    <Detailscard data={list}/>  }
</div>
        {/* <Detailscard />
        <Detailscard />
        <Detailscard /> */}
   
    </>
  );
}

export default Booking;
