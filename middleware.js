import { NextResponse } from "next/server";

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


   // Protected Route Public Pages
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








// middleware.js
// import { NextResponse } from "next/server";
// export async function middleware(request) {
//   const url = request.nextUrl.clone();
//   const token = request.cookies.get("accessToken")?.value;

//   // لو مفيش توكن → نوجه للصفحة الرئيسية أو تسجيل الدخول
//   if (!token) {
//     url.pathname = "/auth/login";
//     return NextResponse.redirect(url);
//   }

//   // لو عايز تتحقق من صلاحية Admin أو role معين
//   // ممكن تعمل fetch لـ backend هنا لو تحب
//   // const res = await fetch("https://api.example.com/me", { 
//   //   headers: { Authorization: `Bearer ${token}` }
//   // });
//   // const data = await res.json();
//   // if (!data.user || !data.user.roles.includes("admin")) {
//   //   url.pathname = "/";
//   //   return NextResponse.redirect(url);
//   // }

//   return NextResponse.next();
// }
// // حدد الصفحات اللي عايز يحميها
// export const config = {
//   matcher: ["/dashboard/:path*", "/products/:path*", "/admin/:path*"]
// };



















// import { NextResponse } from "next/server";
// export async function middleware(request) {
//    const token = request.cookies.get("token")?.value;

//    const protectedRoutes = ["/dashboard", "/products"];
//    const isProtected = protectedRoutes.some(route =>
//       request.nextUrl.pathname.startsWith(route)
//    );
//    if (isProtected && !token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//    }
//    return NextResponse.next();
// }
// export const config = {
//    matcher: ["/dashboard/:path*", "/products/:path*"]
// };
