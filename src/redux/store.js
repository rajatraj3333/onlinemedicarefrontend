import { configureStore } from "@reduxjs/toolkit";
import  userSlice   from "./slice/userSlice";
import  gmeetslice  from "./slice/gmeet";
const store = configureStore({
    reducer:{
       user:userSlice,
       gmeet:gmeetslice
    }
})

export default store;