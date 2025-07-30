import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "../redux/store";


export const useHooks = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return {
        dispatch,
        navigate
    }
}
