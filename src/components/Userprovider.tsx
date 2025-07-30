import React,{createContext, useContext, useEffect, useState} from 'react'

type UserDetails = { email: string } | null;

const AuthContext = createContext<{
    userdetails: UserDetails;
    login: (email: string) => Promise<void>;
    signup: (email: string) => Promise<void>;
    setuserdetails: React.Dispatch<React.SetStateAction<UserDetails>>;
} | null>(null);

export function Userprovider({children}: { children: React.ReactNode }) {

    const [userdetails, setuserdetails] = useState<UserDetails>(() => {
        let getemail = localStorage.getItem('emails');
        return getemail ? { email: getemail } : null;
    });

    async function login(email: string) {
        setuserdetails({ email: email });
        localStorage.setItem('emails', email);
    }
    async function signup(email: string) {
        setuserdetails({ email: email });
    }

    let value = {
        userdetails,
        login,
        signup,
        setuserdetails
    };



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

