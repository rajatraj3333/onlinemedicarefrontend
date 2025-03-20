import api from "./api";
import setauth from "./setauth";
const token = localStorage.getItem('token');
const Api = {
  async Get(url) {
    let result;
  token &&  setauth(token);
    try {
    result =await api.get(url);
      return result;
   } catch (error) {
        return error;
      }

      
    },
  

  async Post(url, data) {
    token &&  setauth(token);
    try {
      return await api.post(url, data);
    } catch (error) {
      return error;
    }
  },
  HandleRequest(promise,fn)
  {
        promise.then(res=>{
                if(res.status==200){
                  fn(res,null);
                }
        }).catch(error=>fn(null,error))
  }
};

export default Api;
