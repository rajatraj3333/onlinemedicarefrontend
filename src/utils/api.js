import axios from "axios";


  const api  =
  axios.create({
    baseURL: 'https://omcbackend.onrender.com/api',
    headers: {
      'Content-Type': 'application/json',
      },
    
    
  }); 


export default api


// https://omcbackend.onrender.com/api

// http://www.localhost:5000/api/

