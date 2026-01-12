"use client";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query" ;
import { ToastContainer } from "react-toastify" ;
import { useEffect } from "react" ;



const queryClient = new QueryClient() ;
export default function Providers({ children }) {

   useEffect(() => {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
   }, []);

   return (
      <QueryClientProvider client={queryClient}>
         {children}
         <ToastContainer position="top-right" autoClose={3000} />
      </QueryClientProvider>
   )
}
