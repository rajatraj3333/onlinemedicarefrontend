
import api from "./api";
interface Response{
res:{status:string}
}
const Api = {



  async Get(url: string) {
    let result;

    try {
      result = await api.get(url, { withCredentials: true });
      return result;
    } catch (error) {
      return error;
    }


  },


  async Post(url: string, data: Object) {

    try {
      return await api.post(url, data, { withCredentials: true });
    } catch (error) {
      return error;
    }
  },
  HandleRequest(promise: Promise<any>|{status:number}, fn: Function) {

    if (promise instanceof Promise) {
      promise.then((res) => {

        if (res?.status == 200) {
          fn(res, null);
        }
      }).catch(error => fn(null, error))
    }
    else {
      if (promise.status == 200) {
        fn(promise, null);
      }
    }
  }
};

export default Api;
