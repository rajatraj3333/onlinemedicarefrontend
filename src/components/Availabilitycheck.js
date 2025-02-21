import React from 'react'
import { DatePicker, Modal, Select } from 'antd'
import moment from 'moment';

const {Option} = Select;


function Card(){
    
    return (
<>
<div style={{
    width:'350px',
    border:'1px solid red',
    height:'200px',
    marginTop:'30px',
    marginLeft:'10px',
    borderRadius:'8px',
//    backgroundColor:'#333'
}}>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"></link>
    <div style={{
        display:'flex',
     width:'100%',
     height:'150px',
    //  border:'1px solid black',
     
     fontFamily: 'DM Serif Text serif',
     fontWeight: 600,
     fontStyle:'normal',
     alignContent:'center',
     alignItems:'center',
     textAlign:'center'
    //  padding:'10px'
    }}>
        <div style={{
            flex:'0 38%',
            // border:'1px solid green',
            padding:'0px',
            // lineHeight:'2rem',
            fontSize:'16px',
        }}>

<p style={{marginTop:'10px'}}>Name</p>
<p style={{marginTop:'10px'}}>Available date</p>
<p style={{marginTop:'15px'}}>Rating</p>
        </div>
        <div style={{
            fontSize:'16px',
            marginLeft:'20px'
        }}>
            <p style={{marginTop:'10px'}}>Hiroshi Nakamoto</p>
            <p style={{marginTop:'10px'}}>17-01-2025</p>
            <p style={{marginTop:'10px'}}>* * * *</p>
        
        </div>
    </div>
<div style={{
    border:'1px solid black',
    height:'50px',
    borderRadius:'8px',
    display:'flex',
    overflowX:'scroll',
    
}}>
<div style={{
    width:'70px',
    height:'100%',
    // border:'1px solid green',

    display:'flex',

    borderRight:'1px solid gray',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'gray',
    // borderRadius:'8px'
}}>5:12 PM</div>


<div style={{
    width:'70px',
    height:'100%',
    // border:'1px solid green',
    display:'flex',
    borderRight:'1px solid gray',

    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'gray',
    // borderRadius:'8px'
}}>15:12 PM</div>


<div style={{
    width:'70px',
    height:'100%',
    // border:'1px solid green',
    display:'flex',

    borderRight:'1px solid gray',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'gray',
    // borderRadius:'8px'
}}>15:00 PM</div>



<div style={{
    width:'70px',
    height:'100%',
    // border:'1px solid green',
    display:'flex',
    justifyContent:'center',
    borderRight:'1px solid gray',

    alignItems:'center',
    backgroundColor:'gray',
    // borderRadius:'8px'
}}>10:12 AM</div>


<div style={{
    width:'70px',
    height:'100%',
    // border:'1px solid green',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRight:'1px solid gray',
    backgroundColor:'gray',
    // borderRadius:'8px'
}}>5:12 PM</div>


<div style={{
    width:'70px',
    height:'100%',
    // border:'1px solid green',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRight:'1px solid gray',
    backgroundColor:'gray',
    // borderRadius:'8px'
}}>5:12 PM</div>

<div style={{
    width:'70px',
    height:'100%',
    // border:'1px solid green',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRight:'1px solid gray',
    backgroundColor:'gray',
    // borderRadius:'8px'
}}>5:12 PM</div>


<div style={{
    width:'70px',
    height:'100%',
    // border:'1px solid green',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRight:'1px solid gray',
    backgroundColor:'gray',
    // borderRadius:'8px'
}}>5:12 PM</div>

</div>

</div>
</>
    )
}

function Availabilitycheck({open,onClose}) {
    function selecteddate (current){
    return moment()>= current
    }
  
  return (
    <Modal width={'800px'} open={open} onCancel={()=>onClose(!open)} style={{height:'500px'
    ,overflow:'scroll',
    width:'400px',
    // overflowX:'hidden'
    }}>

    <div style={{
        display:'flex',
        justifyContent:'space-between',
        margin:'20px'
    }}>
        <Select style={{width:'200px'}} defaultValue={'Select'}>
            <Option value='Neurologist'>Neurologist</Option>
            <Option value ={'Dentist'}>Dentist</Option>
            <Option value={'Pediatrician'}>Pediatrician</Option>
            
        </Select>
        <DatePicker width={'300px'} disabledDate={selecteddate}/>
    </div>

    {/* <div style={{display:'flex', justifyContent:'center',paddingTop:'60px'}}>
        <h3>Select Department and  Specfic date</h3>
    </div>
     */}
    <div style={{display:'flex',
        flexWrap:'wrap',
        justifyContent:'flex-start'

        }}> 

     <Card/>
     <Card/>
     <Card/>
     <Card/>

     </div>

    </Modal>
  )
}

export default Availabilitycheck