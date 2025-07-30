import { useHooks } from "../../utils/hooks";
import { removeDetails } from "../../redux/slice/userSlice";
import { notification } from "antd";
import api from '../../utils/api'
import { Response, responseDataype } from "../registration/types";
import { AppDispatch } from "../../redux/store";
export const sessionout = (dispatch:AppDispatch,navigate:any) => {
    
    localStorage.clear();
    dispatch(removeDetails());

    api.get("/auth/logout").then((res:responseDataype) => {
        if (res.status === 200) {
            notification.success({
                message: res.data.response || "Logout successful",
            });
            navigate("/login");
        } else {
            notification.error({
                message: res.data.error || "Logout failed",
            });
        }
    }).catch((error:{message:string}) => {
        notification.error({
            message: error.message || "An error occurred during logout",
        });
    });
};