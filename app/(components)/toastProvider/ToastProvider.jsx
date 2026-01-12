"use client"; // مهم جدًا، عشان Client Component

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function ToastProvider({ message, type = "info" }) {
   useEffect(() => {
      if (!message) return;

      switch(type) {
         case "success":
            toast.success(message);
            break;
         case "error":
            toast.error(message);
            break;
         case "warning":
            toast.warning(message);
            break;
            
            default:
            toast.info(message);
      }
   }, [message, type]);

   return <ToastContainer position="top-right" autoClose={3000} />;
}
