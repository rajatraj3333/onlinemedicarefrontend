import { useSelector } from "react-redux";
import api from "./api";
import setauth from "./setauth";
import { getloginDetails } from "../redux/slice/userSlice";
const token = localStorage.getItem('token');

const Api = {
  


  async Get(url) {
    let result;
   
    try {
    result =await api.get(url,{ credentials: 'include'});
      return result;
   } catch (error) {
        return error;
      }

      
    },
  

  async Post(url, data) {
    
    try {
      return await api.post(url, data,{  credentials: 'include'});
    } catch (error) {
      return error;
    }
  },
  HandleRequest(promise,fn)
  {

    if( promise instanceof Promise){
        promise.then(res=>{
         
                if(res.status==200){
                  fn(res,null);
                }
        }).catch(error=>fn(null,error))
      }
      else {
        if(promise.status==200){
                  fn(promise,null);
                }
      }
  }
};

export default Api;
