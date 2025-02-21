import React,{createContext, useContext, useEffect, useState} from 'react'

const AuthContext = createContext()

export function Userprovider({children}) {

   


    const [userdetails,setuserdetails]=useState(()=>{
        let getemail = localStorage.getItem('emails')
         return getemail ? getemail:null
    })
    
   async function login(email){
           setuserdetails({ email:email})
           localStorage.setItem('emails',email);
    }
  async  function signup(email){
    setuserdetails({ email:email})
        setuserdetails({ email:email})
    }

    let value = {
        userdetails,
        login,
        signup,
        setuserdetails
    }



  return (
    <AuthContext.Provider value={value}>
         {children}
    </AuthContext.Provider>
  )

}

export  function useAuth(){
      const context = useContext(AuthContext)
      if(context!=undefined)  return context
}

