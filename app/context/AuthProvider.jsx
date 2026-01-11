"use client" ;

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


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
            credentials: "include", // هيرسل الكوكيز من السيرفر
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
            toast.error(data?.message || "Login failed") ;
            setError(data?.message || "Login failed") ;
            throw new Error("Login failed") ;
         }
      } catch (error) {
         toast.error(error.response.data.message) ;
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
            toast.error(data?.message || "Register failed .");
            setError(data?.message || "Register failed");
            throw new Error("Register failed");
         }
      } catch (error) {
         toast.error(error.response.data.message) ;
      }

   };

   const logout = async () => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logOut`, {
            method: "PATCH",
            credentials: "include",
         });
         if (res.ok){
            const data = await res.json();
            router.push('/auth/login') ; // Client Side Redirect
            setUser(null);
            setRole("user");
         }else{
            let msg = data?.message  || "Log Out failed."
            setLoading(false);
            setError(msg);
            toast.error(msg);
            throw new Error(msg);
         }
      } catch (error) {
         toast.error(error.response.data.message || "Log Out failed.");
      }
   };

   useEffect(() => {
      const getUser = async () => {
         try {
            setLoading(true);
            setError(null);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/getProfile` , {
               method: "GET",
               credentials: "include", // هيرسل الكوكيز من السيرفر
               headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            if(res.ok){
               setLoading(false) ;
               setUser(data?.user) ;
               setRole(data?.user.role) ;
            }else{
               setLoading(false) ;
               setError(data?.message || "Get User Data Failed .") ;
               throw new Error("Get User Data Failed .") ;
            }
         } catch (error) {
            toast.error(error.response?.data.message || "Get User Data Failed .");
         }
      };
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
