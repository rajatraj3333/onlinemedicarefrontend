import React, { act, Children, useEffect, useState } from 'react'
import { Spin, Alert } from 'antd';
function Loader({children,data}) {
    const [delayactive,setdelayactive]=useState(true);
   
    if(data){
    setTimeout(()=>{
        setdelayactive(false);
   },3000)
}
 
  return (
<>
   { delayactive ? 
   <div style={{
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)'
   }}>
   <Spin tip="Loading...">
 
 </Spin>
 </div>
 :children}
     </>
)
}

export default Loader