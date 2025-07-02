import React,{useEffect,useState} from 'react'

import { useNavigate, useParams } from 'react-router';
import Api from '../utils/apiconnect';
import { useDispatch, useSelector } from 'react-redux';
import { setGmeetDetails } from '../redux/slice/gmeet';
import { notification } from 'antd';
import api from '../utils/api';
function OAuthPage() {
 const [meetLink, setMeetLink] = useState('');
 const navigate = useNavigate()
 const dispatch = useDispatch(); 

 const gmeetdetails =useSelector(state=>state.gmeet);
//  console.log(gmeetdetails);
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
  // fetch(`http://localhost:5000/api/gmeet/auth/callback?code=${code}`)
 console.log(code) 
 let bid = localStorage.getItem('bid');
 let bookingtime = localStorage.getItem('bookingtime')
    if (code) {
      // Send this code to the backend to exchange it for a token and create a Meet link
        api.post(`/gmeet/auth/callback`,{code,booking_id:bid,bookingtime}).then(data => {
            // console.log(data.meetLink.split('/'))
            // console.log(data.data)
      if(data.data.error){
        notification.error({message:data.data.error})
           localStorage.removeItem('bid');
          localStorage.removeItem('bookingtime');
        return;
      }
        if(data.data.meetLink){
   
          localStorage.removeItem('bid');
          localStorage.removeItem('bookingtime');
          notification.success({message:'meeting schedule  successfully'})
          setTimeout(()=>{
          
            navigate(`/admin`)
          },3000)
        // let response =  Api.Post('gmeet/updateverify',{booking_id: bid,meetLink:data.meetLink})
        //      Api.HandleRequest(response,function(error,data){
        //      if(data.message){
        //   dispatch(setGmeetDetails({gmeetlink:data.meetlink,booking_id:gmeetdetails.booking_id}))

        //      }
        //      })
        
            
        }
            // Api.Post('/updatetime')
          setMeetLink(data.meetlink);
        })
        .catch(err => console.error("Error:", err));
    }
  }, []);
// console.log(meetLink)
  return (
    <div style={{ padding: 20 }}>
    
      {meetLink && (
        <p>
          🔗 Meet Link: <a href={meetLink} target="_blank" rel="noreferrer">{meetLink}</a>
        </p>
      )}
    </div>
  );
}

export default OAuthPage