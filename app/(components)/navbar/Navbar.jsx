'use client' ;


import Link from 'next/link.js';
import { useRouter , usePathname } from 'next/navigation.js';
import React, { useContext } from 'react' ;
import { AuthContext } from '../../context/AuthProvider.jsx';
import Loading from '../../loading.jsx';



export default function Navbar() {
   const router = useRouter() ;
   const{user, role,  logout, isLogged , loading} = useContext(AuthContext) ;
   const pathName = usePathname() ;

   const links = [
      {path:"/" , link:"Main" , role:"user"} ,
      {path:"/home/#mySec" , link:"Home" , role:"user"} ,
      {path:"/cart" , link:"Cart" , role:"user"} ,
      {path:"/products" , link:"Products" , role:"user"} ,
      {path:"/categories/fashion" , link:"Categories" , role:"user"} ,
      {path:"/dashboard/users" , link:"Dashboard" , role:"admin"} ,
      {path:"/admin/users" , link:"Admin" , role:"admin"} ,
   ] ;

   
   return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" >
         <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar <i className="fa-regular fa-house"></i></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     {links.map((ele)=>{
                        if(role === ele.role)
                        return (
                           <li key={ele.link} className="nav-item">
                              <Link className={pathName === ele.path? "text-danger nav-link":"nav-link"} aria-current="page" href={ele.path}>{ele.link}</Link>
                           </li>
                        )
                     })}
               </ul>

               <div>
                  {
                     isLogged? 
                           <>
                              <Link className="text-black mx-3"  href="/">{user?.name}</Link>
                              {loading? 
                                    <button className='btn btn-outline-danger btn-sm'>Loading...</button> 
                                 :
                                    <button className='btn btn-outline-danger btn-sm' onClick={()=>{logout()}}>Logout</button>
                              }
                           </>
                        : 
                           <Link className="btn btn-outline-danger btn-sm"  href="/auth/login">Login</Link>
                  }
               </div>
            </div>
         </div>
      </nav>
   )
}
