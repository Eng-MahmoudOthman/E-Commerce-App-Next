"use client" ;

import { createContext, useState, useEffect } from "react" ;
import { useRouter } from "next/navigation" ;
import { toast } from "react-toastify" ;


export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
   const router  = useRouter() ;
   const [user, setUser] = useState(null);
   const [role, setRole] = useState("user");
   const [error , setError] = useState(null);
   const [loading , setLoading] = useState(false);




   const login = async (values) => {
      try {
         setLoading(true);
         setError(null);
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login` , {
            method: "POST",
            credentials: "include", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
         });
         const data = await res.json();
         if(res.ok){
            setLoading(false);
            toast.success(`Hello, ${data.user.name}, Login Successfully.`) ;
            setUser(data.user);
            setRole(data.user?.role);
            return data ;
         }else{
            setLoading(false);
            setError(data?.message || "Login failed") ;
            throw new Error(data?.message || "Login failed") ;
         }
      } catch (error) {
         toast.error(error.message) ;
      }
   };
   const register = async (values) => {
      try {
         setLoading(true);
         setError(null);
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register` , {
            method: "POST",
            credentials: "include", // هيرسل الكوكيز من السيرفر
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
         });
         const data = await res.json();
         if(res.ok){
            toast.success("Registration Successfully.");
            setLoading(false);
         }else{
            setLoading(false);
            setError(data?.message || "Register failed");
            throw new Error(data?.message || "Register failed .");
         }
      } catch (error) {
         toast.error(error.message) ;
      }

   };
   const logout = async () => {
      setLoading(true);
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logOut`, {
            method: "PATCH",
            credentials: "include",
         });
         const data = await res.json();
         if (res.ok){
            setUser(null);
            setRole("user");
            router.push('/auth/login') ; // Client Side Redirect
         }else{
            let msg = data?.message  || "Log Out failed."
            setError(msg);
            throw new Error(msg);
         }
      } catch (error) {
         toast.error(error.message);
      }
      setLoading(false);
   } ;
   const getUser = async () => {
      try {
         setError(null);
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/getProfile` , {
            method: "GET",
            credentials: "include" ,
            headers: { "Content-Type": "application/json" }
         });
         const data = await res.json();
         
         if(res.ok){
            setUser(data?.user) ;
            setRole(data?.user.role) ;
         }else{
            throw new Error("Data Failed, Please Login.") ;
         }
      } catch (error) {
         console.log(error.message || "Get User Data Failed .");
         // toast.error(error.message || "Get User Data Failed .");
      }
   } ;


   useEffect(() => {
      getUser() ;
   }, []) ;

   return (
      <AuthContext.Provider value={{ 
            user, 
            login, 
            register ,
            logout, 

            role, 
            setRole ,
            error,
            loading ,
            isLogged:!!user
         }}>
         {children}
      </AuthContext.Provider>
   );
   
}
