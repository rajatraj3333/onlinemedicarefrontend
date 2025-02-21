import React from 'react'
import './css/table.css'
function Table() {

    let doctorlist =[
        {
            "id": 11,
            "doctor_id": 25701325,
            "name": "Rajat Kumar",
            "fullname": "RajwardhanKumar",
            "department": "general physcian",
            "notavailable": null,
            "joiningdate": null,
            "lastdate": "-",
            "fees": 2100,
            "user_id": 25701325,
            "roles": "Doctor"
        },
        {
            "id": 16,
            "doctor_id": 25701325,
            "name": "Rajat",
            "fullname": "Raj Rajat",
            "department": "general physcian",
            "notavailable": null,
            "joiningdate": "13-02-2025",
            "lastdate": "-",
            "fees": 1320,
            "user_id": 27472452,
            "roles": "Associate"
        },
        {
            "id": 13,
            "doctor_id": 25701325,
            "name": "Rajat",
            "fullname": "Rajat Kumar",
            "department": "general physcian",
            "notavailable": [
                "15-02-2025"
            ],
            "joiningdate": "18-01-2025",
            "lastdate": "-",
            "fees": 1400,
            "user_id": 21378403,
            "roles": "Associate Doctor"
        }
    ]
   
  return (
    <div className='tablewrapper'>
        <div className='container'>
            
            <div className='tablesearchbox'>
                <input  placeholder=' Search...' className='searchinput'/>
                <button className='searchbtn'>Search</button>
                <button className='filter'>Filter</button>
                <div className='filtercontainer'>
                <div className='tab'>
                   <ul className='ullist'>
                    <li>Department</li>
                    <li>Available</li>
                   </ul>
                </div>
                <div className='filtercontent'>
                 
                </div>
                
                </div>
            </div>
            <div className='tables'>
                <div className='tableheading'>
                    <span style={{marginLeft:'0px',textAlign:'center',minWidth:'120px'}}>Id</span>
                    <span style={{textAlign:'center',minWidth:'120px'}}>Name</span>
                    <span style={{textAlign:'center',minWidth:'180px'}}>Full Name</span>
                    <span style={{textAlign:'center',minWidth:'180px'}}>Department</span>
                    <span style={{textAlign:'center',minWidth:'100px'}}>Roles</span>
                    <span style={{textAlign:'center',minWidth:'160px'}}>Joining Date</span>
                    <span style={{textAlign:'center',minWidth:'120px'}}>Last Date</span>
                    <span style={{textAlign:'center',minWidth:'120px'}}>Fees</span>
                    <span style={{textAlign:'center',minWidth:'120px'}}>Actions</span>

                </div>
            <table>
                <thead>

                {/* <tr>
                    <th colSpan="1">Id</th>
                    <th colSpan="1" >Name</th>
                    <th colSpan="2">Full Name</th>
                    <th colSpan="3">Department</th>
                    <th colSpan="2">Roles</th>
                    <th colSpan="1">J-Date</th>
                    <th colSpan="">Last Date</th>
                  
                    <th colSpan="">Fees</th>
                    <th colSpan="">Actions</th>
                </tr> */}
                </thead>
                <tbody>
                    {doctorlist.map(item=>(
                        <tr>
                        <td style={{textAlign:'center',minWidth:'120px',}}>{item.doctor_id}</td>
                        <td style={{textAlign:'center',minWidth:'120px'}}>{item.name}</td>
                        <td style={{textAlign:'center',minWidth:'120px'}}>{item.fullname}</td>
                        <td style={{textAlign:'center',minWidth:'180px'}}>{item.department}</td>
                        <td style={{textAlign:'center',minWidth:'80px'}}>{item.roles}</td>
                        <td style={{textAlign:'center',minWidth:'120px'}}>{item.joiningdate}</td>
                        <td style={{textAlign:'center',minWidth:'120px'}}>{item.lastdate}</td>
                        <td style={{textAlign:'center',minWidth:'120px'}}>{item.fees}</td>
                        <td style={{textAlign:'center',minWidth:'120px'}}>{'ACTIONS'}</td>
                        </tr>
                    ))}
                 
                </tbody>
            </table> 
                </div>    
            
                   </div>
    </div>

  )
}

export default Table