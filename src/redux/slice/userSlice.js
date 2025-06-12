import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/apiconnect";

import { notification } from "antd";


export const fetchUserdetails = createAsyncThunk(
  'users/details',
  async (data,thunkAPI) => {
   
        let promise = await Api.Post('/auth/login',data)

     return promise.data
  },
)

export const addNewuser = createAsyncThunk(
  'user/new',
  async (data,thunkAPI)=>{
    let result = await Api.Post('/auth/register',data)
    return result.data
  }

)

export const userSlice = createSlice({
    name:'user',
    initialState:{
        email:'',
        roles:'',
        token:'',
        login:false,
        loading:false,
        error:''
    },
    reducers:{
           setloginDetails:(state,action)=>{
            console.log(state,action)
            const {email,token,roles}=action.payload || {email:'',token:'',roles:''}
              state.email=email
              state.roles=roles
              state.token=token
              console.log(state)
           },
           removeDetails(state) {
             
            state.email=''
            state.roles=''
            state.token=''
            state.login=false
            state.loading=false
            state.error=''

           },
           getloginDetails(state){
            return state;
           }

    },
    extraReducers:(builder)=>{

      builder.addCase(fetchUserdetails.pending,(state,action)=>{
         state.loading=true
      })  

    
            builder.addCase(fetchUserdetails.fulfilled,(state,action)=>{
           console.log(action);
        if(action.payload && 'error' in action.payload){
            notification.error({message:action.payload.error})
             state.email=null
              state.roles=null
              state.token=null
              state.error=action.payload.error
              state.loading=false
        }
         const {email,token,roles}=action.payload || {email:'',token:'',roles:''}
         console.log(action.payload)
              state.email=email
              state.roles=roles
              state.token=token
                state.loading=false
                  state.error=''
      })
    
        builder.addCase(addNewuser.pending,(state,action)=>{
         state.loading=true
      })  

    
            builder.addCase(addNewuser.fulfilled,(state,action)=>{
           console.log(action);
        if(action.payload && 'error' in action.payload){
            notification.error({message:action.payload.error})
             state.email=null
              state.roles=null
              state.token=null
              state.error=action.payload.error
              state.loading=false
        }

          if(action.payload && 'response' in action.payload){
            notification.error({message:action.payload.error})
             state.email=null
              state.roles=null
              state.token=null
              state.error=''
              state.loading=false
        }

      })
  
    }
})


export const {getloginDetails,setloginDetails,removeDetails}=userSlice.actions

export default userSlice.reducer