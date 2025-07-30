import { notification } from "antd";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useEffect } from 'react'

 export  type Users = {
    email: string | null,
    roles: string  | null,
    token: string | null,
    login: boolean | null,
    loading: boolean | null,
    error: string | null
}



export const useErrorHooks = () => {
    const user = useSelector((state: RootState) => state.user as Users);

    useEffect(() => {
        if (user?.error && user.error.length > 1) {
            notification.error({ message: user.error });
        }
    }, [user.error]);

}


