import axios from "axios";


  const api  =
  axios.create({
    baseURL: 'https://omcbackend.onrender.com/api',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      },
    
    
  }); 


export default api


// https://omcbackend.onrender.com/api

// http://www.localhost:5000/api/

// postgresql://neondb_owner:npg_Uu1BebkX0PjL@ep-odd-leaf-a8pnpc86-pooler.eastus2.azure.neon.tech/neondb?sslmode=require