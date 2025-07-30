import React from 'react'
import { useParams } from 'react-router'

function CallDashboard({gmeet}) {
    const param = useParams();
      console.log(param); 
    const {url}=param
  return (
    <div>{url}</div>
  )
}

export default CallDashboard