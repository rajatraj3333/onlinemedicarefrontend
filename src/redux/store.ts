import { configureStore } from "@reduxjs/toolkit";
import  userSlice   from "./slice/userSlice";
import  gmeetslice  from "./slice/gmeet";
import { useSelector } from "react-redux";
const store = configureStore({
    reducer:{
       user:userSlice,
       gmeet:gmeetslice
    }
})



export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store;