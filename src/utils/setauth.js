import api from "./api";
const setauth =(token)=>{
    if (token) {

        api.defaults.headers.common['X-Authorization'] = token;
     
        localStorage.setItem('token', token);
      } else {
        delete api.defaults.headers.common['X-Authorization'];
        localStorage.removeItem('token');
      }

}

export default setauth