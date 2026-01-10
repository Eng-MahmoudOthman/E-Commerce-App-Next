"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthProvider.jsx";

export default function ProtectedRoute({ children, allowedRoles, redirectTo = "/not-allowed" }) {
   const router = useRouter();
   const {user , loading} = useContext(AuthContext) ;

   useEffect(() => {

      // Role check
      // if(!user) return router.replace("/auth/login") ;
      const isAllow = allowedRoles.includes(user?.role) ;
      if (user && !isAllow) {
         router.replace(redirectTo) ;
         return;
      }
   }, []);

   if (loading) return <p>Loading...</p>;
   return children;
}
