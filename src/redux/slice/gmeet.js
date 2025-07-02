import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/apiconnect";


export const gmeetslice = createSlice({
    name:'gmeet',
    initialState:{
        gmeetlink:'',
        booking_id:'',
        booking_time:'',
        duration:''
    },
    reducers:{
        setGmeetDetails:(state,action)=>{
                      const {gmeetlink,booking_id,booking_time,duration}=action.payload 
                      state.gmeetlink=gmeetlink
                      state.booking_id=booking_id
                      state.booking_time=booking_time
                      state.duration=duration


        },
          removemeetDetails:(state,action)=>{
                      const {gmeetlink,booking_id,booking_time,duration}=action.payload 
                      state.gmeetlink=''
                      state.booking_id=''
                      state.booking_time=''
                      state.duration=''


        }  
    }

})

export const {setGmeetDetails,removemeetDetails}=gmeetslice.actions

export default gmeetslice.reducer