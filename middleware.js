import { NextResponse } from "next/server" ;

export async function middleware(request) {
   const token = request.cookies.get("accessToken")?.value ;
   const pathname = request.nextUrl.pathname ;


   // General Protected Route :
   const protectedRoutes = [
      "/dashboard", 
      "/products" , 
      "/cart" ,
      "/admin"
   ];


   // Protected Route Public Pages :
   const isProtected = protectedRoutes.some(route => pathname.startsWith(route) ) ;
   if ( isProtected && !token ) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      "/products/:path*", 
      "/dashboard/:path*" , 
      "/admin/:path*" , 
      "/cart/:path*"
   ]
} ;