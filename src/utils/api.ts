import axios from "axios";


  const api  =
  axios.create({
    baseURL: 'https://omcbackend.onrender.com/api',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      },
    
    
  }); 

   api.defaults.headers.common['X-Authorization'] = localStorage.getItem("token") || "";

export default api


// https://omcbackend.onrender.com/api

// http://localhost:5000/api/

