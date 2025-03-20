import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        email:'',
        roles:'',
        token:''
    },
    reducers:{
           setloginDetails:(state,action)=>{
            console.log(state,action)
            const {email,token,roles}=action.payload
              state.email=email
              state.roles=roles
              state.token=token
              console.log(state)
           },
           removeDetails(state) {
             
            state.email=''
            state.roles=''
            state.token=''
            console.log(state)
           }

    }
})


export const {getloginDetails,setloginDetails,removeDetails}=userSlice.actions

export default userSlice.reducer