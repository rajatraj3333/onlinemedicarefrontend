import React,{useEffect,useState} from 'react'

import { useNavigate, useParams } from 'react-router';
import Api from '../../utils/apiconnect';
import { useDispatch, useSelector } from 'react-redux';

import { notification } from 'antd';
import styles from  './gmeet.module.css'
import api from '../../utils/api';
function OAuthPage() {
 const [meetLink, setMeetLink] = useState<string>('');
 const navigate = useNavigate()
 const dispatch = useDispatch(); 

//  const gmeetdetails =useSelector(state=>state.gmeet);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
  // fetch(`http://localhost:5000/api/gmeet/auth/callback?code=${code}`)
 
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
          },9000)
    
        
            
        }
        
          setMeetLink(data.data.meetLink);
        })
        .catch(err => console.error("Error:", err));
    }
  }, []);


      // Dynamic status messages
        const statusMessages = [
            "Initializing...",
            "Loading resources...",
            "Processing data...",
            "Almost ready...",
            "Finalizing...",
            "This may take a few moments..."
        ];

        let messageIndex = 0;
        const statusElement = document.querySelector('.status-text') as HTMLElement | null;

        // Change status message every 2 seconds
        setInterval(() => {
            if (statusElement) {
                statusElement.style.opacity = '0';
                setTimeout(() => {
                    statusElement.textContent = statusMessages[messageIndex];
                    statusElement.style.opacity = '0.7';
                    messageIndex = (messageIndex + 1) % statusMessages.length;
                }, 300);
            }
        }, 2000);

        // Add some interactive particle effects
        document.addEventListener('mousemove', (e) => {
            const particles = document.querySelectorAll('.particle');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.5;
                const x = mouseX * speed;
                const y = mouseY * speed;
                (particle as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
            });
        });





// console.log(meetLink)
  return (
    <>
   <div className={`${styles.particles}`}>
        <div className={`${styles.particle}`}></div>
        <div className={`${styles.particle}`}></div>
        <div className={`${styles.particle}`}></div>
        <div className={`${styles.particle}`}></div>
        <div className={`${styles.particle}`}></div>
    </div>

    <div className={`${styles.container}`}>
        <div className={`${styles.loader_container}`}>
            <div className={`${styles.loader}`}></div>
            <div className={`${styles.dots}`}>
                <div className={`${styles.dot}`}></div>
                <div className={`${styles.dot}`}></div>
                <div className={`${styles.dot}`}></div>
            </div>
        </div>
        
        <h1 className={`${styles.title}`}>Creating Link</h1>
        <p className={`${styles.subtitle}`}>Please wait while we prepare everything for you</p>
        
        <div className={`${styles.progress_container}`}>
            <div className={`${styles.progress_bar}`}></div>
        </div>
        
        <p className={`${styles.status_text}`}>This may take a few moments...</p>
    </div>


    </>
  
  );
}

export default OAuthPage