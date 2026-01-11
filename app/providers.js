"use client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



import { QueryClient, QueryClientProvider } from "@tanstack/react-query" ;



const queryClient = new QueryClient() ;
export default function Providers({ children }) {
   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> ;
}
